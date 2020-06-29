<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Spotify Charts</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-if="!spotifyToken"
        color="primary"
        :href="`https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=user-read-private user-read-email&redirect_uri=http://localhost:8080`"
      >
        <v-icon left>mdi-spotify</v-icon>Login with Spotify
      </v-btn>
      <v-btn v-else color="primary" v-on:click="logout">
        <v-icon left>mdi-logout</v-icon>Logout
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
    this.$vuetify.theme.dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (this.$route.hash) {
      const regexToken = /(?:#access_token=)(?<accessToken>.+?)(?:&.*)/;
      const tokenMatch = regexToken.exec(this.$route.hash);
      this.spotifyToken = tokenMatch.groups.accessToken;
      if (this.spotifyToken) {
        this.$router.replace('');
      }
    }
  },
  data: () => ({
    spotifyToken: '',
    clientId: process.env.VUE_APP_CLIENT_ID,
  }),
  methods: {
    logout() {
      this.spotifyToken = '';
    },
  },
};
</script>
