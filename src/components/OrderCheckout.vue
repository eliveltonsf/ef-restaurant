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

        <div class="radio-container">
          <div class="radio-options">
            <input type="radio" name="delivery-type" id="store" value="store" v-model="deliveryType">
            <label for="store">Retirar na loja</label>
          </div>
          <div class="radio-options">
            <input type="radio" name="delivery-type" id="delivery" value="delivery" v-model="deliveryType">
            <label for="delivery">Delivery</label>
          </div>
        </div>

        <div class="address-card" v-if="isDeliveryType && hasAddressInfo && savedAddress">
         <p> {{formData.street.value}},  {{formData.number.value}} </p>
         <p> {{formData.city.value}} - {{formData.cep.value}} </p>
        </div>

        <a @click="onShowAddressModal" v-if="isDeliveryType">{{addressButtonLabel}}</a>

      </div>

      <div class="payment">
        <p class="section-title">Pagamento</p>
        <p >Método de pagamento</p>

        <div class="radio-container">
          <div class="radio-options">
            <input type="radio" name="payment-type" id="credit-card" value="credit-card" v-model="paymentType">
            <label for="store">Cartão</label>
          </div>
          <div class="radio-options">
            <input type="radio" name="payment-type" id="cash" value="cash" v-model="paymentType">
            <label for="delivery">Dinheiro</label>
          </div>
        </div>

      </div>

    </form>
    <button class="primary-button" @click="orderItens">Concluir pedido</button>

    <Modal :showModal="showModalAddress" @on-modal-close="hideAddressModal">
      <div class="modal-content">
          <h1>Adicionar Endereço</h1>

          <div class="input-field">
            <label for="">{{ formData.cep.label }}</label>
            <input
              type="text"
              :placeholder="formData.cep.placeholder"
              v-model="formData.cep.value"
              @blur="formData.cep.isValid"
              :class="{ error: !formData.cep.valid }"
            />
            <p class="error-message" v-show="!formData.cep.valid">
              {{ formData.cep.errorMessage }}
            </p>
         </div>

         <div class="input-field">
            <label for="">{{ formData.city.label }}</label>
            <input
              type="text"
              :placeholder="formData.city.placeholder"
              v-model="formData.city.value"
              @blur="formData.city.isValid"
              :class="{ error: !formData.city.valid }"
            />
            <p class="error-message" v-show="!formData.city.valid">
              {{ formData.city.errorMessage }}
            </p>
         </div>

         <div class="address-container">
            <div class="input-field">
              <label for="">{{ formData.street.label }}</label>
              <input
                type="text"
                :placeholder="formData.street.placeholder"
                v-model="formData.street.value"
                @blur="formData.street.isValid"
                :class="{ error: !formData.street.valid }"
              />
              <p class="error-message" v-show="!formData.street.valid">
                {{ formData.street.errorMessage }}
              </p>
            </div>

            <div class="input-field">
                <label for="">{{ formData.number.label }}</label>
                <input
                  type="text"
                  :placeholder="formData.number.placeholder"
                  v-model="formData.number.value"
                  @blur="formData.number.isValid"
                  :class="{ error: !formData.number.valid }"
                />
                <p class="error-message" v-show="!formData.number.valid">
                  {{ formData.number.errorMessage }}
                </p>
            </div>
         </div>

         <button class="secondary-button" @click="hideAddressModal">Cancelar</button>
         <button class="primary-button" @click="validadeAddressForm">Adicionar</button>

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
            this.formData.name.valid = !!this.formData.name.value.length;
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
        cep: {
          value: "",
          errorMessage: "O cep é obrigatório",
          label: "CEP",
          placeholder: "Digite seu cep",
          valid: true,
          isValid: () => {
            this.formData.cep.valid =
              !!this.formData.cep.value.length;
          },
        },
        city: {
          value: "",
          errorMessage: "A cidade é obrigatório",
          label: "Cidade",
          placeholder: "Digite sua cidade",
          valid: true,
          isValid: () => {
            this.formData.city.valid =
              !!this.formData.city.value.length;
          },
        },
        street: {
          value: "",
          errorMessage: "A rua é obrigatório",
          label: "Rua",
          placeholder: "Digite sua rua",
          valid: true,
          isValid: () => {
            this.formData.street.valid =
              !!this.formData.street.value.length;
          },
        },
        number: {
          value: "",
          errorMessage: "O numero é obrigatório",
          label: "Número",
          placeholder: "Digite o numero",
          valid: true,
          isValid: () => {
            this.formData.number.valid =
              !!this.formData.number.value.length;
          },
        },
      },
      showModalAddress: false,
      deliveryType: 'store',
      savedAddress: false,
      paymentType: false
    };
  },
  computed: {
    isAddressFormValid() {
      let isValid = true;
      isValid &= this.formData.cep.valid;
      isValid &= this.formData.city.valid;
      isValid &= this.formData.street.valid;
      isValid &= this.formData.number.valid;
      console.log(isValid)
      return isValid;
    },
    isDeliveryType() {
      return this.deliveryType === 'delivery';
    },
    hasAddressInfo() {
      return (
        this.formData.cep.value ||
        this.formData.city.value ||
        this.formData.street.value ||
        this.formData.number.value
      );
    },
    addressButtonLabel() {
      return this.hasAddressInfo ? 'Editar endereço' : 'Adicionar endereço'
    }
  },
  methods: {
    triggerValidation() {
      this.formData.name.isValid();
      this.formData.cellPhone.isValid();
    },
    triggerAddressFormValidations() {
      this.formData.cep.isValid();
      this.formData.city.isValid();
      this.formData.street.isValid();
      this.formData.number.isValid();
    },
    orderItens() {
      this.triggerValidation();
    },
    onShowAddressModal() {
      this.showModalAddress = true
    },
    hideAddressModal() {
      this.showModalAddress = false
    },
    validadeAddressForm() {
      this.triggerAddressFormValidations();
      if (this.isAddressFormValid == 1) {
        this.showModalAddress = false;
        this.savedAddress = true;
      } else {
        this.showModalAddress = true;
      }

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

    .section-title {
      font-weight: 600;
      font-size: 22px;
      margin: 20px 0;
    }

    .radio-container {
        display: flex;
        margin: 20px 0;
      }

    .address {

      a {
        color: @pink;
        font-weight: normal;
        font-size: 12px;
        text-decoration: underline;
        cursor: pointer;
        width: fit-content;
      }

      .address-card {
        border-radius: 8px;
        border: 1px solid @dark-grey;
        padding: 10px 20px;
        margin: 15px 0;
        width: fit-content;

        p {
          font-weight: normal;
          font-size: 13px;
          color: @dark-grey;
          margin: 10px 0;
        }
      }
    }

    .payment {

      p {
        font-weight: 500;
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

  .address-container {
    display: flex;
    margin-top: 10px;
    margin-bottom: 20px;

    .input-field {
      margin: 0;
      width: 100%;


      &+.input-field {
        margin-top: 0;
        width: 30%;
        margin-left: 30px;
      }
    }
  }

  .input-field {
    display: flex;
    flex-direction: column;
    margin: 20px 0;

    .error-message {
      font-size: 12px;
      margin: 10px 0;
      color: @error-color;
    }

    label {
      font-weight: 600;
      font-size: 16px;
      margin-bottom: 5px;
    }

    &+.input-field {
      margin-top: 10px;
    }
  }

  button {
    margin: 30px auto;
  }

  .modal-content {
    button {
      margin: auto;

      &+button {
        margin-left: 15px;
      }
    }
  }
}
</style>
