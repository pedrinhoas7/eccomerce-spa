import { createMemoryHistory, createRouter } from 'vue-router'

import CustomerManagement from '../components/CustomerManagement.vue'

const routes = [
  { path: '/', component: CustomerManagement },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})


export default router;