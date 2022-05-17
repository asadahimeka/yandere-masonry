import fs from 'node:fs/promises'

async function main() {
  const distFilePath = './dist/yandere-masonry.user.js'
  const buf = await fs.readFile(distFilePath)
  const script = buf.toString()
  const start = script.indexOf('var ydStyle')
  const end = script.indexOf('/*! prepare end */')
  const prepareStr = script.slice(start, end)
  await fs.writeFile(
    distFilePath,
    script
      .replace(prepareStr, '')
      .replace(
        '(function(Vue2, VueCompositionAPI2, VueMasonry2, Vuetify2) {',
        '(() => {\n  ' + prepareStr + 'prepareApp(() => {(function(Vue2, VueCompositionAPI2, VueMasonry2, Vuetify2) {',
      )
      .replace('prepareApp(initApp)', 'initApp()')
      .replace(
        '})(Vue, VueCompositionAPI, VueMasonry, Vuetify);',
        '  })(Vue, VueCompositionAPI, VueMasonry, Vuetify);});\n})();'
      )
  )
}

main()
