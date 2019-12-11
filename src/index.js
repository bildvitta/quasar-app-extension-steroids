const sourcePath = '~@bildvitta/quasar-app-extension-steroids/src/'

const extendQuasar = quasar => {
  // Boot
  quasar.boot.push(
    sourcePath + 'boot/brand-colors.js',
    sourcePath + 'boot/register-filters.js',
    sourcePath + 'boot/force-https.js',
    sourcePath + 'boot/register-directives.js',
    sourcePath + 'boot/register-components.js'
  )

  // Transpile
  quasar.build.transpileDependencies.push(/quasar-app-extension-steroids[\\/]src/)

  // Styles
  quasar.css.push(
    sourcePath + 'css/colors.scss',
    sourcePath + 'css/container.scss',
    sourcePath + 'css/line-height.scss',
    sourcePath + 'css/opacity.scss',
    sourcePath + 'css/steroids.scss',
    sourcePath + 'css/text.scss'
  )

  // Extras
  quasar.extras.push(
    'material-icons-outlined'
  )

  // Framework
  quasar.framework.iconSet = 'material-icons-outlined'
  quasar.framework.lang = 'pt-br'
}

module.exports = function (api) {
  api.compatibleWith('quasar', '^1.0.0')
  api.compatibleWith('@quasar/app', '^1.0.0')

  api.compatibleWith('axios', '^0.18.0')
  api.compatibleWith('lodash', '^4.17.15')

  api.extendQuasarConf(extendQuasar)

  api.extendWebpack(webpack => {
    const helpers = 'node_modules/@bildvitta/quasar-app-extension-steroids/src/helpers/index.js'
    webpack.resolve.alias.steroids = api.resolve.app(helpers)
  })
}
