<script setup>
import { defineProps } from 'vue';
import { RouterLink } from 'vue-router';
import {ref} from 'vue';
import Customer from '@/pages/Customer.vue';
import ProductCatalog from '@/pages/ProductCatalog.vue';
import theConfiguration from '@/pages/theConfiguration.vue';
import Invoice from '@/pages/Invoice.vue';
import Home from '@/pages/Home.vue';
const props = defineProps(['data']);


const isOpened = ref(null);
const clickMenu = (menu) => {
    isOpened.value = isOpened.value === menu ? null : menu;
}
</script>

<template>
    <div class="nav-menu">
        <img class="logo" src="https://cdn.dribbble.com/userupload/28456975/file/original-923692d84cf3a6905b017e91981ed0af.gif">
        <hr style="border-color: antiquewhite;">
        <div class="menu">
            <router-link to="/Home">
                <i class="fa fa-home"></i> Trang chủ
            </router-link>
            <div class="product" @click.prevent="clickMenu('product')">
                <router-link to="/productCatalog" class="router">
                    <i class="fa fa-shopping-cart"></i> Sản phẩm
                </router-link>
                <div class="hidden-product" v-show="isOpened === 'product'">
                    
                    <a href="">Danh sách sản phẩm</a>
                    <a>Bảng giá</a>
                </div>
            </div>

            <div class="warehouse_management" @click.prevent="clickMenu('warehouse_management')">
                <a href="#"><i class="fa fa-warehouse"></i> Quản lý kho</a>
                <div class="hidden-warehouse_management" v-show="isOpened === 'warehouse_management'">
                    <a href="">Tồn kho</a>
                    <a href="">Đặt hàng nhập</a>
                    <a href="">Nhập hàng</a>
                    <a href="">Trả hàng nhập</a>
                    <a href="">Chuyển kho</a>
                </div>
            </div>

            <div class="bill">
                <router-link to="/invoice" class="router">
                    <i class="fa fa-receipt"></i> Hóa đơn
                </router-link>
                <!-- <div class="hidden-bill" v-show="isOpened === 'bill'">
                    <a href="#">Hóa đơn bán hàng</a>
                    <a href="#">Hóa đơn nhập hàng</a>
                    <a href="#">Hóa đơn chưa hoàn tất</a>
                </div> -->
            </div>

            <div class="customer" @click.prevent="clickMenu('customer')">
                <router-link to="/customer" class="router">
                    <i class="fa fa-users"></i> Khách hàng
                </router-link>
                <!-- <div class="hidden-customer" v-show="isOpened === 'customer'">
                    <a href="">Khách hàng thân thiết</a>
                    <a href="">Nhóm khách hàng</a>
                </div> -->
            </div>

            <a href="#"><i class="fa fa-truck"></i> Nhà cung cấp</a>

            <a href="#"><i class="fa fa-user-tie"></i> Nhân viên</a>
            <a href="#"><i class="fa fa-gift"></i> Khuyến mãi</a>

            <div class="report" @click.prevent="clickMenu('report')">
                <a href="#"><i class="fa fa-chart-line"></i> Báo cáo doanh thu</a>
                <div class="hidden-report" v-show="isOpened === 'report'">
                    <a href="">Tổng quan báo cáo</a>
                    <a href="">Danh sách báo cáo</a>
                </div>
            </div>

            <a href="#"><i class="fa fa-book"></i> Sổ quỹ</a>
            <router-link to="/theConfiguration" class="router">
                <i class="fa fa-cogs"></i> Cấu hình
            </router-link>
        </div>
    </div>
</template>

<style scoped>
body{
    width: 100%;
    height: 100%;
    font-family: 'Noto Sans', sans-serif;
}
/* .container{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #f5f5f5;
    height: 100vh;
    width: 100%;
    font-family: 'Noto Sans', sans-serif;
}
.main-section{
    display: flex;
    flex-direction: row;
    position:relative;
    width: 100%;
    height: 100%;
} */
/* .router{
    display: flex;  
    align-items: center; 
    text-align:left;
    padding: 10px;
    color: #f5f5f5;
    font-weight: 400;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    color: #f5f5f5;
} */
.nav-menu{
    position:fixed;
    left: 0;
    width: 18%;
    height: 100%;
    background-color: #ffad27;
}
.logo{
    width: 100%;
    height: 70px;
    object-fit: cover;
}
.nav-menu hr{
    height: 1px;         
    background-color: #d3cece; 
    border: none;         
}
.menu{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 10px;
    white-space: nowrap;
    list-style: none;
    padding: 0;
    margin: 0 10px;
}
/* .menu li {
    display: flex;  
    align-items: center; 
    text-align:left;
    padding: 10px;
    color: #f5f5f5;
    font-weight: 400;
    transition: background-color 0.1s ease-in-out;
} */
/* .menu li i {
    margin-right: 10px;
    font-size: 19px;  
    width: 24px;  
    text-align: center;
    font-weight: 600;
} */
/* .menu li:hover{
    border-radius: 10px;
    background-color: #d9e6e6;
} */
.menu a{
    display: flex;  
    align-items: center; 
    text-align:left;
    padding: 10px;
    color: #f5f5f5;
    font-weight: 400;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    color: #f5f5f5;
}
.menu a i {
    margin-right: 10px;
    font-size: 19px;  
    width: 24px;  
    text-align: center;
    font-weight: 600;
}
.menu a:hover,
.bill.active > a,
.product.active > a,
.warehouse_management.active > a,
.customer.active > a,
.report.active > a {
    color: #ffad27;
    border-radius: 10px;
    background-color: #d9e6e6;
}


.hidden-bill a,
.hidden-product a,
.hidden-warehouse_management a,
.hidden-customer a,
.hidden-report a {
    margin-top: 10px;
    margin-left: 30px;
    padding: 5px 10px;
    color: #f5f5f5;
    text-decoration: none;
}

.hidden-bill a:hover,
.hidden-product a:hover,
.hidden-warehouse_management a:hover,
.hidden-customer a:hover,
.hidden-report a:hover {
    background-color: #ddd;
    border-radius: 5px;
}
</style>