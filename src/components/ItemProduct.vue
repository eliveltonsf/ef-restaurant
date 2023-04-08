<template lang="">
  <div class="item" @click="addToCart">
    <div class="container">
      <div class="item--tag" v-show="item.offer">Oferta</div>
      <img :src="item.image" class="item--img" />
    </div>
    <div class="content">
      <h2 class="item--name">{{ item.name }}</h2>
      <p class="item--description">{{ item.description }}</p>
      <p class="item--price">{{ item.price | currency }}</p>
    </div>
  </div>
</template>

<script>
import Mixin from  '@/mixins/mixins';

export default {
  name: "ItemProduct",
  props: {
    item: {},
  },
  mixins:[Mixin],
  methods:{
    addToCart(){
      if(this.isDesktop()){
        this.$store.dispatch('addToCart', this.item);
        return;
      }

      this.$router.push({ name: 'AddToCart', params: { id: this.item.id } })
    }
  }
};
</script>

<style lang="less" scoped>
.item {
  width: 215.95px;
  height: 290px;
  border-radius: 8px;
  background: @white;
  position: relative;
  margin: 20px;
  padding: 20px;

  display: flex;
  flex-direction: column;

  &--tag {
    position: absolute;
    background: @pink;
    border-radius: 8px;
    color: @white;
    top: 15px;
    right: 15px;
    padding: 3px 8px;
    font-size: 12px;
    font-weight: 500;
  }

  &--img {
    display: block;
    width: 100%;
    height: 150px;
    margin: auto;
  }

  &--name {
    font-weight: 600;
    font-size: 18px;
  }

  &--description {
    color: @dark-grey;
    font-weight: 300;
    font-size: 12px;
  }

  &--price {
    color: @primary;
    font-weight: 600;
    font-size: 18px;
  }

  .content {
    margin-top: 10px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  @media @smartphones {
    width: 100%;
    height: fit-content;
    border: 1px solid @light-grey;
    display: flex;
    margin: 10px 0;
    padding: 10px;

    flex-direction: row;

    &--img {
      display: block;
      width: 120px;
      height: 80px;
      margin: auto;
    }

    &--price {
      text-align: end;
      margin: 10px 0 auto;
    }

    &--tag {
      position: static;
      order: 1;
      width: fit-content;
      margin-top: 5px;
    }

    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-right: 20px;
    }
    .content {
      width: 100%;
    }
  }
}
</style>
