import fs from 'node:fs/promises'

async function main() {
  const distFilePath = './dist/yandere-masonry.user.js'
  const script = await fs.readFile(distFilePath, 'utf8')
  const start = script.indexOf('var prepareStyle')
  const end = script.indexOf('/*! prepare end */')
  const prepareStr = script.slice(start, end)
  await fs.writeFile(
    distFilePath,
    script
      .replace(prepareStr, '')
      .replace(
        '(function(Vue2, VueMasonry2, Vuetify2, fastXmlParser) {',
        '(() => {\n  ' + prepareStr + 'prepareApp(() => {(function(Vue2, VueMasonry2, Vuetify2, fastXmlParser) {',
      )
      .replace('prepareApp(initApp)', 'initApp()')
      .replace(
        '})(Vue, VueMasonry, Vuetify, fxparser);',
        '  })(Vue, VueMasonry, Vuetify, {XMLParser});});\n})();'
      )
  )
}

main()
