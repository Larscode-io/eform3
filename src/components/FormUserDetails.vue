<script setup>
import { ref } from 'vue';
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const continueForm = () => {
    console.log('Continue');
};
</script>

<template>
    <div>
        <h1>User Details</h1>
        <form>
            <div class="form-group">
                <label for="firstName">First Name</label>
                <input type="text" id="firstName" v-model="firstName" />
            </div>
            <div class="form-group">
                <label for="lastName">Last Name</label>
                <input type="text" id="lastName" v-model="lastName" />
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="email" />
            </div>
            <button @click="continueForm">Continue</button>
        </form>
    </div>
</template>