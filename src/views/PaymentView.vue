<template lang="">
    <div class="payment">
        <div class="payment--content">
          <router-link to="/" class="payment--go-back">🠔 Votar</router-link>
          <Order />
        </div>
        <ShoppingCart class="cart-menu"/>
    </div>
</template>

<script>
import Mixin from '@/mixins/mixins';
import ShoppingCart from "@/components/ShoppingCart.vue";
import Order from '@/components/OrderCheckout.vue'

export default {
  components: {
    ShoppingCart,
    Order
  },
  mixins: [Mixin],
}
</script>

<style lang="less" scoped>
.payment {
  display: flex;

  &--content {
    flex-grow: 1;
    padding: 50px;

    .payment--go-back {
      font-weight: 600;
      font-size: 18px;
      text-decoration: none;
      color: @black;
    }
  }

  @media @small-desktops {
    .cart-menu{
      display: none;
    }

    &--content {
      padding: 50px 20px;
    }
  }

}
</style>