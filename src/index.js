const extendQuasar = quasar => {
  // Boot
  quasar.boot.push(
    '~quasar-app-extension-steroids/src/boot/brand-colors.js',
    '~quasar-app-extension-steroids/src/boot/register-filters.js',
    '~quasar-app-extension-steroids/src/boot/force-https.js',
    '~quasar-app-extension-steroids/src/boot/register-directives.js',
    '~quasar-app-extension-steroids/src/boot/register-components.js'
  )

  // Transpile
  quasar.build.transpileDependencies.push(/quasar-app-extension-steroids[\\/]src/)

  // Styles
  quasar.css.push(
    '~quasar-app-extension-steroids/src/css/colors.scss',
    '~quasar-app-extension-steroids/src/css/container.scss',
    '~quasar-app-extension-steroids/src/css/line-height.scss',
    '~quasar-app-extension-steroids/src/css/opacity.scss',
    '~quasar-app-extension-steroids/src/css/steroids.scss',
    '~quasar-app-extension-steroids/src/css/text.scss'
  )

  // Extras
  quasar.extras.push('material-icons-outlined')
  quasar.extras.push('roboto-font')
}

const path = require('path')

module.exports = function (api) {
  api.compatibleWith('quasar', '^1.0.0')
  api.compatibleWith('@quasar/app', '^1.0.0')

  api.compatibleWith('axios', '^0.18.0')
  api.compatibleWith('lodash', '^4.17.15')

  api.extendQuasarConf(extendQuasar)

  api.extendWebpack(webpack => {
    webpack.resolve.alias.steroids = api.resolve.app('node_modules/quasar-app-extension-steroids/src/helpers/index.js')
  })
}
