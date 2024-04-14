<template>
  <div>
    <p>{{ componentName }}</p>
    <div class="p-4 bg-white rounded-lg shadow-md">
      <h2 class="mb-4 text-xl font-bold">
        Selecteer het type zaak: Nieuwe zaak (N) of Bestaande zaak (B).
      </h2>
      <div class="space-y-4">
        <label v-for="caseType in caseTypes" :key="caseType.name" class="flex items-center">
          <input type="radio" :value="caseType" v-model="selectedCaseType" @change="pickCaseType(caseType)"
            class="mr-2">
          <span>{{ `${caseType.code}: ${caseType.description}` }}</span>
        </label>
      </div>
    </div>
    <div v-if="selectedCaseType">
      <h2 class="text-xl font-bold">Uw keuze</h2>
      <p>{{ selectedCaseType?.name }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, } from 'vue';

const emit = defineEmits(['update']);
const componentName = 'FormNewCasePicker';

const caseTypes = ref([
  {
    code: 'N',
    name: 'Nieuwe Zaak',
    description: 'Documenten indienen voor nieuwe aanmelding',
  },
  {
    code: 'B',
    name: 'Bestaande Zaak',
    description: 'Documenten toevoegen aan bestaand dossier',
  },
]);
const selectedCaseType = ref(null);
function pickCaseType(caseType) {
  selectedCaseType.value = caseType;
  emit('update', { caseType });
}
</script>
