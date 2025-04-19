<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

const Check = ref(false);
const CheckRef = ref(null);

// Tabs notification
const activeTab = ref('all'); // Default tab
const bellTab = computed(() => tabs.find(tab => tab.id === activeTab.value) || tabs[0]);
const currentTab = computed(() => listSearch.find(tab => tab.id === activeTab.value) || listSearch[0]);
const tabs = [
  { id: 'system', name: 'Hệ thống', message: 'Cửa hàng của bạn chưa có thông báo nào', icon: 'fa-solid fa-cog' },
  { id: 'news', name: 'Tin tức', message: 'Cửa hàng của bạn chưa có tin tức nào', icon: 'fa-solid fa-newspaper' },
  { id: 'promo', name: 'Khuyến mãi', message: 'Cửa hàng của bạn chưa có khuyến mãi nào', icon: 'fa-solid fa-tags' },
];

const listSearch = [
  { id: 'all', name: 'Tất cả', message: 'Nhập từ khóa để tìm kiếm sản phẩm, khách hàng,...', icon: 'fa-solid fa-magnifying-glass' },
  { id: 'product', name: 'Sản phẩm', message: 'Nhập từ khóa để tìm kiếm sản phẩm', icon: 'fa-solid fa-box' },
  { id: 'order', name: 'Đơn hàng', message: 'Nhập từ khóa để tìm kiếm đơn hàng', icon: 'fa-solid fa-receipt' },
  { id: 'customer', name: 'Khách hàng', message: 'Nhập từ khóa để tìm kiếm khách hàng', icon: 'fa-solid fa-user' },
];

// Dropdown user profile
const showDropdown = ref(false);
const profileRef = ref(null);

// Dropdown help
const showHelpDropdown = ref(false);
const helpRef = ref(null);

// Dropdown notification bell
const showNotification = ref(false);
const notificationRef = ref(null);

// Submenu
const showSubMenu = ref(false);
// Search
function SearchDropdown(event) {
  event.stopPropagation();
  Check.value = !Check.value;
}
function handleClickOutsideSearch(event) {
  if (CheckRef.value && !CheckRef.value.contains(event.target)) {
    Check.value = false;
  }
}

// Toggle dropdown profile
function toggleDropdown(event) {
  event.stopPropagation();
  showDropdown.value = !showDropdown.value;
}

// Toggle help
function toggleHelpDropdown(event) {
  event.stopPropagation();
  showHelpDropdown.value = !showHelpDropdown.value;
  if (!showHelpDropdown.value) {
    showSubMenu.value = false;
  }
}

// Toggle submenu
function toggleSubMenu(event) {
  event.stopPropagation();
  showSubMenu.value = !showSubMenu.value;
}

// Toggle notification bell
function toggleNotification(event) {
  event.stopPropagation();
  showNotification.value = !showNotification.value;
}

function changeTab(tabId) {
  activeTab.value = tabId; // Đảm bảo tab được cập nhật
}

// Click outside handlers
function handleClickOutsideProfile(event) {
  if (profileRef.value && !profileRef.value.contains(event.target)) {
    showDropdown.value = false;
  }
}

function handleClickOutsideHelp(event) {
  if (helpRef.value && !helpRef.value.contains(event.target)) {
    showHelpDropdown.value = false;
    showSubMenu.value = false;
  }
}

function handleClickOutsideNotification(event) {
  if (notificationRef.value && !notificationRef.value.contains(event.target)) {
    showNotification.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutsideProfile);
  document.addEventListener('click', handleClickOutsideHelp);
  document.addEventListener('click', handleClickOutsideNotification);
  document.addEventListener('click', handleClickOutsideSearch);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutsideProfile);
  document.removeEventListener('click', handleClickOutsideHelp);
  document.removeEventListener('click', handleClickOutsideNotification);
  document.removeEventListener('click', handleClickOutsideSearch);
});

