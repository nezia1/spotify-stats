<template>
  <v-card :color="cardColor" class="white--text" height="100%">
    <v-row fill-height align="center" justify="center">
      <v-col cols="5">
        <v-img
          :src="isTrack ? element.album.images[0].url : element.images[0].url"
          height="150px"
          class="ml-5"
          contain
        >
        </v-img>
      </v-col>
      <v-col cols="7">
        <v-card-title primary-title class="text-left d-block">
          <div>
            <div class="headline text-truncate">{{ element.name }}</div>
            <div v-if="isTrack" class="text-truncate">
              {{ formattedArtistNames(element.artists) }}
            </div>
            <div v-if="isTrack">{{ element.album.release_date.split('-')[0] }}</div>
          </div>
        </v-card-title>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'TopCard',
  props: { element: Object, isTrack: Boolean, cardColor: String },
  methods: {
    formattedArtistNames(artists) {
      return artists
        .map((artist) => {
          return artist.name;
        })
        .join(', ');
    },
  },
};
</script>
