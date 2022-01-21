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
@import './assets/styles/variable';

#app {
  max-width: 500px;
  margin: 100px auto;

  * {
    box-sizing: border-box;

    &:focus {
      outline: 2px solid $color-blue;
    }
  }

  .color--red {
    color: $color-red;
  }

  .fade-enter-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
}
</style>
