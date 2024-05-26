<template>
    <div>
        <div class="p-4 border border-gray-300 rounded">
            <select v-model="selectedJuDoc" class="w-full p-2 border border-gray-300 rounded">
                <option disabled>Specifieer het stuk van rechtspleging dat u neerlegt</option>
                <option v-for="juDoc in juDocs" :key="juDoc.name" :value="juDoc">
                    <slot name="option" :juDoc>
                        {{ `${juDoc.name} ${juDoc.description}` }}
                    </slot>
                </option>
            </select>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
const emit = defineEmits(['update']);
const props = defineProps({
    name: String,
    docType: Object,
    juDocs: {
        type: Array,
        default: () => [
            { name: 'MEM', description: 'Memorie' },
            { name: 'MVA', description: 'Memorie van antwoord' },
            { name: 'MVW', description: 'Memorie van wederantwoord' },
            { name: 'MTT', description: 'Memorie tot tussenkomst' },
            { name: 'AAM', description: 'Aanvullende memorie' },
            { name: 'LME', description: 'Laatste memorie' },
            { name: 'AVS', description: 'Akte houdende een vordering tot schorsing' },
            { name: 'SOV', description: 'Schriftelijke opmerkingen (vordering tot schorsing)' },
            { name: 'VWG', description: 'Verzoek om te worden gehoord' },
            { name: 'AND', description: 'Andere' },
        ],
    },
});

const selectedJuDoc = ref(null);

watch(selectedJuDoc, (newValue) => {
    emit('update', { selected: newValue });
});

onMounted(() => {
    if (props.docType) {
        selectedJuDoc.value = props.docType;
    }
});
</script>
