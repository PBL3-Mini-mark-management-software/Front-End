<script setup>

    import Mainpage from '../components/Mainpage.vue'
import TheHeader from '../components/TheHeader.vue';
import EmployeeMain from '../components/EmployeeMain.vue'
</script>

<template>
  <div class="main-container">
    <Mainpage />
    <div class="container">
      <div class="page">
        <TheHeader />
        <EmployeeMain />
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  padding: 0;
  margin: 0;
  overflow: hidden;
}
.main-container {
  display: flex;
  width: 100%;
  height: 100vh;
  position: relative;
  
}

.container {
  flex: 1; 
  display: flex;
  flex-direction: column;
  background-color: #fff;
  margin-left: 18.5%;
  /* position: relative; */
}

.page {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

</style>
