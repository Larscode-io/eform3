<template>
    <div>
        <MyButton variant="primary" @click="handleButtonClick">Click Me</MyButton>
    </div>
</template>

<script setup>
import MyButton from '@/components/BaseButton.vue';

const handleButtonClick = () => {
    console.log('Button clicked!');
};
</script>
