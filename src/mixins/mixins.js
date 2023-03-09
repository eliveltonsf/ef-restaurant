export default {
  methods: {
    isDesktop() {
      const width = window.innerWidth;
      return width > 767;
    },
    isMobile() {
      const width = window.innerWidth;
      return width < 767;
    },
  },
  filters: {
    currency(value) {
      if(!value) return;
      return `${value.toLocaleString("pt-br", { maximumFractionDigits: 2, minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}`;
    },
  },
};
