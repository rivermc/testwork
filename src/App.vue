<template>
  <div id="app">
    <Suggests
      :url="url"
      :label="label"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
import Suggests from '@/views/components/suggests/Suggests.vue'

export default {
  name: 'App',
  components: { Suggests },
  data() {
    return {
      url: 'https://habr.com/kek/v2/publication/suggest-mention',
      label: '<span class="color-red">*</span> Пользователь или компания',
      placeholder: 'Введите имя пользователя или компании',
    }
  },
}
</script>

<style lang="scss">
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
