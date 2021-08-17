<template>
  <v-app-bar dark color="#455A64">
    <v-app-bar-title v-if="$vuetify.breakpoint.mdAndUp" class="title">Movie Rank</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn v-if="shareSupported" text @click="share">Share</v-btn>
      <v-btn v-if="user" text @click="signOut">Sign Out</v-btn>
      <v-btn v-else text @click="signIn">Sign In</v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import api from "@/api.js";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["user", "movieList"]),
    shareSupported() {
      return navigator.share;
    },
  },
  methods: {
    async signIn() {
      await api.signIn();
    },
    async signOut() {
      await api.signOut();
    },
    share() {
      navigator.share({
        url: location.href,
        title: this.title,
      });
    },
  },
};
</script>
<style scoped>
.title {
  overflow: visible;
}
</style>