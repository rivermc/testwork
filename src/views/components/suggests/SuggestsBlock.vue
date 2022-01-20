<template>
  <div v-if="items.length" class="suggests">
    <template v-for="(item, i) in items">
      <Suggest
        :item="item"
        :key="i + item.alias"
        @select:suggest="$emit('select:suggest', $event)"
      />
    </template>
  </div>
</template>

<script>
import Suggest from '@/views/components/suggests/Suggest.vue'

export default {
  name: 'SuggestsBlock',
  components: { Suggest },
  props: {
    items: {
      type: Array,
      required: true,
    }
  },
}
</script>

<style lang="scss" scoped>
.suggests {
  margin: 5px 0;
  display: inline-block;
  border: 1px solid #ddd;
  max-height: 250px;
  min-width: 50%;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    width: 0;
  }
}
</style>
