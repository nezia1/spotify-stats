<template>
  <v-col v-if="isMobile" class="text-center" cols="12" md="6">
    <h1>{{ columnName }}</h1>
    <v-col v-for="element in elements" :key="element.id">
      <v-lazy>
        <TopCard :element="element" :isTrack="element.type === 'track'" cardColor="blue" />
      </v-lazy>
    </v-col>
  </v-col>
  <v-col v-else class="text-center" cols="12" md="6">
    <h1>{{ columnName }}</h1>
    <Scroller>
      <v-col cols="6" v-for="element in elements" :key="element.id">
        <v-lazy>
          <TopCard
            :element="element"
            :isTrack="element.type === 'track'"
            cardColor="blue darken-2"
          />
        </v-lazy>
      </v-col>
    </Scroller>
  </v-col>
</template>

<script>
import Scroller from '@/components/Scroller.vue';
import TopCard from '@/components/TopCard.vue';

export default {
  name: 'TopColumn',
  components: {
    Scroller,
    TopCard,
  },
  props: { columnName: String, isMobile: Boolean, elements: Array },
  data() {
    return {};
  },
};
</script>
