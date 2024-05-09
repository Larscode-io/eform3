<template>
  <div class="p-4 bg-white rounded-lg shadow-md">
    <h2 class="mb-4 text-xl font-bold">
      Selecteer het type zaak: Nieuwe zaak (N) of Bestaande zaak (B).
    </h2>
    <div>
      <div v-for="caseType in caseTypes" :key="caseType.name" :class="['flex items-center ps-4 border rounded mb-2 cursor-pointer',
        selectedCaseType === caseType ? 'border-blue-600 bg-blue-100' : 'border-gray-200']"
        @click="pickCaseType(caseType)">
        <input type="radio" :id="'radio-' + caseType.code" :value="caseType" v-model="selectedCaseType"
          class="w-4 h-4 text-blue-600 bg-transparent border-gray-300" @click.stop>
        <label :for="'radio-' + caseType.code" class="w-full py-2 ml-2 text-sm font-medium text-gray-900">
          {{ `${caseType.code}: ${caseType.description}` }}
        </label>
      </div>
    </div>
    <div v-if="selectedCaseType" class="mt-4">
      <h2 class="text-xl font-bold">Uw keuze</h2>
      <p>{{ selectedCaseType.name }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
const emit = defineEmits(['update']);
const props = defineProps({
  name: String,
  form: Object,
});

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
const isValid = computed(() => selectedCaseType.value !== null);
function pickCaseType(caseType) {
  selectedCaseType.value = caseType;
  emit('update', { caseType, currentFormIsValid: isValid, valid: { ...props.form.valid, [props.name]: isValid } });
}
onMounted(() => {
  // if we went back and forth, we have to get the input fields from the form
  if (props.form.caseType) {
    selectedCaseType.value = props.form.caseType;
  }
});
</script>
