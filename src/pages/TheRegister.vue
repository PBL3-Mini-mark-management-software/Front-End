<script setup>
    import { ref } from 'vue';
    import signIn from './signIn.vue';
    const passwordInput = ref(null);
    const confirmInput = ref(null);
    const showPassword = ref(false);

    function handleClick(){
        alert("Bạn đã đăng ký!!!");
    }

    function togglePassword(){
        if(passwordInput.value && confirmInput.value) {
            passwordInput.value.type = showPassword.value ? "text" : "password";
            confirmInput.value.type = showPassword.value ? "text" : "password";
        }
    }
</script>

<template>
    <div class="header">
        <div class="cricle-design">
            <div class="logo">
                <img src="https://cdn.dribbble.com/userupload/28456975/file/original-923692d84cf3a6905b017e91981ed0af.gif" alt="Logo Sieu thi">
            </div>
            <div class="title-part">
                <div class="title">
                    Đăng Ký Tài Khoản
                </div>
            </div>
        </div>

        <div class="main-part">
            <div class="main">
                <div class="main-item">
                    <input type="text" placeholder="User Name">
                    <i class="fa-solid fa-user"></i>
                </div>
                <div class="main-item">
                    <input type="email" placeholder="Email">
                    <i class="fa-solid fa-envelope"></i>
                </div>
                <div class="main-item">
                    <input type="tel" placeholder="Số điện thoại">
                    <i class="fa-solid fa-phone"></i>
                </div>
                <div class="main-item">
                    <input type="text" placeholder="Chức vụ">
                    <i class="fa-solid fa-street-view"></i>
                </div>
                <div class="main-item">
                    <input type="password" ref="passwordInput" placeholder="Mật khẩu">
                    <i class="fa-solid fa-lock"></i>
                </div>
                <div class="main-item">
                    <input type="password" ref="confirmInput" placeholder="Xác nhận mật khẩu">
                    <i class="fa-solid fa-unlock"></i>
                </div>
                <div class="checkBox">
                    <label>
                        <input type="checkbox" v-model="showPassword" @change="togglePassword">
                        Hiển thị mật khẩu
                    </label>
                </div>
                <button class="Button-Res" @click="handleClick">
                    Đăng ký
                </button>
                <div>
                    <span class ="text">Bạn đã có tài khoản Abyss? </span>
                    <router-link to="signIn" class="text-res">Đăng nhập</router-link>
                        <!-- <span class ="text-res">Đăng nhập</span>
                    </router-link> -->
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
body {
    background-color: #f5f5f5;
    font-family: "Noto Sans", sans-serif;
    margin: 0;
    padding: 0;
    overflow: hidden;
    width: 100%;
    height: 100%;
}

.header {
    width: 100%;
    position: relative;
    font-family: "Noto Sans", sans-serif;
}

.cricle-design {
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    height: 200px;
    background-color: #ffad27;
    border-bottom-left-radius: 50% 100px;
    border-bottom-right-radius: 50% 100px;
    padding: 50px 30px;
}

.logo {
    width: 120px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.logo img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
}

.title-part {
    flex-grow: 1;
    display: flex;
    justify-content: center;
}

.title {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    width: 30%;
    height: 50px;
    background-color: #fff;
    color: #ffad27;
    font-size: 18px;
    font-weight: 600;
    border-radius: 35px;
    text-align: center;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    transform: translateX(-90px);
}

.main-part {
    width: 100%;
    max-width: 400px;
    position: absolute;
    box-sizing: border-box;
    top: 150px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    padding: 15px;
    border-radius: 20px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

.main {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 10px;
    padding-bottom: 15px 10px 5px;
}

.main-item {
    width: 90%;
    height: 30px;
    display: flex;
    align-items: center;
    background-color: #ebddd7;
    color: #382a40;
    border-radius: 30px;
    padding: 10px 15px;
    gap: 15px;
}

.main-item input {
    flex: 1;
    border: none;
    background: none;
    font-size: 16px;
    outline: none;
}
.main-item i {
    font-size: 16px;
    color: #382a40;
}
.Button-Res{
    background-color: #ffad27;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40%;
    height: 30px;
    outline: none;
    flex: 1;
    padding: 10px;
    outline: none;
    border: none;
    font-size: 16px;
    border-radius: 30px;
    cursor: pointer;
}
.text{
    color: #737373;
    font-size: 12px;
}
.text-res{
    color: #ffad27;
    font-size: 13px;
    margin-left: 10px;
    cursor: pointer;
    text-decoration: none;
}
.checkBox{
    font-size: 12px;
    color: #737373;
}
.checkBox label{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: -10px;
    color: #737373;
}
</style>
