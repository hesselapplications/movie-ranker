<template>
  <v-card :style="`cursor: ${draggable ? 'grab' : 'default'}`" :img="imageUrl" v-on="$listeners">
    <v-responsive :aspect-ratio="2 / 3">
      <div class="rank text-caption font-weight-bold" :style="{ background: color }">
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
    movie: Object,
    draggable: Boolean
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
  padding: 0px 4px;

  border-top-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-color: white;
  border-width: 2px;
  border-style: solid;
  color: white;
}
</style>