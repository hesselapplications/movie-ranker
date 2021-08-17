<template>
  <div>
    <navigation />

    <v-container v-if="movieList">
      <v-row justify="center" class="px-2">
        <v-col>
          <!-- SEARCH -->
          <movie-search
            v-if="isUsersList"
            class="mt-2"
            @movie-selected="movieSelected"
            :excluded-movie-ids="new Set(movieList.movieIds)"
          />

          <!-- MOVIES -->
          <movies
            v-if="!loading"
            class="mt-4 mb-16"
            v-model="movieList.movieIds"
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
import MovieSearch from "@/components/MovieSearch.vue";
import Attribution from "@/components/Attribution.vue";
import MovieDialog from "@/components/MovieDialog.vue";
import api from "@/api.js";
import { mapGetters } from "vuex";
import Navigation from "@/components/Navigation.vue";

export default {
  components: {
    Movies,
    MovieSearch,
    Attribution,
    MovieDialog,
    Navigation,
  },
  props: {
    listId: String,
  },
  data() {
    return {
      movieList: null,
      loading: true,
    };
  },
  watch: {
    movieList: {
      deep: true,
      handler(newMovieList, oldMovieList) {
        if (newMovieList && oldMovieList) {
          api.updateMovieList(newMovieList);
        }
      },
    },
  },
  computed: {
    ...mapGetters(["isUsersList"]),
    draggable() {
      if (this.movieList) {
        const multipleMovies = this.movieList.movieIds.length > 1;
        return multipleMovies && this.isUsersList;
      } else {
        return false;
      }
    },
  },
  methods: {
    movieSelected(id) {
      this.movieList.movieIds.unshift(id);
    },
  },
  async created() {
    this.$root.$on("remove-movie", (id) => {
      const index = this.movieList.movieIds.indexOf(id);
      this.movieList.movieIds.splice(index, 1);
    });

    const movieList = await api.getMovieList(this.listId);
    if (movieList) {
      this.movieList = movieList;
      this.$store.commit("setMovieList", movieList);
      this.loading = false;
    } else {
      this.$router.push("/lists/not-found");
    }
  },
};
</script>