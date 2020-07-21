<template>
  <a :class="`text-h4 text-md-h3 ${isActive ? 'blue--text text--darken-1' : 'white--text'}`">
    {{ title }}
  </a>
</template>

<script>
export default {
  props: { title: String, isActive: Boolean },
};
</script>

<style></style>
