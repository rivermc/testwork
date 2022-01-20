<template>
  <div class="suggest" @click="onClick">
    <img
      :src="avatar"
      :alt="name"
      class="suggest__image"
    >
    <div class="suggest__text">
      <p class="suggest__text-name">{{ name }}</p>
      <p class="suggest__text-alias">{{ alias }}</p>
    </div>
  </div>
</template>

<script>
import Suggest from '@/models/Suggest';

export default {
  name: 'Suggest',
  emits: ['select:suggest'],
  props: {
    item: {
      type: Suggest,
      required: true,
    }
  },
  computed: {
    avatar() {
      return this.item.avatar || require('@/assets/logo.png')
    },
    name() {
      return this.item.name || `@${this.item.alias}`
    },
    alias() {
      return this.item.type === 'user' ? this.item.name ? `@${this.item.alias}`: '' : 'Компания'
    }
  },
  methods: {
    onClick() {
      this.$emit('select:suggest', this.item)
    }
  }
}
</script>

<style lang="scss" scoped>
.suggest {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background: #ddd;
  }

  &__image {
    max-width: 40px;
    max-height: 40px;
    margin-right: 10px;
  }

  &__text {
    font-size: 14px;

    &-name {
      margin: 0;
      font-weight: bold;
    }

    &-alias {
      margin: 0;
      color: #4e4e4e;
    }
  }
}
</style>
