<template>
  <div class="item--quantity">
    <span class="buttons" @click="onDecreaseButtonClick">-</span>
    <span class="number"> {{ item.quantity }}</span>
    <span class="buttons" @click="onIncreaseButtonClick">+</span>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    item: {},
    useStore: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    ...mapActions(["increaseQuantity", "decreaseQuantity"]),
    onDecreaseButtonClick(){
      if(this.useStore){
        this.decreaseQuantity(this.item.id)
        return;        
      }

      // eslint-disable-next-line vue/no-mutating-props
      --this.item.quantity;
    },
    onIncreaseButtonClick(){
      if(this.useStore){
        this.increaseQuantity(this.item.id)
        return;
      }
      // eslint-disable-next-line vue/no-mutating-props
      ++this.item.quantity

    }
  },
};
</script>

<style lang="less" scoped>
.item--quantity {
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
</style>
