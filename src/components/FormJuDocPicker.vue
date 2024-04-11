<template>
  <div>
    <p>{{ componentName }}</p>
    <div class="card">
      <select v-model="selectedJuDoc">
        <option disabled>Specifieer het stuk van rechtspleging dat u neerlegt</option>
        <option v-for="juDoc in juDocs" :key="juDoc.name" :value="juDoc">{{ `${juDoc.name} ${juDoc.description}` }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
const emit = defineEmits(['update']);

const componentName = 'FormJuDocPicker';
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
  emit('update', { docType: newValue });
});
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 20px;
  margin-top: 20px;
}

.toolbar {
  background-color: #1976D2;
  color: white;
  padding: 10px;
  border-radius: 4px;
}

.juDocs div {
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.juDocs div:last-child {
  border-bottom: none;
}
</style>
