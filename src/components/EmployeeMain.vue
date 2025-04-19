<script setup>
import SupermarketChart from './SupermarketChart.vue';
// import RevenueChart from './Part/RevenueChart.vue';
import InventoryManagement from './InventoryManagement.vue';
import { ref } from 'vue';

const tasks = ref([
  { id: 1, task: "Kiểm tra hàng tồn kho.", time: "01/04/2025 08:00:00" },
  { id: 2, task: "Sắp xếp lại quầy rau củ.", time: "01/04/2025 08:30:00" },
  { id: 3, task: "Kiểm tra hạn sử dụng sản phẩm.", time: "01/04/2025 09:00:00" },
  { id: 4, task: "Dọn dẹp khu vực thanh toán.", time: "01/04/2025 09:30:00" },
  { id: 5, task: "Nhập hàng mới vào kho.", time: "01/04/2025 10:00:00" },
  { id: 7, task: "Báo cáo doanh số bán hàng.", time: "01/04/2025 11:00:00" },
  { id: 8, task: "Đào tạo nhân viên mới.", time: "01/04/2025 13:00:00" }
]);

</script>
<template>
<div class =body>
    <div class ="body-left">
        <!-- --------------------------------- -->
        <div class ="body-left-part">
            <div class ="body-left-part-title">
                <h3 class ="Title">Danh sách đơn hàng theo ngày</h3>
            </div>
            <div class ="body-left-part-main">
                <div class ="main-part with_20">
                    <p class ="main-part-title">Đơn hàng chờ xử lý</p>
                    <div class ="main-part-number">0</div>
                </div>
                <div class ="main-part with_20">
                    <p class ="main-part-title">Đơn hàng đã hoàn thành</p>
                    <div class ="main-part-number">0</div>
                </div>
                <div class="main-part with_20">
                    <p class="main-part-title">Đơn hàng hủy</p>
                    <div class="main-part-number">0</div>
                </div>
                <div class="main-part with_20">
                    <div class="search-container">
                        <i class="fa-solid fa-magnifying-glass search-icon"></i>
                        <input type="text" class="search-input" placeholder="Tìm kiếm đơn hàng">
                    </div>
                </div>
            </div>
        </div>
        <!-- ----------------------------------- -->
        <div class ="body-left-part">
            <div class ="body-left-part-title">
                <h3 class ="Title">Bán hàng trực tiếp</h3>
            </div>
            <div class ="body-left-part-main">
                <div class ="main-part with_20 curson">
                    <p class ="main-part-title">Tạo đơn hàng</p>
                </div>
                <div class ="main-part with_20 curson">
                    <p class ="main-part-title">Tính tiền và xuất hóa đơn</p>
                </div>
                <div class="main-part with_20 curson">
                    <p class="main-part-title">Chọn phương thức thanh toán</p>
                </div>
            </div>
        </div>
        <!-- ---------------------------------------- -->
        <!-- <div class ="body-left-part">
            <RevenueChart />
        </div> -->
        <!-- --------------------------------------------- -->
         <div class ="body-left-part">
            <h3 class ="Title">Top sản phẩm bán chạy</h3>
            <div class ="best-sell-title"></div>
            <SupermarketChart />
         </div>
        <!-- ---------------------------------------- -->
        <div class ="body-left-part">
            <h3 class ="Title">Kiểm kho nhanh</h3>
            <div class ="backgroundInventory">
            </div>
            <InventoryManagement />
        </div>
    </div>
    <div class ="body-right">
        <div class="body-left-part task-list">
            <div class="body-left-part-title">
                <h3 class="Title">Danh sách công việc</h3>
            </div>
            <div class="task-container">
                <div v-for="task in tasks" :key="task.id" class="task-item">
                    <div class="task-dot"></div>
                    <div class="task-content">
                        <p class="task-title">{{ task.task }}</p>
                        <p class="task-time">{{ task.time }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<style scoped>
.body{
    padding: 30px 30px 30px 50px;
    display: flex;
    gap: 10px;
    background-color: #f5f5f5;
    font-family:Arial, Helvetica, sans-serif;
    margin-top: 70px;
}
.body-left{
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 78%;
}
.body-left-part{
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.15);
    background-color: #fff9f9;
    padding: 15px;
    gap: 15px;
    justify-content: center;
}
.body-left-part-title{
    color: #34495e;
    font-weight: 500;
    font-size: 16px;
}
.body-left-part-main{
    display: flex;
    gap: 8px;
}
.main{
    width: 50%;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
}
.main-part{
    border-radius: 3px;
    background-color: rgb(227, 238, 247);
    padding: 15px;
}
.with_45{
    width: 100%;
}
.with_20{
    width: 40%;
}
.with_15{
    width: 23%;
}
.main-part-spe{
    display: flex;
    justify-content: space-between;
    border-radius: 3px;
    background-color: rgb(227, 238, 247);
    padding: 15px;
}
.main-part-title{
    justify-content: flex-start;
    align-items: flex-start;
    white-space: nowrap;
}
.main-part-spe-number{
    font-size: 20px;
    color:rgb(22, 193, 245);
    display: flex;
    align-items: center;
    font-weight: 600;
}
.main-part-number{
    font-size: 20px;
    font-weight: 600;
}

