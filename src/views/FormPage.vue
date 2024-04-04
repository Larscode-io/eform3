<template>
  <div>
    <div class="progress-bar">
      <div :class="['progress-bar-fill']" :style="progressBarStyle"></div>
    </div>

    <div class="buttons">
      <button v-if="canGoBack" class="btn" @click="goBack">Back</button>
      <button @click="goNext">Next</button>

      <component :is="currentFormComponent" @update="processStep" />
    </div>

    <pre><code>{{ formName }}</code></pre>
    <pre><code>{{ form }}</code></pre>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import FormCaseTypePicker from '@/components/FormCaseTypePicker.vue'
import FormFileUpload from '@/components/FormFileUpload.vue'
import FormThankYou from '@/components/FormThankYou.vue'
import FormNewCasePicker from "@/components/FormNewCasePicker.vue";

const maxSteps = 4
const currentStepNumber = ref(1)
const formName = ref('')
const form = ref({
  plan: null,
  email: null,
  name: null,
  password: null,
  address: null,
  recipient: null,
  phone: false,
  mail: false,
})

const goBack = () => {
  if (currentStepNumber.value > 1) currentStepNumber.value--
}

const goNext = () => {
  if (currentStepNumber.value < maxSteps) currentStepNumber.value++
}

const canGoBack = computed(() => currentStepNumber.value > 1)
const progress = computed(() => (currentStepNumber.value) * (100 / maxSteps))
const progressBarStyle = computed(() => ({
  width: progress.value + '%',
}));

const currentFormComponent = computed(() => {
  switch (currentStepNumber.value) {
    case 1:
      return FormCaseTypePicker
    case 2:
      return FormNewCasePicker
    case 3:
      return FormFileUpload
    default:
      return FormThankYou
  }
})

const processStep = (stepData) => {
  // Process step data here
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
