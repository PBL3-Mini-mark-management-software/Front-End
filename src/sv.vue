<script setup>
import { ref } from 'vue'
const arr = ref([
    'Trang chủ',
    'Chương trình',
    'Kế hoạch',
    'Danh sách',
    'Cựu sinh viên',
    'Phòng học & Hệ thống',
    'Hỗ trợ',
    'Đăng nhập'
])
const isfull = ref(true);
function handleSubmit(){
    if(document.getElementById('text').value && document.getElementById('text2').value){
            isfull.value = true;
        }else{
            isfull.value = false;
    }
}
</script>
<template>
    <div class = "menu">
        <div class = "menu-bar" v-for="(item, index) in arr" :key="item">
            <span>{{ item }}</span>
        </div>
    </div>
    <div class = "">
        <span>Tài khoản:</span>
        <input type="text" id="text"><br>
        <span>Mật khẩu:</span>
        <input type="text2" id="text2">
        <span :class="{'hidden-noti' : isfull}">
        Vui lòng điền đủ thông tin
        </span>
        <span :class="{'hidden-noti' : !isfull}">
        Đăng nhập thành công
        </span>
        <button  @click="handleSubmit">Đăng nhập</button>
    </div>
</template>
<style scoped> 
.menu{
    display:flex;
    flex-direction: row;
    margin-bottom: 50px;
    background-color: blue;
}
.menu-bar{
    font-size: 14px;
    padding: 20px;
    display:flex;
    flex-direction: row;
}
#text{
    margin-bottom: 10px;
}
.menu-bar span{
    padding: 20px;
    color: white;
}
.hidden-noti{
    display: none;
    color: black;
}


</style>