<template>
  <v-app>
    <v-main class="grey lighten-4">
      <v-container>
        <v-row justify="center">
          <v-col lg="6" md="8" sm="10" cols="12">
            <v-card>
              <v-card-title>Movie Ranker</v-card-title>

              <!-- SEARCH -->
              <v-combobox
                v-model="selectedMovie"
                class="mx-4"
                placeholder="Search movies"
                :search-input.sync="query"
                :loading="loading"
                :items="searchResults"
                item-text="title"
                outlined
                append-icon="mdi-magnify"
                @update:search-input="search"
                @change="movieSelected"
                no-filter
                hide-no-data
                hide-selected
                hide-details
                return-object
              >
                <!-- <template v-slot:item="{ item }">
                  <v-list-item-content>
                    <v-list-item-title class="truncate">{{ item.title }}</v-list-item-title>
                    <v-list-item-subtitle class="truncate">{{ item.overview }}</v-list-item-subtitle>
                  </v-list-item-content>
                </template> -->
              </v-combobox>

              <!-- LIST -->
              <v-list two-line>
                <draggable
                  v-model="movies"
                  @start="drag = true"
                  @end="drag = false"
                >
                  <v-list-item
                    v-for="(movie, index) in movies"
                    :key="index"
                  >
                    <v-list-item-avatar>
                      <v-img :src="getImageUrl(movie['poster_path'])"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>{{ movie.title }}</v-list-item-title>
                      <v-list-item-subtitle>{{
                        movie.overview
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </draggable>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import draggable from "vuedraggable";
import _ from "lodash";
import api from "@/api.js";

export default {
  components: {
    draggable,
  },
  data() {
    return {
      selectedMovie: null,
      query: null,
      loading: false,
      searchResults: [],
      movies: [],
    };
  },
  methods: {
    search: _.debounce(async function () {
      if (!this.query) return;
      if (this.query == this.selectedMovie?.title) return;

      console.log("Searching for", this.query);
      this.loading = true;
      const { results } = await api.searchMovies(this.query);
      this.searchResults = results;
      this.loading = false;
    }, 500),

    movieSelected(movie) {
      this.movies.push(movie);
    },

    getImageUrl(path) {
      return api.getImageUrl(path);
    }
  },
  // async created() {
  //   const movies = await api.searchMovie("Fight club");
  //   const movie = movies.results[0];
  //   const imageUrl = await api.getImageUrl(movie.poster_path);
  //   console.log(movies, movie, imageUrl);
  // },
};
</script>

<style>
.v-list-item {
  cursor: grab;
}

.v-select.v-select--is-menu-active .v-input__icon--append .v-icon {
  transform: none !important;
}

.truncate {
  text-overflow: ellipsis;
  max-width: 50ch;
}
</style>