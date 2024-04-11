<template>
  <div>
    <div class="progress-bar">
      <div class="progress-bar-fill" :style="`width: ${progress}% `"></div>
    </div>
    <div>
      <div class="flex justify-center">
        <button v-if="canGoBack" class="px-4 py-2 mr-2 text-white bg-blue-500 rounded-md" @click="goBack">Back</button>

        <button @click="goNext" class="px-4 py-2 text-white bg-blue-500 rounded-md ">Next</button>
      </div>
      <div class="flex items-center justify-center p-4">
        <div
          class="w-full max-w-md p-5 mx-auto bg-white border rounded-lg shadow-lg sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-4xl 2xl:max-w-6xl dark:bg-gray-800">
          <component :is="currentFormComponent" @update="processStep" />
        </div>
      </div>



    </div>

    <pre><code>{{ formName }}</code></pre>
    <pre><code>{{ form }}</code></pre>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import FormJuDocSubmit from '@/components/FormJuDocSubmit.vue'
import FormJuDocUpload from '@/components/FormJuDocUpload.vue'
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
const stepComponentMap = {
  1: FormJuDocSubmit,
  2: FormNewCasePicker,
  3: FormJuDocUpload,
};

const currentFormComponent = computed(() => {
  return stepComponentMap[currentStepNumber.value] || FormThankYou;
});

const processStep = (stepData) => {
  // Process step data here
  console.log(stepData)
  console.log(stepData)
  console.log(stepData)
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
