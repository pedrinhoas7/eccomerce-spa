<template>
    <div class="flex flex-wrap w-full mt-5">
      <div class="flex flex-col w-full lg:w-3/4">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">
            Consulte os seus Clientes cadastrados na sua Loja ou realize o cadastro de novos Clientes
          </h2>
          <button class="bg-magalu text-white py-2 px-4 rounded-md" @click="openCreateModal">Adicionar Cliente</button>
        </div>
        <div class="flex mb-4">
          <input class="border border-gray-300 rounded-l-md p-2 w-full" type="text" placeholder="Pesquisar compradores" />
          <button class="bg-magalu text-white px-4 rounded-r-md">Filtrar</button>
        </div>
        <ClientsTable :clients="paginatedClients" @edit="openEditModal" />
        <Pagination :currentPage="state.currentPage" :totalPages="totalPages" @prevPage="prevPage" @nextPage="nextPage" />
      </div>
  
      <!-- Edit Modal -->
      <EditClientModal 
        v-if="state.showEditModal" 
        :client="state.client"
        @update="updateClients"
        @close="closeModal"
      />
  
      <!-- Create Modal -->
      <CreateClientModal 
        v-if="state.showCreateModal" 
        :newClient="state.newClient"
        @create="createClients"
        @close="closeModal"
      />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted, reactive, computed } from 'vue';
  import ClientDTO from '../DTO/ClientDTO';
  import ClientService from '../services/ClientService';
  import ClientsTable from '../components/ClientsList.vue';
  import Pagination from '../components/Pagination.vue';
  import EditClientModal from '../components/ClientsEdit.vue';
  import CreateClientModal from '../components/ClientsCreate.vue';
  
  export default defineComponent({
    name: 'ClientsViewer',
    components: {
      ClientsTable,
      Pagination,
      EditClientModal,
      CreateClientModal
    },
    setup() {
      const state = reactive({
        clients: [] as ClientDTO[],
        client: null as ClientDTO | null,
        newClient: {
          id: '',
          name: '',
          email: '',
          phone: '',
          isBlocked: false
        } as ClientDTO,
        showEditModal: false,
        showCreateModal: false,
        currentPage: 1,
        itemsPerPage: 10,
      });
  
      const loadClients = async () => {
        const request = await ClientService.getAll();
        state.clients = request;
      };
  
      const updateClients = async () => {
        if (state.client && state.client.id) {
          await ClientService.update(state.client.id, state.client);
          closeModal();
          loadClients();
        }
      };
  
      const createClients = async () => {
        await ClientService.create(state.newClient);
        closeModal();
        loadClients();
      };
  
      const deleteClient = async (clientId: string) => {
        await ClientService.delete(clientId);
        loadClients();
      };
  
      const openEditModal = (client: ClientDTO) => {
        state.client = { ...client };
        state.showEditModal = true;
      };
  
      const openCreateModal = () => {
        state.newClient = {
          id: '',
          name: '',
          email: '',
          phone: '',
          isBlocked: false
        };
        state.showCreateModal = true;
      };
  
      const closeModal = () => {
        state.showEditModal = false;
        state.showCreateModal = false;
      };
  
      const paginatedClients = computed(() => {
        const start = (state.currentPage - 1) * state.itemsPerPage;
        const end = start + state.itemsPerPage;
        return state.clients.slice(start, end);
      });
  
      const totalPages = computed(() => {
        return Math.ceil(state.clients.length / state.itemsPerPage);
      });
  
      const prevPage = () => {
        if (state.currentPage > 1) {
          state.currentPage--;
        }
      };
  
      const nextPage = () => {
        if (state.currentPage < totalPages.value) {
          state.currentPage++;
        }
      };
  
      onMounted(loadClients);
  
      return {
        state,
        updateClients,
        createClients,
        deleteClient,
        openEditModal,
        openCreateModal,
        closeModal,
        paginatedClients,
        totalPages,
        prevPage,
        nextPage
      };
    }
  });
  </script>
  
  <style scoped>

  </style>
  