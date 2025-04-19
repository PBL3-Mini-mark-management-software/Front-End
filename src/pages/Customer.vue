<script setup>
import Mainpage from '../components/Mainpage.vue'
import Taskbar from '../components/Taskbar.vue';
import { customers as customerData } from '../data/customers.js'
import { ref, computed } from 'vue';

const customers = ref(customerData);
const searchKeyword = ref('');
const filterPoints = ref('');
const filterRank = ref('');
const filterGroup = ref('');
const dropdowns = ref({
  points: false,
  rank: false,
  group: false
});


function Dropdown(type) {
  dropdowns.value[type] = !dropdowns.value[type];
  for (let key in dropdowns.value) {
    if (key !== type) dropdowns.value[key] = false;
  }
}

function filterByPoints(range) {
  filterPoints.value = range;
  dropdowns.value.points = false;
}

function filterByRank(rank) {
  filterRank.value = rank;
  dropdowns.value.rank = false;
}

function filterByGroup(group) {
  filterGroup.value = group;
  dropdowns.value.group = false;
}

function getPointRange(range, points) {
  switch (range) {
    case '0-100': return points >= 0 && points <= 100;
    case '101-500': return points > 100 && points <= 500;
    case 'Trên 500': return points > 500;
    default: return true;
  }
}

const filteredCustomers = computed(() => {
  return customers.value.filter(c => {
    const matchName = c.name.toLowerCase().includes(searchKeyword.value.toLowerCase());
    const matchPoints = filterPoints.value ? getPointRange(filterPoints.value, c.points) : true;
    const matchRank = filterRank.value ? c.rank === filterRank.value : true;
    const matchGroup = filterGroup.value ? c.group === filterGroup.value : true;

    return matchName && matchPoints && matchRank && matchGroup;
  });
});

function resetFilters() {
  filterPoints.value = '';
  filterRank.value = '';
  filterGroup.value = '';
  searchKeyword.value = '';
}

</script>


<template>
    <div class="temp">
        <Mainpage />
        <div class="main-right">
            <Taskbar />
            <div class="container">
                <div class="header2">
                    <h3>Khách hàng</h3>
                    <button class="add-button">
                        <font-awesome-icon :icon="['fas', 'circle-plus']" />
                        Thêm khách hàng
                    </button>
                </div>
                <div class="white-container">
                    <div class="header2">
                        <div class="search-name">
                            <font-awesome-icon class="icon" :icon="['fas', 'magnifying-glass']" />
                            <input v-model="searchKeyword" type="text" class="search-box" name="search" placeholder="Tìm kiếm khách hàng theo tên">
                        </div>
                        <div class="list-container">
                            <div class="dropdown-container">
                                <button class="list-box" @click="Dropdown('points')">
                                    Điểm tích lũy
                                    <font-awesome-icon :icon="['fas', 'sort-down']" />
                                </button>
                                <div v-if="dropdowns.points" class="dropdown-menu">
                                <div @click="filterByPoints('0-100')">0 - 100</div>
                                <div @click="filterByPoints('101-500')">101 - 500</div>
                                <div @click="filterByPoints('Trên 500')">Trên 500</div>
                                </div>
                            </div>
                            <div class="dropdown-container">
                                <button class="list-box" @click="Dropdown('rank')">
                                    Loại thành viên
                                    <font-awesome-icon :icon="['fas', 'sort-down']" />
                                </button>
                                <div v-if="dropdowns.rank" class="dropdown-menu">
                                <div @click="filterByRank('Vàng')">Vàng</div>
                                <div @click="filterByRank('Bạc')">Bạc</div>
                                <div @click="filterByRank('Đồng')">Đồng</div>
                                </div>
                            </div>
                            <div class="dropdown-container">
                                <button class="list-box" @click="Dropdown('group')">
                                    Nhóm khách hàng
                                    <font-awesome-icon :icon="['fas', 'sort-down']" />
                                </button>
                                <div v-if="dropdowns.group" class="dropdown-menu">
                                <div @click="filterByGroup('Sinh viên')">Sinh viên</div>
                                <div @click="filterByGroup('Người mới')">Người mới</div>
                                <div @click="filterByGroup('Giáo viên')">Giáo viên</div>
                                <div @click="filterByGroup('Khác')">Khác</div>
                                </div>
                            </div>
                            <button class="list-box" style="border-color:transparent;border-radius: 5px;width: 50%;" @click="resetFilters">Xóa lọc</button>
                        </div>
                    </div>
                    <table class="custom-table">
                        <thead>
                            <tr>
                            <th>STT</th>
                            <th>Họ tên</th>
                            <th>SĐT</th>
                            <th>Ngày sinh</th>
                            <th>Điểm tích lũy</th>
                            <th>Loại thành viên</th>
                            <th>Nhóm KH</th>
                            <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(customer, index) in filteredCustomers" :key="customer.id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ customer.name }}</td>
                            <td>{{ customer.phone }}</td>
                            <td>{{ customer.birthday }}</td>
                            <td>{{ customer.points }}</td>
                            <td>{{ customer.rank }}</td>
                            <td>{{ customer.group }}</td>
                            <td>
                                <button class="btn-edit">Sửa</button>
                                <button class="btn-delete">Xóa</button>
                            </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
