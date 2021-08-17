import Vue from "vue"
import VueRouter from "vue-router"
import api from "@/api.js"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    beforeEnter: async (to, from, next) => {
      const user = await api.getUser();
      if (user) {
        const movieListId = await api.getMoviesListId(user.uid);
        next(`/lists/${movieListId}`);

      } else {
        api.signIn();
      }
    }
  },
  {
    path: '/lists/:listId',
    props: true,
    component: () => import("@/views/MoviesList.vue"),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
