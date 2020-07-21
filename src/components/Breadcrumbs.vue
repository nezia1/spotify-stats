<template>
  <v-row align="center" justify="center">
    <div v-for="(item, index) in items" :key="index">
      <Breadcrumb
        :title="item.title"
        :isActive="item.active"
        v-on:click.native="$emit('switch-active-item', index)"
      />
      <span v-if="index !== items.length - 1" class="text-h4 text-md-h3 mr-3">/</span>
    </div>
  </v-row>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb.vue';

export default {
  name: 'Breadcrumbs',
  components: {
    Breadcrumb,
  },
  props: {
    items: Array,
  },
};
</script>
