 <script setup>
import Header from './Head.vue';
import Main from './Main1.vue';
</script>
<template>
    <Header />
    <Main />
</template>
<style scoped>
body{
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-x: hidden;
}

</style> 
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

<!-- 
<script setup>
    import {ref} from 'vue'
    const arr = ref([
        'nhan',
        'hehe',
        'hihei',
        'hhaha'
    ])
</script>
<template>
   <div class="card-container" v-for="(item,index) in arr" :key="item">
      <p>{{index}} - {{ item }}</p>
    </div>
</template>
<style scoped>

</style> -->



<!-- 
<script setup>
import {ref} from 'vue';
import { onMounted } from 'vue';
import pokemon from './pokemon.vue'
const dataList = ref([]);
const dataCard = ref({
    id: 1,
    image: '	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    name: 'heheh',
    types: [
        'smile',
        'cry'
    ]
})
async function fetchData() {
    const  res = await fetch()
    const { results } = await res.json();
    results.forEach(async(el) => {
        const response = await fetch(el.url);

    })
    
}
onMounted(() =>{
    fetchData()
})
</script>
<template>
    <div class = "container">
    <pokemon :data="dataCard" v-for="item in dataList" :key="item.id" :data="item" />
</div>
</template>
<style scoped>
</style> -->