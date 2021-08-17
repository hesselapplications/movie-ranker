<template>
  <v-container>
    <v-row justify="center" class="px-2">
      <v-col lg="6" md="8" sm="10" cols="12">
        <!-- SIGN IN -->
        <sign-in v-if="!user" />

        <!-- SEARCH -->
        <movie-search
          v-else
          class="mt-2"
          @movie-selected="movieSelected"
          :excluded-movie-ids="new Set(moviesList.movieIds)"
        >
          <!-- MENU -->
          <template v-slot:actions>
            <app-menu />
          </template>
        </movie-search>

        <!-- MOVIES -->
        <movies v-if="!loading" class="mt-4" v-model="moviesList.movieIds" />

        <!-- LOADING -->
        <div v-else class="d-flex align-center justify-center py-16">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>

        <!-- MOVIE DIALOG -->
        <movie-dialog />

        <!-- ATTRIBUTION -->
        <attribution class="mt-4" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Movies from "@/components/Movies.vue";
import SignIn from "@/components/SignIn.vue";
import MovieSearch from "@/components/MovieSearch.vue";
import Attribution from "@/components/Attribution.vue";
import MovieDialog from "@/components/MovieDialog.vue";
import AppMenu from "@/components/AppMenu.vue";
import api from "@/api.js";
import { mapState } from "vuex";

export default {
  components: {
    Movies,
    SignIn,
    MovieSearch,
    Attribution,
    MovieDialog,
    AppMenu,
  },
  props: {
    listId: String,
  },
  data() {
    return {
      moviesList: {
        movieIds: [],
      },
      loading: true,
    };
  },
  watch: {
    moviesList: {
      deep: true,
      handler(moviesList) {
        api.saveMoviesList(moviesList);
      },
    },
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    movieSelected(id) {
      this.moviesList.movieIds.unshift(id);
    },
  },
  async created() {
    this.$root.$on("remove-movie", (id) => {
      const index = this.moviesList.movieIds.indexOf(id);
      this.moviesList.movieIds.splice(index, 1);
    });

    this.moviesList = await api.getMoviesList(this.listId);
    this.loading = false;
  },
};
</script>