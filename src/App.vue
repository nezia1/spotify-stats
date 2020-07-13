<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Spotify Stats</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-row v-if="accessToken" justify="end" align="center">
        <v-skeleton-loader type="avatar" class="mr-3">
          <v-avatar size="40">
            <img
              v-if="userAvatarExists(userProfile)"
              :src="userProfile.images[0].url"
              :alt="`User profile picture`"
              srcset
            />
          </v-avatar>
        </v-skeleton-loader>
        <h3 class="mr-5 font-weight-regular">Welcome, {{ userProfile.display_name }}</h3>
        <v-btn color="primary" v-on:click="logout"> <v-icon left>mdi-logout</v-icon>Logout </v-btn>
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
    if (this.$route.hash) {
      const regexToken = /(?:#access_token=)(?<accessToken>.+?)(?:&.*)/;
      const tokenMatch = regexToken.exec(this.$route.hash);
      this.$store.commit('setAccessToken', tokenMatch.groups.accessToken);
      this.$router.replace('/stats');
    }
  },

  methods: {
    logout() {
      this.$store.commit('logout');
      this.$router.replace('/');
    },
    userAvatarExists(profile) {
      return profile?.images?.length > 0 && profile.images[0].url;
    },
  },
  computed: {
    accessToken() {
      return this.$store.state.accessToken;
    },
    userProfile() {
      return this.$store.state.userProfile;
    },
  },
};
</script>
