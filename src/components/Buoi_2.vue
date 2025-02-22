<!-- 

<script setup>
    import {ref} from 'vue'
    const idName = 'heheh'
    const a = ref(1)
    const abe = ref(0)
    const abc = computed( () => {
        return abe.value + 5;
    })
    console.log(abc.value);

</script>
<template>
    <CustomHeader />
    <CustomHeader></CustomHeader>
    <div :id="idName" @click="handleClick">

    </div>
</template>
<style scoped>
</style> -->




<script setup>
    import {ref} from 'vue';
    const className = ref('title')
    const availableSubmit = ref(true)
    function handleSubmit(){
        if(document.getElementById('text').value){
            availableSubmit.value = true;
        }else{
            availableSubmit.value = false;
        }
    }
</script>
<template>
    <div :class="{'colorRed': condition}">
        heheh
    </div>
    <input type="text" id="text">
    <span :class="{'isHidden' : availableSubmit}">
        Please input your username
    </span>
    <span :class="[className, className2, className3]">
        Please enter
    </span>
    <button  @click="handleSubmit">Submit</button>
</template>
<style scoped>
.isHidden{
    display: none;

}
</style>
<!-- 

<script setup>
import {ref} from 'vue';
import CustomComponent from './CustomComponent.vue';
const arr = ref([
    1,
    2,
    3,
    4,
    5
])
</script>
<template>
    <CustomComponent v-for="(item, index) in arr" :key=" index" />

</template>
<style scoped>

</style> -->