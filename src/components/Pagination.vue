<template>
    <div class="flex justify-center items-center mt-4">
        <button @click="prevPage" :disabled="currentPage === 1"
            class="bg-gray-300 text-gray-700 px-3 py-1 rounded-l-md">
            Anterior
        </button>
        <span class="mx-2">Página {{ currentPage }} de {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages"
            class="bg-gray-300 text-gray-700 px-3 py-1 rounded-r-md">
            Próxima
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    name: 'Pagination',
    props: {
        currentPage: {
            type: Number,
            required: true
        },
        totalPages: {
            type: Number,
            required: true
        }
    },
    emits: ['prevPage', 'nextPage'],
    setup(props, { emit }) {
        const prevPage = () => {
            emit('prevPage');
        };

        const nextPage = () => {
            emit('nextPage');
        };

        return {
            prevPage,
            nextPage
        };
    }
});
</script>