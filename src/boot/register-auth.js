import axios from 'axios'
import authModule from '../store/auth.js'

export default async ({ router, store }) => {
  // Store
  store.registerModule('auth', authModule)

  // Token
  const token = store.getters['auth/token']

  // Headers
  if (token && typeof token === 'string') {
    axios.defaults.headers = { Authorization: `JWT ${token}` }
  }

  // Status
  axios.defaults.validateStatus = status => {
    if (status === 401) {
      localStorage.clear()
      location.href = '/auth'
    }

    return status >= 200 && status < 300
  }

  // Router
  router.addRoutes([
    {
      name: 'Auth',
      path: '/auth',
      component: () => import('../layouts/Auth.vue'),
      redirect: { name: 'AuthSignIn' },
  
      children: [
        {
          name: 'AuthSignIn',
          path: '/auth/signin',
          component: () => import('../pages/auth/AuthSignIn.vue')
        },
        {
          name: 'AuthSignOut',
          path: '/auth/signout',
          component: () => import('../pages/auth/AuthSignOut.vue')
        },
        {
          name: 'AuthSignedOut',
          path: '/auth/signedout',
          component: () => import('../pages/auth/AuthSignedOut.vue')
        },
        {
          name: 'AuthValidate',
          path: '/auth/validate',
          component: () => import('../pages/auth/AuthValidate.vue')
        }
      ]
    }
  ])

  router.beforeEach(async (to, from, next) => {
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
