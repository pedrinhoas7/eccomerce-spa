import { createMemoryHistory, createRouter } from 'vue-router'

import ClientsViewer from '../views/ClientsViewer.vue';

const routes = [
  { path: '/', component: ClientsViewer },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})


export default router;