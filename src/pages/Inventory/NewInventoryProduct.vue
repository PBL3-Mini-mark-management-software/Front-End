<script setup>
import MainPage from '../MainPage.vue';
import TheHeader from '../TheHeader.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';
const router = useRouter();
const product = ref({
  productId: '',
  name: '',
  quantity: 0,
  price: 0,
  expirationDate: '',
  sell: 0,
  img: '',
  categoryId: '',
  supplierId: '',
});

const categories = ref([]);
const suppliers = ref([]);
const message = ref('');
const existingProducts = ref([]);

// Fetch categories, suppliers và danh sách sản phẩm
onMounted(async () => {
  const res1 = await axios.get('/ProductCatalog/categories');
  const res2 = await axios.get('/ProductCatalog/suppliers');
  categories.value = res1.data;
  suppliers.value = res2.data;

  // Lấy danh sách sản phẩm hiện tại
  const res3 = await axios.get('/ProductCatalog/products');
  existingProducts.value = res3.data; 
});

// Hàm kiểm tra sản phẩm khi nhập thông tin
const checkProduct = () => {
  const existingProduct = existingProducts.value.find(prod => 
    prod.name === product.value.name && 
    prod.categoryId === product.value.categoryId &&
    prod.supplierId === product.value.supplierId
  );

  if (existingProduct) {
    product.value.productId = existingProduct.productId; // Cập nhật mã sản phẩm nếu đã tồn tại
    product.value.quantity = existingProduct.quantity;
    product.value.price = existingProduct.price;
    product.value.expirationDate = existingProduct.expirationDate;
    product.value.sell = existingProduct.sell;
    product.value.img = existingProduct.img;
    message.value = 'Sản phẩm đã tồn tại và thông tin đã được hiển thị!';
  } else {
    message.value = '';  // Không có sản phẩm, xóa thông báo
  }
};

// Hàm lưu sản phẩm
const saveProduct = async () => {
  const payload = {
    product_id: product.value.productId,
    name: product.value.name,
    quantity: 0,
    price: product.value.price,
    category_id: product.value.categoryId,
    supplier_id: product.value.supplierId,
    sell: product.value.sell,
    img: product.value.img,
    expirationDate: product.value.expirationDate
  };

  try {
    if (!existingProducts.value.some(product => product.productId === product.value.productId)) {
      await axios.post('/ProductCatalog/importProduct', payload);
      message.value = 'Sản phẩm đã được thêm thành công!';
      router.push('/importGoodList');
    }
  } catch (error) {
    console.error('Lỗi khi thêm sản phẩm:', error);
    message.value = 'Thêm sản phẩm thất bại!';
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
          <div class="form-container">
            <h2>Thêm sản phẩm mới</h2>
            <div v-if="message" class="message">{{ message }}</div>
            <div class="form-grid">
              <div class="left-form">
                <div class="form-group">
                  <label>Danh mục <span class="required">*</span></label>
                  <select v-model="product.categoryId">
                    <option disabled value="">Chọn danh mục</option>
                    <option v-for="cat in categories" :key="cat.categoryId" :value="cat.categoryId">{{ cat.name }}</option>
                  </select>
                </div>

                <div class="form-group">
                  <label>Tên sản phẩm <span class="required">*</span></label>
                  <input v-model="product.name" type="text" @blur="checkProduct" />
                </div>

                <div class="form-group">
                  <label>Giá bán</label>
                  <input type="number" v-model="product.price" />
                </div>

                <div class="form-group">
                  <label>Mã sản phẩm</label>
                  <input v-model="product.productId" type="text" />
                </div>

                <div class="form-group">
                  <label>Ngày hết hạn</label>
                  <input v-model="product.expirationDate" type="datetime-local" />
                </div>
              </div>

              <div class="right-form">
                <div class="image-upload">
                  <label>Hình đại diện (600x400)</label>
                  <input type="text" v-model="product.img" placeholder="URL ảnh hoặc chọn ảnh" />
                </div>

                <div class="form-group">
                  <label>Nhà cung cấp</label>
                  <select v-model="product.supplierId">
                    <option disabled value="">Chọn nhà cung cấp</option>
                    <option v-for="sup in suppliers" :key="sup.supplierId" :value="sup.supplierId">{{ sup.name }}</option>
                  </select>
                </div>

                <div class="form-group">
                  <label>Trạng thái</label>
                  <select>
                    <option>Hiển thị</option>
                    <option>Ẩn</option>
                  </select>
                </div>

                <div class="form-group">
                  <label>Nổi bật</label>
                  <select>
                    <option>Không</option>
                    <option>Có</option>
                  </select>
                </div>

                <div class="form-group">
                  <label>Thứ tự</label>
                  <input type="number" value="0" />
                </div>
              </div>
            </div>
            <div class="button-group">
              <router-link to="/importGoodList" class="back-button">Quay lại</router-link>
              <button @click="saveProduct">Lưu sản phẩm</button>
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
  margin-left: 18%;
  position: relative;
}

.page {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  position: relative;
  font-family:Arial, Helvetica, sans-serif;
}
.page-main{
    display: flex;
    flex-direction: column;
    margin-top: 6%;
    padding: 0px 30px;
    background-color: #f5f5f5;
}
.form-container {
  padding: 30px;
  font-family: Arial, sans-serif;
  background-color: #fff;
}

h2 {
  color: #0884f1;
  margin-bottom: 20px;
}

.form-grid {
  display: flex;
  gap: 30px;
}

.left-form,
.right-form {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input,
.form-group select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.required {
  color: red;
}

.image-upload input {
  padding: 8px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.message {
  margin-top: 20px;
  padding: 10px;
  background-color: #f2f2f2;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
}
button {
  margin-top: 20px;
  background-color: #0884f1;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #279aff;
}
.button-group {
  display: flex;
  justify-content: space-between;
}
.back-button {
  margin-top: 20px;
  background-color: #0884f1;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.back-button:hover {
  background-color: #279aff;
}
a{
  text-decoration: none;
}
</style>
