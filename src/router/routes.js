
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/IndexPage.vue') },
    ]
  },
  {
    path: '/network',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/network/NetworkIndexPage.vue') },
    ]
  },
  {
    path: '/settings',
    component: () => import('layouts/SettingsLayout.vue'),
    children: [
      { path: 'node-types', component: () => import('pages/settings/NodeTypesPage.vue') },
      { path: 'tags', component: () => import('pages/settings/TagsPage.vue') },
      { path: 'nodes', component: () => import('pages/settings/NodesPage.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
