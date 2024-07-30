<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-4 rounded-md w-1/2">
      <h3 class="text-lg font-semibold mb-4">Adicionar Cliente</h3>
      <div class="mb-4">
        <label class="block mb-2">Nome:</label>
        <input v-model="newClient.name" type="text" class="border border-gray-300 rounded p-2 w-full" />
      </div>
      <div class="mb-4">
        <label class="block mb-2">Email:</label>
        <input v-model="newClient.email" type="email" class="border border-gray-300 rounded p-2 w-full" />
      </div>
      <div class="mb-4">
        <label class="block mb-2">Telefone:</label>
        <input v-model="newClient.phone" type="text" class="border border-gray-300 rounded p-2 w-full" />
      </div>
      <div class="mb-4">
        <label class="block mb-2">Bloqueado:</label>
        <input v-model="newClient.isBlocked" type="checkbox" class="border border-gray-300 rounded" />
      </div>
      <div class="flex justify-end">
        <button class="bg-gray-500 text-white py-2 px-4 rounded-md mr-2" @click="closeModal">Cancelar</button>
        <button class="bg-magalu text-white py-2 px-4 rounded-md" @click="createClient">Salvar</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import ClientDTO from '../DTO/ClientDTO';

export default defineComponent({
  name: 'CreateClientModal',
  props: {
    newClient: {
      type: Object as PropType<ClientDTO>,
      required: true
    }
  },
  emits: ['create', 'close'],
  setup(props, { emit }) {
    const closeModal = () => {
      emit('close');
    };

    const createClient = () => {
      emit('create');
    };

    return {
      closeModal,
      createClient
    };
  }
});
</script>

<style scoped>

</style>
