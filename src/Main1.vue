<script setup>
import Main from './Main1.vue';
import { ref, computed } from 'vue';
const point = ref(0);
const isIncreased = ref(false); 
const isDecreased = ref(false); 

function increasePoint(){
    if (point.value < 2) {
        point.value++;
        isIncreased.value = true; 
        isDecreased.value = false; 
    }
}

const pointDisplay = computed(() => {
    return point.value > 0 ? `+${point.value}` : `${point.value}`;
});

function decreasePoint(){
    if (point.value > 0) {
        point.value--;
        isDecreased.value = true; 
        isIncreased.value = false; 
    }
}

const sub_number = ref(1);
const isClicked = ref(false);  

function clickBookmark() {
    if (!isClicked.value) {
            sub_number.value++;
    } else {
            sub_number.value--;
    }
    isClicked.value = !isClicked.value;
}

</script>
<template>
    <div class="container">
        <div style = "position:sticky; top:100px;">
            <div class="sidebar-left">
                <div class="vote">
                    <button class="icon icon-up" @click="increasePoint" :class="{'active': isIncreased}"><i class="fa fa-caret-up"></i></button> 
                    <div class="point" :class="{'active': isIncreased || isDecreased}">{{ pointDisplay }}</div>
                <button class="icon icon-down" @click="decreasePoint" :class="{'active': isDecreased}"><i aria-hidden="true" class="fa fa-caret-down"></i></button>
                </div>
                <div class="bookmark">
                    <button class="icon-bookmark" @click="clickBookmark" :class="{'bookmarked' : isClicked}">
                        <i class="fa fa-bookmark"></i>
                    </button>
                </div>
            </div>
        </div>

        <div class="main-content">
            <div class="bookmark" style="display: flex; justify-content: flex-end; align-items: center; flex-direction: row; margin-right: 4px;">
                <button class="icon-bookmark" @click="clickBookmark" style="position: relative; padding: 12px 0; border: none; background-color: white; box-shadow: none; display: flex; flex-direction: row; align-items: center; text-align: center; gap: 10px;">
                    <i class="fa fa-bookmark"></i>
                    <span class="sub-number">{{ sub_number }}</span>
            </button>
        </div>
        <h1>Những chú ý khi sử dụng v-model trong Vue.js</h1>
        <div class="notification">
          ! Bài đăng này đã không được cập nhật trong 5 năm
        </div>
        <div class = "content">
          <h3>Mở đầu</h3>
          <p>v-model là chức năng được sử dụng rất nhiều khi tạo form sử dụng Vue.js. Bạn có thể sử dụng v-model để tạo ra các ràng buộc dữ liệu hai chiều trên các ô input hoặc textarea hay thậm chí là file. Nó sẽ tự động chọn đúng cách để cập nhật các phần tử dựa trên kiểu nhập. Mặc dù khi sử dụng bạn sẽ thấy có đôi chút magic, nhưng v-model thực sự là một cú pháp không thể thiếu mỗi khi bạn muốn handle một form một cách thuận tiện và ngon lành 😄 Note: v-model sẽ bỏ qua các giá trị ban đầu, "checked" hoặc "selected" attribute được tìm thấy trên bất kì form elements nào. Nó sẽ luôn luôn xử lý các dữ liệu của Vue instance như là những dữ liệu luôn đúng. Bạn nên khai báo giá trị ban đầu ở phía Javascript bên trong các component.</p>
        </div>
        <div class = "content">
            <h3>Hoạt động của v-model</h3>
            <p>v-model là một syntax sugar (cú pháp ngọt - dễ nhìn) để viết v-on và v-bind với nhau trong một dòng. Tổng quan, hai dòng sau thực hiện cùng một hoạt động:</p>
            <div class="code">
&lt;input v-model="searchText"&gt;
&lt;input :value="searchText" @change="searchText = $event.target.value"&gt;
            </div>
            <p style = "margin-top: 27px;">Thành phần tùy chỉnh của v-model Trường hợp sử dụng v-model đối với thành phần tùy chỉnh, mặc định thì props được gọi là value và sự kiện của input được sử dụng. Value này có thể thay đổi được bằng định nghĩa ở phía thành phần tùy chỉnh.</p>
            <p style = "margin-top: 27px;">Ví dụng sau được trích từ trang tài liệu tham khảo chính thức:</p>
            <div class="code">
