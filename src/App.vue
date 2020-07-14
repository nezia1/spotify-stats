<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Spotify Stats</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon
        v-if="accessToken && $vuetify.breakpoint.mobile"
        v-on:click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-row v-else-if="accessToken" justify="end" align="center">
        <v-skeleton-loader type="avatar" class="mr-3" :loading="!userAvatarExists">
          <v-avatar size="40">
            <img
              v-if="userAvatarExists"
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
    <v-navigation-drawer v-if="$vuetify.breakpoint.mobile" app right v-model="drawer">
      <v-list>
        <v-list-item class="mb-2">
          <v-list-item-avatar>
            <v-skeleton-loader type="avatar" class="mr-3" :loading="!userAvatarExists">
              <v-avatar size="40">
                <img
                  v-if="userAvatarExists"
                  :src="userProfile.images[0].url"
                  :alt="`User profile picture`"
                  srcset
                />
              </v-avatar>
            </v-skeleton-loader>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Welcome, {{ userProfile.display_name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item v-on:click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              Logout
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      drawer: false,
    };
  },
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
  },
  computed: {
    accessToken() {
      return this.$store.state.accessToken;
    },
    userProfile() {
      return this.$store.state.userProfile;
    },
    userAvatarExists() {
      return this.userProfile?.images?.length > 0 && this.userProfile.images[0].url;
    },
  },
};
</script>
