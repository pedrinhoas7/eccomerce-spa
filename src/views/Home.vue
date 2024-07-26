<template>
    <CustomerManagement />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CustomerManagement from '../components/CustomerManagement.vue';

export default defineComponent({
    name: 'Home',
    components: { CustomerManagement },
    setup() {

    }
})
</script>

<style scoped></style>