Vue.component('my-checkbox', {
model: {
    prop: 'checked',
    event: 'change'
},
props: {
    // Tùy theo điều này,  cho phép sử dụng thuộc tính `value` với mục đích riêng biệt.
    value: String,
    // `checked` sẽ được sử dụng như thuộc tính thay thế `value`
    checked: {
    type: Number,
    default: 0
    }
},
// ...
})
            </div>
            <div class = "content">
                <h3>Những lỗi thường gặp</h3>
                <p>Viêt cả v-model và @change V-model như đã nói ở trên là Event handling (xử lý sự kiện). Nên việc kết hợp viết hai lần sử dụng v-model và @change là không cần thiết, và làm cho code trở nên Not Syntax Suger. Ví dụ như đoạn mã ở dưới.</p>
                <p style = "margin-top: 27px;">// Đoạn code lỗi</p>
                <div class = "code">
&lt;input v-model=&quot;searchText&quot; @change=&quot;(value) =&gt; searchText = value&quot;&gt;
                </div>
                <p style = "margin-top: 27px;">Do bản thân v-model đã có sẵn Event handling (xử lý sự kiện) của sự kiện @change, nên sự kiện đối với change bị lặp lại hai lần. Nếu trường hợp muốn xử lý nhiều sự kiện hơn một sự kiện change, chúng ta nên dùng việc sử dụng v-model và thay thế vào đó là sử dụng đồng thời v-bind và v-on hoặc sử dụng thuộc tính thay thế searchText.</p>
                <p style = "margin-top: 27px;">// Đoạn code chuẩn Syntax Suger</p>
                <div class = "code">
&lt;input v-model=&quot;searchText&quot;&gt;
&lt;script&gt
data() {
    return {
        innerSearchText: &#39;&#39;
    },
},
computed: {
    searchText: {
        get () {
            return this.innerSearchText
        }
        set (value) {
            this.innerSearchText = value&lt
        }&lt
    }&lt
}
                </div>
                <p style  = "margin-top: 27px;">Sự kết hợp giữa v-model và set tạo động lực phát triển cho trường hợp kết hợp với Vuex với nhiều nội dung khác.</p>
                <p style = "margin-top: 27px;">Truyền nguyên props cho v-model Đối với biến v-model, trường hợp muốn làm cầu nói với props thì mình thấy rất nhiều. Nhưng nếu sử dụng điều này, lỗi cảnh báo sẽ được hiển thị vì props bị thay đổi trực tiếp.
                <br> // Đoạn mã lỗi</p>
                <div class = "code">
                    <pre>
&lt;input v-model=&quot;searchText&quot;&gt; 
&lt;!-- Cảnh báo sẽ được hiển thị vì v-model thực thi searchText = $event.target.value --&gt;
&lt;script&gt;
props: {
    searchText: String
}
&lt;/script&gt;
</pre>
                </div>
                <p style = "margin-top: 27px;">Đoạn mã này nhìn thì thấy có vẻ như hoạt động đúng. Nhưng trên thực tế, sau khi giá trị của props được khởi tạo thì giá trị giữa props và data sẽ không được đồng bộ. Cho nên, dù đã sử thành đoạn mã mới, nhưng việc sửa chữa vẫn không được thực thi đúng.
                    <br><br>Vậy thì làm thế nào để có thể tránh nó? Bằng cách sử dụng các thuộc tính được tính toán thì có thể khắc phục được..
                <br> Đoạn code chuẩn Syntax Suger</p>
                <div class = "code">
