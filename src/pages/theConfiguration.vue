<script setup>
import { ref, computed } from 'vue';
import Mainpage from '../components/Mainpage.vue';


const storeName = ref('MIMI MART');
const emailName = ref('mimimart123@gmail.com');
const phoneNumber = ref('123456789');
const address = ref('');
const country = ref('Vietnam');
const city = ref('Đà Nẵng');
const countryOptions = ['Vietnam'];
const cityOptions = ["An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu", "Bắc Ninh", "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước", "Bình Thuận", "Cà Mau", "Cần Thơ", "Cao Bằng", "Đà Nẵng", "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp", "Gia Lai", "Hà Giang", "Hà Nam", "Hà Nội", "Hà Tĩnh", "Hải Dương", "Hải Phòng", "Hậu Giang", "Hòa Bình", "Hồ Chí Minh", "Hưng Yên", "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lâm Đồng", "Lạng Sơn", "Lào Cai", "Long An", "Nam Định", "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Phú Yên", "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang", "Vĩnh Phúc", "Vĩnh Long", "Yên Bái"];


const hourOptions = [];
for (let i = 0; i <= 24; i++) {
  hourOptions.push(i.toString().padStart(2, '0'));
}
const minuteOptions = [];
for (let i = 0; i <= 60; i++) {
  minuteOptions.push(i.toString().padStart(2, '0'));
}

const openingHour = ref('07');
const openingMinute = ref('00');
const closingHour = ref('21');
const closingMinute = ref('30');

const openingTime = computed(() => `${openingHour.value}:${openingMinute.value}`);
const closingTime = computed(() => `${closingHour.value}:${closingMinute.value}`);

const typeOfSale = ref('Offline');
const taxCode = ref('6492382183');
const ocurrencyUnit = ref('VND');
const formOfPayment = ref('Tiền mặt');
</script>

<template>
  <div class="main-container">
    <div class="mainpage">
      <Mainpage />
    </div>
    <div class="container">
      <div class="header">Cấu hình chung</div>
 
      <div class="store_information">
        <p>Thông tin siêu thị</p>
        <div class="store_content">
          <p>🖼️Logo</p>
          <div class ="logo"></div>
          <div class="infor-section">
            <div class="form-group">
              <label for="storeName">🏪Tên cửa hàng<span class="required">*</span></label>
              <input type="text" v-model="storeName" :placeholder="storeName === '' ? 'Nhập tên cửa hàng' : ''" class="form-input" />
            </div>
            <div class="form-group">
              <label for="emailName">✉️ Email quản trị</label>
              <input type="text" v-model="emailName" :placeholder="emailName === '' ? 'Nhập email quản trị' : ''" class="form-input" />
            </div>
          </div>
          <div class="infor-section">
            <div class="form-group">
              <label for="phoneNumber">☎️ Số điện thoại<span class="required">*</span></label>
              <input type="text" v-model="phoneNumber" :placeholder="phoneNumber === '' ? 'Nhập số điện thoại' : ''" class="form-input" />
            </div>
            <div class="form-group">
              <label for="address">🗺️ Địa chỉ</label>
              <input type="text" v-model="address" :placeholder="address === '' ? 'Nhập địa chỉ' : ''" class="form-input" />
            </div>
          </div>
          <div class="infor-section">
            <div class="form-group">
              <label for="country">🌍 Quốc gia</label>
              <select v-model="country" class="form-input">
                <option v-for="option in countryOptions" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="city">🏙️ Tỉnh/Thành phố</label>
              <select v-model="city" class="form-input">
                <option v-for="option in cityOptions" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <div class="store_information">
        <p>Cài đặt vận hành</p>
        <div class="store_content">
          <div class="infor-section">
            <div class="form-group">
              <label for="openingTime">🕒 Thời gian mở cửa<span class="required">*</span></label>
              <div class="timeGroup">
                <select v-model="openingHour" class="form-input">
                  <option v-for="option in hourOptions" :key="option" :value="option">
                    {{ option }}
                  </option>
                </select>
                <select v-model="openingMinute" class="form-input">
                  <option v-for="option in minuteOptions" :key="option" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label for="closingTime">🕒 Thời gian đóng cửa</label>
               <div class="timeGroup">
                <select v-model="closingHour" class="form-input">
                  <option v-for="option in hourOptions" :key="option" :value="option">
                    {{ option }}
                  </option>
                </select>
                <select v-model="closingMinute" class="form-input">
                  <option v-for="option in minuteOptions" :key="option" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="infor-section">
            <div class="form-group">
              <label for="typeOfSale">🛍️ Loại hình bán hàng</label>
              <input type="text" v-model="typeOfSale" :placeholder="typeOfSale === '' ? 'Nhập loại hình bán hàng' : ''" class="form-input" />
            </div>
            <div class="form-group">
              <label for="taxCode">🏷️ Mã số thuế</label>
              <input type="text" v-model="taxCode" :placeholder="taxCode === '' ? 'Nhập mã số thuế' : ''" class="form-input" />
            </div>
          </div>
          <div class="infor-section">
            <div class="form-group">
              <label for="currencyUnit">🔢 Đơn vị tiền tệ<span class="required">*</span></label>
              <input type="text" v-model="ocurrencyUnit" :placeholder="ocurrencyUnit === '' ? 'Nhập đơn vị tiền tệ' : ''" class="form-input" />
            </div>
            <div class="form-group">
              <label for="formOfPayment">💳 Hình thức thanh toán hỗ trợ</label>
              <input type="text" v-model="formOfPayment" :placeholder="formOfPayment === '' ? 'Nhập hình thức thanh toán hỗ trợ' : ''" class="form-input" />
            </div>
          </div>
        </div>
      </div>
      
      <div style="height: 20px; flex-shrink: 0;"></div>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}
