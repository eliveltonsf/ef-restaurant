<template lang="">
  <div class="item">
    <QuantityItem :item="item" class="item--quantity"/>
    <div class="item--img-container">
      <img class="item--img" :src="item.image" />
    </div>
    <div class="content">
      <h3 class="item--name">{{ item.name }}</h3>
      <a class="item--observation" href="">Adicionar observação</a>
    </div>
    <p class="item--price">{{ item.price | currency }}</p>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import Mixin from '@/mixins/mixins'
import QuantityItem from '@/components/QuantityItem.vue';

export default {
  name: "CartItem",
  components: {
    QuantityItem,
  },
  props: {
    item: {},
  },
  mixins: [Mixin],
  methods:{
    ...mapActions([
      'increaseQuantity', // map `this.increment()` to `this.$store.dispatch('increment')`
      'decreaseQuantity', // map `this.increment()` to `this.$store.dispatch('increment')`
    ]),
  }
};
</script>

<style lang="less" scoped>
.item {
  display: flex;
  padding: 20px 0;
  border-bottom: 1px solid @light-grey;

  &--quantity {
    display: flex;
    align-items: center;
    padding-right: 40px;

    .number {
      font-weight: 500;
      font-size: 18px;
      color: @primary;
      width: 28px;
      text-align: center;
    }

    .buttons {
      font-weight: 600;
      cursor: pointer;
    }
  }

  &--img-container {
    border-radius: 8px;
    background: @light-yellow;
    width: 81px;
    height: 66px;
    display: flex;
    align-items: center;
  }

  &--img {
    width: 65px;
    height: 100%;
    display: block;
    margin: auto;
  }

  &-name {
    font-weight: 500;
    font-size: 18px;
  }

  &--observation {
    font-weight: 500;
    font-size: 12px;
    color: @dark-grey;
    text-decoration: none;
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.6;
    }
  }

  .content {
    flex-grow: 1;
    padding: 0 20px;
  }

  &--price {
    color: @primary;
    font-weight: 600;
    font-size: 18px;
  }

  @media @tablets {
    flex-wrap: wrap;

    &--img-container{
      order: 1;
    }
    .content {
      order: 2;
      width: 60%;
    }

    &--quantity{
      order: 3;
      padding: 0;
      align-items: center;
      justify-content: start;
      width: 50%;
      padding: 20px 20px 0 15px;
      
    }

    &--price{
      order: 4;
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: end;
      padding: 20px 20px 0 15px;
    }
  }
}
</style>
