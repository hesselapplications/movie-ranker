<template>
  <v-badge class="d-block" :color="color" overlap left bordered :content="rank">
    <v-card class="movie">
      <v-img
        class="poster"
        :src="getImageUrl(movie['poster_path'])"
        contain
        @load="imageLoaded"
      ></v-img>
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
      color: "grey"
    }
  },
  methods: {
    getImageUrl(path) {
      return api.getImageUrl(path);
    },
    async imageLoaded(path) {
      const palette = await Vibrant.from(path).getPalette();
      console.log(palette);
      this.color = palette.DarkMuted.hex;
    },
  },
};
</script>

<style scoped>
.movie {
  cursor: grab;
}

.poster {
  border-radius: inherit !important;
}
</style>