<template>
    <button :class="buttonClass" @click="onClick">
        <slot />
    </button>
</template>

<script setup>
import { computed, } from 'vue';
const props = defineProps({
    variant: { type: String, default: 'primary' }
});

const buttonClass = computed(() => {
    const baseClass = 'px-4 py-2 rounded focus:outline-none';
    const variantClass = {
        primary: 'bg-blue-500 text-white',
        secondary: 'bg-gray-500 text-white',
        outline: 'border border-blue-500 text-blue-500'
    };
    return `${baseClass} ${variantClass[props.variant] || variantClass.primary}`;
});

const emit = defineEmits(['click']);
const onClick = () => emit('click');
</script>

<style scoped>
.custom-danger-button-demo-class {
    @apply bg-red-500 hover:bg-red-700 text-white;
}
</style>