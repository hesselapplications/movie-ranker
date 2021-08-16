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
              solo
            />

            <!-- MOVIES -->
            <movies class="mt-4" v-model="movies" />

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

export default {
  components: {
    Movies,
    MovieSearch,
    Attribution,
    MovieDialog,
  },
  data() {
    return {
      movies: [],
    };
  },
  methods: {
    movieSelected(movie) {
      this.movies.unshift(movie);
    },
  },
  created() {
    this.$root.$on("remove-movie", (movie) => {
      const index = this.movies.indexOf(movie);
      this.movies.splice(index, 1);
    });
  },
};
</script>