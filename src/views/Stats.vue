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
          <TopColumn
            columnName="Current"
            :isMobile="$vuetify.breakpoint.mobile"
            :elements="category === 'tracks' ? topTracksCurrent : topArtistsCurrent"
          />
          <TopColumn
            columnName="All time"
            :isMobile="$vuetify.breakpoint.mobile"
            :elements="category === 'tracks' ? topTracksAllTime : topArtistsAllTime"
          />
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TopColumn from '@/components/TopColumn.vue';

export default {
  name: 'Stats',
  components: {
    TopColumn,
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
      return 'white--text';
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
