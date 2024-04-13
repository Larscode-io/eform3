<script setup>
import { ref } from 'vue';
const emit = defineEmits(['update']);
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const continueForm = () => {
    console.log('Continue');
    emit('update', { firstName: firstName.value, lastName: lastName.value, email: email.value });
};
</script>

<template>
    <div class="flex flex-col items-center">
        <h1 class="mb-4 text-2xl font-bold">Details van Indiener</h1>
        <form class="w-96">
            <div class="mb-4">
                <label for="firstName" class="block mb-2">Voornaam</label>
                <input type="text" id="firstName" v-model="firstName" @input="continueForm"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div class="mb-4">
                <label for="lastName" class="block mb-2">Familienaam</label>
                <input type="text" id="lastName" v-model="lastName" @input="continueForm"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div class="mb-4">
                <label for="email" class="block mb-2">Email</label>
                <input type="email" id="email" v-model="email" @input="continueForm"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <button @click.prevent="continueForm"
                class="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">Continue</button>
        </form>
    </div>
</template>