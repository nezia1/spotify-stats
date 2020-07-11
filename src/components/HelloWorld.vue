<template>
  <v-container>
    <v-row v-if="accessToken">
      <v-col cols="12">
        <v-row justify="center" align="center">
          <v-col class="text-center" style="user-select: none;">
            <a
              :class="`text-h4 text-md-h3  mr-5 ${getBreadcrumbColor('tracks')}`"
              v-on:click="switchCategory('tracks')"
              >Tracks</a
            >
            <span class="text-h4 text-md-h3">/</span>
            <a
              :class="`text-h4 text-md-h3 ml-5 ${getBreadcrumbColor('artists')} `"
              v-on:click="switchCategory('artists')"
              >Artists</a
            >
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-row>
          <v-col class="text-center" cols="12" md="6">
            <h1>Current</h1>
            <v-col
              v-for="topTrack in category === 'tracks' ? topTracksCurrent : topArtistsCurrent"
              :key="topTrack.id"
            >
              <v-lazy>
                <TopCard
                  :element="topTrack"
                  :isTrack="category === 'tracks'"
                  cardColor="cyan darken-2"
                />
              </v-lazy>
            </v-col>
          </v-col>
          <v-col class="text-center" cols="12" md="6">
            <h1>All time</h1>
            <v-col
              v-for="topTrack in category === 'tracks' ? topTracksAllTime : topArtistsAllTime"
              :key="topTrack.id"
            >
              <v-lazy>
                <TopCard
                  :element="topTrack"
                  :isTrack="category === 'tracks'"
                  cardColor="cyan darken-2"
                />
              </v-lazy>
            </v-col>
          </v-col>
        </v-row>
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
  data() {
    return {
      category: 'tracks',
    };
  },
  methods: {
    switchCategory(chosenCategory) {
      this.category = chosenCategory;
    },
    getBreadcrumbColor(activeCategory) {
      if (this.category === activeCategory) {
        return 'blue-darken-2--text';
      }
      return this.$vuetify.theme.dark ? 'white--text' : 'black--text';
    },
  },
  computed: {
    topTracksCurrent() {
      return this.$store.state.topTracksCurrent;
    },
    topTracksAllTime() {
      return this.$store.state.topTracksAllTime;
    },
    topArtistsCurrent() {
      return this.$store.state.topArtistsCurrent;
    },
    topArtistsAllTime() {
      return this.$store.state.topArtistsAllTime;
    },
    accessToken() {
      return this.$store.state.accessToken;
    },
  },
};
</script>
