<template>
    <div class="not-found">
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <router-link to="/">Go to Home Page</router-link>
    </div>
</template>

<script>
export default {
    name: 'NotFound',
};
</script>

<style>
/* Basic styling; customize as needed */
.not-found {
    text-align: center;
    margin-top: 50px;
}

.not-found h1 {
    margin-bottom: 20px;
}
</style>
