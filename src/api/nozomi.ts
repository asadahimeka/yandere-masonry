export function isNozomiPage() {
  return location.hostname == 'nozomi.la' && location.pathname == '/'
}

let resPosts: any[] = []
export function fetchNozomiPosts(page: number) {
  resPosts = []
  return new Promise(resolve => {
    fetch_nozomi(page)

    let times = 0
    const si = setInterval(() => {
      times = times + 1
      if (times > 10) {
        clearInterval(si)
        resolve([])
        return
      }
      if (resPosts.length) {
        clearInterval(si)
        resolve(resPosts.map(e => ({
          id: e.postid,
          postView: e.postView,
          previewUrl: e.previewUrl,
          fileUrl: e.fileUrl,
          tags: e.tags,
          width: e.width,
          height: e.height,
          aspectRatio: e.width / e.height,
          fileExt: e.type,
          fileDownloadName: `NOZOMI ${e.postid} ${e.tags.join(' ')}.${e.type}`,
          rating: '',
        })))
      }
    }, 1000)
  })
}

export const nozomila = {
  is: isNozomiPage,
  posts: fetchNozomiPosts,
}

const tns_per_page = 64
const nozomiextension = '.nozomi'
const nozomidir = 'nozomi'
const postdir = 'post'

const results_array: Record<string, any> = {}
const outstanding_requests: Record<string, any> = {}
let number_of_outstanding_requests = 0
const nozomi: number[] = []
let total_items = 0
const tag = 'index'; let area; /* let popular; */ let page_number
let nozomi_address
const domain = 'n.nozomi.la'

const full_path_from_hash = (hash: string) => {
  if (hash.length < 3) {
    return hash
  }
  return hash.replace(/^.*(..)(.)$/, `$2/$1/${hash}`)
}

const urlencode = (str: string) => {
  return str.replace(/[\;\/\?\:\@\=\&#%\+]/g, (c: string) => {
    return `%${c.charCodeAt(0).toString(16)}`
  })
}

const remove_slashes = (input: string) => {
  return input.replace(/[\/]/g, '')
}

function path_from_postid(postid: string) {
  if (postid.length < 3) return postid
  return postid.replace(/^(.*(..)(.))$/, '$3/$2/$1')
}

function fetch_nozomi(page: any) {
  page_number = page
  nozomi_address = `https://${domain}`
  if (area) {
    nozomi_address += `/${nozomidir}`
  }
  // if (popular && tag !== 'index-Popular') {
  //   nozomi_address += '/popular'
  // }
  nozomi_address += `/${urlencode(remove_slashes(tag))}`
  nozomi_address += nozomiextension

  const start_byte = (page_number - 1) * tns_per_page * 4
  const end_byte = start_byte + tns_per_page * 4 - 1

  const xhr = new XMLHttpRequest()
  xhr.open('GET', nozomi_address)
  xhr.responseType = 'arraybuffer'
  xhr.setRequestHeader('Range', `bytes=${start_byte.toString()}-${end_byte.toString()}`)
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200 || xhr.status === 206) {
        const arrayBuffer = xhr.response // Note: not oReq.responseText
        if (arrayBuffer) {
          // var arr = new Uint8Array(arrayBuffer); //e.g. [0x00, 0x5D, 0x39, 0x72,  0x00, 0x5D, 0x39, 0x82,  ...]
          // var jspack = new JSPack();
          // var total = arr.length/4; //32-bit unsigned integers
          // nozomi = jspack.Unpack(total+"I", arr);

          const view = new DataView(arrayBuffer)
          for (let pos = 0; pos < view.byteLength; pos += 4) {
            nozomi.push(view.getUint32(pos, false /* big-endian */))
          }

          total_items = parseInt(xhr.getResponseHeader('Content-Range')!.replace(/^[Bb]ytes \d+-\d+\//, '')) / 4
          console.log('total_items: ', total_items)

          get_jsons()
        }
      }
    }
  }
  xhr.send()
}

function get_jsons() {
  const datas = []
  for (const i in nozomi) {
    const postid = nozomi[i]
    if (postid in results_array) {
      datas.push(results_array[postid])
      continue
    }
    if (!outstanding_requests[postid]) {
      outstanding_requests[postid] = 1
      ++number_of_outstanding_requests
      get_json(postid) // calling a function is REQUIRED to give postid its own scope
    }
  }
  if (number_of_outstanding_requests) return

  results_to_page(datas)
}

function get_json(postid: string | number) {
  const url = `https://j.gold-usergeneratedcontent.net/${postdir}/${path_from_postid(postid.toString())}.json`

  const xmlhttp = new XMLHttpRequest()
  xmlhttp.open('GET', url)
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        results_array[postid] = JSON.parse(this.responseText)
      } else {
        results_array[postid] = ''
      }
      delete outstanding_requests[postid]
      --number_of_outstanding_requests
      get_jsons()
    }
  }
  xmlhttp.send()
}

function results_to_page(datas: any[]) {
  for (const d in datas) {
    const data = datas[d]
    if (!data) continue
    data.tags = [
      ...(data.artist?.map((e: { tag: any }) => e.tag) || []),
      ...(data.copyright?.map((e: { tag: any }) => e.tag) || []),
      ...(data.character?.map((e: { tag: any }) => e.tag) || []),
      ...(data.general?.map((e: { tag: any }) => e.tag) || []),
    ]
    data.postView = `https://nozomi.la/post/${data.postid}.html`
    data.previewUrl = `https://qtn.gold-usergeneratedcontent.net/${full_path_from_hash(data.imageurls[0].dataid)}.${data.imageurls[0].type}.webp`
    const url = data.imageurls[0]
    if (url.is_video) {
      data.fileUrl = `https://v.gold-usergeneratedcontent.net/${full_path_from_hash(url.dataid)}.${url.type}`
    } else {
      data.fileUrl = `https://${url.type === 'gif' ? 'g' : 'w'}.gold-usergeneratedcontent.net/${full_path_from_hash(url.dataid)}.${url.type === 'gif' ? 'gif' : 'webp'}`
    }
  }
  resPosts = datas
}