body {
  background-color: #FFFFFF;
  padding: 0;
  margin: 0;
  font-family: 'Noto Sans', sans-serif;
}
.main-container {
  display: flex;
  width: 100%;
  height: 100vh;
  position: relative;
  overflow-y: auto;
  flex-shrink: 0;
}
.mainpage {
  width: 18%;
  flex-shrink: 0;
  display: flex;
}
.container {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-bottom: 20px;
}
.header {
  padding: 0;
  box-shadow: 2px 2px 5px #949393;
  font-size: 25px;
  font-weight: bold;
  min-height: 70px;
  padding-left: 30px;
  width: 100%;
  display: flex;
  align-items: center;
  font-family: 'Noto Sans', sans-serif;
}
.store_information {
  margin: 40px;
  padding: 30px;
  box-shadow: 2px 2px 5px #949393;
  display: flex;
  align-items: start;
  flex-direction: column;
  gap: 20px;
}
.store_information p {
  font-size: 20px;
  font-weight: bold;
  font-family: 'Noto Sans', sans-serif;
  text-align: start;
  margin: 0;
}
.store_content {
  display: flex;
  flex-direction: column;
  font-size: 15px;
  font-family: 'Noto Sans', sans-serif;
  color: #474646;
  width: 100%;
  gap: 15px;
}
.logo {
  width: 100%;
  height: 400px;
  object-fit: fill;
  background-size: cover; 
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('https://mosieuthi.vn/wp-content/uploads/2024/03/chuong-trinh-khai-truong-sieu-thi.jpg');
}
.infor-section {
  display: flex;
  flex-direction: row;
  gap: 20px;
}
.form-group {
  display: flex;
  flex-direction: column;
  width: 50%;
}
.timeGroup{
  display: flex;
  flex-direction: row;
  gap: 10px;
}
.form-group label {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 5px;
}
.required {
  color: red;
  margin-left: 4px;
}
.form-input {
  height: 36px;
  padding: 3px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  font-family: 'Noto Sans', sans-serif;
}
</style>
