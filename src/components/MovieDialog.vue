<template>
  <v-dialog v-if="movie" v-model="dialog" max-width="500">
    <v-card>
      <v-card-title class="text-h6 text-truncate d-block">
        {{ movie.title }}
      </v-card-title>

      <v-card-text>
        {{ movie.overview || "No description available" }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="grey text-darken-1" text @click="close"> Cancel </v-btn>

        <v-btn color="red" depressed dark @click="removeFromList">
          Remove
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      movie: null,
      dialog: false,
    };
  },
  computed: {
    releaseDate() {
      if (!this.movie) return null;
      const date = this.movie["release_date"];
      return moment(date).format("MMM Do, YYYY");
    },
  },
  methods: {
    close() {
      this.dialog = false;
    },
    removeFromList() {
      this.$root.$emit("remove-movie", this.movie);
      this.close();
    },
  },
  created() {
    this.$root.$on("movie-clicked", (movie) => {
      this.movie = movie;
      this.dialog = true;
    });
  },
};
</script>