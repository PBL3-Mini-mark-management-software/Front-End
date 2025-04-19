
import { createWebHistory, createRouter } from 'vue-router';
import Mainpage from '../components/Mainpage.vue';
import startPage from '../pages/startPage.vue';
import signIn from '../pages/signIn.vue'
import TheRegister from '../pages/TheRegister.vue';
import theConfiguration from '../pages/theConfiguration.vue'
import theConfigurationOfStaff from '../pages/theConfigurationOfStaff.vue'
import Home from '../pages/Home.vue'
import Customer from '../pages/Customer.vue'
import Invoice from '../pages/Invoice.vue'
import EmployeeHome  from '@/pages/EmployeeHome.vue';
import ProductCatalog from '@/pages/ProductCatalog.vue';

const routes = [
   {path: '/mainPage', component: Mainpage},
   {path: '/', component: startPage},
   { path: '/signIn', component: signIn },
   {path: '/TheRegister', component: TheRegister},
   {path: '/theConfiguration', component: theConfiguration},
   {path: '/theConfigurationOfStaff', component: theConfigurationOfStaff},
   {path: '/home', component: Home},
   {path: '/customer', component: Customer},
   {path: '/invoice', component: Invoice},
   {path: '/employeeHome', component: EmployeeHome},
   {path: '/productCatalog', component: ProductCatalog}
   
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;