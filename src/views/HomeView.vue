<template>
  <div class="home">
    <router-link to="/cart" class="cart-icon">
      <ShoppingCartIcon />
    </router-link>
    <CategoryMenu />
    <ItemList />
    <ShoppingCart class="cart-menu" />
  </div>
</template>

<script>
import CategoryMenu from "@/components/CategoryMenu.vue";
import ItemList from "@/components/ItemList.vue";
import ShoppingCart from "@/components/ShoppingCart.vue";
import Mixin from '@/mixins/mixins';

import ShoppingCartIcon from "@/assets/icons/ShoppingCartIcon.vue";

export default {
  name: "HomeView",
  components: {
    CategoryMenu,
    ItemList,
    ShoppingCart,
    ShoppingCartIcon
  },
  mixins: [Mixin],
  computed: {
    isloading() {
      return !this.$store.state.isLoading
    },
  }
};
</script>

<style lang="less">
.home {
  display: flex;

  .cart-icon {
    display: none;
  }

  @media @small-desktops {
    flex-direction: column;

    .cart-menu {
      display: none;
    }

    .cart-icon {
      width: 42px;
      height: 42px;
      background: @pink;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 20px 20px 20px auto;

      svg {
        width: 24px;
        height: 24px;
        fill: @white;
      }
    }

  }
}
</style>
