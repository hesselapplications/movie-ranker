import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    moviesList: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setMoviesList(state, moviesList) {
      state.moviesList = moviesList;
    }
  },
  getters: {
    isUsersList: state => {
      return state.user && state.moviesList && state.moviesList.userId == state.user.uid;
    }
  }
})
