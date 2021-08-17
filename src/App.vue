<template>
  <v-app>
    <v-main class="secondary">
      <v-container>
        <v-row justify="center" class="px-2">
          <v-col lg="6" md="8" sm="10" cols="12">
            <!-- SEARCH -->
            <movie-search
              class="mt-2"
              @movie-selected="movieSelected"
              :excluded-movies="movies"
            >
              <!-- MENU -->
              <template v-slot:actions>
                <app-menu />
              </template>
            </movie-search>

            <!-- MOVIES -->
            <movies v-if="!loading" class="mt-4" v-model="movies" />

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
    </v-main>
  </v-app>
</template>

<script>
import Movies from "@/components/Movies.vue";
import MovieSearch from "@/components/MovieSearch.vue";
import Attribution from "@/components/Attribution.vue";
import MovieDialog from "@/components/MovieDialog.vue";
import AppMenu from "@/components/AppMenu.vue";
import api from "@/api.js";

export default {
  components: {
    Movies,
    MovieSearch,
    Attribution,
    MovieDialog,
    AppMenu,
  },
  data() {
    return {
      movies: [],
      loading: true,
    };
  },
  methods: {
    movieSelected(movie) {
      this.movies.unshift(movie);
    },
  },
  async created() {
    this.$root.$on("remove-movie", (movie) => {
      const index = this.movies.indexOf(movie);
      this.movies.splice(index, 1);
    });

    this.movies = await api.getMovies("XPlfk5Vx82yEHt8DoWCj");
    this.loading = false;
  },
};
</script>