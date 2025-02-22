<script setup>
import Header from './Head.vue';
</script>

<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

    <div class="header">
        <div class="main-container">
            <div class="main-container-left">
                <a href="" style = "width: 126px; align-items: center;">
                    <img src="https://viblo.asia/logo_full.svg" alt="Viblo" width="62" height="21">
                </a>
                <span class="main-menu_item">Bài Viết</span>
                <span class="main-menu_item">Hỏi đáp</span>
                <span class="main-menu_item">Thảo luận</span>
            </div>

            <div class="main-container-right">
                <div class="search">
                    <input type="text" placeholder="Tìm kiếm trên Viblo" class="search-bar">
                    <button class="search-button"><i class="fas fa-search"></i></button>
                </div>
                <div class="icons">
                    <i class="fas fa-user-circle"></i>
                    <i class="fas fa-bell"></i>
                    <i class="fas fa-pencil-alt"></i>
                    <span class="flag">VN</span>
                    <i class="fa fa-th" style = "margin: 0 12.5px;" data-v-eb7ed3b6=""></i>
                    <div class="avatar"></div>
                </div>
            </div>
        </div>
    </div>
    <img src="https://images.viblo.asia/full/eff0e997-bb2b-4903-a217-0bccd1dc5509.png" alt="" class="progressive-img_full">

</template>

<style scoped>
body, html {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
}

.header {
    display: flex;
    align-items: center;
    color: #1B1B1B;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1030;
    background-color: #FFFFFF;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, .1);
    height: 60px;
    padding: 0 150px;
}

.main-container {
    display: flex;
    flex: 1;
    width: 100%;
    max-width: 1200px;
    justify-content:space-between;
}

.main-container-left {

    display: flex;
    justify-content: center;
    align-items: center;
}

.main-container-right {
    display: flex;
    align-items: center;
    flex-grow: 1;
}

.main-menu_item {
    color: #9b9b9b;
    font-size: 14px;
    font-family: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin-right: 40px;
    font-weight: 700;
}

.search {
    display: flex;
    align-items: center;
    border: 2px solid #d6d6d7;
    border-radius: 3px;
    background-color: #fff;
    width: 250px;
    height: 36px;
    overflow: hidden;
    max-width: 500px;
}

.search-bar {
    flex: 1;  /* Input tự động co giãn */
    border: none;
    outline: none;
    padding: 8px 12px;
    font-size: 14px;
    color: #333;
}

.search-button {
    border: none;
    background-color: #5488C7;
    color: white;
    width: 40px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.search-button i {
    font-size: 16px;
}


.main-container-right {
    display: flex;
    align-items: center;
    flex-grow: 1;
    justify-content: flex-end;
}

.icons {
    display: flex;
    align-items: center;
    margin-left: 15px;
}

.icons i {
    font-size: 18px;
    color: #9b9b9b;
    margin-left: 15px;
    cursor: pointer;
}

.flag {
    font-size: 14px;
    font-weight: 600;
    margin-left: 15px;
}

.avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: gray;
    margin-left: 15px;
    cursor: pointer;
}

.progressive-img_full {
    background-color: black;
    position:relative;
    top: 53px;
    left: 0;
    vertical-align: middle;
    width: 100vw;
    height: 168px;
    transition: opacity .5s ease-out;
    object-fit: contain;
}
</style>