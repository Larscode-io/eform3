<template>
  <div>
    <h1>Elektronisch platform</h1>
    <p>{{ componentName }}</p>
    <div class="card elevation-12">
      <div class="toolbar primary">
        <h2>
          U legt documenten neer in [keuze] (A) een nieuwe zaak (B) een
          bestaande zaak.
        </h2>
      </div>
      <div class="plans">
        <div v-for="plan in plans" :key="plan.name" :class="{ yellow: selectedPlan === plan }" @click="pickPlan(plan)">
          <div class="description">
            <span class="title">{{ plan.name }}</span>
            <span>{{ plan.description }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="selectedPlan" class="card">
      <!-- Placeholder for potential error or additional messages -->
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Component's name can be accessed via `import.meta.env` for build-specific details or omitted
const componentName = 'FormCaseTypePicker';

const plans = ref([
  {
    name: 'Nieuwe zaak',
    description: 'U legt documenten neer in een nieuwe zaak',
  },
  {
    name: 'Bestaande zaak',
    description: 'U legt documenten neer in een bestaande zaak',
  },
]);
const selectedPlan = ref(null);

function pickPlan(plan) {
  selectedPlan.value = plan;
  // Replace this.$emit with context.emit if using Vue 3's Composition API in options API style
  // This example does not directly show the emit function due to script setup's encapsulation
  // context.emit('update', { plan: selectedPlan.value });
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

/* Additional styles as needed */
</style>
