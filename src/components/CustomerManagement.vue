<template>
  <div class="flex flex-nowrap w-full mt-5">
    <!--   left -->
    <div class="flex flex-col">
      <div class="flex flex-nowrap">
        <h2>Consulte os seus Clientes cadastrados na sua Loja ou realize o cadastro de novos Cliente</h2>
        <button class="bg-magalu rounded-md">Adicionar Cliente</button>
      </div>
      <div class="flex">
        <input type="text" placeholder="Pesquisar compradores" />
        <button>Filtrar</button>
      </div>
      <div class="flex">
        <table>
          <tr>
            <thead>
              <th>*</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Bloqueado</th>
              <th>Ações</th>
            </thead>
          </tr>
          <tbody>
            <tr v-for="client in clients">
              <td><input type="checkbox" value="a" /></td>
              <td>{{ client.name }}</td>
              <td>{{ client.email }}</td>
              <td>{{ client.phone }}</td>
              <td><input type="checkbox" :value="client.isBlocked" /></td>
              <td><button @click="$router.replace('/client/' + client.id)">Editar</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!--   right -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ClientDTO from '../DTO/ClientDTO.ts';


export default defineComponent({
  name: 'CustomerManagement',
  setup() {

    const clients = ref<ClientDTO[]>([
      { id: "1", name: "Pedro", email: "ep", isBlocked: false, date: "", phone: "83998461353" },
      { id: "2", name: "Pedro", email: "ep", isBlocked: false, date: "", phone: "83998461353" }
    ]);

    return {
      clients
    }
  }
})
</script>

<style scoped></style>
