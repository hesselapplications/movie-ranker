<template>
  <v-fade-transition>
    <v-card
      v-show="loaded"
      :style="`cursor: ${draggable ? 'grab' : 'default'}`"
      :img="movie.posterUrl"
      v-on="$listeners"
      color="secondary"
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
  </v-fade-transition>
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
      color: "secondary",
      movie: {},
      loaded: false,
    };
  },
  watch: {
    id: {
      immediate: true,
      async handler(id) {
        this.loaded = false;
        this.movie = await api.getMovie(id);
        const palette = await Vibrant.from(this.movie.posterUrl).getPalette();
        this.color = palette.DarkMuted.hex;
        this.loaded = true;
      },
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