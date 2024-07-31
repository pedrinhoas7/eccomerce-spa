import { createMemoryHistory, createRouter } from 'vue-router'

import ClientsListViewer from '@/views/Client/ListViewer.vue';
import ClientsEditViewer from '@/views/Client/EditViewer.vue';
import ClientCreateViewer from '@/views/Client/CreateViewer.vue';

const routes = [
  { path: '/', component: ClientsListViewer },
  { path: '/edit/:id', name: "edit", component: ClientsEditViewer },
  { path: '/add', name: "add", component: ClientCreateViewer },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})


export default router;