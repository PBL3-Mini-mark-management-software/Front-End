<script setup>
    import Mainpage from '../components/Mainpage.vue'
    import Taskbar from '../components/Taskbar.vue';
    import { ref } from 'vue';
    // const name= "Tuyen";
    document.addEventListener("click", function (event) {
        let button = document.getElementById("fullNameChoice");
        let dropdown = document.getElementById("dropdown");

        if (button.contains(event.target)) {
            dropdown.classList.toggle("hidden");
        } else if (!dropdown.contains(event.target)) {
            dropdown.classList.add("hidden"); 
        }
    });
    const storeSetup = ref({
        setupShop: false,
        addProduct: false,
        connectSalesChannels: false,
        manageOrders: false
    });

    const clickRoll = (section) => {
        storeSetup.value[section] = !storeSetup.value[section];
    };
</script>

<template>
    <div class="temp">
        <Mainpage />
        <div class="main-right">
            <Taskbar />
            <div class="container">
                <div class="adver">
                    <div class="adver-left">
                        <b>Bạn còn 07 ngày dùng thử miễn phí, kích hoạt gói để tiếp tục sử dụng dịch vụ.</b>
                        <p>Liên hệ tư vấn: <b>CSKH Abyss:</b></p>
                    </div>
                    <div class="adver-right">
                        <button class="adver-button">Kích hoạt gói dịch vụ</button>
                    </div>
                </div> 
                <!-- <p style="background-color: aliceblue;">haha</p> -->
                <div class="infor-container">
                    <div class="infor-left">
                        <div class="custom-border">
                            <b>Xin chào, </b>
                            <p>Cùng Abyss làm quen các bước xây dựng và vận hành cửa hàng</p>
                            <div class="contain-box">
                                <h3 class="box" @click="clickRoll('setupShop')">Thiết lập cửa hàng</h3>
                                <div v-if="storeSetup.setupShop">
                                    <div>
                                        hahahha
                                    </div>
                                </div>
                            </div>

                            <div class="contain-box">
                                <h3 class="box" @click="clickRoll('addProduct')">Thêm sản phẩm đầu tiên</h3>
                                <div v-if="storeSetup.addProduct">
                                    <div>
                                        hahahha
                                    </div>
                                </div>
                            </div>
                            <div class="contain-box">
                                <h3 class="box" @click="clickRoll('connectSalesChannels')">Kết nối các kênh bán hàng</h3>
                                <div v-if="storeSetup.connectSalesChannels">
                                    <div>
                                        hahahha
                                    </div>
                                </div>
                            </div>
                            <div class="contain-box">
                                <h3 class="box" @click="clickRoll('manageOrders')">Quản lý đơn hàng</h3>
                                <div v-if="storeSetup.manageOrders">
                                    <div>
                                        hahahha
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="custom-border">
                            <h3>Kết quả kinh doanh</h3>
                            <div class="result" style="flex-direction: row;">
                                <div class="result">
                                    <div class="result-box" style="background-color:#f2f9ff;">
                                        <p>Doanh thu thuần</p>
                                        <b>0 <span><u>đ</u></span></b> 
                                    </div>
                                    <div class="result" style="flex-direction: row;">
                                        <div class="result-box" style="background-color:#f2f9ff;">
                                            <p>Giá trị trung bình đơn</p>
                                            <b>0 <span><u>đ</u></span></b>
                                        </div>
                                        <div class="result-box" style="background-color: #f2f9ff;">
                                            <p>Số lượng hàng bán</p>
                                            <b>0</b>
                                        </div>
                                    </div>
                                </div>
                                <div class="result">
                                    <div class="result" style="flex-direction: row;">
                                        <div class="result-box">
                                            <p>Tổng đơn</p>
                                            <b>0</b>
                                        </div>
                                        <div class="result-box">
                                            <p>Chưa thanh toán</p>
                                            <b>0</b>
                                        </div>
                                    </div>
                                    <div class="result" style="flex-direction: row;">
                                        <div class="result-box">
                                            <p>Chưa giao</p>
                                            <b>0</b>
                                        </div>

                                        <div class="result-box">
                                            <p>Đang giao</p>
                                            <b>0</b>
                                        </div>

                                        <div class="result-box">
                                            <p>Hủy</p>
                                            <b>0</b>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="custom-border">
                            <h3>Sản phẩm bán chạy</h3>
                            <div style="margin:50px auto;">
                                <img src="../SGroup/box.png" alt="Box">
                                <p style="text-align: center;">Chưa có sản phẩm</p>
                            </div>
                        </div>
                    </div>
                    <div class="infor-right">
                        <div class="custom-border">
                            <h3>Sapo Update</h3>
                            <a href="mockLink" style="text-decoration: none;color:black">
                                <div style="color:grey">10/03/2025</div>
                                <div>Dashboard Phân tích kinh doanh Sàn & Báo cáo doanh thu theo ...</div>
                                <hr>
                            </a>
                            <a href="mockLink" style="text-decoration: none;color:black">
                                <div style="color:grey">08/03/2025</div>
                                <div>Chat Omni AI - Tư vấn, chốt đơn tự động</div>
                                <hr>
                            </a>
                            <a href="mockLink" style="text-decoration: none;color:black">
                                <div style="color:grey">05/03/2025</div>
                                <div>Ra mắt giải pháp gợi ý địa chỉ tự động bằng AI với độ chính xác...</div>
                            </a>
                        </div>
                        <div class="custom-border"> 
                            <div style="display:flex;justify-content: space-between;align-items: center;">
                                <h3>Có thể bạn quan tâm</h3>
                                <font-awesome-icon style="color:#2e9eff" :icon="['fas', 'circle-arrow-right']" />
                            </div>
                            <a href="mockLink" style="text-decoration: none;color:black">
                                <div>Dashboard Phân tích kinh doanh Sàn & Báo cáo doanh thu theo ...</div>
                                <div style="color:grey">6 ngày trước</div>
                            </a>
                            <a href="mockLink" style="text-decoration: none;color:black">
                                <div>Chat Omni AI - Tư vấn, chốt đơn tự động</div>
                                <div style="color:grey">6 ngày trước </div>
                            </a>
                            <a href="mockLink" style="text-decoration: none;color:black">
                                <div>Ra mắt giải pháp gợi ý địa chỉ tự động bằng AI với độ chính xác...</div>
                                <div style="color:grey">2 ngày trước</div>
                            </a>
                        </div>                        
                    </div>
                </div>
            </div>

        </div>


    </div>
