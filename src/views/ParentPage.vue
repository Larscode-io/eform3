<template>
    <div>
        <MyButton variant="primary" @click="handleButtonClick">Click Me</MyButton>
    </div>
    <div class="flex w-364"> <!-- Container has limited width -->
        <div class="p-4 text-white bg-red-500 shrink-0">Item 1 (does not shrink)</div>
        <div class="p-4 text-white bg-green-500">Item 2 (may shrink if needed)</div>
        <div class="p-4 text-white bg-blue-500">Item 3 (may shrink if needed)</div>
    </div>
    <div class="flex w-full">
        <div class="p-4 text-white bg-red-500">Item 1</div>
        <div class="flex-grow p-4 text-white bg-green-500">Item 2 (grows to use available space)</div>
        <div class="p-4 text-white bg-blue-500">Item 3</div>
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