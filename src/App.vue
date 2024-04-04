<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const isForm = computed(() => route.name === 'form')
const isParent = computed(() => route.name === 'parent')

const mainClass = computed(() => ({
  'text-center': true,
  'flex flex-col items-center': isForm.value,
  'p-5': isParent.value,
}))
</script>

<template>
  <div :class="mainClass">
    <header>
      <h1 class=" text-2xl font-bold">Website Title</h1>
      <button class="tbtn">X</button>
      <nav>
        <router-link to="/" class="tbtn">Home</router-link>
        <router-link to="/form" class="tbtn">Go to
          Form</router-link>
        <router-link to="/parent" class="tbtn">Go to
          Parent Page</router-link>
      </nav>
    </header>
    {{ `The router name: ` + route.name }}
    <main :class="{ 'bg-blue-100': isForm, 'bg-green-100': isParent }">
      <router-view />
    </main>
    <footer>
      <p class="text-center py-5 bg-gray-200 mt-10">&copy; 2024 Company</p>
    </footer>
  </div>
</template>