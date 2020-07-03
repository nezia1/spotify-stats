<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Spotify Charts</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-if="!accessToken"
        color="primary"
        :href="`https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=user-read-private user-top-read&redirect_uri=${callbackUrl}`"
      >
        <v-icon left>mdi-spotify</v-icon>Login with Spotify
      </v-btn>
      <v-row v-else justify="end" align="center">
        <v-skeleton-loader :loading="isProfileLoading" type="avatar" class="mr-3">
          <v-avatar size="40">
            <img :src="userProfile.images[0].url" :alt="`User profile picture`" srcset />
          </v-avatar>
        </v-skeleton-loader>

        <h3 class="mr-5 font-weight-regular">Welcome, {{userProfile.display_name}}</h3>
        <v-btn color="primary" v-on:click="$store.commit('logout')">
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
export default {
  name: 'App',
  async mounted() {
    this.$vuetify.theme.dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (this.$route.hash) {
      const regexToken = /(?:#access_token=)(?<accessToken>.+?)(?:&.*)/;
      const tokenMatch = regexToken.exec(this.$route.hash);
      this.$store.commit('setAccessToken', tokenMatch.groups.accessToken);
      this.$router.replace('');
    }
    if (this.accessToken) {
      this.isProfileLoading = true;
      await this.$store.dispatch('fetchUserProfile');
      this.isProfileLoading = false;
    }
  },
  data: () => ({
    clientId: process.env.VUE_APP_CLIENT_ID,
    isProfileLoading: false,
  }),
  computed: {
    accessToken() {
      return this.$store.state.accessToken;
    },
    userProfile() {
      return this.$store.state.userProfile;
    },
    callbackUrl() {
      return process.env.NODE_ENV === 'production' ? 'https://charts.nezia.xyz' : 'http://localhost:8080';
    }
  },
};
</script>
