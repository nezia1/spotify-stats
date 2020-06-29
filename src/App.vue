<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Spotify Charts</v-toolbar-title>
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
    this.$vuetify.theme.dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  },
  data: () => ({

  }),
};
</script>
