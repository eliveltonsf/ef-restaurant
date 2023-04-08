<template lang="">
  <div :class="!isLoading ? 'items-list' : 'loadingContainer'">
    <Loading v-show="isLoading" />
    <Item v-for="item in itemsList" :key="item.id" :item="item" />
  </div>
</template>

<script>
import axios from "axios";
import Item from "./ItemProduct.vue";
import Loading from "./LoadingCategory.vue";

export default {
  name: "ItemsList",
  components: {
    Item,
    Loading,
  },
  data() {
    return {
      itemsList: [],
      isLoading: false,
    };
  },
  created() {
    this.getItemsList();
  },
  computed: {
    selectedCategory() {
      return this.$store.state.selectedCategory;
    },
  },
  methods: {
    getItemsList() {
      this.isLoading = true
      this.$store.dispatch("changeStateLoading", true);
      this.itemsList = []

      setTimeout(() => {
        axios
          .get(`http://localhost:3000/${this.selectedCategory}`)
          .then((response) => {this.itemsList = response.data; this.isLoading=false;  this.$store.dispatch("changeStateLoading", false);});
      }, 1000);
    },
  },
  watch: {
    selectedCategory() {
      this.getItemsList();
    },
  },
};
</script>

<style lang="less" scoped>

.loadingContainer{
  margin: 50px;
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  align-content: flex-start;

  @media @tablets {
    margin: 20px;
    width: auto;
  }
}
.items-list {
  margin: 50px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-content: flex-start;

  @media @small-desktops {
    width: 100%;
    max-width: 800px;
    margin: 50px auto;
  }

  @media @tablets {
    margin: 20px;
    width: auto;
  }
}
</style>
