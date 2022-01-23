<template>
  <div class="loader">
    <img src="/loader.gif" class="loader__image" alt="loader">
  </div>
</template>

<script>
export default {
  name: 'Loader',
}
</script>

<style lang="scss" scoped>
.loader {
  text-align: center;
  padding: 10px;
  position: absolute;
  width: 100%;
  left: 0;

  &__image {
    width: 25px;
    height: 25px;
  }
}
</style>
