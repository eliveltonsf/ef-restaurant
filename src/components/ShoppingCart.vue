<template >
  <div class="cart">
    <router-link to="/" class="cart--go-back">🠔 Votar</router-link>
    <h2 class="cart--title">Seu pedido</h2>
    <div class="cart--content">
      <p v-if="hasNoItem">Seu carinho ainda está vazio</p>
      <CartItem v-for="item in cartList" :key="item.id" :item="item" />
    </div>
    <div class="cart--total" v-if="!hasNoItem">
      <span>Total:</span>
      <span class="price">{{ getCartTotal | currency }}</span>
    </div>
    <button class="primary-button payment-button" v-if="!!cartList.length && !isPaymentScreen" @click="goToPlayment">Finalizar compra</button>
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
    isPaymentScreen(){
      return this.$route.name === 'Payment'
    }
  },
  methods: {
    goToPlayment() {
      this.$router.push({ name: 'Payment' })
    }
  }
};
</script>

<style lang="less" scoped>
.cart {
  background: @white;
  width: 520px;
  height: 100vh;
  min-width: 520px;
  padding: 30px;
  display: flex;
  flex-direction: column;

  &--go-back {
    font-weight: 600;
    font-size: 18px;
    text-decoration: none;
    color: @black;
    display: none;
  }

  &--title {
    font-size: 24px;
    font-weight: 600;
    margin-top: 50px;
  }

  &--content {
    flex-grow: 1;
    overflow: auto;
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

  .payment-button {
    width: 397px;
    margin: 20px auto;
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

  @media @small-desktops {
    width: 100%;
    min-width: unset;
    max-width: 800px;
    margin: auto;
    padding: 50px 20px 20px;

    .payment-button {
      width: 100%;
    }

    &--go-back {
      display: block;
    }
  }
}
</style>
