<template>
    <div class="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
        <h3 class="text-2xl font-semibold mb-6 text-center">Editar Cliente</h3>
        <div v-if="loading" class="text-center">Carregando...</div>
        <div v-else>
            <ClientsForm :client="client" @action="update" @close="$router.replace('/')" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ClientDTO, { TypeClient, TypeGender } from '../../DTO/ClientDTO';
import ClientService from '@/services/ClientService';
import ClientsForm from '@/components/client/Form.vue';

export default defineComponent({
    name: 'EditViewer',
    emits: ['update', 'close'],
    components: {
        ClientsForm
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const client = ref<ClientDTO>({
            id: undefined,
            name: '',
            email: '',
            phone: '',
            creationDate: new Date(),
            isBlocked: false,            
            typeClient: TypeClient.Fisica,
            password: null,
            documentName: 'CPF ou CNPJ',
            documentIdentifier: '',
            inscricaoEstadual: '',
            typeGender: TypeGender.Outro,
            birthDate: new Date()
        });
        const confirmPassword = ref<string>('');
        const loading = ref(true);
        const inscriptionStateEnabled = ref(false);

        const loadClientData = async () => {
            try {
                const id = route.params.id as string;
                const fetchedClient = await ClientService.getById(id);
                client.value = fetchedClient;
                console.log(client.value);
                client.value.birthDate = new Date(client.value.birthDate);
                inscriptionStateEnabled.value = client.value.typeClient === TypeClient.Juridica;
            } catch (error) {
                console.error(error);
            } finally {
                loading.value = false;
            }
        };

        onMounted(loadClientData);

        const update = async (updateClient: ClientDTO) => {
            try {

                await ClientService.update(updateClient.id, updateClient);
                router.push('/');
            } catch (error) {
                console.error(error);
            }
        };

        return {
            client,
            confirmPassword,
            loading,
            inscriptionStateEnabled,
            update,
            TypeClient,
            TypeGender
        };
    }
});
</script>

<style scoped>
.bg-magalu {
    background-color: #0047bb;
}
</style>
