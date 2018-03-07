import Vue from 'vue'
import Router from 'vue-router'
// 导入账户管理相关页面
import Login from "../components/account/login/Login.vue";
// 导入商城相关页面
import Shop from "../components/shop/Shop";
import GoodsList from "../components/shop/goods/List.vue";
import GoodsDetail from "../components/shop/goods/Detail.vue";
import Shopcart from "../components/shop/shopcart/Shopcart.vue";
import OrderComplete from "../components/shop/order/Complete.vue";
import OrderPay from "../components/shop/order/Pay.vue";
import OrderSite from "../components/shop/order/Site.vue";


Vue.use(Router)

let goods=[
  { name: 'goodsList', path: 'goods/list', component: GoodsList },
  { name: 'goodsDetail', path: 'goods/detail/:id', component: GoodsDetail }
];

let shopcart=[
  { name: 'shopcart', path: '/shopcart', component: Shopcart },
];

let order=[
  { name: 'orderComplete', path: 'order/complete', component: OrderComplete },
  { name: 'orderPay', path: 'order/pay/:id', component: OrderPay },// 需要知道订单ID才能付款
  { name: 'orderSite', path: 'order/site/:ids', component: OrderSite }//需要知道哪些商品要下单
]

export default new Router({
  routes: [
    {name:'login',path:'/login',component:Login},
    {name:'shop',path:'/',component:Shop,children:[...goods,...shopcart,...order]},
  ]
})
