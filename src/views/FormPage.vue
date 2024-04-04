<template>
  <div>
    <div class="progress-bar">
      <div :style="{ width: progress + '%' }"></div>
    </div>

    <!-- Actions -->
    <div class="buttons">
      <button v-if="currentStepNumber > 1" class="btn" @click="goBack">
        Back
      </button>
      <button @click="goNext">
        Next
      </button>
      <FormCaseTypePicker v-if="currentStepNumber === 1" @update="processStep" />
      <FormNewCasePicker v-if="currentStepNumber === 2" @update="processStep" />
      <FormFileUpload v-if="currentStepNumber === 3" @update="processStep" />
      <FormThankYou v-if="currentStepNumber === 4" />
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
const progress = computed(() => {
  return (currentStepNumber.value - 1) * (100 / maxSteps)
})
const processStep = (stepData) => {
  // Process step data here
}
</script>

<style>
.progress-bar {
  width: 100%;
  height: 10px;
  background-color: #f1f1f1;
  margin-bottom: 20px;
}

.progress-bar div {
  height: 100%;
  background-color: #007bff;
  transition: width 0.3s ease;
}
</style>