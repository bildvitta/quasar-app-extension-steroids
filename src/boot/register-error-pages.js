export default async ({ router }) => {
  const routes = [
    {
      name: 'Forbidden',
      path: '/',
      component: () => import('../pages/Forbidden.vue')
    }
  ]

  if (process.env.MODE !== 'ssr') {
    routes.push({
      name: 'NotFound',
      path: '*',
      component: () => import('../pages/NotFound.vue')
    })
  }

  router.addRoutes(routes)
}
