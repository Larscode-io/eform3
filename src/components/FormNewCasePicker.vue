<template>
  <div>
    <p>{{ componentName }}</p>
    <div class="card elevation-12">
      <div class="toolbar primary">
        <h2>
          Documenten Indienen: Nieuwe Zaak (N) of Bestaande Zaak (B).
        </h2>
      </div>
      <div class="card">
        <div v-for="caseType in caseTypes" :key="caseType.name"
          :class="{ 'bg-yellow-300': selectedCaseType === caseType }" @click="pickCaseType(caseType)">
          <div>
            <span>{{ `${caseType.name}: ${caseType.description}` }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="selectedCaseType">
      <h2>Uw keuze</h2>
      <p>{{ selectedCaseType?.name }}</p>


    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['update']);
const componentName = 'FormNewCasePicker';

const caseTypes = ref([
  {
    code: 'N',
    name: 'Nieuwe Zaak',
    description: 'Documenten Indienen voor Nieuwe Aanmelding',
  },
  {
    code: 'B',
    name: 'Bestaande Zaak',
    description: 'Documenten Toevoegen aan Bestaand Dossier',
  },
]);
const selectedCaseType = ref(null);

function pickCaseType(caseType) {
  selectedCaseType.value = caseType;
  emit('update', { caseType });
}
</script>

<style scoped>
.card {
  /* Basic card styling */
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.toolbar.primary {
  /* Toolbar styling, assuming 'primary' is a color theme */
  background-color: #1976D2;
  color: white;
}

.plans .yellow {
  /* Highlighting for selected plans */
  background-color: yellow;
}

.card {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 20px;
  margin-top: 20px;
}

/* Additional styles as needed */
</style>
