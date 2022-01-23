<template>
  <div id="app" role="main">
    <Suggests
      label="<span class='color--red'>*</span> Пользователь или компания"
      placeholder="Введите имя пользователя или компании"
      url="https://habr.com/kek/v2/publication/suggest-mention"
      param="q"
    />
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
