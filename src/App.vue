<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Spotify Charts</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-if="!spotifyToken"
        color="primary"
        :href="`https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=user-read-private user-top-read user-read-email&redirect_uri=http://localhost:8080`"
      >
        <v-icon left>mdi-spotify</v-icon>Login with Spotify
      </v-btn>
      <v-row v-else justify="end" align="center">
        <v-skeleton-loader :loading="isProfileLoading" type="avatar" class="mr-3">
          <v-avatar size="40">
            <img :src="userProfile.images[0].url" alt srcset />
          </v-avatar>
        </v-skeleton-loader>

        <h3 class="mr-5 font-weight-regular">Welcome, {{userProfile.display_name}}</h3>
        <v-btn color="primary" v-on:click="logout">
          <v-icon left>mdi-logout</v-icon>Logout
        </v-btn>
      </v-row>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  async created() {
    this.$vuetify.theme.dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (this.$route.hash) {
      const regexToken = /(?:#access_token=)(?<accessToken>.+?)(?:&.*)/;
      const tokenMatch = regexToken.exec(this.$route.hash);
      this.spotifyToken = tokenMatch.groups.accessToken;
      if (this.spotifyToken) {
        this.$router.replace('');
        this.userProfile = await this.fetchUserProfile();
      }
    }
  },
  data: () => ({
    spotifyToken: '',
    clientId: process.env.VUE_APP_CLIENT_ID,
    userProfile: {},
    isProfileLoading: true,
    topTracks: {},
    topArtists: {},
  }),
  methods: {
    logout() {
      this.spotifyToken = '';
    },
    async fetchUserProfile() {
      const response = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${this.spotifyToken}`,
        },
      });
      this.isProfileLoading = false;
      return response.data;
    },
    async fetchTopTracks(limit = 50) {
      const response = await axios.get(`https://api.spotify.com/v1/me/top/tracks?limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${this.spotifyToken}`,
        },
      });
      return response.data;
    },
  },
};
</script>
