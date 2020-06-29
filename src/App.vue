<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Spotify Charts</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  created() {
    this.$vuetify.theme.dark = false;
  },
  data: () => ({

  }),
};
</script>
