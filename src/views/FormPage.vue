<template>
  <div>
    <div class="progress-bar">
      <div class="progress-bar-fill" :style="`width: ${progress}% `"></div>
    </div>
    <div>
      <div class="flex items-center justify-between p-4">
        <button :class="['self-start px-4 py-2 mr-2 text-white  rounded-md', canGoBack ? 'bg-blue-500' : 'bg-gray-300']"
          :disabled="!canGoBack" @click="goBack">Back</button>

        <div>
          <component :is="currentFormComponent" :form @update="processStep" />
        </div>
        <button :class="['self-start px-4 py-2 text-white rounded-md', canGoNext ? 'bg-blue-500' : 'bg-gray-300']"
          :disabled="!canGoNext" @click="goNext">Next</button>
      </div>
    </div>

    <pre><code>{{ formName }}</code></pre>
    <pre><code>{{ form }}</code></pre>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import FormJuDocPicker from '@/components/FormJuDocPicker.vue'
import FormJuDocUpload from '@/components/FormJuDocUpload.vue'
import FormThankYou from '@/components/FormThankYou.vue'
import FormNewCasePicker from "@/components/FormNewCasePicker.vue";
import FormUserDetails from "@/components/FormUserDetails.vue";
import FormConfirmation from "@/components/FormConfirmation.vue";

const currentStepNumber = ref(1)
const formName = ref('')
const form = ref({
  email: null,
  name: null,
  password: null,
  address: null,
  recipient: null,
  phone: false,
  mail: false,
})

const components = [FormNewCasePicker, FormUserDetails, FormJuDocPicker, FormJuDocUpload, FormConfirmation, FormThankYou];
const maxSteps = components.length;

// Navigation stuff
const canGoBack = computed(() => currentStepNumber.value > 1)
const canGoNext = computed(() => currentStepNumber.value < maxSteps)
const goBack = () => { changeStepNumber(-1) }
const goNext = () => { changeStepNumber(1) }
const changeStepNumber = (change) => {
  const newStep = currentStepNumber.value + change;
  if (newStep >= 1 && newStep <= maxSteps) {
    currentStepNumber.value = newStep;
  }
};

// Component stuff here
const createStepComponentMap = (components) => {
  return components.reduce((componentMap, component, index) => {
    componentMap[index + 1] = component;
    return componentMap;
  }, {});
};
const stepComponentMap = createStepComponentMap(components);
const getStepComponentMap = (map, stepNumber) => { return map[stepNumber] || FormThankYou; };
const currentFormComponent = computed(() => getStepComponentMap(stepComponentMap, currentStepNumber.value));

// Progress bar
const progress = computed(() => (currentStepNumber.value) * (100 / maxSteps))

// Here we processess the data from the form components
const processStep = (stepData) => {
  form.value = { ...form.value, ...stepData }
}
</script>

<style>
.progress-bar {
  @apply w-full h-1 bg-gray-300 mb-5;
}

.progress-bar-fill {
  @apply h-full bg-blue-500;
  transition: width 0.3s ease;
}
</style>
