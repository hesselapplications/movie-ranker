<template>
  <div class="d-flex align-baseline my-4">
    <v-icon color="blue-grey" small class="mr-1">mdi-lock</v-icon>
    <span
      class="text-body-2 blue-grey--text text-uppercase"
      style="user-select: none"
    >
      View Only
    </span>
    <v-spacer></v-spacer>
    <v-btn depressed color="primary" dark @click="signIn">Sign in</v-btn>
  </div>
</template>

<script>
import api from "@/api.js";

export default {
  methods: {
    signIn() {
      api.signIn();
    },
  },
};
</script>