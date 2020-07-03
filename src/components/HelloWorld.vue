<template>
  <v-container grid-list-md>
    <v-row>
      <v-col class="text-center">
        <h1>Current</h1>
      </v-col>
      <v-col class="text-center">
        <h1>All time</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-col v-for="topTrack in topTracks" :key="topTrack.id">
          <v-card color="cyan darken-2" class="white--text" height="100%">
            <v-row fill-height align-center>
              <v-col cols="5" height="100%">
                <v-img :src="topTrack.album.images[0].url" height="125px" contain></v-img>
              </v-col>
              <v-col cols="7">
                <v-card-title primary-title class="text-left">
                  <div>
                    <div class="headline">{{topTrack.name}}</div>
                    <div>{{formattedArtistNames(topTrack.artists)}}</div>
                    <div>{{topTrack.album.release_date.split('-')[0]}}</div>
                  </div>
                </v-card-title>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-col>
      <v-col>
        <v-col v-for="topTrack in topTracks" :key="topTrack.id">
          <v-card color="cyan darken-2" class="white--text" height="100%">
            <v-row fill-height align-center>
              <v-col cols="5" height="100%">
                <v-img :src="topTrack.album.images[0].url" height="125px" contain></v-img>
              </v-col>
              <v-col cols="7">
                <v-card-title primary-title class="text-left">
                  <div>
                    <div class="headline">{{topTrack.name}}</div>
                    <div>{{formattedArtistNames(topTrack.artists)}}</div>
                    <div>{{topTrack.album.release_date.split('-')[0]}}</div>
                  </div>
                </v-card-title>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  async created() {
    if (this.$store.state.accessToken) {
      await this.$store.dispatch('fetchTopTracks', 20
      );
    }
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
      }).join(', ')
    }
  }
};
</script>
