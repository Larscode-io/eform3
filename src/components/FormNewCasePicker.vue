<template>
  <div>
    <h1>Elektronisch platform</h1>
    <p>{{ componentName }}</p>

    <div class="card">
      <div class="toolbar">
        <h2>
          [Indien A - nieuwe zaak] Specifieer het stuk van rechtspleging dat u neerlegt
        </h2>
      </div>
      <div class="plans">
        <div v-for="plan in plans" :key="plan.name" @click="pickPlan(plan)"
          :class="{ 'bg-yellow-300': selectedPlan === plan }">
          <div>
            <h3>{{ plan.name }}</h3>
            <p>{{ plan.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const emit = defineEmits(['update']);

const componentName = 'FormNewCasePicker';
const plans = ref([
  { name: 'MEM', description: 'Memorie' },
  { name: 'MVA', description: 'Memorie van antwoord,' },
  { name: 'MVW', description: 'Memorie van wederantwoord,' },
  { name: 'MTT', description: 'Memorie tot tussenkomst' },
  { name: 'AAM', description: 'Aanvullende memorie' },
  { name: 'LME', description: 'Laatste memorie' },
  { name: 'AVS', description: 'Akte houdende een vordering tot schorsing' },
  { name: 'SOV', description: 'Schriftelijke opmerkingen (vordering tot schorsing)' },
  { name: 'VWG', description: 'Verzoek om te worden gehoord' },
  { name: 'AND', description: 'Andere' },
]);
const selectedPlan = ref(null);

function pickPlan(plan) {
  selectedPlan.value = plan;
  emit('update', { plan });
}
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

.plans div {
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.plans div:last-child {
  border-bottom: none;
}
</style>
