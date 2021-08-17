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
import api from "@/api.js";

export default {
  data() {
    return {
      movie: null,
      dialog: false,
    };
  },
  methods: {
    close() {
      this.dialog = false;
    },
    removeFromList() {
      this.$root.$emit("remove-movie", this.movie.id);
      this.close();
    },
  },
  created() {
    this.$root.$on("movie-clicked", async (id) => {
      this.movie = await api.getMovie(id);
      this.dialog = true;
    });
  },
};
</script>