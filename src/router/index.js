import Vue from "vue"
import VueRouter from "vue-router"
import api from "@/api.js"

Vue.use(VueRouter)

const routes = [
  {
    path: '/lists/not-found',
    component: () => import("@/views/NotFound.vue"),
  },
  {
    path: '/lists/:listId',
    props: true,
    component: () => import("@/views/MovieList.vue"),
  },
  {
    path: '*',
    beforeEnter: async (to, from, next) => {
      const user = await api.getUser();
      if (user) {
        const movieListId = await api.getMovieListId(user.uid);
        next(`/lists/${movieListId}`);

      } else {
        api.signIn();
      }
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
