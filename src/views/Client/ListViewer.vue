<template>
    <div class="flex flex-wrap w-full mt-5 justify-center items-center">
        <div class="flex flex-col w-full lg:w-3/4">
            <h2>Consulte os seus Clientes cadastrados na sua Loja ou realize o cadastro de novos Cliente</h2>
            <div class="flex flex-nowrap  mb-4">
                <input class="border border-gray-300 rounded-l-md p-2 w-full" type="text"
                    placeholder="Pesquisar compradores" />
                <button class="bg-magalu text-white px-4 rounded-r-md">Filtrar</button>
                <button class="bg-magalu text-white py-2 px-4 rounded-md ml-8" @click="openCreateModal">Adicionar
                    Cliente</button>
            </div>
            <ClientsList :clients="paginatedClients" @edit="openEditModal" @close="$router.replace('/')" />
            <Pagination :currentPage="state.currentPage" :totalPages="totalPages" @prevPage="prevPage"
                @nextPage="nextPage" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, computed } from 'vue';
import ClientDTO, { TypeClient, TypeGender } from '@/DTO/ClientDTO';
import ClientService from '@/services/ClientService';
import ClientsList from '@/components/client/List.vue';
import Pagination from '@/components/Pagination.vue';
import router from '@/router';

export default defineComponent({
    name: 'ListViewer',
    components: {
        ClientsList,
        Pagination,

    },
    setup() {
        const state = reactive({
            clients: [] as ClientDTO[],
            client: {} as ClientDTO,
            newClient: {
                id: '',
                name: '',
                email: '',
                phone: '',
                creationDate: new Date(),
                isBlocked: false,
                typeClient: TypeClient.Fisica,
                password: '',
                documentName: '',
                documentIdentifier: '',
                inscricaoEstadual: '',
                typeGender: TypeGender.Outro,
                birthDate: new Date()
            } as ClientDTO,
            showEditModal: false,
            showCreateModal: false,
            currentPage: 1,
            itemsPerPage: 20,
        });

        const loadClients = async () => {
            const request = await ClientService.getAll();
            state.clients = request;
        };

        const updateClients = async () => {
            await ClientService.update(state.client.id, state.client);
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
            router.push('/add');
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

<style scoped></style>