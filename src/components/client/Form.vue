<template>
    <form @submit.prevent="saveChanges">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <!-- Nome do Cliente/Razão Social -->
            <div>
                <label class="block text-sm font-medium mb-2" for="name">Nome do Cliente/Razão Social:</label>
                <input v-model="client.name" id="name" type="text"
                    class="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxlength="150" />
            </div>
            <!-- Email -->
            <div>
                <label class="block text-sm font-medium mb-2" for="email">Email:</label>
                <input @blur="verifyRegister('email', client.email)" v-model="client.email" id="email" type="email"
                    class="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxlength="150" />
            </div>
            <!-- Telefone -->
            <div>
                <label class="block text-sm font-medium mb-2" for="phone">Telefone:</label>
                <input v-model="client.phone" id="phone" type="text"
                    class="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    v-maska="'(##) # ####-####'" />
            </div>

            <!-- Tipo de Pessoa -->
            <div class="col-span-1 md:col-span-2">
                <label class="block text-sm font-medium mb-2" for="typeClient">Tipo de Pessoa:</label>
                <select v-model="client.typeClient" id="typeClient"
                    class="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option :value="TypeClient.Fisica">Pessoa Física</option>
                    <option :value="TypeClient.Juridica">Pessoa Jurídica</option>
                </select>
            </div>
            <!-- CPF/CNPJ -->
            <div>
                <label class="block text-sm font-medium mb-2" for="documentIdentifier">{{ client.typeClient ===
                    TypeClient.Juridica ? 'CNPJ' : 'CPF' }}</label>
                <input @blur="verifyRegister('documentIdentifier', client.documentIdentifier)"
                    v-model="client.documentIdentifier" id="documentIdentifier" type="text"
                    class="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    v-maska="client.typeClient === TypeClient.Juridica ? '##.###.###/####-##' : '###.###.###-##'" />
            </div>

            <p>CheckInscrição estadual</p>

            <!-- Inscrição Estadual -->
            <div v-if="client.typeClient === TypeClient.Juridica || inscriptionStateEnabled">
                <label class="block text-sm font-medium mb-2" for="inscricaoEstadual">Inscrição Estadual:</label>
                <input @blur="verifyRegister('inscricaoEstadual', client.inscricaoEstadual)"
                    v-model="client.inscricaoEstadual" id="inscricaoEstadual" type="text"
                    class="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    v-maska="'###.###.###-###'" />
            </div>

            <p>CheckIsento</p>

            <!-- Gênero -->
            <div v-if="client.typeClient === TypeClient.Fisica">
                <label class="block text-sm font-medium mb-2" for="typeGender">Gênero:</label>
                <select v-model="client.typeGender" id="typeGender"
                    class="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option :value="TypeGender.Masculino">Masculino</option>
                    <option :value="TypeGender.Feminino">Feminino</option>
                    <option :value="TypeGender.Outro">Outro</option>
                </select>
            </div>
            <!-- Data de Nascimento -->
            <div v-if="client.typeClient === TypeClient.Fisica">
                <label class="block text-sm font-medium mb-2" for="birthDate">Data de Nascimento:</label>
                <input v-model="client.birthDate" id="birthDate" type="date"
                    class="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <!-- Bloqueado -->
            <div class="flex items-center">
                <label class="inline-flex items-center">
                    <input v-model="client.isBlocked" type="checkbox"
                        class="form-checkbox h-5 w-5 text-blue-600 rounded" />
                    <span class="ml-2 text-sm font-medium">Bloqueado</span>
                </label>
            </div>




            <!-- Senha -->
            <div>
                <label class="block text-sm font-medium mb-2" for="password">Senha:</label>
                <input v-model="client.password" id="password" type="password"
                    class="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    minlength="8" maxlength="15" />
            </div>
            <!-- Confirmação de Senha -->
            <div>
                <label class="block text-sm font-medium mb-2" for="confirmPassword">Confirmação de Senha:</label>
                <input v-model="confirmPassword" id="confirmPassword" type="password"
                    class="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    minlength="8" maxlength="15" />
            </div>
            <p class="text-red-600" v-if="error != ''">{{ error }}</p>
        </div>
        <!-- Botões -->
        <div class="flex justify-end space-x-4">
            <button type="button"
                class="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                @click="$emit('close')">Cancelar</button>
            <button type="submit"
                class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">Salvar</button>
        </div>
    </form>

    <!-- Toast Component -->
    <Toast :message="toastMessage" />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive, watch } from 'vue';
