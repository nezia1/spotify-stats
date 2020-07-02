<template>
  <v-container>
    <v-row class="text-center">
      <v-card
        color="cyan darken-2"
        class="white--text"
        v-for="topTrack in topTracks"
        :key="topTrack.id"
      >
        <v-layout>
          <v-flex xs5>
            <v-img src="https://cdn.vuetifyjs.com/images/cards/foster.jpg" height="125px" contain></v-img>
          </v-flex>
          <v-flex xs7>
            <v-card-title primary-title>
              <div>
                <div class="headline">{{topTrack.name}}</div>
                <div>{{formattedArtistNames(topTrack.artists)}}</div>
                <div>(2014)</div>
              </div>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider light></v-divider>
        <v-card-actions class="pa-3">
          Rate this album
          <v-spacer></v-spacer>
          <v-icon>mdi-star</v-icon>
          <v-icon>mdi-star</v-icon>
          <v-icon>mdi-star</v-icon>
          <v-icon>mdi-star</v-icon>
          <v-icon>mdi-star</v-icon>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  async created() {
    await this.$store.dispatch('fetchTopTracks', 20);
  },
  computed: {
    topTracks() {
      return this.$store.state.topTracks;
    }
  },
  methods: {
    formattedArtistNames(artists) {
      return artists.map((artist) => {
        return artist.name
      }).join(' ft. ')
    }
  }
};
</script>
