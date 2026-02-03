export const isFsaSupported = 'showDirectoryPicker' in self

let mainDirHandle: FileSystemDirectoryHandle | null

/**
 * 通过 FileSystemAccess API 保存文件
 */
export async function saveFile(urlOrBlob: string | Blob, fileName: string, subdir?: string) {
  if (!mainDirHandle) {
    mainDirHandle = await getMainDirHandle()
    if (!mainDirHandle) mainDirHandle = await setMainDirHandle()
  }
  if (!mainDirHandle) {
    throw new Error('Failed to get dir handle.')
  }
  if (!(await verifyPermission(mainDirHandle))) {
    throw new Error('Permission not granted.')
  }
  const fileHandle = subdir
    ? await getSubDirFileHandle(mainDirHandle, subdir, fileName)
    : await mainDirHandle.getFileHandle(fileName, { create: true })
  if (typeof urlOrBlob == 'string') {
    await writeURLToFile(fileHandle, urlOrBlob)
  } else {
    await writeBlobToFile(fileHandle, urlOrBlob)
  }
  return `${mainDirHandle.name}${subdir ? `/${subdir}` : ''}/${fileName}`
}

/**
 * 获取在 IDB 中保存的 dir handle
 */
export async function getMainDirHandle() {
  const directoryHandle = await loadDirHandleFromIDB()
  return directoryHandle
}

/**
 * 获取用户授权的 dir handle 并保存到 IDB 中
 */
export async function setMainDirHandle() {
  const directoryHandle = await window.showDirectoryPicker({ mode: 'readwrite' })
  await saveDirHandleToIDB(directoryHandle)
  return directoryHandle
}

/**
 * 在用户对文件句柄授予了读写权限时返回 true，若无权限则请求权限。
 */
async function verifyPermission(handle: FileSystemHandle) {
  // Check if permission was already granted. If so, return true.
  if ((await handle.queryPermission({ mode: 'readwrite' })) === 'granted') {
    return true
  }

  // Request permission. If the user grants permission, return true.
  if ((await handle.requestPermission({ mode: 'readwrite' })) === 'granted') {
    return true
  }

  // The user didn't grant permission, so return false.
  return false
}

/**
 * Fetch URL 后通过 file handle 将返回写入文件
 */
async function writeURLToFile(fileHandle: FileSystemFileHandle, url: string) {
  // Make an HTTP request for the contents.
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Response not ok: ${response.status}`)
  // Create a FileSystemWritableFileStream to write to.
  const writable = await fileHandle.createWritable()
  // Stream the response into the file.
  await response.body?.pipeTo(writable)
  // pipeTo() closes the destination pipe by default, no need to close it.
}

/**
 * 通过 file handle 将 blob 写入文件
 */
async function writeBlobToFile(fileHandle: FileSystemFileHandle, blob: Blob) {
  // Create a FileSystemWritableFileStream to write to.
  const writable = await fileHandle.createWritable()
  // Write the contents of the file to the stream.
  await writable.write(blob)
  // Close the file and write the contents to disk.
  await writable.close()
}

/**
 * 获取子目录的 dir handle
 */
async function getSubDirFileHandle(dirHandle: FileSystemDirectoryHandle, subDirName: string, fileName: string) {
  const subDirHandle = await dirHandle.getDirectoryHandle(subDirName, { create: true })
  const fileHandle = await subDirHandle.getFileHandle(fileName, { create: true })
  return fileHandle
}

function openIDB() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open('y-fsa-db', 1)

    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains('handles')) {
        db.createObjectStore('handles')
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

async function saveDirHandleToIDB(handle: FileSystemDirectoryHandle) {
  const db = await openIDB()

  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction('handles', 'readwrite')
    const store = tx.objectStore('handles')

    store.put(handle, 'dir')

    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

async function loadDirHandleFromIDB() {
  const db = await openIDB()

  return new Promise<FileSystemDirectoryHandle | null>((resolve, reject) => {
    const tx = db.transaction('handles', 'readonly')
    const store = tx.objectStore('handles')

    const req = store.get('dir')

    req.onsuccess = () => resolve(req.result || null)
    req.onerror = () => reject(req.error)
  })
}
