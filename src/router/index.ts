import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '../layout/index.vue'
import Login from '../views/login/Login.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/dashboard',
    component: Layout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/Index.vue'),
        name: 'Dashboard'
      }
    ]
  },
  {
    path: '/login',
    component: Login,
    name: 'Login',
  },
  // {
  //   path: '/example',
  //   component: Layout,
  //   meta: {
  //     requiresAuth: true
  //   },
  //   children: [
  //     {
  //       path: '/create',
  //       component: () => import(/* webpackChunkName: "create" */ '@/views/About.vue'),
  //       name: 'Create'
  //     }
  //   ]
  // }
]

// routes.push({
//   path: '/about',
//   name: 'About',
//   // route level code-splitting
//   // this generates a separate chunk (about.[hash].js) for this route
//   // which is lazy-loaded when the route is visited.
//   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
// })

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
// router.beforeEach((to) => {
//   if (to.meta.requiresAuth) {  // 需要验证 to.meta.requiresAuth && isLogin
//     return {
//       name: 'Login',replace: true
//     }
//   }
//   return true;
// })

export default router
