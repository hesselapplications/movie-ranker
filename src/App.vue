<template>
  <v-app>
    <v-main class="primary">
      <v-container>
        <v-row justify="center">
          <v-col lg="6" md="8" sm="10" cols="12">
            <!-- SEARCH -->
            <movie-search
              @movie-selected="movieSelected"
              :excluded-movies="movies"
              solo
            />

            <!-- LIST -->
            <movies v-if="movies.length > 0" class="mt-4" v-model="movies" />

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

export default {
  components: {
    Movies,
    MovieSearch,
    Attribution,
  },
  data() {
    return {
      movies: [],
    };
  },
  methods: {
    movieSelected(movie) {
      this.movies.push(movie);
    },
  },
  // async created() {
  //   const movies = await api.searchMovie("Fight club");
  //   const movie = movies.results[0];
  //   const imageUrl = await api.getImageUrl(movie.poster_path);
  //   console.log(movies, movie, imageUrl);
  // },
};
</script>