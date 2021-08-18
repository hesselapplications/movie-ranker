<template>
  <v-card
    :style="`cursor: ${draggable ? 'grab' : 'default'}`"
    :img="movie.posterUrl"
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
      movie: {},
    };
  },
  watch: {
    id: {
      immediate: true,
      async handler(newValue, oldValue) {
        console.log(newValue, oldValue)
        if (newValue != oldValue) {
          this.movie = await api.getMovie(newValue);
          const palette = await Vibrant.from(this.movie.posterUrl).getPalette();
          this.color = palette.DarkMuted.hex;
        }
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