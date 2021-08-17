<template>
  <div>
    <!-- MOVIES -->
    <draggable
      v-if="model.length > 0"
      v-model="model"
      v-bind="draggableOptions"
    >
      <v-col
        xl="2"
        md="3"
        cols="4"
        class="movie"
        v-for="(movie, index) in model"
        :key="index"
      >
        <movie :movie="movie" :rank="index + 1" :draggable="draggable" @click="movieClicked(movie)" />
      </v-col>
    </draggable>

    <!-- EMPTY STATE -->
    <v-row v-else justify="center" align="center">
      <v-col cols="auto" class="my-16 text-center">
        <v-avatar color="primary" size="150">
          <v-icon dark size="100"> mdi-video-vintage </v-icon>
        </v-avatar>
        <div class="white--text text-h4 mt-8">No movies here</div>
        <div class="white--text text-body-2">Search to add one</div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Movie from "@/components/Movie.vue";
import draggable from "vuedraggable";
import vmodel from "@/mixins/vmodel.js";

export default {
  mixins: [vmodel],
  components: {
    draggable,
    Movie,
  },
  computed: {
    draggable() {
      return this.model.length  > 1;
    },
    draggableOptions() {
      return {
        tag: "div",
        class: "row row--dense",
        delay: 100,
        delayOnTouchOnly: true,
        animation: 300,
        disabled: !this.draggable
      };
    },
  },
  methods: {
    movieClicked(movie) {
      this.$root.$emit("movie-clicked", movie);
    },
  },
};
</script>