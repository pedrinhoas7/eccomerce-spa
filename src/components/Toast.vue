<template>
    <div v-if="visible" class="fixed top-0 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg">
        <p>{{ message }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
    name: 'Toast',
    props: {
        message: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const visible = ref(false);

        watch(() => props.message, (newMessage) => {
            visible.value = newMessage !== '';
        });

        return {
            visible
        };
    }
});
</script>

<style scoped></style>