<template>
  <div>
    <v-container v-if="moviesList">
      <v-row justify="center" class="px-2">
        <v-col>
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
          <movies
            v-if="!loading"
            class="mt-4 mb-16"
            v-model="moviesList.movieIds"
            :draggable="draggable"
          />

          <!-- LOADING -->
          <div v-else class="d-flex align-center justify-center py-16">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </div>

          <!-- MOVIE DIALOG -->
          <movie-dialog />
        </v-col>
      </v-row>
    </v-container>

    <!-- ATTRIBUTION -->
    <attribution class="mt-4" />
  </div>
</template>

<script>
import Movies from "@/components/Movies.vue";
import SignIn from "@/components/SignIn.vue";
import MovieSearch from "@/components/MovieSearch.vue";
import Attribution from "@/components/Attribution.vue";
import MovieDialog from "@/components/MovieDialog.vue";
import AppMenu from "@/components/AppMenu.vue";
import api from "@/api.js";
import { mapState, mapGetters } from "vuex";

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
      moviesList: null,
      loading: true,
    };
  },
  watch: {
    moviesList: {
      deep: true,
      handler(newMoviesList, oldMoviesList) {
        if (newMoviesList && oldMoviesList) {
          api.updateMoviesList(newMoviesList);
        }
      },
    },
  },
  computed: {
    ...mapGetters(["isUsersList"]),
    draggable() {
      if (this.moviesList) {
        const multipleMovies = this.moviesList.movieIds.length > 1;
        return multipleMovies && this.isUsersList;
      } else {
        return false;
      }
    },
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

    const moviesList = await api.getMoviesList(this.listId);
    if (moviesList) {
      this.moviesList = moviesList;
      this.$store.commit("setMoviesList", moviesList);
      this.loading = false;
    } else {
      this.$router.push("/lists/not-found");
    }
  },
};
</script>