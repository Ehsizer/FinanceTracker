import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Transactions from '@/pages/Transactions.vue'
import Categories from '@/pages/Categories.vue'
import Charts from '@/pages/Charts.vue'
import AddTransaction from '@/pages/AddTransaction.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/transactions', name: 'Transactions', component: Transactions },
  { path: '/categories', name: 'Categories', component: Categories },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/add', name: 'add', component: AddTransaction },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
