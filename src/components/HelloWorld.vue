<template>
  <v-container>
    <v-row v-if="accessToken">
      <v-col class="text-center" cols="12" md="6">
        <h1>Current</h1>
        <v-col v-for="topTrack in topTracksCurrent" :key="topTrack.id">
          <v-lazy>
            <v-card color="cyan darken-2" class="white--text" height="100%">
              <v-row fill-height align-center>
                <v-col cols="5" height="100%">
                  <v-img :src="topTrack.album.images[0].url" height="125px" contain></v-img>
                </v-col>
                <v-col cols="7">
                  <v-fade-transition>
                    <v-card-title primary-title class="text-left d-block">
                      <div>
                        <div class="headline text-truncate">{{topTrack.name}}</div>
                        <div class="text-truncate">{{formattedArtistNames(topTrack.artists)}}</div>
                        <div>{{topTrack.album.release_date.split('-')[0]}}</div>
                      </div>
                    </v-card-title>
                  </v-fade-transition>
                </v-col>
              </v-row>
            </v-card>
          </v-lazy>
        </v-col>
      </v-col>
      <v-col class="text-center" cols="12" md="6">
        <h1>All time</h1>
        <v-col v-for="topTrack in topTracksAllTime" :key="topTrack.id">
          <v-lazy>
            <v-card color="cyan darken-2" class="white--text" height="100%">
              <v-row fill-height align-center>
                <v-col cols="5" height="100%">
                  <v-img :src="topTrack.album.images[0].url" height="125px" contain></v-img>
                </v-col>
                <v-col cols="7">
                  <v-card-title primary-title class="text-left d-block">
                    <div>
                      <div class="headline text-truncate">{{topTrack.name}}</div>
                      <div class="text-truncate">{{formattedArtistNames(topTrack.artists)}}</div>
                      <div>{{topTrack.album.release_date.split('-')[0]}}</div>
                    </div>
                  </v-card-title>
                </v-col>
              </v-row>
            </v-card>
          </v-lazy>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  async mounted() {
    await this.$store.dispatch('fetchTopTracks', { limit: 20, timeRange: 'short_term' });
    await this.$store.dispatch('fetchTopTracks', { limit: 20, timeRange: 'long_term' });
  },
  computed: {
    topTracksCurrent() {
      return this.$store.state.topTracksCurrent;
    },
    topTracksAllTime() {
      return this.$store.state.topTracksAllTime;
    },
    accessToken() {
      return this.$store.state.accessToken;
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
