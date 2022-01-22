<template>
  <div id="app" role="main">
    <Suggests />
  </div>
</template>

<script>
import Suggests from '@/views/components/suggests/Suggests.vue'

export default {
  name: 'App',
  components: { Suggests },
}
</script>

<style lang="scss">
@import '~@/assets/styles/variable';

#app {
  color: $color-black;
  max-width: 500px;
  margin: 20px auto;
}
</style>
