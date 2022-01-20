<template>
  <div id="app">
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
@import './assets/styles/variable';

* {
  box-sizing: border-box;
}
#app {
  max-width: 500px;
  margin: 100px auto;
  .color-red {
    color: red;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
  }
}
</style>
