<script setup>
import { ref, onMounted, computed, watch, defineProps } from 'vue';
import axios from 'axios';

const selectedProduct = ref([]);
const products = ref([]);
const filterProducts = ref([]);
const message = ref('');

onMounted(() => {
  axios.get('http://localhost:8080/ProductCatalog')
    .then(response => {
      console.log('Fetched products:', response.data);
      products.value = response.data;
      filterProducts.value = response.data;
    })
    .catch(error => {
      console.error('Failed to fetch products:', error);
    });
});

const currentPage = ref(1);
const itemsPerPage = 20;

const props = defineProps({
  mode: {
    type: String,
    default: 'normal',
  },
});


function increaseQuantity(id) {
  editableQuantities.value[id] += 5;
}
function decreaseQuantity(id) {
  if (editableQuantities.value[id] > 5) {
    editableQuantities.value[id] -= 5;
  } else {
    editableQuantities.value[id] = 0;
  }
}


const pagedProducts = computed(() => {
  const today = new Date();
  const in15Days = new Date();
  in15Days.setDate(today.getDate() + 15);

  let filtered;
  if (props.mode === 'importGoods') {
    filtered = products.value.filter(u => {
      const isLowStock = u.quantity < 30 || u.quantity === 0;

      if (!u.expirationDate) {
        return isLowStock;
      }

      const expiry = new Date(u.expirationDate);
      if (isNaN(expiry)) {
        return isLowStock;
      }

      const isNearOrPastExpiry = expiry.getTime() <= in15Days.getTime();
      return isLowStock || isNearOrPastExpiry;
    });
  } else {
    filtered = filterProducts.value;
  }

  let sorted;
  if (props.mode === 'desc') {
    sorted = [...filtered].sort((a, b) => b.quantity - a.quantity);
  } else {
    sorted = [...filtered];
  }

  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return sorted.slice(start, end);
});

function getImportQuantity(product) {
  const totalQuantity = product.sell + product.quantity;
  const percentage = totalQuantity ? product.sell / totalQuantity : 0;
  let importQuantity;
  if (percentage >= 0.75) {
    importQuantity = totalQuantity + totalQuantity * 0.75;
  } else if (percentage >= 0.5 && percentage < 0.75) {
    importQuantity = totalQuantity + totalQuantity * 0.5;
  } else if (percentage > 0.25 && percentage < 0.5) {
    importQuantity = product.quantity + product.quantity * 0.3;
  } 
  else if (product.quantity === 0){
    importQuantity = 50;
  } else {
    importQuantity = product.quantity + product.quantity * 0.15;
  }

  return Math.round(importQuantity);
}

const totalItems = computed(() => {
  const today = new Date();
  const in15Days = new Date();
  in15Days.setDate(today.getDate() + 15);

  if (props.mode === 'importGoods') {
    return products.value.filter(u => {
      const isLowStock = u.quantity < 30 || u.quantity === 0;

      if (!u.expirationDate) {
        return isLowStock;
      }

      const expiry = new Date(u.expirationDate);
      if (isNaN(expiry)) {
        return isLowStock;
      }

      const isNearOrPastExpiry = expiry.getTime() <= in15Days.getTime();
      return isLowStock || isNearOrPastExpiry;
    }).length;
  } else {
    return filterProducts.value.length;
  }
});

const totalPages = computed(() => {
  return Math.ceil(totalItems.value / itemsPerPage);
});

function changePage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

function deleteProduct(productId) {
  // Loại bỏ sản phẩm khỏi danh sách hiện tại
  products.value = products.value.filter(product => product.productId !== productId);
  filterProducts.value = filterProducts.value.filter(product => product.productId !== productId);
}

watch(() => {
  currentPage.value = 1;
});
const editableQuantities = ref({});

watch(pagedProducts, (newProducts) => {
  newProducts.forEach(product => {
    if (!(product.productId in editableQuantities.value)) {
      editableQuantities.value[product.productId] = getImportQuantity(product);
    }
  });
}, { immediate: true });
</script>


