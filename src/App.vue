<template>
  <div id="app" role="main">
    <Suggests />
    <div class="instruction">
      <h3>Keyboard Control</h3>
      <ul>
        <li>Tab - Next Element</li>
        <li>Shift Tab - Previous Element</li>
        <li>Enter - Select</li>
        <li>Ctrl Enter - Multiply Select</li>
      </ul>
      <h3>Mouse Control</h3>
      <ul>
        <li>Click - Select</li>
        <li>Ctrl Click - Multiply Select</li>
      </ul>
    </div>
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
  margin: 20px auto;

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
