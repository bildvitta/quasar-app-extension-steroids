export default function ({ router }) {
  const _push = router.push.bind(router)
  const _replace = router.replace.bind(router)
  const _resolve = router.resolve.bind(router)

  router.push = function (options) {
    const { route } = _resolve(options)

    if (router.history.current.fullPath !== route.fullPath) {
      return _push(options)
    }
  }

  router.replace = function (options) {
    const { route } = _resolve(options)

    if (router.history.current.fullPath !== route.fullPath) {
      return _replace(options)
    }
  }
}
