<template>
  <v-combobox
    v-model="selectedMovie"
    placeholder="Search movies"
    :search-input.sync="query"
    :loading="loading"
    :items="movies"
    item-text="title"
    prepend-inner-icon="mdi-magnify"
    @update:search-input="search"
    no-filter
    hide-no-data
    hide-selected
    hide-details
    return-object
    solo
    @input="movieSelected"
  >
    <template v-slot:append>
      <slot name="actions"/>
    </template>
  </v-combobox>
</template>

<script>
import _ from "lodash";
import api from "@/api.js";

export default {
  props: {
    excludedMovies: Array,
  },
  data() {
    return {
      selectedMovie: null,
      query: null,
      loading: false,
      movies: [],
    };
  },
  computed: {
    excludedMovieIds() {
      const ids = this.excludedMovies.map((movie) => movie.id);
      return new Set(ids);
    },
  },
  methods: {
    search: _.debounce(async function () {
      if (!this.query) return;
      if (this.query == this.selectedMovie?.title) return;

      const today = new Date().toISOString().slice(0, 10);

      this.loading = true;
      const { results } = await api.searchMovies(this.query.toLowerCase());
      this.movies = results
        .filter((result) => !this.excludedMovieIds.has(result.id))
        .filter((result) => result["poster_path"] != null)
        .filter((result) => result["release_date"] <= today);
      this.loading = false;
    }, 300),

    movieSelected(movie) {
      if (!movie || typeof movie != "object") return;
      this.$emit("movie-selected", movie);
      this.$nextTick(() => {
        this.query = null;
        this.selectedMovie = null;
        this.movies = [];
      });
    },
  },
};
</script>

<style>
.v-select.v-select--is-menu-active .v-input__icon--append .v-icon {
  transform: none !important;
}
</style>