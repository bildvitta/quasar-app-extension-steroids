const sourcePath = '~@bildvitta/quasar-app-extension-steroids/src/'
const resolve = (...paths) => paths.map(path => sourcePath + path)

const extendQuasar = quasar => {
  // Boot
  quasar.boot.push(...resolve(
    'boot/axios.js',
    'boot/environment.js',
    'boot/force-https.js',
    'boot/register-components.js',
    'boot/register-directives.js',
    'boot/register-error-pages.js',
    'boot/register-permissions.js',
    'boot/register-plugins.js',
    'boot/resolve-router.js',
    'boot/router.js',
    'boot/store.js'
  ))

  // Transpile
  quasar.build.transpileDependencies.push(/quasar-app-extension-steroids[\\/]src/)

  // Styles
  quasar.css.push(...resolve(
    'css/container.scss',
    'css/line-height.scss',
    'css/opacity.scss',
    'css/steroids.scss',
    'css/text.scss'
  ))

  // Extras
  quasar.extras.push(
    'material-icons-outlined'
  )

  const plugins = [
    'Notify',
    'Dialog',
    'Loading'
  ]

  // Add all required quasar plugins
  plugins.forEach(plugin => quasar.framework.plugins.push(plugin))

  // Framework
  quasar.framework.iconSet = 'material-icons-outlined'
  quasar.framework.lang = 'pt-br'
}

module.exports = function (api) {
  api.compatibleWith('quasar', '^1.0.0')
  api.compatibleWith('@quasar/app', '>1.0.0')

  api.compatibleWith('axios', '>0.19.1')
  api.compatibleWith('date-fns', '^2.9.0')
  api.compatibleWith('fuse.js', '^3.4.6')
  api.compatibleWith('humps', '^2.0.1')
  api.compatibleWith('lodash', '^4.17.15')
  api.compatibleWith('sortablejs', '^1.10.2')

  api.extendQuasarConf(extendQuasar)

  api.extendWebpack(webpack => {
    const helpers = 'node_modules/@bildvitta/quasar-app-extension-steroids/src/helpers/index.js'

    webpack.resolve.alias = {
      ...webpack.resolve.alias,

      extensions: api.resolve.app('quasar.extensions.json'),
      steroids: api.resolve.app(helpers),
      store: api.resolve.src('store')
    }
  })
}
