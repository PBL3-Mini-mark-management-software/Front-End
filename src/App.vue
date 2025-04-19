<script setup>
import {ref} from 'vue';
    import { RouterView } from 'vue-router';
</script>
<template>
    <main>
    <RouterView />
    </main>
</template>
<style>
html, body, #app {
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
    overflow-y: auto;
    overflow-x: hidden;
}
</style> 