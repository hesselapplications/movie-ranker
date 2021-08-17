<template>
  <v-menu v-model="showMenu" left bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>

    <v-list>
      <!-- SIGN OUT -->
      <v-list-item @click="signOut">
        <v-list-item-title>Sign Out</v-list-item-title>
      </v-list-item>

      <!-- SHARE -->
      <v-list-item v-if="shareSupported" @click="share">
        <v-list-item-title>Share</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import api from "@/api.js";

export default {
  data() {
    return {
      showMenu: false,
    };
  },
  computed: {
    shareSupported() {
      return navigator.share;
    },
  },
  methods: {
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