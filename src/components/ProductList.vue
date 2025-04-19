<script setup>
import { ref, onMounted, onUnmounted, computed, watch} from 'vue';

const showTypeDropdown = ref(false);
const typeRef = ref(null);
const selectedType = ref('');

const showTagDropdown = ref(false);
const tagRef = ref(null);
const selectedTag = ref('');

const showSupplierDropdown = ref(false);
const supplierRef = ref(null);
const selectedSupplier = ref('');

const showFilterDropdown = ref(false);
const filterRef = ref(null);
const selectedFilter= ref('');

const isFilterChanged = ref(false);
const selectedProduct = ref([]);
const searchQuery = ref('');

const tempSelectedType = ref('');
const tempSelectedTag = ref('');
const tempSelectedSupplier = ref('');
const tempSelectedFilter = ref('');

const productTypes = ['Sữa tắm', 'Sữa rửa mặt', 'Dầu gội', 'Tẩy trang'];
const tags = ['Bán chạy', 'Hết hàng', 'Khuyến mãi', 'Hàng mới'];
const suppliers = ['Công ty Hoa Sen', 'Công ty YOU', 'Công ty SMK'];
const filters = ['Còn hàng', 'Sắp hết hàng'];
const products = [
    {id: '1', img: 'https://prod-cdn.pharmacity.io/e-com/images/ecommerce/P07340_1_l.webp', name: 'Sữa tắm Dove', sell: '100', type: 'Sữa tắm', trademark: 'Dove', date: '14/03/2025', quantity: 45},
    {id: '2', img: 'https://production-cdn.pharmacity.io/digital/828x828/plain/e-com/images/ecommerce/20241107092030-0-P07423_1.png?versionId=FDccsBTcY6na8qKN1AJKOfyYCgM05jRD', name: 'Sữa tắm Purite', sell: '100', type: 'Sữa tắm', trademark: 'Purite', date: '14/03/2025', quantity: 17, discount: false, isNew: true},
    {id: '3', img: 'https://production-cdn.pharmacity.io/digital/828x828/plain/e-com/images/ecommerce/20240529084954-1-P27856%20_1.png', name: 'Sữa tắm Pharmacity', sell: '1001', type: 'Sữa tắm', trademark: 'Pharmacity', date: '14/03/2025', quantity: 72},
    {id: '4', img: 'https://product.hstatic.net/1000006063/product/7f89513e18ab099bed44db67478036b2_quot_0af17a5a550c4813afaae99da7f85ecd_1024x1024.jpg', name: 'Sữa tắm ST.lves', sell: '100', type: 'Sữa tắm', trademark: 'ST.lves', date: '14/03/2025', quantity: 63, discount: true, isNew: false},
    {id: '5', img: 'https://hasaki.vn/_next/image?url=https%3A%2F%2Fmedia.hcdn.vn%2Fcatalog%2Fproduct%2Fs%2Fu%2Fsua-tam-love-beauty-and-planet-400ml.jpg&w=3840&q=75', name: 'Sữa tắm LOVE BEAUTY & PLANET', sell: '100', type: 'Sữa tắm', trademark: 'BEAUTY & PLANET', date: '14/03/2025', quantity: 39},
    {id: '6', img: 'https://image.hsv-tech.io/1987x0/bbx/common/f564e469-0691-4d09-9a38-77f95ab1d146.webp', name: 'Sữa rửa mặt Senka', sell: '1010', type: 'Sữa rửa mặt', trademark: 'Senka', date: '14/03/2025', quantity: 21},
    {id: '7', img: 'https://www.guardian.com.vn/media/catalog/product/cache/00da80640ebdb12995ee3645882c769b/3/0/3025650_-_front_1_.png', name: 'Sữa rửa mặt Hazeline', sell: '1020', type: 'Sữa rửa mặt', trademark: 'Hazeline', date: '14/03/2025', quantity: 94, discount: false, isNew: true},
    {id: '8', img: 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lit01u1quqrw32', name: 'Kem dưỡng da Bioaqua', sell: '10', type: 'Kem dưỡng da', trademark: ' Bioaqua', date: '14/03/2025', quantity: 6},
    {id: '9', img: 'https://beco.vn/wp-content/uploads/2019/06/uhgag.jpg', name: 'Kem dưỡng da Collagen', sell: '100', type: 'Kem dưỡng da', trademark: 'Collagen', date: '14/03/2025', quantity: 51},
    {id: '10', img: 'https://cdn.nhathuoclongchau.com.vn/unsafe/636x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/00022125_kem_ne_nivea_creme_beiersdorf_ag_hamburg_germany_30ml_1803_6095_large_a57108f20a.jpg', name: 'Kem dưỡng da Nivea', sell: '100', type: 'Kem dưỡng da', trademark: 'Nivea', date: '14/03/2025', quantity: 84},
    {id: '11', img: 'https://media.hcdn.vn/catalog/product/s/u/sua-duong-am-simple-danh-cho-moi-loai-da-125ml-1.jpg', name: 'Kem dưỡng da Simple', sell: '1040', type: 'Kem dưỡng da', trademark: 'Simple', date: '14/03/2025', quantity: 12, discount: true, isNew: false},
    {id: '12', img: 'https://www.hangngoainhap.com.vn/images/202501/goods_img/3384-p2-1736302177.jpg', name: 'Kem dưỡng da Redwin', sell: '100', type: 'Kem dưỡng da', trademark: 'Redwin', date: '14/03/2025', quantity: 88},
    {id: '13', img: 'https://product.hstatic.net/1000006063/product/09_f57f4acecf9a48c594f8e7716e11a53e_1024x1024.png', name: 'Dầu gội Dove', sell: '1060', type: 'Dầu gội', trademark: 'Dove', date: '14/03/2025', quantity: 75, discount: true, isNew: false},
    {id: '14', img: 'https://lanchi.vn/wp-content/uploads/2021/11/DAU-GOI-SUNSILK-ONG-MUOT-RANG-NGOI-900G.png', name: 'Dầu gội Sunsik', sell: '1030', type: 'Dầu gội', trademark: 'Sunsik', date: '14/03/2025', quantity: 26, discount: true, isNew: false},
    {id: '15', img: 'https://acecookvietnam.vn/wp-content/uploads/2017/07/BAG-HAO-HAO-TCC.png', name: 'Mỳ tôm Hảo Hảo', sell: '100', type: 'Mỳ tôm', trademark: 'Hảo Hảo', date: '14/03/2025', quantity: 93},
    {id: '16', img: 'https://cdn.tgdd.vn/Products/Images/2565/289585/bhx/thung-30-goi-mi-khoai-tay-omachi-tom-chua-cay-thai-80g-202209200953315105.jpg', name: 'Mỳ tôm Omachi', sell: '1200', type: 'Mỳ tôm', trademark: 'Omachi', date: '14/03/2025', quantity: 58, discount: false, isNew: true},
    {id: '17', img: 'https://cdn.tgdd.vn/Products/Images/2565/144298/bhx/mi-hai-san-siukay-goi-128g-202112291328002002.jpg', name: 'Mỳ Siêu Cay', sell: '1030', type: 'Mỳ tôm', trademark: 'Siêu Cay', date: '14/03/2025', quantity: 44, discount: true, isNew: false},
    {id: '18', img: 'https://cdn.tgdd.vn/Products/Images/2289/76428/bhx/nuoc-cham-nam-ngu-de-nhi-chai-900ml-201903151030027270.jpg', name: 'Nước mắm Đệ Nhị', sell: '100', type: 'Nước mắm', trademark: 'Đệ Nhị', date: '14/03/2025', quantity: 36},
    {id: '19', img: 'https://product.hstatic.net/200000356473/product/nuoc_man_546c3a8f95a24e128767ef685660322c.jpg', name: 'Nước mắm Nam Ngư', sell: '1050', type: 'Nước mắm', trademark: 'Nam Ngư', date: '14/03/2025', quantity: 80, discount: true, isNew: false},
    {id: '20', img: 'https://www.u-shop.vn/images/thumbs/0017021_sua-tam-dove-serum-huong-hoa-muoi-hong-sang-da-rang-ro-900g.png', name: 'Sữa tắm Dove', sell: '1080', type: 'Sữa tắm', trademark: 'Dove', date: '14/03/2025', quantity: 66},
    {id: '21', img: 'https://product.hstatic.net/1000141988/product/sua_tam_dove_bong_min_thom_mat_500g_f21f99ce4bd34254962407d4b037385a_1024x1024.jpg', name: 'Sữa tắm Dove', sell: '100', type: 'Sữa tắm', trademark: 'Dove', date: '14/03/2025', quantity: 5, discount: false, isNew: true},
    {id: '22', img: 'https://product.hstatic.net/200000814381/product/0013644_sua-tam-dove-huong-hoa-ngot-ngao-500g_510_e89b49fd04d547d2bfeffdca30e144e7.png', name: 'Sữa tắm Dove', sell: '100', type: 'Sữa tắm', trademark: 'Dove', date: '14/03/2025', quantity: 90, discount: true, isNew: false}
];
const currentPage = ref(1);
const itemsPerPage = 20;
function toggleType(event){
    event.stopPropagation();
    showTypeDropdown.value = !showTypeDropdown.value;
    showTagDropdown.value = false;
    showSupplierDropdown.value = false;
    showFilterDropdown.value = false;
}
function handleClickType(event){
    if (typeRef.value && !typeRef.value.contains(event.target)){
        showTypeDropdown.value = false;
    }
}

function toggleTag(event){
    event.stopPropagation();
    showTagDropdown.value = !showTagDropdown.value;
    showTypeDropdown.value = false;
    showSupplierDropdown.value = false;
    showFilterDropdown.value = false;
}
function handleClickTag(event){
    if(tagRef.value && !tagRef.value.contains(event.target)){
        showTagDropdown.value = false;
    }
}

function toggleSupplier(event){
    event.stopPropagation();
    showSupplierDropdown.value = !showSupplierDropdown.value;
    showTypeDropdown.value = false;
    showTagDropdown.value = false;
    showFilterDropdown.value = false;
}
function handleClickSupplier(event){
    if (supplierRef.value && !supplierRef.value.contains(event.target)){
        showSupplierDropdown.value = false;
    }
}

function toggleFilter(event){
    event.stopPropagation();
    showFilterDropdown.value = !showFilterDropdown.value;
    showTypeDropdown.value = false;
    showTagDropdown.value = false;
    showSupplierDropdown.value = false;
}
function handleClickFilter(event){
    if (filterRef.value && !filterRef.value.contains(event.target)){
        showFilterDropdown.value = false;
    }
}

function selectFilter(type, value){
    switch (type){
        case 'type':
            tempSelectedType.value = value;
            showTypeDropdown.value = false;
            break;
        case 'tag':
            tempSelectedTag.value = value;
            showTagDropdown.value = false;
            break;
        case 'supplier':
            tempSelectedSupplier.value = value;
            showSupplierDropdown.value = false;
            break;
        case 'filter':
            tempSelectedFilter.value = value;
            showFilterDropdown.value = false;
            break;
    }
}

function hasTag(product, tag){
    switch(tag){
        case 'Bán chạy':
            return product.sell > 500;
        case 'Hết hàng':
            return product.quantity < 20;
        case 'Khuyến mãi':
            return product.discount === true;
        case 'Hàng mới':
            return product.isNew === true;
        default:
            return true;
    }
}
function applyFilter(){
    isFilterChanged.value = true;
    selectedType.value = tempSelectedType.value;
    selectedTag.value = tempSelectedTag.value;
    selectedSupplier.value = tempSelectedSupplier.value;
    selectedFilter.value = tempSelectedFilter.value; 
}
const filterProducts = computed(() => {
  return products.filter((product) => {
    const matchSearch =
      !searchQuery.value ||
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.code?.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchType = !selectedType.value || product.type === selectedType.value;
    const matchTag = !selectedTag.value || hasTag(product, selectedTag.value);
    const matchSupplier = !selectedSupplier.value || product.trademark === selectedSupplier.value;
    const matchSpecialFilter = !selectedFilter.value || applyCustomFilter(product, selectedFilter.value);

    return matchSearch && matchType && matchTag && matchSupplier && matchSpecialFilter;
  });
});

const pagedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filterProducts.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filterProducts.value.length / itemsPerPage);
});

