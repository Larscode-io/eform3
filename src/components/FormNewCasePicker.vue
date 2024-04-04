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
          :class="{ 'selected': selectedPlan === plan }">
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

const componentName = 'FormNewCasePicker';
const plans = ref([
  { name: 'mem', description: 'memorie' },
  { name: 'mva', description: 'memorie van antwoord,' },
  { name: 'mvw', description: 'memorie van wederantwoord,' },
  { name: 'mtt', description: 'memorie tot tussenkomst' },
  { name: 'aam', description: 'aanvullende memorie' },
  { name: 'lme', description: 'laatste memorie' },
  { name: 'avs', description: 'akte houdende een vordering tot schorsing' },
  { name: 'sov', description: 'schriftelijke opmerkingen (vordering tot schorsing)' },
  { name: 'vwg', description: 'verzoek om te worden gehoord' },
  { name: 'and', description: 'andere' },
]);
const selectedPlan = ref(null);

function pickPlan(plan) {
  selectedPlan.value = plan;
  // Here you would emit events as needed
}
</script>

<style>
/* Basic styling to replicate Vuetify's look somewhat */
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

.selected {
  background-color: #ff0;
}

/* Add more styling as needed */
</style>
