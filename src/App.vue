<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const isForm = computed(() => route.name === 'form')
const isParent = computed(() => route.name === 'parent')
</script>

<template>
  <div>
    <header>
      <nav class="p-4 bg-gray-300">
        <div class="flex items-center justify-between">
          <!-- Left Side: SVG Icon and Label -->
          <div class="flex items-center">
            <img src="@/assets/logo.svg" class="mr-2 text-gray-700 w-9 h-9" />

            <a href="#" class="text-gray-700">Grondwettelijk Hof</a>
          </div>

          <!-- Right Side: Labels -->
          <div class="flex">
            <button class="p-2 text-gray-500 md:hidden" aria-expanded="false">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
            <div id="right" class="hidden space-x-4 md:flex">
              <router-link to="/" class="px-3 py-2 text-gray-900 hover:bg-gray-100"
                >Home</router-link
              >
              <router-link to="/form" class="px-3 py-2 text-gray-900 hover:bg-gray-100"
                >Go to Form</router-link
              >
              <router-link to="/parent" class="px-3 py-2 text-gray-900 hover:bg-gray-100"
                >Go to Test Page</router-link
              >
            </div>
          </div>
        </div>
      </nav>
    </header>
    <!-- {{ `The router name: ` + route.name }} -->
    <main :class="{ 'bg-blue-100': isForm, 'bg-green-100': isParent }">
      <router-view />
    </main>
    <footer>
      <p class="py-5 mt-10 text-center bg-gray-200">&copy; 2024 Company</p>
    </footer>
  </div>
</template>
