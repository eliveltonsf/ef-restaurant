<template>
  <div class="item--quantity">
    <span class="buttons" @click="onDecreaseButtonClick">-</span>
    <span class="number"> {{ item.quantity }}</span>
    <span class="buttons" @click="onIncreaseButtonClick">+</span>
    <ModalCustom :show-modal="showModal">
      <div class="modal-content">
        <h2>Deseja remover esse item do carrinho?</h2>
        <button class="secondary-button" @click="onCancelButtonClick">
          Cancelar
        </button>
        <button @click="onRemoveButtonClick">Sim, remover</button>
      </div>
    </ModalCustom>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ModalCustom from "@/components/ModalCustom.vue";

export default {
  components: {
    ModalCustom,
  },
  props: {
    item: {},
    useStore: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    ...mapActions(["increaseQuantity", "decreaseQuantity"]),
    onDecreaseButtonClick() {
      if (this.useStore) {
        this.decreaseQuantity(this.item.id);
        if (!this.item.quantity) this.showModal = true;
        return;
      }

      // eslint-disable-next-line vue/no-mutating-props
      --this.item.quantity;
    },
    onIncreaseButtonClick() {
      if (this.useStore) {
        this.increaseQuantity(this.item.id);
        return;
      }
      // eslint-disable-next-line vue/no-mutating-props
      ++this.item.quantity;
    },
    onCancelButtonClick() {
      this.increaseQuantity(this.item.id);
      this.showModal = false;
    },
    onRemoveButtonClick() {
      this.showModal = false;
      this.$nextTick(() => {
        this.$store.dispatch("removeFromCart", this.item.id);
      });
    },
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

  .modal-content {
    text-align: center;

    button {
      margin-top: 20px;
      margin-left: 10px;
    }
  }
}
</style>
