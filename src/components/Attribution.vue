<template>
  <v-footer class="d-flex justify-center" color="secondary" fixed>
    <div class="text-caption">
      <v-img
        class="d-inline-block"
        :src="require('@/assets/tmdb.svg')"
        max-width="10ch"
        contain
      ></v-img>
      <span class="ml-1 blue-grey--text">
        This product uses the TMDb API but is not endorsed or certified by TMDb.
      </span>
    </div>
  </v-footer>
</template>

<script>
export default {};
</script>