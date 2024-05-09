<template>
  <div>
    <div class="p-4 border border-gray-300 rounded">
      <select v-model="selectedJuDoc" class="w-full p-2 border border-gray-300 rounded">
        <option disabled>Specifieer het stuk van rechtspleging dat u neerlegt</option>
        <option v-for="juDoc in juDocs" :key="juDoc.name" :value="juDoc">{{ `${juDoc.name} ${juDoc.description}` }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue';
const emit = defineEmits(['update']);
const props = defineProps({
  name: String,
  form: Object,
});

const juDocs = ref([
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
]);
const selectedJuDoc = ref(null);
watch(selectedJuDoc, (newValue) => {
  // example: emit('update', { caseType, currentFormIsValid: isValid, valid: { ...props.form.valid, [props.name]: isValid } });
  emit('update', { docType: newValue, currentFormIsValid: isValid });
});
// check if form is valid
const isValid = computed(() => selectedJuDoc.value !== null);
onMounted(() => {
  emit('update', { currentFormIsValid: isValid });
  if (props.form.docType) {
    selectedJuDoc.value = props.form.docType;
  }
});
</script>