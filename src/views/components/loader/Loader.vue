<template>
  <div v-if="isLoading" class="loader">
    <img src="@/assets/loader.gif" class="loader__image" alt="loader">
  </div>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    }
  },
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
