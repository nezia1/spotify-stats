<template>
  <v-container>
    <v-row v-if="accessToken">
      <v-col class="text-center" cols="12" md="6">
        <h1>Current</h1>
        <v-col v-for="topTrack in topTracksCurrent" :key="topTrack.id">
          <v-lazy>
            <TopCard :element="topTrack" :isTrack="true" cardColor="cyan darken-2" />
          </v-lazy>
        </v-col>
      </v-col>
      <v-col class="text-center" cols="12" md="6">
        <h1>All time</h1>
        <v-col v-for="topTrack in topTracksAllTime" :key="topTrack.id">
          <v-lazy>
            <TopCard :element="topTrack" :isTrack="true" cardColor="cyan darken-2" />
          </v-lazy>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TopCard from './TopCard.vue';

export default {
  name: 'HelloWorld',
  components: {
    TopCard,
  },
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
    },
  },
};
</script>