function changePage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

watch(
  [searchQuery, selectedType, selectedTag, selectedSupplier, selectedFilter],
  () => {
    currentPage.value = 1;
  }
);

function applyCustomFilter(product, filter){
    switch(filter){
        case 'Còn hàng': 
            return parseInt(product.quantity) > 0;
        case 'Sắp hết hàng': 
            return parseInt(product.quantity) < 10;
        default:
            return true;
    }
}

const clearFilters = () => {
  searchQuery.value = '';
  selectedType.value = '';
  selectedTag.value = '';
  selectedSupplier.value = '';
  selectedFilter.value = '';
  currentPage.value = 1;
};

onMounted(() =>{
    document.addEventListener('click', handleClickType);
    document.addEventListener('click', handleClickTag);
    document.addEventListener('click', handleClickSupplier);
    document.addEventListener('click', handleClickFilter);
});
onUnmounted(() =>{
    document.removeEventListener('click', handleClickType);
    document.removeEventListener('click', handleClickTag);
    document.removeEventListener('click', handleClickSupplier);
    document.removeEventListener('click', handleClickFilter);
});

</script>
<template>
    <div class ="container-part">
        <div class ="title-container">
            <div class = "title">
                <span class ="underline-text">Tất cả</span>
            </div>
        </div>
        <div class ="content">
            <div class ="classify">
                <div class ="search">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input v-model="searchQuery" type="text" placeholder="Tìm kiếm theo mã sản phẩm, tên sản phẩm, barcode">
                </div>
                <div class="informationProduct">
                    <div class="dropdown-wrapper" ref="typeRef">
                        <div class="Sale-Type-Tag" @click="toggleType">
                        <p>Loại sản phẩm</p>
                        <i class="fa-solid fa-caret-down"></i>
                        </div>
                        <div v-if="showTypeDropdown" class="dropdown">
                        <ul>
                            <li v-for="item in productTypes" :key="item" @click="selectFilter('type', item)"
                            :class="{selected: selectedType === item}">
                            {{ item }}
                            </li>
                        </ul>
                        </div>
                    </div>

                    <div class="dropdown-wrapper" ref="tagRef">
                        <div class="Sale-Type-Tag" @click="toggleTag">
                        <p>Tag</p>
                        <i class="fa-solid fa-caret-down"></i>
                        </div>
                        <div v-if="showTagDropdown" class="dropdown">
                        <ul>
                            <li v-for="item in tags" :key="item" @click="selectFilter('tag', item)"
                            :class="{selected: selectedTag===item}">
                            {{ item }}
                            </li>
                        </ul>
                        </div>
                    </div>

                    <div class="dropdown-wrapper" ref="supplierRef">
                        <div class="Sale-Type-Tag" @click="toggleSupplier">
                        <p>Nhà cung cấp</p>
                        <i class="fa-solid fa-caret-down"></i>
                        </div>
                        <div v-if="showSupplierDropdown" class="dropdown">
                        <ul>
                            <li v-for="item in suppliers" :key="item" @click="selectFilter('supplier', item)"
                            :class="{selected: selectedSupplier===item}">
                            {{ item }}
                            </li>
                        </ul>
                        </div>
                    </div>

                    <div class="dropdown-wrapper" ref="filterRef" style="border-right: none;">
                        <div class="Sale-Type-Tag-dis" @click="toggleFilter">
                        <p>Bộ lọc khác</p>
                        <i class="fa-solid fa-filter"></i>
                        </div>
                        <div v-if="showFilterDropdown" class="dropdown">
                        <ul>
                            <li v-for="item in filters" :key="item" @click="selectFilter('filter', item)"
                            :class="{selected: selectedFilter === item}">
                            {{ item }}
                            </li>
                        </ul>
                        </div>
                    </div>
                </div>
                <button :class ="['save-filter-btn', isFilterChanged ? 'active' : 'inactive']" @click="applyFilter" >
                    Lưu bộ lọc
                </button>
                <button @click="clearFilters" class ="save-filter-btn active">
                    Bỏ bộ lọc 
                </button>
            </div>
        </div>
        <div class ="list-product">
            <div class ="list-product-row">
                <div class ="display-jus-ali checkbox"></div>
                <div class ="product display-jus-ali" style="color: black;">Sản phẩm</div>
                <div class ="display-jus-ali sell">Số lượng</div>
                <div class ="display-jus-ali type">Loại</div>
                <div class ="display-jus-ali trademark">Thương hiệu</div>
                <div class ="display-jus-ali date-of-creation">Ngày sản xuất</div>
            </div>
            <div v-for="product in pagedProducts" :key="product.id" class="list-product-row">
                <input type="checkbox" v-model="selectedProduct" class="checkbox display-jus-ali" :value="product.id"> {{ }}
                <div class ="product display-jus-ali" style="justify-content: flex-start;">
                    <img :src="product.img" alt="product image" class="product-img">
                     {{ product.name }}
                </div>
                <div class ="display-jus-ali sell">{{ product.quantity }}</div>
                <div class ="display-jus-ali type">{{ product.type }}</div>
                <div class ="display-jus-ali trademark">{{ product.trademark }}</div>
                <div class ="display-jus-ali date-of-creation">{{ product.date }}</div>
            </div>
        </div>
        
        <div class="fitPage">
            <span>
                Từ {{ (currentPage - 1) * itemsPerPage + 1 }}
                đến {{ Math.min(currentPage * itemsPerPage, filterProducts.length) }}
                trên tổng {{ filterProducts.length }}
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
.list-product-row{
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    box-sizing: border-box;
    padding: 10px;
    gap: 8px;
    width: 100%;
    border-bottom: 1px solid rgb(206, 204, 204);
}
.display-jus-ali{
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
    width: 25%;
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
</style>