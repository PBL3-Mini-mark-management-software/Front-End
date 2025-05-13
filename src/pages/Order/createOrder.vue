<script setup>
import { ref,computed, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter()
const productList = ref([]);
const customers = ref([]);
const selectedProductIds = ref([]);
const orderItems = ref([]);
const customerPhone = ref('');
const customerInfo = ref(null);
const vouchers = ref([]);
const selectedCustomer = ref('');
const selectedVoucher = ref(null);
const searchText = ref('');
const employeeId = ref('');

// Gọi API để lấy danh sách sản phẩm
const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:8081/api/products'); // Đường dẫn API backend
    productList.value = response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sản phẩm:', error);
  }
};

// Gọi API để lấy danh sách khách hàng
const fetchCustomers = async () => {
  try {console.log("fetchCustomers");
    const response = await axios.get('http://localhost:8081/api/customers'); // Đường dẫn API backend
    customers.value = response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách khách hàng:', error);
  }
};

// Khi component được mount, gọi API để lấy dữ liệu
onMounted(() => {
  fetchProducts();
  fetchCustomers();
});

const addToOrder = (product) => {
  const exists = orderItems.value.find((item) => item.product_id === product.product_id);
  const checked = selectedProductIds.value.includes(product.product_id);
  if (checked && !exists) {
    orderItems.value.push({ ...product, quantity: 1 });
  } else if (!checked && exists) {
    orderItems.value = orderItems.value.filter((item) => item.product_id !== product.product_id);
  }
};

const filteredProducts = computed(() => {
  if (!searchText.value) return productList.value;
  return productList.value.filter(product =>
    product.name.toLowerCase().includes(searchText.value.toLowerCase())
  );
});
const removeFromOrder = (item) => {
  orderItems.value = orderItems.value.filter((p) => p.product_id !== item.product_id);
  selectedProductIds.value = selectedProductIds.value.filter((id) => id !== item.product_id);
};

const increaseQuantity = (item) => {
  const product = productList.value.find(p => p.product_id === item.product_id);
  if (!product || item.quantity >= product.quantity) {
    alert("Số lượng vượt quá tồn kho!");
    return;
  }
  item.quantity++;
};
const decreaseQuantity = (item) => {
  if (item.quantity > 1) item.quantity--;
};

const totalPrice = computed(() => {
  const total = orderItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // if (selectedVoucher.value) {
  //   return total - total * (selectedVoucher.value.discount / 100);
  // }
  return total;
});

const checkCustomer = () => {
  console.log("checkCustomer");
  const customer = customers.value.find((c) => c.phone === customerPhone.value);
  if (customer) {
    customerInfo.value = customer;
    selectedCustomer.value = customer.name;
    customerPhone.value = null;

    const { membership_type, points } = customer;
    let discount = 0;
    // console.log(membership_type, points);

    if (membership_type === 'Đồng') {
      if (points >= 400) discount = 7;
      else if (points >= 300) discount = 5;
    } else if (membership_type === 'Bạc') {
      if (points >= 600) discount = 10;
      else if (points >= 500) discount = 7;
      else if (points >= 400) discount = 5;
    } else if (membership_type === 'Vàng') {
      if (points >= 800) discount = 15;
      else if (points >= 600) discount = 10;
      else if (points >= 500) discount = 7;
    } else if (membership_type === 'Kim cương') {
      if (points == 1000) discount = 20;
      else if (points >= 800) discount = 15;
      else if (points >= 600) discount = 10;
    }
    // console.log(discount);
    if (discount > 0) {
      vouchers.value = [{
        id: 'V' + discount,
        name: `Giảm ${discount}%`,
        discount: discount,
      }];
    } else {
      vouchers.value = [];
    }
  } else {
    customerInfo.value = null;
    selectedCustomer.value = '';
    vouchers.value = [];
    alert('Không tìm thấy khách hàng.');
  }
  console.log(vouchers.value)
};
const submitOrder = async () => {
  if (orderItems.value.length === 0) {
    alert('Vui lòng chọn khách hàng và sản phẩm.');
    return;
  }

  const payload = {
    employee: {
      employee_id: employeeId.value,
    },
    customer: customerInfo.value
      ? { customer_id: customerInfo.value.customer_id }
      : null,
    voucher: selectedVoucher.value ? selectedVoucher.value.discount : 0,
    order_detail: orderItems.value.map(item => ({
      product: {
        product_id: item.product_id
      },
      product_quantity: item.quantity
    }))
  };


  try {

    const response = await axios.post('http://localhost:8081/api/orders', payload);
    alert(`Đơn hàng đã được tạo thành công với mã: ${response.data.order_id}`);

    // Chuyển sang trang invoiceOrder
    if(customerPhone){
      router.push({
        path: `/orders/${response.data.order_id}`,
        query: {
          phone: customerPhone.value
        }
      })
    }else{
      router.push({
        path: `/orders/${response.data.order_id}`,
      })
    }
   
    resetOrder();
  } catch (error) {
    console.error('Lỗi khi tạo đơn hàng:', error);
    alert('Tạo đơn hàng thất bại.');
  }
};

