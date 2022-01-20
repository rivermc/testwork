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
    suggest: {
      type: Suggest,
      required: true,
    }
  },
  computed: {
    avatar() {
      return this.suggest.avatar || require('@/assets/logo.png')
    },
    name() {
      return this.suggest.name || `@${this.suggest.alias}`
    },
    alias() {
      return this.suggest.type === 'user' ? this.suggest.name ? `@${this.suggest.alias}`: '' : 'Компания'
    }
  },
  methods: {
    onClick() {
      this.$emit('select:suggest', this.suggest)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../../assets/styles/variable.scss';

.suggest {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background: $color-gray;
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
      color: $color-gray-dark;
    }
  }
}
</style>
