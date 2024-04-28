<script setup>
import { ref, watch, watchEffect } from 'vue';
const props = defineProps({
    form: Object,
});
const emit = defineEmits(['update']);
const confirmationEmail = ref(props.form.email || '');
const receiveConfirmation = ref(false);
const componentName = 'FormConfirmation';

watch(confirmationEmail, (newVal) => {
    emit('update', { confirmationEmail: newVal });
});
watch(confirmationEmail, (newVal) => {
    emit('update', { fromWatch: newVal });
});
watchEffect(() => {
    emit('update', { fromWatchEffect: confirmationEmail.value });
})
// watch waits dom updates so using watchEffect instead would not be better because it would not wait for dom updates and would not be reactive
// resulting in the input field not being updated with the new value from the parent component when the parent component updates the value

</script>

<!-- // hier parent data tonen en laten bevestigen -->
<template>
    <div>
        <p>{{ componentName }}</p>
        <div class="p-4 border border-gray-300 rounded">
            <h2 class="text-xl font-bold">Bevestiging</h2>
            <pre>{{ JSON.stringify(props.form, null, 2) }}</pre>
            <p>Zijn uw gegevens correct ingevuld? Klik op 'Verzenden' om uw documenten in te dienen.</p>
            <label>Klik hier als u een bevestiging van de indiening wilt ontvangen:
                <input type="checkbox" v-model="receiveConfirmation"
                    class="w-4 h-4 text-blue-600 bg-transparent border-gray-300" />
                <!-- here we use a local variable with v-model -->
                <div v-if="receiveConfirmation">
                    <input type="text" placeholder="Vul hier uw e-mailadres in" v-model="confirmationEmail"
                        class="w-full px-2 py-1 mt-2 border border-gray-300 rounded" />
                </div>
            </label>
        </div>
    </div>
</template>