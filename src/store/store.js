import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    selectedCategory: "",
    cartList: [],
    isLoading: false,
  },
  mutations: {
    changeCategory(state, id) {
      state.selectedCategory = id;
    },
    changeStateLoading(state, value) {
      state.isLoading = value;
    },
    addToCart(state, product) {
      state.cartList.push({ ...product, quantity: product.quantity || 1 });
    },
    increaseQuantity(state, { index, quantity }) {
      state.cartList[index].quantity += quantity;
    },
    decreaseQuantity(state, index) {
      const quantity = state.cartList[index].quantity;
      if (quantity === 0) {
        state.cartList[index].quantity = 0;
      } else {
        --state.cartList[index].quantity;
      }
    },
    removeFromCart(state, index){
      state.cartList.splice(index, 1);
    }
  },
  actions: {
    changeCategory(context, id) {
      context.commit("changeCategory", id);
    },
    changeStateLoading(context, value) {
      context.commit("changeStateLoading", value);
    },
    addToCart({ state, commit }, product) {
      const isProductList = state.cartList.find(
        (item) => item.id === product.id
      );
      if (!isProductList) {
        commit("addToCart", product);
        return;
      }

      const isProductIndex = state.cartList.findIndex(
        (item) => item.id === product.id
      );
      commit("increaseQuantity", {
        index: isProductIndex,
        quantity: product?.quantity || 1,
      });
    },
    removeFromCart({ state, commit }, id) {
      const isProductIndex = state.cartList.findIndex((item) => item.id === id);
      if(isProductIndex !== -1) commit('removeFromCart', isProductIndex);
    },
    increaseQuantity({ state, commit }, id) {
      const isProductIndex = state.cartList.findIndex((item) => item.id === id);
      commit("increaseQuantity", { index: isProductIndex, quantity: 1 });
    },
    decreaseQuantity({ state, commit }, id) {
      const isProductIndex = state.cartList.findIndex((item) => item.id === id);
      commit("decreaseQuantity", isProductIndex);
    },
    addObservation({state, commit}, product){
      const isProductIndex = state.cartList.findIndex((item) => item.id === product.id);
      commit("addObservation", {
        index: isProductIndex,
        observation: product.observation,
      });
    }
  },
  getters: {
    getCartTotal: (state) => {
      return state.cartList.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);
    },
  },
});
