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

html {
  font-size: 10px;
}

#app {
  color: $color-black;
  max-width: 500px;
  margin: 20px auto;

  * {
    box-sizing: border-box;

    &:focus {
      outline: none;
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

  ::-webkit-scrollbar {
    width: 8px;
    height: 10px;
  }
  ::-webkit-scrollbar-track {
    background: $color-blue;
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background: $color-gray-dark;
    border-radius: 5px;
    min-height: 50px;
  }
}
</style>
