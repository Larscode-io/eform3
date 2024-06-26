<template>
  <div class="p-4 bg-white rounded-lg shadow-md">
    <h2 class="mb-4 text-xl font-bold">
      Selecteer het type zaak: Nieuwe zaak (N) of Bestaande zaak (B).
    </h2>
    <div>
      <div v-for="caseType in caseTypes" :key="caseType.code" :class="[
        'flex items-center ps-4 border rounded mb-2 cursor-pointer',
        selectedCaseCode === caseType.code ? 'border-blue-600 bg-blue-100' : 'border-gray-200'
      ]" @click="pickCaseType(caseType)">
        <input type="radio" :id="'radio-' + caseType.code" :value="caseType.code" v-model="selectedCaseCode"
          class="w-4 h-4 text-blue-600 bg-transparent border-gray-300" @click.stop />
        <label :for="'radio-' + caseType.code" class="w-full py-2 ml-2 text-sm font-medium text-gray-900">
          {{ `${caseType.code}: ${caseType.description}` }}
        </label>
      </div>
    </div>
    <div v-if="selectedCaseCode" class="mt-4">
      <h2 class="text-xl font-bold">Uw keuze</h2>
      <p>{{ selectedCaseCode }}</p>
    </div>
    <SubscribeMailings />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import SubscribeMailings from '@/components/SubscribeMailings.vue'
const emit = defineEmits(['update'])
const props = defineProps({
  name: String,
  form: Object
})

const caseTypes = ref([
  {
    code: 'N',
    name: 'Nieuwe Zaak',
    description: 'Documenten indienen voor nieuwe aanmelding'
  },
  {
    code: 'B',
    name: 'Bestaande Zaak',
    description: 'Documenten toevoegen aan bestaand dossier'
  }
])
const selectedCaseCode = ref(null)
const isValid = computed(() => selectedCaseCode.value !== null)
function pickCaseType(caseType) {
  selectedCaseCode.value = caseType
  const updatedValidStatus = { ...props.form.valid, [props.name]: isValid.value }
  emit('update', {
    casetype: caseType,
    currentFormIsValid: isValid.value,
    valid: updatedValidStatus
  })
}
onMounted(() => {
  // if we went back and forth, we have to get the input fields from the form
  emit('update', { currentFormIsValid: isValid.value })
  if (props.form.casetype) {
    selectedCaseCode.value = props.form.casetype.code
  }
})
watch(isValid, (newValue) => {
  emit('update', { currentFormIsValid: newValue })
})
</script>
