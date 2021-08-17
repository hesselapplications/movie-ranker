import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "@/firebase.js";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    async signIn({ commit }) {
      var { user } = await firebase.signIn();
      commit("setUser", user);
    },

    async signOut({ commit }) {
      await firebase.signOut();
      commit("setUser", null);
    },
  },
})
