<script setup>
const props = defineProps({
    form: Object,
});
const componentName = 'FormConfirmation';

console.log('FormConfirmation', props.form);
</script>

<!-- // hier parent data tonen en laten bevestigen -->
<template>
    <div>
        <p>{{ componentName }}</p>
        <div class="p-4 border border-gray-300 rounded">
            <h2 class="text-xl font-bold">Bevestiging</h2>
            <pre>{{ JSON.stringify(form, null, 2) }}</pre>
            <p>Uw gegevens zijn correct ingevuld. Klik op 'Verzenden' om uw documenten in te dienen.</p>
        </div>
    </div>
</template>