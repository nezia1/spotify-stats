<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col cols="12" class="text-center">
        <h1>Get your favorite tracks and artists.</h1>
      </v-col>
      <v-col cols="12" class="text-center">
        <v-btn color="#1ED760" width="90%" height="50px" class="white--text" v-on:click="login">
          <v-icon left>mdi-spotify</v-icon>Login with Spotify
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      clientId: process.env.VUE_APP_CLIENT_ID,
      callbackUrl:
        process.env.NODE_ENV === 'production' ? 'https://stats.nezia.xyz' : 'http://localhost:8080',
    };
  },
  methods: {
    login() {
      window.location.href = `https://accounts.spotify.com/authorize?response_type=token&client_id=${this.clientId}&scope=user-read-private user-top-read&redirect_uri=${this.callbackUrl}&show_dialog=true`;
    },
  },
};
</script>
