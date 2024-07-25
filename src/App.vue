<template>
  <RouterView v-slot="{ Component }">
    <transition>
      <component :is="Component" />
    </transition>
  </RouterView>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const App = defineComponent({

});

export default App;
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
}
</style>
