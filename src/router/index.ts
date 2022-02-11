import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '../layout/index.vue'
import Login from '../views/login/Login.vue'
import BasePage from '@/base/BasePage'
import Dashboard from '@/views/dashboard/Index.vue'

const asyncFiles = require.context('./async-routers', true, /\.[tj]s$/)
export const asyncRoutes = asyncFiles.keys().filter(path => path != './base_router.ts').reduce((routers: RouteRecordRaw[], filePath: string) => {
  return routers.concat(asyncFiles(filePath).default)
}, [])

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        meta: {
          requiresAuth: true
        },
        component: () => BasePage(Dashboard),
        name: 'Dashboard'
      }
    ]
  },
  {
    path: '/login',
    component: Login,
    name: 'Login',
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

asyncRoutes.forEach(item => {
  router.addRoute(item)
})

export default router
