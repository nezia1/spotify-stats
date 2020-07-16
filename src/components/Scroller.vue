<template>
  <v-row class="scroller"><slot></slot></v-row>
</template>

<script>
export default {
  name: 'Scroller',
};
</script>

<style scoped>
.scroller {
  height: 69vh;
  overflow: auto;
  overflow-x: hidden;
}
</style>
