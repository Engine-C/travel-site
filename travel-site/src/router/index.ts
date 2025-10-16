import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/booking',
    name: 'booking',
    component: () => import('../views/Booking.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router


