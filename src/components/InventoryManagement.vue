<template>
  <div class="inventory-container">
    <!-- Dòng 1: Sản phẩm sắp hết hàng và Sản phẩm tồn kho nhiều -->
    <div class="stock-container">
      <div class="low-stock-warning">
        <h3>Sản phẩm sắp hết hàng</h3>
        <ul>
          <li v-for="product in lowStockProducts" :key="product.id">
            <span class="product-name">{{ product.name }}</span>
            <span class="stock-count">Số lượng còn: {{ product.stock }}</span>
          </li>
        </ul>
      </div>

      <div class="high-stock-warning">
        <h3>Sản phẩm tồn kho nhiều</h3>
        <ul>
          <li v-for="product in highStockProducts" :key="product.id">
            <span class="product-name">{{ product.name }}</span>
            <span class="stock-count">Số lượng tồn: {{ product.stock }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Dòng 2: Cập nhật số lượng hàng tồn
    <div class="update-stock">
      <h3>Cập nhật số lượng hàng tồn</h3>
      <div class ="listProduct">
        <div v-for="product in filteredProducts" :key="product.id" class="product">
          <div class="product-name">{{ product.name }} - Số lượng hiện tại: {{ product.stock }}</div>
          <input v-model="product.newStock" type="number" placeholder="Cập nhật số lượng" />
          <button @click="updateStock(product.id)">Cập nhật</button>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const products = ref([
  { id: 1, name: 'Sữa tiệt trùng Vinamilk', stock: 15, newStock: null },
  { id: 2, name: 'Coca-Cola', stock: 7, newStock: null },
  { id: 3, name: 'Bột giặt Tide', stock: 2, newStock: null },
  { id: 4, name: 'Bánh quy Oreo', stock: 200, newStock: null },
  { id: 5, name: 'Snack khoai tây Walkers', stock: 50, newStock: null },
  { id: 6, name: 'Thịt bò nhập khẩu', stock: 70, newStock: null },
  { id: 7, name: 'Mì ăn liền Hảo Hảo', stock: 40, newStock: null },
  { id: 8, name: 'Đậu xanh đóng hộp', stock: 250, newStock: null },
]);

// const searchQuery = ref('');
// const filteredProducts = computed(() => {
//   return products.value.filter(product =>
//     product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
//   );
// });

const lowStockProducts = computed(() => {
  return products.value.filter(product => product.stock < 10);
});

const highStockProducts = computed(() => {
  return products.value.filter(product => product.stock > 100);
});

// function updateStock(productId) {
//   const product = products.value.find(p => p.id === productId);
//   if (product && product.newStock !== undefined && product.newStock !== null) {
//     product.stock = product.newStock;
//     product.newStock = null; // Reset input về trạng thái ban đầu
//   }
// }
</script>

<style scoped>
/* Container chính */
.inventory-container {
  padding: 10px;
  background-color: #f9fafb;
  border-radius: 12px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  width: 95%;
  margin: 10px;
}

/* Bố cục 2 cột */
.stock-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.low-stock-warning, .high-stock-warning {
  flex: 1;
}

/* Tiêu đề */
.low-stock-warning h3, .high-stock-warning h3 {
  font-size: 18px;
  font-weight: 600;
  color: #e74c3c;
  text-transform: uppercase;
  margin-bottom: 12px;
  width: 100%;
}
/* Danh sách sản phẩm */
.low-stock-warning ul, .high-stock-warning ul {
  list-style-type: none;
  padding: 0;
}

.low-stock-warning li, .high-stock-warning li {
  background-color: #fff;
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

/* Tên sản phẩm */
.product-name {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

/* Số lượng */
.stock-count {
  font-size: 14px;
  color: #555;
  background-color: #f7f7f7;
  padding: 6px 12px;
  border-radius: 8px;
}

/* Phần cập nhật sản phẩm */
.update-stock {
  margin-top: 30px;
}

.update-stock h3 {
  font-size: 20px;
  font-weight: 600;
  color: #34495e;
  text-transform: uppercase;
  margin-bottom: 20px;
}
.listProduct{
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.product {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  background-color: #fff;
  padding: 12px 18px;
  border-radius: 12px;
  box-shadow: 0px 5px 12px rgba(0, 0, 0, 0.1);
}

.product-name {
  flex: 2; /* Phần tên sản phẩm chiếm 2 phần */
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.product input {
  flex: 1; /* Ô nhập chiếm 1 phần */
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  text-align: center;
}

.product button {
  flex: 1; 
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  text-align: center;
}

.product button:hover {
  background-color: #2980b9;
  transform: scale(1.05);
}


.product button:active {
  transform: scale(0.98);
}
</style>
