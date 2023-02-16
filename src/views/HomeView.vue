<template>
  <div class="home">
    <CategoryMenu />
    <ItemList />
  </div>
</template>

<script>
import CategoryMenu from "@/components/CategoryMenu.vue";
import ItemList from "@/components/ItemList.vue";

export default {
  name: "HomeView",
  components: {
    CategoryMenu,
    ItemList,
  },
};
</script>

<style lang="less">
.home {
  display: flex;

  @media @tablets {
    flex-direction: column;
  }
}
</style>
