<template>
  <v-card
    :style="`cursor: ${draggable ? 'grab' : 'default'}`"
    :img="imageUrl"
    v-on="$listeners"
  >
    <v-responsive :aspect-ratio="2 / 3">
      <div
        class="rank text-caption font-weight-bold"
        :style="{ background: color }"
      >
        {{ rank }}
      </div>
    </v-responsive>
  </v-card>
</template>

<script>
import * as Vibrant from "node-vibrant";
import api from "@/api.js";

export default {
  props: {
    rank: Number,
    id: Number,
    draggable: Boolean,
  },
  data() {
    return {
      color: "grey",
      movie: null,
    };
  },
  watch: {
    async movie(movie) {
      if (!movie) return "grey";
      const palette = await Vibrant.from(this.imageUrl).getPalette();
      this.color = palette.DarkMuted.hex;
    },
    id: {
      immediate: true,
      async handler(id) {
        this.movie = await api.getMovie(id);
      },
    },
  },
  computed: {
    imageUrl() {
      if (!this.movie) return null;
      const path = this.movie["poster_path"];
      return api.getImageUrl(path);
    },
  },
};
</script>

<style scoped>
.rank {
  display: inline-block;
  user-select: none;
  position: absolute;
  top: 0px;
  left: 0px;
  padding: 2px 6px;

  border-top-left-radius: 4px;
  border-bottom-right-radius: 4px;
  color: white;
}
</style>