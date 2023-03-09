<!-- eslint-disable vue/no-unused-vars -->
<template lang="">
  <div class="category-menu">
    <ul>
      <li
        v-for="category in categoryList"
        v-bind:key="category.id"
        @click="changeSelectedCategory(category.id)"
        v-bind:class="{ active: isActive(category.id) }"
      >
        <component v-bind:is="category.icon" :name="category.id" />
        <p>{{ category.label }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import PizzaIcon from "../assets/icons/PizzaIcon.vue";
import DessertIcon from "../assets/icons/DessertIcon.vue";
import DrinksIcon from "../assets/icons/DrinksIcon.vue";
import ComboIcon from "../assets/icons/ComboIcon.vue";
import BurgerIcon from "../assets/icons/BurgerIcon.vue";

export default {
  name: "CategoryMenu",
  components: {
    PizzaIcon,
    DessertIcon,
    DrinksIcon,
    ComboIcon,
    BurgerIcon,
  },
  data() {
    return {
      categoryList: [
        { label: "Pizza", icon: "PizzaIcon", id: "pizza" },
        { label: "Bebidas", icon: "DrinksIcon", id: "drinks" },
        { label: "Doces", icon: "DessertIcon", id: "desserts" },
        { label: "Combos", icon: "ComboIcon", id: "combo" },
        { label: "Burger", icon: "BurgerIcon", id: "burgers" },
      ],
      selectedCategory: "",
    };
  },
  mounted() {
    this.changeSelectedCategory("pizza");
  },
  methods: {
    changeSelectedCategory(id) {
      this.selectedCategory = id;
      this.$store.dispatch("changeCategory", id);
    },
    isActive(id) {
      return this.selectedCategory === id;
    },
  },
};
</script>

<style lang="less" scoped>
.category-menu {
  min-width: 130px;
  height: 100vh;
  background: @white;

  display: flex;
  align-items: center;

  position: relative;

  .logo {
    width: 100%;
    position: absolute;
    top: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 100%;
      height: auto;
      margin: 10px;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    width: 100%;

    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100px;

      svg {
        fill: @dark-grey;
        width: 40px;
        height: 40px;
        margin: 10px;
      }

      p {
        font-size: 14px;
        color: @dark-grey;
      }

      &.active {
        background: @primary;
        border-radius: 8px;

        svg {
          fill: @secondary;
        }

        p {
          color: @secondary;
        }
      }
    }
  }

  @media @tablets {
    width: 100%;
    height: fit-content;

    .logo {
      display: none;
    }

    ul {
      display: flex;
      margin: 20px;
      overflow-x: scroll;

      &::-webkit-scrollbar {
        height: 3px;
      }

      &::-webkit-scrollbar-thumb {
        background: @dark-grey;
        border-radius: 10px;
      }

      &::-webkit-scrollbar-track {
        background:@light-grey;
      }

      li {
        min-width: 78px;
      }
    }
  }
}
</style>
