import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TableView from '@/views/TableView.vue'
import UsersView from '@/views/UsersView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/Table',
      name: 'Table',
      component: TableView
    },
    {
      path: '/Users',
      name: 'Users',
      component: UsersView
    }
  ]
})

export default router
