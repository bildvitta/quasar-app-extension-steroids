const imports = [
  'error',
  'success'
]

export default async (context) => {
  const { Vue } = context
  Vue.prototype.$qs = {}

  imports.forEach(name => {
    import(`../plugins/${name}.js`).then(plugin => {
      Vue.prototype.$qs[name] = plugin.default(context)
    })
  })
}
