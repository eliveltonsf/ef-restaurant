<!-- eslint-disable vue/no-mutating-props -->
<template lang="">
  <div class="item">
    <QuantityItem :item="item" class="item--quantity" />
    <div class="item--img-container">
      <img class="item--img" :src="item.image" />
    </div>
    <div class="content">
      <h3 class="item--name">{{ item.name }}</h3>
      <a class="item--observation" @click="onShowObservationModal"
        >Adicionar observação</a
      >
      <p class="item--observation-text">{{ item.observations }}</p>
    </div>
    <p class="item--price">{{ item.price | currency }}</p>
    <ModalCustom
      :show-modal="showObservationModal"
      @on-modal-close="onCloseObservationModal"
    >
    <div class="modal-content">
      <h1>Adicionar Observação</h1>
      <textarea v-model="item.observations" rows="8 "></textarea>
      <button class="secondary-button" @click="onCloseObservationModal">
        Cancelar
      </button>
      <button @click="saveObservation">Salvar</button>
    </div>
    </ModalCustom>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Mixin from "@/mixins/mixins";
import QuantityItem from "@/components/QuantityItem.vue";
import ModalCustom from "@/components/ModalCustom.vue";

export default {
  name: "CartItem",
  components: {
    QuantityItem,
    ModalCustom,
  },
  data() {
    return {
      showObservationModal: false,
    };
  },
  props: {
    item: {},
  },
  mixins: [Mixin],
  methods: {
    ...mapActions([
      "increaseQuantity", // map `this.increment()` to `this.$store.dispatch('increment')`
      "decreaseQuantity", // map `this.increment()` to `this.$store.dispatch('increment')`
    ]),
    onShowObservationModal() {
      console.log('teste')
      this.showObservationModal = true;
    },
    onCloseObservationModal() {
      this.showObservationModal = false;
    },
    saveObservation() {
      this.$store.dispatch('addObservation', this.item)
      this.showObservationModal = false;
    }
  },
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
    cursor: pointer;

    &:hover {
      opacity: 0.6;
    }
  }

  &--observation-text {
    font-size: 12px;
    color: @dark-grey;
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

  .modal-content {
    text-align: center;

    textarea {
      width: 100%;
      margin: 20px 0;
    }

    button+button {
      margin-left: 15px;
    }
  }

  @media @tablets {
    flex-wrap: wrap;

    &--img-container {
      order: 1;
    }

    .content {
      order: 2;
      width: 60%;
    }

    &--quantity {
      order: 3;
      padding: 0;
      align-items: center;
      justify-content: start;
      width: 50%;
      padding: 20px 20px 0 15px;
    }

    &--price {
      order: 4;
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: end;
      padding: 20px 20px 0 15px;
    }

    .modal-content {

      h1 {
        font-size: 20px;
      }

      textarea {
        margin: 30px 0;
        padding: 5px;
      }
    }
  }
}
</style>