.search-container {
    width: 100%; 
    padding: 15px 0px;
    display: flex;
    align-items: center;
    position: relative; /* Thêm vị trí tương đối cho container */
}

.search-input {
    display: block;
    width: 100%;
    padding-left: 30px; /* Thêm khoảng cách cho icon */
    border: 1px solid rgb(227, 238, 247);
    border-radius: 5px;
    box-sizing: border-box; 
    background-color: rgb(227, 238, 247);
    color: #34495e;
    justify-content: flex-start;
    align-items: flex-start;
}
.search-input::placeholder {
    color: #34495e; /* Đặt màu chữ placeholder thành đen */
    font-family:Arial, Helvetica, sans-serif;
    font-size: 16px;
}
.search-input:focus {
    outline: none;
    border-color: rgb(227, 238, 247); /* Thay đổi màu border khi focus */
}

.search-icon {
    position: absolute; /* Đặt icon ở vị trí tuyệt đối */
    left: 10px;
    top: 50%;
    transform: translateY(-50%); /* Căn giữa icon theo chiều dọc */
    color: #34495e;
    cursor: pointer;
}

.curson{
    cursor: pointer;
}
.best-sell-title{
    background-image: url('https://media.istockphoto.com/id/1089676120/vi/vec-to/s%E1%BA%A3n-ph%E1%BA%A9m-th%E1%BB%B1c-ph%E1%BA%A9m-%C4%91%C3%B3ng-g%C3%B3i-s%E1%BA%A3n-ph%E1%BA%A9m-n%E1%BA%A5u-%C4%83n-h%C3%A0ng-si%C3%AAu-th%E1%BB%8B-v%C3%A0-th%E1%BB%B1c-ph%E1%BA%A9m-%C4%91%C3%B3ng-h%E1%BB%99p-l%E1%BB%8D-b%C3%A1nh-quy.jpg?s=2048x2048&w=is&k=20&c=YncwKSyHYlLwcIFTMKrQR5TIkqDnYabmn2ymQH5cEPA=');
    height: 240px;
    background-size: cover; 
    background-position: top;
    background-repeat: no-repeat;
    color: #34495e;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    font-size: 20px;
    font-weight: 500;
    top: 15%;
}
.backgroundInventory{
    background-image: url('https://arito.vn/wp-content/uploads/2024/11/Screenshot-2024-11-26-at-23.00.12.png');
    height: 300px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}
.Title{
    text-transform: uppercase;
    font-weight: 600;
    font-size: 24px;
    color: #34495e;
    text-align: center; 
    display: flex;
    justify-content: center;
    align-items: center;
}
.body-right{
    display: flex;
    flex: 1;
    flex-direction: column; 
    height: auto;
}
.search-input:active{
    border: 1px solid rgb(227, 238, 247);
}
.task-list {
    padding: 15px;
    background: white;
    border-radius: 5px;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.15);
    height: auto;
}

.task-container {
    border-left: 3px solid #007bff;
    padding-left: 10px;
    margin-top: 10px;
}

.task-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    position: relative;
}

.task-dot {
    width: 8px;
    height: 8px;
    background: #007bff;
    border-radius: 50%;
    position: absolute;
    left: -15px;
}

.task-content {
    margin-left: 10px;
}

.task-title {
    font-weight: bold;
    color: #333;
}

.task-time {
    font-size: 12px;
    color: gray;
}
</style>