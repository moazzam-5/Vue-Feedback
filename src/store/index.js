import { createStore } from "vuex";

export default createStore({
  state: {
    authenticated: false,
    user: "",
  },
  getters: {
    getAuth: (state) => {
      return state.authenticated;
    },
    getUser: (state) => {
      return state.user;
    },
  },
  mutations: {
    SET_AUTH(state, payload) {
      state.authenticated = payload;
    },
    SET_USER(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    setAuth({ commit }, payload) {
      commit("SET_AUTH", payload);
    },
    setUser({ commit }, payload) {
      commit("SET_USER", payload);
    },
  },
  modules: {},
});
