<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import MainPage from '../MainPage.vue';
import TheHeader from '../TheHeader.vue';

const route = useRoute();
const router = useRouter();  // Thêm router để chuyển hướng

const importId = ref(route.params.importId);  // Đảm bảo sử dụng ref để theo dõi giá trị
const message = ref('');
const importProduct = ref([]);
const importDetails = ref([]);

// Lấy danh sách các đơn nhập có trạng thái "DRAFT"
onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:8080/StockImport');
    console.log('Dữ liệu trả về từ API:', res.data);
    if (Array.isArray(res.data)) {
      // Lọc các đơn nhập có trạng thái "DRAFT"
      importProduct.value = res.data.filter(item => item.status === 'DRAFT');
      console.log('Danh sách importId (DRAFT):', importProduct.value.map(item => item.importId));
    } else {
      console.error('Dữ liệu trả về không phải mảng:', res.data);
    }
  } catch (error) {
    console.error('Lỗi khi lấy danh sách nhập:', error);
  }
});

// Danh sách các đơn DRAFT
const draftImportList = computed(() => importProduct.value);

// Khi chọn đơn nhập để xem chi tiết
const selectImportId = async (id) => {
  importId.value = id;  // Cập nhật lại importId khi chọn đơn nhập
  try {
    const res = await axios.get(`http://localhost:8080/StockImport/${id}`);
    if (res.data.stockImportDetail) {
      importDetails.value = res.data.stockImportDetail;
      console.log(`Chi tiết importId = ${id}:`, importDetails.value);
    } else {
      console.error('Không có dữ liệu chi tiết nhập hàng');
    }
  } catch (error) {
    console.error('Lỗi khi lấy chi tiết nhập hàng:', error);
  }
};

// Method để format tiền tệ
const formatCurrency = (value) => {
  if (value) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  }
  return value;
};

// Hàm nhập kho (có thể gọi API nếu cần)
const importStock = async () => {
  try {
    const res = await axios.put(`http://localhost:8080/StockImport/${importId.value}/import-stock`);
    message.value = res.data;

    // Chờ 10 giây và chuyển hướng đến trang /ProductCatalog
    setTimeout(() => {
      router.push('/ProductCatalog');  // Chuyển hướng sau 10 giây
    }, 10000);  // 10000ms = 10 giây
  } catch (error) {
    console.error('Lỗi khi nhập kho:', error);
  }
};
</script>


<template>
  <div class="main-container">
    <MainPage />
    <div class="container">
      <div class="page">
        <TheHeader />
        <div class="page-main">
          <div class="title">
            <h3>Danh sách nhập hàng</h3>
          </div>
          <div v-if="message" class="message">{{ message }}</div>
          <!-- Hiển thị danh sách các đơn nhập có trạng thái "DRAFT" -->
          <div v-if="draftImportList.length > 0">
            <h3>Danh sách đơn nhập</h3>
            <ul>
              <li v-for="importItem in draftImportList" :key="importItem.importId">
                <a href="#" @click.prevent="selectImportId(importItem.importId)">
                  Nhập đơn {{ importItem.importId }}
                </a>
              </li>
            </ul>
          </div>

          <!-- Hiển thị chi tiết sản phẩm nhập từ importId -->
          <div v-if="importId && importDetails.length > 0" class="importProduct_container">
            <h2>Đơn nhập hàng: {{ importId }}</h2>
            <!-- Bảng hiển thị chi tiết sản phẩm -->
            <table class="product-table">
              <thead>
                <tr>
                  <th>Tên sản phẩm</th>
                  <th>Số lượng nhập</th>
                  <th>Đơn giá</th>
                  <th>Tổng tiền</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="detail in importDetails" :key="detail.importDetailId">
                  <td>{{ detail.product?.name || 'Không có tên sản phẩm' }}</td>
                  <td>{{ detail.quantity }}</td>
                  <!-- Sử dụng method formatCurrency thay vì filter -->
                  <td>{{ formatCurrency(detail.unitPrice) }}</td>
                  <td>{{ formatCurrency(detail.totalPrice) }}</td>
                </tr>
              </tbody>
            </table>
            <!-- Nút nhập kho -->
            <div class="import-btn-container">
              <button @click="importStock" class="import-btn">Nhập kho</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color:  #ffffff;/* Thay đổi nền của toàn bộ trang */
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
  background-color: #ffffff; /* Nền trắng cho khu vực chính */
  margin-left: 18%;
  position: relative;
}

.page {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #ffffff; /* Nền trắng cho khu vực chính */
  position: relative;
  font-family: Arial, Helvetica, sans-serif;
}

.page-main {
  display: flex;
  flex-direction: column;
  margin-top: 6%;
  padding: 0px 30px;
  background-color:  #ffffff; /* Nền sáng cho phần nội dung chính */
}

.title {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
}

.title h3 {
  font-weight: 600;
  color: rgb(50, 50, 50);
}
a{
  text-decoration: none;
}
.importProduct_container {
  margin-top: 20px;
}

.product-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.product-table th, .product-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

.product-table th {
  background-color: #e0e0e0; /* Nền sáng cho tiêu đề bảng */
}

.import-btn-container {
  margin-top: 20px;
  text-align: center;
}

.import-btn {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.import-btn:hover {
  background-color: #45a049;
}
.import-btn:active{
  transform: scale(0.95);
}
.message {
  margin-top: 20px;
  padding: 10px;
  background-color: #0884f1;
  color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
}
</style>