<template>
  <div v-if="message" class="message">{{ message }}</div>
  <div class="container-part">
    <div class="title-container">
      <div class="title">
        <span class="underline-text">Tất cả</span>
      </div>
    </div>
    <div class="list-product">
      <div class="list-product-row header-row">
        <div class="display-jus-ali checkbox"></div>
        <div class="product display-jus-ali" style="color: black; font-weight: 600; margin-right: 10px;">Sản phẩm</div>
        <div class="display-jus-ali sell">Số lượng</div>
        <div class="display-jus-ali type">Loại</div>
        <div class="display-jus-ali date-of-creation">
          <div>Giá</div>
        </div>
        <div class="display-jus-ali actions">
          <div>Hành động</div>
        </div>
      </div>
      <div v-for="product in pagedProducts" :key="product.productId" class="list-product-row">
        <input type="checkbox" v-model="selectedProduct" class="checkbox display-jus-ali" :value="product.productId">
        <div class="product display-jus-ali" style="justify-content: flex-start;">
          <img :src="product.img" alt="product image" class="product-img">
          <span>{{ product && product.name ? product.name : 'Tên sản phẩm không có' }}</span>
        </div>
        <div class="sell quantity-control">
            <button @click="decreaseQuantity(product.productId)">–</button>
            <input
                type="number"
                v-model.number="editableQuantities[product.productId]"
                min="0"
            >
            <button @click="increaseQuantity(product.productId)">+</button>
        </div>

        <div class="display-jus-ali type">{{ product.category && product.category.name ? product.category.name : 'Loại không có' }}</div>
        <div v-if="!displayEdit_2" class="display-jus-ali date-of-creation">
          <div>{{ product.price }}</div>
        </div>
        <div class="actions">
            <button @click="deleteProduct(product.productId)" class="delete-btn">Xóa</button>
        </div>
      </div>
    </div>
    <div class="fitPage">
      <span>
        Từ {{ (currentPage - 1) * itemsPerPage + 1 }} đến
        {{ Math.min(currentPage * itemsPerPage, totalItems) }}
        trên tổng {{ totalItems }}
      </span>
      <div class="pagination">
        <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">‹</button>
        <button v-for="page in totalPages" :key="page"
          :class="{ active: page === currentPage }"
          @click="changePage(page)">
          {{ page }}
        </button>
        <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">›</button>
      </div>
    </div>
  </div>
  <div class="createOrder-Container">
        <div class="createOrder">
            Tạo đơn nhập
        </div>
    </div>
</template>


