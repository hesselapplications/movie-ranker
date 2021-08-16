<template>
  <draggable v-model="model" tag="div" class="row" :force-fallback="true">
    <v-col
      md="3"
      cols="4"
      class="movie"
      v-for="(movie, index) in model"
      :key="index"
    >
      <movie :movie="movie" :rank="index + 1" />
    </v-col>
  </draggable>
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
};
</script>