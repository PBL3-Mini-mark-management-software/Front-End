<script setup>
import { ref } from 'vue';
import Mainpage from '../components/Mainpage.vue';

const fullName = ref('Nguyễn Văn A');
const employeeCode = ref('01');
const position = ref('Nhân viên bán hàng');
const identityNumber = ref('083729754835');
const email = ref('nguyenvana123@gmail.com');
const phoneNumber = ref('123456789');
const birthDate = ref('2005-04-21'); 
const gender = ref('Nam');
const address = ref('17 Ngô Chân Lưu');
const status = ref('Đang làm việc');
const statusOptions = ['Đang làm việc', 'Nghỉ phép', 'Đã nghỉ'];
const city = ref('Đà Nẵng');
const cityOptions = ["An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu", "Bắc Ninh", "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước", "Bình Thuận", "Cà Mau", "Cần Thơ", "Cao Bằng", "Đà Nẵng", "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp", "Gia Lai", "Hà Giang", "Hà Nam", "Hà Nội", "Hà Tĩnh", "Hải Dương", "Hải Phòng", "Hậu Giang", "Hòa Bình", "Hồ Chí Minh", "Hưng Yên", "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lâm Đồng", "Lạng Sơn", "Lào Cai", "Long An", "Nam Định", "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Phú Yên", "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang", "Vĩnh Phúc", "Vĩnh Long", "Yên Bái"];
</script>

<template>
    <div class="main-container">
      <div class="mainpage">
        <Mainpage />
      </div>
      <div class="container">
        <div class="header">Cấu hình cá nhân</div>
        <div class="staff_information">
          <p>Thông tin nhân viên</p>
          <div class="staff_content">
            <div class="form-group">
                <label>👤 Họ và tên<span class="required">*</span></label>
                <input type="text" v-model="fullName" placeholder="Nhập họ tên" class="form-input" />
            </div>
            <div class="form-group">
                <label>Mã nhân viên<span class="required">*</span></label>
                <input type="text" v-model="employeeCode" placeholder="Nhập mã nhân viên" class="form-input" />
            </div>
            <div class="form-group">
                <label>🆔 CMND/CCCD</label>
                <input type="text" v-model="identityNumber" placeholder="Nhập số CMND/CCCD" class="form-input" />
            </div>
            <div class="form-group">
                <label>✉️ Email</label>
                <input type="email" v-model="email" placeholder="Nhập email" class="form-input" />
            </div>
            <div class="form-group">
                <label>📞 Số điện thoại<span class="required">*</span></label>
                <input type="text" v-model="phoneNumber" placeholder="Nhập số điện thoại" class="form-input" />
            </div>
            <div class="form-group">
                <label>🎂 Ngày sinh</label>
                <input type="date" v-model="birthDate" class="form-input" />
            </div>
            <div class="form-group">
                <label>🚻 Giới tính</label>
                <select v-model="gender" class="form-input">
                <option value="">Chọn giới tính</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
                </select>
            </div>
            <div class="form-group">
                <label>🧑‍💼 Vị trí</label>
                <input type="text" v-model="position" placeholder="Nhập chức vụ" class="form-input" />
            </div>
            <div class="form-group">
                <label>🏠 Địa chỉ</label>
                <input type="text" v-model="address" placeholder="Nhập địa chỉ" class="form-input" />
            </div>
            <div class="form-group">
                <label>🏙️ Tỉnh/Thành phố</label>
                <select v-model="city" class="form-input">
                <option v-for="option in cityOptions" :key="option" :value="option">{{ option }}</option>
                </select>
            </div>
            <div class="form-group">
                <label>📌 Trạng thái</label>
                <select v-model="status" class="form-input">
                <option v-for="option in statusOptions" :key="option" :value="option">{{ option }}</option>
                </select>
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
.staff_information {
  margin: 80px;
  padding: 30px;
  box-shadow: 2px 2px 5px #949393;
  display: flex;
  align-items: start;
  flex-direction: column;
  gap: 40px;
}
.staff_information p {
  font-size: 20px;
  font-weight: bold;
  font-family: 'Noto Sans', sans-serif;
  text-align: start;
  margin: 0;
  max-width: 900px;
}
.staff_content {
  display: flex;
  flex-direction: column;
  font-size: 15px;
  font-family: 'Noto Sans', sans-serif;
  color: #474646;
  width: 100%;
  gap: 15px;
}
.infor-section {
  display: flex;
  flex-direction: row;
  gap: 20px;
}
.form-group {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.form-group label {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 10px;
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
