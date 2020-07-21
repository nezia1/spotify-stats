<template>
  <v-container>
    <v-row v-if="accessToken">
      <v-col cols="12">
        <Breadcrumbs :items="breadcrumbCategories" v-on:switch-active-item="switchCategory" />
      </v-col>
      <v-col cols="12">
        <v-row>
          <TopColumn
            columnName="Current"
            :isMobile="$vuetify.breakpoint.mobile"
            :elements="activeCategory === 'tracks' ? topTracksCurrent : topArtistsCurrent"
          />
          <TopColumn
            columnName="All time"
            :isMobile="$vuetify.breakpoint.mobile"
            :elements="activeCategory === 'tracks' ? topTracksAllTime : topArtistsAllTime"
          />
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TopColumn from '@/components/TopColumn.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';

export default {
  name: 'Stats',
  components: {
    TopColumn,
    Breadcrumbs,
  },
  data() {
    return {
      breadcrumbCategories: [
        {
          title: 'Tracks',
          active: true,
        },
        {
          title: 'Artists',
          active: false,
        },
      ],
    };
  },
  methods: {
    switchCategory(index) {
      this.breadcrumbCategories = this.breadcrumbCategories.map((category, i) => ({
        ...category,
        active: i === index,
      }));
    },
  },
  computed: {
    activeCategory() {
      return this.breadcrumbCategories.find((category) => category.active).title.toLowerCase();
    },
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
