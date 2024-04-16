<script setup>
import { ref, onMounted } from 'vue';
const receiveConfirmation = ref(false);
const props = defineProps({
    form: Object,
});
const confirmationEmail = ref('');
const componentName = 'FormConfirmation';
onMounted(() => {
    confirmationEmail.value = props.form.email;

});
</script>

<!-- // hier parent data tonen en laten bevestigen -->
<template>
    <div>
        <p>{{ componentName }}</p>
        <div class="p-4 border border-gray-300 rounded">
            <h2 class="text-xl font-bold">Bevestiging</h2>
            <pre>{{ JSON.stringify(form, null, 2) }}</pre>
            <p>Zijn uw gegevens correct ingevuld? Klik op 'Verzenden' om uw documenten in te dienen.</p>
            <label>Klik hier als u een bevestiging van de indiening wilt ontvangen:
                <input type="checkbox" v-model="receiveConfirmation"
                    class="w-4 h-4 text-blue-600 bg-transparent border-gray-300" />
                <div v-if="receiveConfirmation">
                    <input type="email" placeholder="Vul hier uw e-mailadres in" :value="props.form.email"
                        @input="$emit('update', { email: $event.target.value })"
                        class="w-full px-2 py-1 mt-2 border border-gray-300 rounded" />
                </div>
            </label>
        </div>
    </div>
</template>
