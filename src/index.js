const extendQuasar = quasar => {
  // Boot
  quasar.boot.push('~quasar-app-extension-steroids/src/boot/register-components.js')

  // Transpile
  quasar.build.transpileDependencies.push(/quasar-app-extension-steroids[\\/]src/)

  // Styles
  quasar.css.push('~quasar-app-extension-steroids/src/css/line-height.scss')
  quasar.css.push('~quasar-app-extension-steroids/src/css/truncate.scss')
}

module.exports = function (api) {
  api.compatibleWith('quasar', '^1.0.0')
  api.compatibleWith('@quasar/app', '^1.0.0')

  api.extendQuasarConf(extendQuasar)
}
