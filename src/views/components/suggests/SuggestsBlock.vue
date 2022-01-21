<template>
  <div class="suggests-block" role="list">
    <template v-if="suggests.length">
      <template v-for="(suggest, i) in suggests">
        <Suggest
          :suggest="suggest"
          :key="i + suggest.alias"
          @select:suggest="$emit('select:suggest', $event)"
        />
      </template>
    </template>
    <template v-else>
      <p class="suggests-block__notify">По Вашему запросу ничего не найдено</p>
    </template>
  </div>
</template>

<script>
import Suggest from '@/views/components/suggests/Suggest.vue'

export default {
  name: 'SuggestsBlock',
  components: { Suggest },
  props: {
    suggests: {
      type: Array,
      required: true,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './../../../assets/styles/variable.scss';

.suggests-block {
  border: 1px solid $color-gray;
  display: inline-block;
  max-height: 250px;
  min-width: 50%;
  overflow: auto;
  margin: 5px 0;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar { width: 0; }

  &__notify {
    padding: 0 10px;
    font-size: 14px;
  }
}
</style>
