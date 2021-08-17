<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="auto" class="my-16 text-center">
        <v-avatar color="primary" size="150">
          <v-icon dark size="100"> mdi-robot-dead-outline </v-icon>
        </v-avatar>
        <div class="white--text text-h4 mt-8">Oops! </div>
        <div class="white--text text-body-2">Movie list not found</div>
        <v-btn class="mt-8" depressed color="primary" to="/">Go Home</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {};
</script>