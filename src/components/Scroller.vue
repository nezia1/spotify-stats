<template>
  <div class="scroller"><slot></slot></div>
</template>

<script>
export default {
  name: 'Scroller',
};
</script>

<style lang="sass" scoped>
.scroller
    display: flex
    flex-direction: column
    flex: 1 0 0
    height: 69vh
    overflow: auto
    overflow-x: hidden
</style>
