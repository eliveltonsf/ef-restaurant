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
          <h1>Adicionar Endereço</h1>

          <div class="input-field">
            <label for="">{{ formData.cep.label }}</label>
            <input
              type="text"
              :placeholder="formData.cep.placeholder"
              v-mask="'(##) # ####-####'"
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
              v-mask="'(##) # ####-####'"
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
                v-mask="'(##) # ####-####'"
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
                  v-mask="'(##) # ####-####'"
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
         <button class="primary-button">Adicionar</button>

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
        cep: {
          value: "",
          errorMessage: "O cep é obrigatório",
          label: "CEP",
          placeholder: "Digite seu cep",
          valid: true,
          isValid: () => {
            this.formData.cep.valid =
              this.formData.cep.value.length;
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
              this.formData.city.value.length;
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
              this.formData.street.value.length;
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
              this.formData.number.value.length;
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

    .section-title {
      font-weight: 600;
      font-size: 22px;
      margin: 20px 0;
    }



    .error-message {
      font-size: 12px;
      margin: 10px 0;
      color: @error-color;
    }

    .address {
      .delivery-type {
        display: flex;
        margin-bottom: 20px;
      }

      a {

        color: @pink;
        font-weight: normal;
        font-size: 12px;
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

      & + button {
        margin-left: 15px;
      }
    }
  }
}
</style>