</script>
<template>
    <div class="header">
          <!-- Search Section -->
          <div
            class="header-left"
            ref="CheckRef" 
            style="position: relative;"
            :class="{ active: Check }"
            @click="SearchDropdown">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Tìm kiếm (Ctrl + K)" />
            <div v-show="Check" class="notification-container" @click.stop>
              <div class="tabs">
                <div
                  v-for="tab in listSearch"
                  :key="tab.id"
                  :class="['tab', { active: activeTab === tab.id }]"
                  @click="changeTab(tab.id)"
                >
                  {{ tab.name }}
                </div>
              </div>
              <div class="tab-content">
                <i :class="currentTab.icon"></i>
                <p>{{ currentTab.message }}</p>
              </div>
            </div>
          </div>

          <!-- User & Icons Section -->
          <div class="header-right">
            <!-- Help Icon -->
            <div ref="helpRef" style="position: relative;">
              <i class="fa-regular fa-circle-question" @click="toggleHelpDropdown"></i>
              <div v-if="showHelpDropdown" class="dropdown-menu">
                <div class="dropdown-item">
                  <i class="fa-regular fa-circle-question"></i> Trung tâm trợ giúp 
                </div>
                <div class="dropdown-item">
                  <i class="fa-regular fa-comment"></i> Đóng góp ý kiến 
                </div>
                <!-- Dành cho khách hàng mới -->
                <div class="dropdown-item" @click="toggleSubMenu">
                  <i class="fa-solid fa-user"></i> Dành cho khách hàng mới
                  <i 
                    class="fa-solid" 
                    :class="showSubMenu ? 'fa-chevron-up' : 'fa-chevron-down'" 
                    style="margin-left: auto;"
                  ></i>
                </div>
                <!-- Submenu -->
                <transition name="fade">
                  <div v-if="showSubMenu" class="submenu">
                    <div class="dropdown-item">Thêm sản phẩm</div>
                    <div class="dropdown-item">Tạo đơn hàng</div>
                  </div>
                </transition>
                <div class="dropdown-item-spe">
                  <div>
                    <i class="fa-solid fa-phone"></i>
                    <span style="color: #007bff; margin-left: 8px;">1900 6750</span>
                  </div>
                  <div>
                    <i class="fa-solid fa-headset"></i> 
                    <span style="color: #007bff; margin-left: 8px;">
                      <a href="https://support.sapo.vn/createticket.html">Gửi hỗ trợ</a></span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Bell -->
              <div ref="notificationRef" style="position: relative;">
                <i class="fa-regular fa-bell" @click="toggleNotification"></i>
                <div v-if="showNotification" class="notification-container">
                  <div class="tabs">
                    <div
                      v-for="tab in tabs"
                      :key="tab.id"
                      :class="['tab', { active: activeTab === tab.id }]"
                      @click="changeTab(tab.id)"
                    >
                      {{ tab.name }}
                    </div>
                  </div>
                  <div class="tab-content" >
                    <i :class="bellTab.icon"></i>
                    <p>{{ bellTab.message }}</p>
                  </div>
                </div>
              </div>
            <!-- User Profile -->
            <div
              class="user-profile"
              ref="profileRef"
              @click="toggleDropdown"
            >
              <div class="user-info">
                <span class="avatar">T</span>
                <span class="user-name">Trần Thị Thúy T...</span>
                <i class="fa-solid fa-chevron-down"></i>
              </div>

              <!-- Dropdown -->
              <div v-if="showDropdown" class="dropdown-menu">
                <div class="dropdown-item">
                  <i class="fa-regular fa-user"></i> Tài khoản của bạn
                </div>
                <div class="dropdown-item">
                  <i class="fa-solid fa-box"></i> Thông tin gói dịch vụ
                </div>
                <div class="dropdown-item">
                  <i class="fa-solid fa-arrow-right-from-bracket"></i> Đăng xuất
                </div>
                <hr />
                <div class="dropdown-item">Điều khoản dịch vụ</div>
                <div class="dropdown-item">Chính sách bảo mật</div>
              </div>
            </div>
          </div>
        </div>
        
</template>
<style scoped>

.header {
  width: 85%;
  position: fixed;
  z-index: 1000;
  display: flex;
  align-items: center;
  background-color: white;
  box-shadow: 2px 2px 10px rgba(53, 53, 53, 0.1);
  font-family:Arial, Helvetica, sans-serif;
  height: 70px;
}

.header-left {
  margin: 10px;
  margin-left: 15px;
  display: flex;
  align-items: center;
  background-color: white;
  width: 50%;
  padding: 5px 10px;
  color: rgb(100, 100, 100);
  gap: 8px;
}

.header-left input {
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  width: 150px;
}

.header-left i {
  color: rgb(120, 120, 120);
}

.header-left.active {
  outline: 1px solid rgb(0, 139, 246);
  border-radius: 5px;
  color: rgb(120, 120, 120);
}

.header-right {
  padding: 5px;
  padding-right: 50px;
  flex: 1;
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: flex-end;
}

.header-right i {
  background: rgb(120, 120, 120);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 0.3s;
  cursor: pointer;
}

.header-right i:hover {
  -webkit-text-fill-color:  rgb(190, 187, 187);
}

.user-profile {
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 10px;
}
.user-profile:hover{
  background-color: #f5f5f5;
}
.user-info {
  display: flex;
  align-items: center;
  gap: 5px;
}

.avatar {
  background-color: #b0e1b0;
  color: green;
  border-radius: 50%;
  padding: 5px 8px;
  font-weight: bold;
}

.dropdown-menu {
  position: absolute;
  top: 40px;
  right: 0;
  width: 250px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  padding: 10px; 
}

.dropdown-item {
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}

.submenu {
  padding-left: 20px;
}
.submenu .dropdown-item:hover{
  background-color: white;
  color: rgb(0, 139, 246);
}
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
.dropdown-item-spe {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.dropdown-item-spe a {
  text-decoration: none;
  color: inherit;
}

.dropdown-item-spe div:hover {
  text-decoration: underline;
  color: rgb(0, 139, 246);
}
.notification-container {
  position: absolute;
  top: 35px; 
  right: 0; 
  width: 500px;
  border: 1px solid #ddd;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000; 
}

.tabs {
  display: flex;
  border-bottom: 1px solid #ddd;
  background-color: #f9f9f9;
}
.tab {
  flex: 1;
  text-align: center;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: gray;
}
.tab.active {
  color: #007bff;
  border-bottom: 2px solid #007bff;
  background-color: white;
}
.tab-content {
  padding: 20px;
  text-align: center;
}
.tab-content img {
  width: 100px;
}
.hidden {
  display: none;
} 
</style>