<template>
  <div class="overflow-x-auto">
    <table class="w-full bg-white border">
      <thead>
        <tr>
          <th class="py-2 px-4 border-b">#</th>
          <th class="py-2 px-4 border-b">Nome/Razão Social</th>
          <th class="py-2 px-4 border-b">Email</th>
          <th class="py-2 px-4 border-b">Telefone</th>
          <th class="py-2 px-4 border-b">Data de cadastro</th>
          <th class="py-2 px-4 border-b">Bloqueado</th>
          <th class="py-2 px-4 border-b">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(client, index) in clients" :key="client.id" class="hover:bg-gray-100">
          <td class="py-2 px-4 border-b"><input type="checkbox" :value="client.id" /></td>
          <td class="py-2 px-4 border-b">{{ client.name }}</td>
          <td class="py-2 px-4 border-b">{{ client.email }}</td>
          <td class="py-2 px-4 border-b">{{ client.phone }}</td>
          <td class="py-2 px-4 border-b">{{ dateFormatter(client.creationDate) }}</td>
          <td class="py-2 px-4 border-b text-center">
            <input type="checkbox" :checked="client.isBlocked" />
          </td>
          <td class="py-2 px-4 border-b text-center">
            <button class="text-blue-500 hover:underline" @click="openEditModal(client.id!)">Editar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import ClientDTO from '@/DTO/ClientDTO';
import { useRouter } from 'vue-router';


export default defineComponent({
  name: 'ClientsList',
  props: {
    clients: {
      type: Array as PropType<ClientDTO[]>,
      required: true
    }
  },
  emits: ['edit'],
  setup() {
    const router = useRouter();
    const openEditModal = (id: string) => {
      console.log(id);
      router.push(`/edit/${id}`);
    };

    const dateFormatter = (date: Date) => {
      return new Date(date).toLocaleDateString();
    };

    return {
      openEditModal,
      dateFormatter
    };
  }
});
</script>
