export default async ({ Vue, router, store }) => {
  Vue.prototype.$history = []

  router.beforeEach(async (to, from, next) => {
    Vue.prototype.$history.unshift(from)

    // Routes that does not requires authentication.
    const requiresAuth = to.matched.some(item => item.meta.requiresAuth)

    if (!requiresAuth) {
      return next()
    }

    // Is user authenticated?
    const token = store.getters['auth/token']

    return next(token && typeof token === 'string' ? true : {
      name: 'Auth',
      query: { url: to.fullPath }
    })
  })
}
