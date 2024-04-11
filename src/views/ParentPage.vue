<template>
    <div>
        <MyButton variant="primary" @click="handleButtonClick">Click Me</MyButton>
    </div>
</template>

<script setup>
import MyButton from '@/components/BaseButton.vue';
const handleButtonClick = () => {
};
</script>

<style scoped>
.button-special-demo-class {
    @apply bg-blue-500 text-white py-2 px-4 rounded;
    /* Additional component-specific styles */
}
</style>