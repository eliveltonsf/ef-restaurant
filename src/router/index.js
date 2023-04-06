import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ShoppingCart from '@/components/ShoppingCart.vue'
import AddToCart from '@/components/AddToCart.vue';
import PaymentView from '@/views/PaymentView.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/cart',
    name: 'ShoppingCart',
    component: ShoppingCart
  },
  {
    path: '/payment',
    name: 'Payment',
    component: PaymentView
  },
  {
    path: '/addToCart/:id',
    name: 'AddToCart',
    component: AddToCart,
    props: true
  },
]

const router = new VueRouter({
  routes
})

export default router
