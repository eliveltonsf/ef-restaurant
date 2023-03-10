<template>
  <div class="item--quantity">
    <span class="buttons" @click="onDecreaseButtonClick">-</span>
    <span class="number"> {{ item.quantity }}</span>
    <span class="buttons" @click="onIncreaseButtonClick">+</span>
    <Modal :show-modal="showModal">
      <div class="modal-content">
        <h2>Deseja remover esse item do carrinho?</h2>
          <button class="secondary-button">Cancelar</button>
          <button>Sim, remover</button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Modal from "@/components/ModalClosedProduct.vue";

export default {
  components: {
    Modal,
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
