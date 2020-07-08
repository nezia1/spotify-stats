<template>
  <v-fade-transition>
    <v-card :color="cardColor" class="white--text" height="100%">
      <v-row>
        <v-col cols="5">
          <v-img :src="isTrack ? element.album.images[0].url : ''" height="150px" contain></v-img>
        </v-col>
        <v-col cols="7">
          <v-card-title primary-title class="text-left d-block">
            <div>
              <div class="headline text-truncate">{{ element.name }}</div>
              <div class="text-truncate">
                {{ isTrack ? formattedArtistNames(element.artists) : '' }}
              </div>
              <div>{{ isTrack ? element.album.release_date.split('-')[0] : '' }}</div>
            </div>
          </v-card-title>
        </v-col>
      </v-row>
    </v-card>
  </v-fade-transition>
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

<style></style>
