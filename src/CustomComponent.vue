<script>
import {ref} from 'vue';
import CustomComponent from './CustomComponent.vue';

</script>
<template>
    <div class="card-container">
        <h1>title</h1>
        <p>Name</p>
        </div>
</template>
<style scoped>
.card-container{
    border: 1px solid black;
    border-radius: 10px;
    width: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>