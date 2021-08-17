import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    movieList: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setMovieList(state, movieList) {
      state.movieList = movieList;
    }
  },
  getters: {
    isUsersList: state => {
      return state.user && state.movieList && state.movieList.userId == state.user.uid;
    }
  }
})
