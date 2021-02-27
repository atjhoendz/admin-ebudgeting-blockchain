export default {
  namespaced: true,
  state: {
    listToasts: [],
  },
  mutations: {
    ADD_TOAST(state, toast) {
      state.listToasts.push(toast);
    },
    RESET(state) {
      state.listToasts = [];
    },
  },
};
