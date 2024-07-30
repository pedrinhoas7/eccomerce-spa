<template>
    <div class="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
        <h3 class="text-2xl font-semibold mb-6 text-center">Adicionar Cliente</h3>
        <div v-if="loading" class="text-center">Carregando...</div>
        <div v-else>
            <ClientsForm :client="client" @action="createClient" @close="$router.replace('/')" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ClientDTO, { TypeClient, TypeGender } from '@/DTO/ClientDTO';
import ClientService from '@/services/ClientService';
import { useRouter } from 'vue-router';
import ClientsForm from '@/components/client/Form.vue';

export default defineComponent({
    name: 'CreateViewer',
    emits: ['create', 'close'],
    components: {
        ClientsForm
    },
    setup() {

        const router = useRouter();
        const client = ref<ClientDTO>({
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
        });
        const loading = ref(false);

        const createClient = async (newClient: ClientDTO) => {
            loading.value = true;
            try {
                await ClientService.create(newClient);
                router.replace('/');
            } catch (error) {
                console.error('Erro ao criar cliente:', error);
                alert('Erro ao criar cliente. Tente novamente.');
            } finally {
                loading.value = false;
            }
        };

        return {
            loading,
            client,
            createClient,
            TypeClient,
            TypeGender
        };
    }
});
</script>

<style scoped></style>
