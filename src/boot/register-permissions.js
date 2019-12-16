export default async ({ Vue, store }) => {
  function can (permission, model) {
    try {
      const { permissions } = store.getters['auth/group']
      return permissions.find(item => item.name === model).list.includes(permission)
    } catch (error) {
      return false
    }
  }

  function canAny (permissions, model) {
    if (!Array.isArray(permissions)) {
      throw new Error('Please provide a valid array for permissions.')
    }

    for (const permission of permissions) {
      if (can(permission, model)) { return true }
    }

    return false
  }

  Vue.prototype.$can = can
  Vue.prototype.$canAny = canAny
}
