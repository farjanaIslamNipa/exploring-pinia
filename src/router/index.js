import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path:'/tasks/create-task',
      name: 'createTask',
      component: () => import('../views/tasks/CreateTask.vue')
    },
    {
      path:'/tasks/create-task',
      name: 'createTask',
      component: () => import('../views/tasks/CreateTask.vue')
    },
    {
      path: '/flight/search',
      name: 'flightSearch',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/flights/FlightSearch.vue')
    }
  ]
})

export default router