&lt;input v-model=&quot;innerSearchText&quot;&gt;
&lt;script&gt;
props: {
    searchText: String
},
computed: {
    innerSearchText: {
        get () {
            return this.$props.searchText;
        },
        set (value) {
            this.$emit(&#39;change&#39;, value);
        }
    }
}
&lt;/script&gt;
                </div>
            </div>
            <div class="content">
                <h3>Tổng quan</h3>
                <p>Đó là, thay vì gán một giá trị trong thành phần này, nó sẽ gửi một giá trị dưới dạng một sự kiện cho thành phần cha. Và bằng cách viết lại giá trị của props ở phía thành phần cha, thành phần này có thể được sử dụng một cách chính xác. Ngoài ra còn có một phương pháp sử dụng watch thay vì setter, nhưng tôi không khuyến nghị cá nhân vì luồng dữ liệu rất khó nhìn thấy.</p>

            </div>
        </div>
      </div>
  

      <div class="sidebar-right">
        <h3>MỤC LỤC</h3>
        <div class = "title">
          <p>Mở đầu</p>
          <p>Hoạt động của v-model</p>
          <p>Những lỗi thường gặp</p>
          <p>Tổng quan</p>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
body{
    display: flex;
    align-items: center;
    justify-content:center;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
}

.container{
    width: 1110px;
    padding-top: 60px;
    position: relative;
    top: 53px;
    margin: auto;
    display:flex;
    flex-direction: row;
    justify-content:space-between;
}
  
.sidebar-left {
    position:sticky;
    top: 50px;
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:flex-start;
    padding-top: 100px;
    padding-bottom: 100px;
    width: 50px;
    height: auto;
    color: #9b9b9b;
}

.vote{
    font-size: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #9b9b9b;
    margin-bottom: 16px;
    height: 96px;
}

.icon {
    display: inline-block;
    padding: 0;
    border: 0;
    background: none;
    cursor: pointer;
    text-decoration: none;
    color: #9b9b9b;
    font-size: 40px;
    transition: color 0.3s, background-color 0.3s; /* Thêm hiệu ứng chuyển màu */
}


.icon-up {
    color: #9b9b9b;
    background-color: transparent;
}

.icon-down {
    color: #9b9b9b;
    background-color: transparent;
}

.icon-up.active {
    color: #5488C7;
}

.icon-down.active {
    color: #5488C7;
}

.point{
    font-size: 24px;
    height: 24px;
    line-height: 24px;
    color: #9b9b9b;
    font-weight: 500;
}
.point.active{
    color: #5488C7;
}
  
.bookmark {
    color: #adb5bd;
    border-radius: 50%;
    margin: 0 0 24px;
}

.icon-bookmark{
    width: 40px;
    height: 40px;
    font-size: 18px;
    padding: 10px;
    color: #adb5bd;
    border: 2px solid #adb5bd;
    border-radius: 50%;
    box-shadow: 1px 3px 6px rgba(0, 0, 0, .2);
}
.icon-bookmark.bookmarked{
    color:#5488C7;
    border-color: #5488C7;
}

.main-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    flex: 1;
    margin: 0 30px 0 15px;
}

.sub-number{
    position:absolute;
    right: 5px;
    color: #9B9B9B;
    font-size: 20px;
    font-family: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.notification {
    background: #ffe8cc;
    padding: 8px 16px;
    margin-top: 46px;
}

h1 {
    height: 96px;
    font-family: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 40px;
    margin-bottom: 8px;
}
.content{
    line-height: 1.75;
    padding: 0 10px;
}
.content h3{
    font-family: "Open Sans", system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 26.1px;
    margin-top: 15.66px;
}
.content p{
    font-family: "Open Sans", system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 18px;
    margin-top: 9px;
    margin-bottom: 0;
}
.code{
    margin: 15px 0;
    padding: 0 15px;
    background-color: #f1f2f3;
    border: 1px solid #e5e5e5;
    color: #24292e;
    font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace;
    direction: ltr;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    line-height: 1.45;
}
  
.sidebar-right {
    padding: 15px;
    border-radius: 5px;
}
  
.sidebar-right h3 {
    font-size: 18px;
}

.title{
    padding-left: 28px;
    font-size: 14.4px;
}
.title p{
    margin: 0;
    font-family: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    white-space: nowrap;
    padding: 5px 0;
}
  

  </style>
  