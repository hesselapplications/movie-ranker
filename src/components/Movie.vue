<template>
  <v-badge class="d-block" :color="color" overlap left bordered :content="rank">
    <v-card class="movie" :img="imageUrl">
      <v-responsive :aspect-ratio="2 / 3"> </v-responsive>
    </v-card>
  </v-badge>
</template>

<script>
import * as Vibrant from "node-vibrant";
import api from "@/api.js";

export default {
  props: {
    rank: Number,
    movie: Object,
  },
  data() {
    return {
      color: "grey",
    };
  },
  computed: {
    imageUrl() {
      const path = this.movie["poster_path"];
      return api.getImageUrl(path);
    },
  },
  async created() {
    const palette = await Vibrant.from(this.imageUrl).getPalette();
    this.color = palette.DarkMuted.hex;
  }
};
</script>

<style scoped>
.movie {
  cursor: grab;
}
</style>