const toggleVoucher = (voucher) => {
  if (selectedVoucher.value && selectedVoucher.value.id === voucher.id) {
    selectedVoucher.value = null; // Bỏ chọn nếu đang chọn
  } else {
    selectedVoucher.value = voucher; // Chọn mới
  }

};
const resetOrder = () => {
  selectedProductIds.value = [];
  employeeId.value = '';
  selectedCustomer.value = '';
  customerPhone.value = '';
  customerInfo.value = null;
  vouchers.value = [];
  selectedVoucher.value = null;
  orderItems.value = [];
};
</script>
<template>
  <div class="main-container">
    <div class="header">
      <router-link to="/Home" class="back-button" style="text-decoration: none;">⬅️</router-link>
      <span class="title">Tạo đơn hàng</span>
    </div>

    <div class="order-container">
      <!-- DANH SÁCH SẢN PHẨM -->
        <div class="product-list">
    <h2 class="section-title">Danh sách sản phẩm</h2>
    <input type="text" v-model="searchText"
    placeholder="Tìm kiếm sản phẩm theo tên..."
    style="margin-bottom: 12px; width: 100%; padding: 8px; border-radius: 6px; border: 1px solid #ccc;"
  />
    <div class="list-product-head">
      <div class="checkbox-col"></div>
      <div class="name-col">Sản phẩm</div>
      <div class="brand-col">Thương hiệu</div>
      <!-- <div class="stock-col">Số lượng tồn kho</div> -->
    </div>
    <div
      v-for="product in filteredProducts"
      :key="product.product_id"
      class="list-product-row"
    >
      <div class="checkbox-col">
        <input
          type="checkbox"
          :value="product.product_id"
          v-model="selectedProductIds"
          @change="addToOrder(product)"
        />
      </div>
      <div class="name-col product-info">
        <img :src="product.img" alt="product image" class="product-img" />
        <span>{{ product.name }}</span>
      </div>
      <div class="brand-col">{{ product.supplier?.name || 'N/A' }}</div>
      <!-- <div class="stock-col">{{ product.quantity }}</div> -->
    </div>
  </div>

      <!-- Right: Order Info -->
      <div class="info-order">
        <div class="order-header">
          <h2>Thông tin đơn hàng</h2>
        </div>
        <div class="order-info">
        <label>Mã nhân viên:</label>
        <input type="text" v-model="employeeId" placeholder="Nhập mã nhân viên" style="margin-bottom: 12px;" />
          <label>Số điện thoại khách hàng:</label>
          <div class="customer-check">
            <input type="text" v-model="customerPhone" placeholder="Nhập số điện thoại khách hàng" />
            <button @click="checkCustomer">Kiểm tra khách hàng</button>
          </div>
          
          <div v-if="customerInfo">
            <p>Khách hàng: {{ customerInfo.name }}</p>
            <p>Hạng: {{ customerInfo.membership_type }}</p>
            <p>Điểm: {{ customerInfo.points }}</p>
          </div>
          <div v-if="vouchers.length > 0">
            <label>Chọn voucher:</label>
            <div class="voucher-buttons">
              <button
                v-for="voucher in vouchers"
                :key="voucher.id"
                :class="{ selected: selectedVoucher && selectedVoucher.id === voucher.id }"
                @click="toggleVoucher(voucher)"
              >
                {{ voucher.name }}
              </button>
            </div>
          </div>
        </div>
        <div class="order-products">
          <h3>Sản phẩm đã chọn</h3>
          <table>
            <thead>
              <tr>
                <th>Tên</th>
                <th>Số lượng</th>
                <th>Giá</th>
                <th>Thành tiền</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in orderItems" :key="item.product_id">
                <td>{{ item.name }}</td>
                <td>
                  <button @click="decreaseQuantity(item)">-</button>
                  {{ item.quantity }}
                  <button @click="increaseQuantity(item)">+</button>
                </td>
                <td>{{ item.price }}</td>
                <td>{{ item.price * item.quantity }}</td>
                <td><button @click="removeFromOrder(item)">Xoá</button></td>
              </tr>
            </tbody>
          </table>
          <div class="total">
            Tổng: <strong>{{ totalPrice }}</strong>
          </div>
        </div>
        <div class="order-footer">
          <button class="reset" @click="resetOrder">Làm mới</button>
          <button class="submit" @click="submitOrder">Tạo đơn hàng</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f2f7fb;
  font-family: 'Noto Sans', sans-serif;
  padding: 0;
  margin: 0;
}