body{
    width: 100%;
    height:100%;
    /* font-size: 20px; */
    font-family:'Noto Sans', sans-serif;
}

.temp{
    position:absolute;
    width: 100%;
    height:100%;
    /* font-size: 20px; */
    top:0;
    left:0;
    margin: 0;
    padding:0;
    font-family:'Noto Sans', sans-serif;
    display:flex;
}

.main-right{
    margin-left: 18%;
    top:0;
    background-color: #f5f5f5;
    flex:1;
    display:flex;
    flex-direction: column;
    font-size: 20px;
}

.container{
    width: 96%;
    background-color: none;
    display: flex;
    flex-direction: column;
    gap:10px;
    margin-top:90px;
    margin-left:2%;
}

.header2{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.white-container{
    background-color: white;
    width: 100%;
    height:100vh;
    border-radius: 5px;
    box-shadow: 5px 10px 15px 0px rgba(0, 0, 0, 0.2);
    padding: 10px;
    box-sizing: border-box;
    display:flex;
    flex-direction: column;
    gap:20px;
}

.add-button{
    background-color: #0088ff;
    padding:10px 20px 10px 20px;
    /* padding:10px; */
    border-color: transparent;
    border-radius: 5px;
    font-weight: 600;
    color:white;
    cursor: pointer;
}

.search-name{
    display:flex;
    width: 40%;
    background-color:white;
    padding: 5px 10px;
    border-color: #828282;
    border-style: solid;
    border-width:1px;
    border-radius: 5px;
    align-items: center;
}

.search-box{
    width: 100%;
    font-size: 15px;
    outline: none;
    border-color: transparent;
    background-color: white;
}

.list-container{
    display:flex;
    width: 50%;
    background-color:white;
    /* padding: 5px 10px; */
    border-color: #828282;
    border-style: solid;
    border-width:1px;
    border-radius: 5px;
    align-items: center;
}

.list-box{
    width: 100%;
    font-size: 15px;
    outline: none;
    border-width: 1px;
    padding: 5px 10px;
    border-color:transparent #828282 transparent transparent;
    background-color: white;
    border-radius: 5px 0 0 5px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.icon{
    font-size: 15px;
    color:#828282;
}

.custom-table {
  width: 100%;
  border: 1px solid #d1d5db; 
  border-collapse: collapse;
  font-size: 16px;
}

.custom-table thead {
  background-color: #f3f4f6; 
}

.custom-table th,
.custom-table td {
  border: 1px solid #d1d5db;
  padding: 8px 16px; 
  text-align: left;
}

/* Nút "Sửa" */
.btn-edit {
  background-color: #3b82f6; 
  color: white;
  padding: 4px 12px;
  border: none;
  border-radius: 5px;
  margin-right: 8px;
  cursor: pointer;
}

/* Nút "Xóa" */
.btn-delete {
  background-color: #ef4444;
  color: white;
  padding: 4px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.dropdown-container {
  position: relative;
  display: inline-block;
  width: 100%;
}

.dropdown-menu {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.dropdown-menu div {
  padding: 10px;
  cursor: pointer;
}

.dropdown-menu div:hover {
  background-color: #f0f0f0;
}

</style>