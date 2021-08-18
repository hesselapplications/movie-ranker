<template>
  <v-dialog v-model="dialog" max-width="500" :overlay-opacity="0.8">
    <v-card color="secondary" dark>
      <v-img
        v-if="movie.backdropUrl"
        :src="movie.backdropUrl"
        :aspect-ratio="16 / 9"
      />

      <v-card-title class="text-h5 text-truncate d-block pb-0">
        {{ movie.title }}
      </v-card-title>

      <v-card-text class="text-caption pt-2 pb-4">
        <!-- <span class="amber--text d-inline-flex align-center">
          <v-icon color="amber" x-small class="mr-1">mdi-star</v-icon>
          {{ rating }}
        </span>
        <span class="ml-3 mr-2">•</span>
        {{ releaseYear }}
        <span class="mx-2">•</span>
        {{ runtime }} -->
        <v-chip
          v-for="({ text, icon, color }, index) in details"
          :key="index"
          label
          outlined
          small
          :color="color"
          class="mr-2"
        >
          <v-icon left>{{ icon }}</v-icon>
          {{ text }}
        </v-chip>
      </v-card-text>

      <v-card-text class="text-body-2">
        {{ movie.overview }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="white" text @click="close"> Close </v-btn>

        <v-btn
          v-if="isUsersList"
          color="red"
          depressed
          dark
          @click="removeFromList"
        >
          Remove
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import api from "@/api.js";
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  data() {
    return {
      movie: {
        genres: [],
        runtime: 0,
        release_date: "",
        vote_average: 0,
      },
      dialog: false,
    };
  },
  computed: {
    ...mapGetters(["isUsersList"]),
    rating() {
      return (this.movie["vote_average"] / 2).toFixed(1);
    },
    releaseYear() {
      return this.movie["release_date"].substring(0, 4);
    },
    runtime() {
      const duration = moment.duration(this.movie.runtime, "minutes");
      return `${duration.get("hours")}h ${duration.get("minutes")}m`;
    },
    details() {
      return [
        {
          text: this.rating,
          icon: "mdi-star",
          color: "amber",
        },
        {
          text: this.releaseYear,
          icon: "mdi-calendar",
        },
        {
          text: this.runtime,
          icon: "mdi-clock-outline",
        },
      ];
    },
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
<style>
.v-chip:hover::before {
  opacity: 0 !important;
}
</style>