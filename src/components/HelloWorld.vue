<template>
  <v-container>
    <v-row class="text-center">
      <v-btn
        v-if="!spotifyCode"
        color="primary"
        href="https://accounts.spotify.com/authorize?response_type=code&client_id=af51cce79ce14914a5eba62f51c92a2b&scope=user-read-private user-read-email&redirect_uri=http://localhost:8080"
      >Login</v-btn>
      <v-btn v-else color="primary" v-on:click="logout">Logout</v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  created() {
    this.spotifyCode = this.$route.query.code;
    if (this.spotifyCode) {
      this.$router.replace('');
    }
  },
  data: () => ({
    spotifyCode: '',
    profile: {},
  }),
  methods: {
    logout() {
      this.spotifyCode = '';
    },
  },
};
</script>
