<template lang="">
  <div class="order">
    <form action="">
      <div class="user-data">
        <p class="section-title">Seus dados</p>

        <div class="input-field">
          <label for="">{{ formData.name.label }}</label>
          <input
            type="text"
            :placeholder="formData.name.placeholder"
            v-model="formData.name.value"
            @blur="formData.name.isValid"
            :class="{ error: !formData.name.valid }"
          />
          <p class="error-message" v-show="!formData.name.valid">
            {{ formData.name.errorMessage }}
          </p>
        </div>

        <div class="input-field">
          <label for="">{{ formData.cellPhone.label }}</label>
          <input
            type="text"
            :placeholder="formData.cellPhone.placeholder"
            v-mask="'(##) # ####-####'"
            v-model="formData.cellPhone.value"
            @blur="formData.cellPhone.isValid"
            :class="{ error: !formData.cellPhone.valid }"
          />
          <p class="error-message" v-show="!formData.cellPhone.valid">
            {{ formData.cellPhone.errorMessage }}
          </p>
        </div>
      </div>

      <div class="address">
        <p class="section-title">Endereço</p>

        <div class="delivery-type">
          <div class="radio-options">
            <input type="radio" name="delivery-type" id="store" checked>
            <label for="store">Retirar na loja</label>
          </div>
          <div class="radio-options">
            <input type="radio" name="delivery-type" id="delivery">
            <label for="delivery">Delivery</label>
          </div>
        </div>

        <a @click="onShowAddressModal">Adicionar endereço</a>

      </div>
    </form>
    <button class="primary-button" @click="orderItens">Concluir pedido</button>

    <Modal :showModal="showModalAddress" @on-modal-close="hideAddressModal">
      <div class="modal-content">

      </div>
  </Modal>
  </div>
</template>

<script>
import Modal from '@/components/ModalCustom.vue';

export default {
  components: {
    Modal
  },
  data() {
    return {
      formData: {
        name: {
          value: "",
          errorMessage: "O nome é obrigatório",
          label: "Nome",
          placeholder: "Digite seu nome",
          valid: true,
          isValid: () => {
            this.formData.name.valid = this.formData.name.value.length;
          },
        },
        cellPhone: {
          value: "",
          errorMessage: "O celular é obrigatório",
          label: "Celular",
          placeholder: "Digite seu celular",
          valid: true,
          isValid: () => {
            this.formData.cellPhone.valid =
              this.formData.cellPhone.value.length === 16;
          },
        },
      },
      showModalAddress: false
    };
  },
  methods: {
    triggerValidation() {
      this.formData.name.isValid();
      this.formData.cellPhone.isValid();
    },
    orderItens() {
      this.triggerValidation();
    },
    onShowAddressModal() {
      this.showModalAddress = true
    },
    hideAddressModal() {
      this.showModalAddress = false
    }
  },
};
</script>

<style lang="less" scoped>
.order {
  width: 720px;
  margin: 30px auto;
  background: white;
  border-radius: 8px;
  padding: 30px 50px;

  form {
    display: flex;
    flex-direction: column;

    .input-field {
      display: flex;
      flex-direction: column;

      &+.input-field {
        margin-top: 10px;
      }
    }

    .section-title {
      font-weight: 600;
      font-size: 22px;
      margin: 20px 0;
    }

    label {
      font-weight: 600;
      font-size: 16px;
      margin-bottom: 5px;
    }

    .error-message {
      font-size: 12px;
      margin: 10px 0;
      color: @error-color;
    }

    .address {
      .delivery-type {
        display: flex;
      }

      a {
        color: @pink;
        text-decoration: underline;
        cursor: pointer;
      }
    }



    .radio-options {
      display: flex;
      align-items: center;

      &+.radio-options {
        margin-left: 25px;

      }

      label {
        padding-left: 10px;
        margin-bottom: 0;
      }
    }
  }

  button {
    margin: 30px auto;
  }
}
</style>