</template>

<style scoped>
body{
    width: 100%;
    height:100%;
    /* font-size: 20px;
    font-family:'Noto Sans', sans-serif; */
}

.temp{
    position:absolute;
    width: 100%;
    height:100vh;
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

.icon{
    font-size: 18px;
    color:#828282;
}



.container{
    width: 86%;
    /* background-color: red; */
    display: flex;
    flex-direction: column;
    gap:10px;
    margin-top:90px;
    margin-left:7%;
}

.adver{
    width: 100%;
    display:flex;
    background-color:#e6f4ff;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    /* border-color: blue;
    border-width: 1px; */
    color:black;
}

.adver-left{
    width: 70%;
    font-size: 18px;
    line-height: 0.7;
    padding-top: 10px;
    margin: 10px 10px;
}

.adver-right{
    display: flex;
    align-items: center;
    margin-left: 5%;
}

.adver-button{
    background-color: #0088ff;
    padding:10px;
    border-color: transparent;
    border-radius: 5px;
    font-weight: 600;
    color:white;
    cursor: pointer;
}

.contain-box{
    border-style: solid;
    border-color: #a7a7a7 transparent transparent transparent;
    border-width: 1px;
    width: 100%;
}

.infor-container{
    width: 100%;
    display:flex;
    /* background-color: aqua; */
    gap:10px;
}

.infor-left{
    flex: 75%;
    /* background-color: blue; */
}

.infor-right{
    flex:25%;
    /* background-color: blue; */
}

.custom-border{
    width: 100%;
    font-size: 15px;
    box-sizing: border-box;
    margin-top: 10px;
    margin-bottom: 10px;
    padding:20px;
    background-color: white;
    box-shadow: 5px 10px 15px 0px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
}

.custom-border img {
    display: block;
    height: 100px;
    width: auto;
    margin: 0px auto;
}

 
hr {
    height: 1px; 
    border: none; 
    background-color: grey;
}


.box{
    width: 100%;
    border-color: #828282;
    border-width: 1px;
    cursor: pointer;
}


.result{
    flex:48%;
    box-sizing: border-box;
    display:flex;
    flex-direction: column;
    gap:10px;
    padding-top: 0; 
}


.result-box{
    width: 100%;
    display:flex;
    flex-direction: column;

    box-sizing: border-box;
    background-color: #e7e8e8;
    padding:10px;
    border-radius: 10px;
}
.result-box p {
    line-height: 1.3;
    margin: 0;
    padding: 0;
}
.result-box b{
    font-size: 18px;
    line-height: 1.3;
    margin: 0;
    padding: 0;
}
</style>