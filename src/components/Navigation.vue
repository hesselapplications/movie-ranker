<template>
  <v-app-bar dark color="secondary" app fixed>
    <v-icon>mdi-grain</v-icon>
    <slot />
    <v-spacer></v-spacer>
    <v-fade-transition>
      <v-toolbar-items v-show="loaded">
        <v-btn v-if="shareSupported" text :small="isMobile" @click="share"
          >Share</v-btn
        >
        <v-btn v-if="user" text :small="isMobile" @click="signOut"
          >Sign Out</v-btn
        >
        <v-btn v-else text :small="isMobile" @click="signIn">Sign In</v-btn>
      </v-toolbar-items>
    </v-fade-transition>
  </v-app-bar>
</template>

<script>
import api from "@/api.js";
import { mapState } from "vuex";

export default {
  data() {
    return {
      loaded: false
    }
  },
  computed: {
    ...mapState(["user"]),
    shareSupported() {
      return navigator.share;
    },
    isMobile() {
      return !this.$vuetify.breakpoint.mdAndUp;
    },
  },
  async created() {
    await api.getUser();
    this.loaded = true;
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