import ClientDTO from '@/DTO/ClientDTO';
import { TypeClient, TypeGender } from '@/DTO/ClientDTO';
import ClientService from '@/services/ClientService';
import Toast from '@/components/Toast.vue';

export default defineComponent({
    name: 'EditClientForm',
    emits: ['action', 'close'],
    components: {
        Toast
    },
    props: {
        client: {
            type: Object as () => ClientDTO,
            required: true
        }
    },
    setup(props, context) {

        console.log("cliente", props.client);
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
            typeGender: TypeGender.Masculino,
            birthDate: new Date()
        });
        const confirmPassword = ref(null);
        const inscriptionStateEnabled = ref(false);
        const inscricaoStateIsExempt = ref(false);
        const error = ref('');
        const toastMessage = ref('');

        const loadClientData = async () => {
            try {
                client.value = props.client;
                inscriptionStateEnabled.value = client.value.typeClient === TypeClient.Juridica;
            } catch (error) {
                console.error('Failed to load client data:', error);
            }
        };

        onMounted(loadClientData);

        const saveChanges = async () => {

            try {
                validateForm();
                context.emit('action', client.value);
            }
            catch (error) {
                console.error('Failed to update client data:', error);
            }
        };

        const validateForm = () => {
            error.value = ''; 

            const requiredFields: { [key: string]: string } = {
                name: 'Nome do Cliente/Razão Social',
                email: 'Email',
                phone: 'Telefone',
                documentIdentifier: client.value.typeClient === TypeClient.Juridica ? 'CNPJ' : 'CPF',
                password: 'Senha',
                confirmPassword: 'Confirmação de Senha',
            };

            for (const [key, fieldName] of Object.entries(requiredFields)) {
                const value = client.value[key as keyof ClientDTO] || '';

                if (value === '' && key !== 'confirmPassword' && key !== 'inscricaoEstadual') {
                    error.value = `O campo ${fieldName} é obrigatório`;
                    throw new Error(error.value);
                }
            }

            if (client.value.typeClient === TypeClient.Juridica && client.value.inscricaoEstadual === '') {
                error.value = 'O campo Inscrição Estadual é obrigatório.';
                throw new Error(error.value);
            }
        };



        watch(() => client.value.password, (newValue) => {
            if (newValue != confirmPassword.value) {
                error.value = "As senhas não conferem";
            } else {
                error.value = '';
            }

        })

        watch(() => confirmPassword.value, (newValue) => {
            if (newValue != client.value.password) {
                error.value = "As senhas não conferem";
            } else {
                error.value = '';
            }

        })
        let interval: any;
        const verifyRegister = async (field: string, value: string) => {
            //Limpa o timeout
            clearTimeout(interval);

            //Remove mascara
            if (field == 'documentIdentifier')
                value = value.replace(/[^\d]+/g, '');

            const request = await ClientService.VerifyRegister({ field: field, value: value })
            if (request) {
                //Alterar para o nome do campo
                if (field == 'documentIdentifier')
                    field = 'CPF/CNPJ';

                //Aciona Toast
                toastMessage.value = `O ${field} já está vinculado a outro Comprador`;
                interval = setTimeout(() => {
                    toastMessage.value = '';
                }, 6000);
            }
        }


        return {
            client,
            confirmPassword,
            inscriptionStateEnabled,
            inscricaoStateIsExempt,
            saveChanges,
            TypeGender,
            TypeClient,
            error,
            toastMessage,
            verifyRegister
        };
    }
});
</script>

<style scoped>
.bg-magalu {
    background-color: #0047bb;
}
</style>
