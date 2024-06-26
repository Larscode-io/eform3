<script setup>
import { ref, computed, onMounted, reactive, watch } from 'vue';
const props = defineProps({
    name: String,
    form: Object,
});
const emit = defineEmits(['update']);

const state = reactive({
    firstName: '',
    lastName: '',
    email: '',
});
const stateDirty = reactive({
    firstName: false,
    lastName: false,
    email: false,
});
// const makeAllDirty = () => {
//     stateDirty.firstName = true;
//     stateDirty.lastName = true;
//     stateDirty.email = true;
// };
const isMailValid = computed(() => {
    const basicEmailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return state.email.length > 0 && basicEmailRegex.test(state.email);
});
const isLastNameValid = computed(() => {
    return state.lastName.length > 0;
});
const isFirstNameValid = computed(() => {
    return state.firstName.length > 0;
});
// const showError = computed(() => {
//     return {
//         email: !isMailValid.value && stateDirty.email,
//         firstName: !isFirstNameValid.value && stateDirty.firstName,
//         lastName: !isLastNameValid.value && stateDirty.lastName,
//     }
// });
const isValid = computed(() =>
    isMailValid.value && isLastNameValid.value && isFirstNameValid.value
);
watch(isValid, (newValue) => {
    emit('update', { currentFormIsValid: newValue });
    submitData();
});
const submitIsDone = ref(false);

onMounted(() => {
    emit('update', { currentFormIsValid: isValid.value });
    if (props.form.firstName) {
        state.firstName = props.form.firstName;
    }
    if (props.form.lastName) {
        state.lastName = props.form.lastName;
    }
    if (props.form.email) {
        state.email = props.form.email;
    }
});
const submitData = () => {
    if (!isValid.value) {
        return;
    }
    const updatedValidStatus = { ...props.form.valid, [props.name]: isValid.value }
    emit('update', {
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        currentFormIsValid: isValid.value,
        valid: updatedValidStatus
    });
    submitIsDone.value = true;
};
</script>

<template>
    <div class="flex flex-col items-center">
        <h1 class="mb-4 text-2xl font-bold">Details van Indiener</h1>
        <form class="w-96" @submit.prevent="submitData">
            <div class="mb-4">
                <label for="firstName" class="block mb-2">Voornaam</label>
                <input type="text" id="firstName" v-model="state.firstName"
                    @blur="$event => stateDirty.firstName = true" @input="$event => isValid ? submitData() : null"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    :class="{
                        'border-red-500': stateDirty.firstName && !isFirstNameValid,
                        'focus:ring-red-500': stateDirty.firstName && !isFirstNameValid,
                        'focus:ring-blue-500': stateDirty.firstName && !isFirstNameValid,
                    }" />
            </div>
            <div class="mb-4">
                <label for="lastName" class="block mb-2">Familienaam</label>
                <input type="text" id="lastName" v-model="state.lastName" @blur="$event => stateDirty.lastName = true"
                    @input="$event => isValid ? submitData() : null"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    :class="{
                        'border-red-500': stateDirty.lastName && !isLastNameValid,
                        'focus:ring-red-500': stateDirty.lastName && !isLastNameValid,
                        'focus:ring-blue-500': stateDirty.lastName && !isLastNameValid,
                    }" />
            </div>
            <div class="mb-4">
                <label for="email" class="block mb-2">Email</label>
                <input type="email" id="email" v-model="state.email" @blur="$event => stateDirty.email = true"
                    @input="$event => isValid ? submitData() : null"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    :class="{
                        'border-red-500': stateDirty.email && !isMailValid,
                        'focus:ring-red-500': stateDirty.email && !isMailValid,
                        'focus:ring-blue-500': !stateDirty.email || isMailValid
                    }" />
            </div>
        </form>
    </div>
</template>