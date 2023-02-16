<template lang="">
  <div class="item">
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
export default {
  name: "ItemProduct",
  filters: {
    currency(value) {
      return `R$ ${value.toLocaleString("pt-br", {
        mininumFractionDigits: 2,
      })}`;
    },
  },
  props: {
    item: {},
  },
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
    margin: 20px auto 0;
    width: 100px;
    height: 87px;
  }

  &--name {
    font-weight: 600;
    font-size: 18px;
    margin: 8px auto;
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
    margin: 8px auto;
  }

  @media @tablets {
    width: 100%;
    height: fit-content;
    border: 1px solid @light-grey;
    display: flex;
    margin: 10px 0;
    padding: 5px 10px;

    &--img {
      display: block;
      margin: 20px auto 0;
      height: 60px;
      width: 80px;
      margin: 0 0 10px 0;
    }

    &--price {
      text-align: end;
      margin: 0 auto;
      margin: 8px;
    }

    &--tag {
      position: static;
      order: 1;
      width: fit-content;
    }

    .container{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-right: 20px;
    }

    .content{
      width: 100%;
    }
  }
}
</style>