.header {
  font-size: 24px;
  font-weight: bold;
  padding: 20px;
  background-color: #1976d2;
  color: white;
  display: flex;
  align-items: center;
  gap: 10px;
}

.title {
  flex-grow: 1;
}

.order-container {
  display: flex;
  gap: 20px;
  padding: 20px;
}

.product-list, .info-order {
  flex: 1;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.section-title {
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #333;
}

.list-product-head, .list-product-row {
  display: grid;
  grid-template-columns: 1fr 6fr 4fr 1.5fr;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
}

.product-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.product-img {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  object-fit: cover;
}

.order-header h2 {
  font-size: 25px;
  margin-bottom: 16px;
  color: #333;
}

.order-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.order-info label {
  font-weight: 500;
  color: #333;
}

.order-info input,
.order-info select {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}

.order-products table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.order-products th,
.order-products td {
  border: 1px solid #ddd;
  padding: 10px;
  font-size: 14px;
}

.order-products th {
  background-color: #f0f0f0;
  color: #333;
}

.order-products td button {
  padding: 4px 8px;
  background-color: #e53935;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.order-products td button:hover {
  background-color: #c62828;
}

.order-products td button:nth-child(1),
.order-products td button:nth-child(3) {
  background-color: #42a5f5;
}

.order-products td button:nth-child(1):hover,
.order-products td button:nth-child(3):hover {
  background-color: #1e88e5;
}

.total {
  text-align: right;
  margin-top: 12px;
  font-size: 16px;
  font-weight: bold;
  color: #2e7d32;
}

.order-footer {
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.order-footer button {
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.order-footer .submit {
  background-color: #388be3;
  color: white;
}

.order-footer .submit:hover {
  background-color: #2a6fb9;
}

.order-footer .reset {
  background-color: #e0e0e0;
  color: #333;
}

.order-footer .reset:hover {
  background-color: #d0d0d0;
}
.customer-check {
  display: flex;
  align-items: center;
  gap: 10px;
}

.customer-check button {
  padding: 8px 12px;
  background-color: #388be3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.customer-check button:hover {
  background-color: #2a6fb9;
}
.voucher-buttons {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.voucher-buttons button {
  padding: 8px 12px;
  background-color: #e0e0e0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.voucher-buttons button:hover {
  background-color: #d0d0d0;
}

.voucher-buttons button.selected {
  background-color: #388be3;
  color: white;
}
</style>
