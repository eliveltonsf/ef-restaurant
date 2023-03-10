<template lang="">
  <div class="cart">
    <router-link to="/" class="cart--go-back" v-show="isMobile()"
      >🠔 Votar</router-link
    >
    <h2 class="cart--title">Seu pedido</h2>
    <p v-if="hasNoItem">Seu carinho ainda está vazio</p>
    <CartItem v-for="item in cartList" :key="item.id" :item="item" />
    <div class="cart--total" v-if="!hasNoItem">
      <span>Total:</span>
      <span class="price">{{ getCartTotal | currency }}</span>
    </div>
  </div>
</template>

<script>
import CartItem from "@/components/CartItem.vue";
import { mapGetters } from "vuex";
import Mixin from "@/mixins/mixins";

export default {
  name: "shoppingCart",
  components: {
    CartItem,
  },
  mixins: [Mixin],
  computed: {
    cartList() {
      return this.$store.state.cartList;
    },
    ...mapGetters(["getCartTotal"]),
    hasNoItem() {
      return !this.cartList.length;
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  background: @white;
  width: 643px;
  min-width: 643px;
  padding: 50px;

  &--go-back {
    font-weight: 600;
    font-size: 18px;
    text-decoration: none;
    color: @black;
  }

  &--title {
    font-size: 24px;
    font-weight: 600;
    margin-top: 50px;
  }

  &--total {
    font-weight: 600;
    font-size: 18px;
    text-align: right;
    margin-top: 30px;

    .price {
      padding-left: 10px;
      color: @primary;
    }
  }

  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  @media @tablets {
    width: 100%;
    min-width: unset;
    padding: 50px 20px 20px;
  }
}
</style>