<style scoped>
.container-part{
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    border-radius: 5px;
    border: 1px solid rgb(210, 210, 210);
    box-shadow: rgb(196, 196, 196);
    padding: 10px;
}
.title-container{
    width: 100%;
    border-bottom: rgb(210, 210, 210);
}
.title{
    box-sizing: border-box;
    color: #0884f1;
    padding: 5px;
    border-bottom: 1px solid rgb(210, 210, 210);
}
.underline-text {
    border-bottom: 2px solid #0884f1;
    padding: 5px;
}
.content{
    display: flex;
    flex-direction: column;
}
.classify {
    padding: 15px 10px;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
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
.search {
    display: flex;
    padding: 5px 20px 5px 5px;
    border-radius: 5px;
    border: 1px solid  rgb(148, 148, 148);
    color: rgb(100, 100, 100);
    gap: 8px;
    width: 35%;
    height: 25px;
    display: flex;
    align-items: center;
}
.search input{
    border: none;
    outline: none;
    background: transparent;
    width: 100%;
}
.informationProduct {
    display: flex;
    border-radius: 8px;
    border: 1px solid  rgb(148, 148, 148);
    height: 100%;
    height: 35px;
    font-weight: 300;
    align-items: center;
}

.Sale-Type-Tag,
.Sale-Type-Tag-dis {
    padding: 5px 12px;
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    white-space: nowrap;
    transition: background-color 0.3s ease;
    box-sizing: border-box;
    transition: all 0.2s ease;
}
.Sale-Type-Tag i,
.Sale-Type-Tag-dis i {
    color: rgb(148, 148, 148);
    font-size: 12px;
}
.dropdown-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  border-right: 1px solid rgb(200, 200, 200);
  transition: all 0.2s ease;
}
.dropdown-wrapper:hover{
    background-color: #f0f0f0;
}
.dropdown-wrapper:active{
    transform: scale(0.95);
}
.dropdown {
  width: auto;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid rgb(200, 200, 200);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin-top: 5px;
  z-index: 10;
  min-width: 150px;
}
.dropdown ul{
    list-style: none;
    padding: 5px 0;
    margin: 0;
}
.dropdown li{
    padding: 8px 16px;
    cursor: pointer;
    transition: background-color 0.2s ease;
}
.dropdown li:hover{
    background-color: #f5f5f5;
}
.dropdown li.selected {
  background-color: #f5f5f5;
}
.save-filter-btn{
    margin-left: 12px;
    height: 35px;
    padding: 6px 16px;
    border: none;
    border-radius: 5px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s ease;
}
.save-filter-btn.inactive{
    background-color: #81c1fa;
    color: rgb(200, 200, 200);
}
.save-filter-btn.active{
    background-color: #0884f1;
    color: white;
}
.save-filter-btn:active{
    transform: scale(0.95);
}
.list-product{
    display: flex;
    flex-direction: column;
    padding-left: 8px;
    padding-right: 8px;
}
.list-product-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #e0e0e0;
    gap: 10px;
}
.display-jus-ali {
    display: flex;
    justify-content: center;
    align-items: center;
}
.checkbox{
    width: 5%;
    border: 1px solid rgb(148, 148, 148);
}
.product{
    width: 30%;
    color:#0884f1;
    font-weight: 400;
    gap: 10px;
    justify-content: flex-start;
    display: flex;
    align-items: center;
}
.date-of-creation {
    justify-content: center;
    display: flex;
    align-items: center;
}
.actions {
    justify-content: center;
    display: flex;
    align-items: center;
    width: 5%;
    white-space: nowrap;
    margin-right: 10px;
}
.product-img{
    border-radius: 5px;
    border: 1px solid rgb(148, 148, 148);
    padding: 2px;
    width: 50px;
    height: 50px;
    background-size: cover; 
    background-position: top;
    background-repeat: no-repeat;
}
.header-row {
    font-weight: bold;
    background-color: #f4f4f4;
}
.sell{
    width: 10%;
}
.type{
    width: 15%;
}
.trademark{
    width: 15%;
}
.date-of-creation{
    width: 20%;
}
.fitPage{
    margin-top: 20px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.pagination{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    transition: all 0.2s ease;
}
.pagination button.active {
    background-color: #007bff;
    color: white;
}
.action-buttons {
    display: flex;
    gap: 10px;
    align-items: center;
}

.edit-btn, .delete-btn {
    padding: 5px 10px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
}

.delete-btn {
    background-color: #dc3545;
}

.edit-btn:hover, .delete-btn:hover {
    opacity: 0.8;
}
.createOrder-Container{
    display: flex;
    justify-content: end;
    padding-top: 20px;
    padding-bottom: 20px;
}
.createOrder{
    padding: 20px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    border-radius: 30px;
}
.createOrder:active{
  transform: scale(0.95);
  background-color: #1d85f5;
}
.sell button {
  padding: 2px 8px;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;
  border-radius: 3px;
}
.sell input {
  border: 1px solid #ccc;
  border-radius: 3px;
  height: 30px;
}
.quantity-control {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.quantity-control button {
  height: 40px;
  width: 40px;
  text-align: center;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;
  font-size: 18px;
  border-radius: 5px;
  padding: 5px;
}

.quantity-control input[type="number"] {
  height: 40px;
  width: 60px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  -moz-appearance: textfield;
}

.quantity-control input::-webkit-outer-spin-button,
.quantity-control input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

</style>