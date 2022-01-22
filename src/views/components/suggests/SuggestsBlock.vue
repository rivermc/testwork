<template>
  <div class="suggests-block" role="list">
    <template v-if="suggests.length">
      <div
        v-for="(suggest, i) in suggests"
        :aria-label="suggest.name"
        :key="suggest.alias + i"
        :class="{'suggest': true, 'suggest--selected': suggest.selected}"
        role="listitem"
        tabindex="0"
        @keydown.enter="onSelect(suggest)"
        @click="onSelect(suggest)"
      >
        <img
          :src="suggest.avatar"
          :alt="suggest.name"
          class="suggest__image"
        >
        <div class="suggest__text">
          <p class="suggest__text-name">{{ suggest.name }}</p>
          <p v-if="suggest.type === 'user'" class="suggest__text-alias">{{ suggest.alias }}</p>
          <p v-else class="suggest__text-caption">{{ suggest.caption }}</p>
        </div>
      </div>
    </template>
    <template v-else>
      <p class="suggests-block__notify">По Вашему запросу ничего не найдено</p>
    </template>
  </div>
</template>

<script>

export default {
  name: 'SuggestsBlock',
  props: {
    suggests: {
      type: Array,
      required: true,
    },
    selected: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    this.setStatus()
  },
  watch: {
    selected() {
      this.setStatus()
    }
  },
  methods: {
    onSelect(suggest) {
      suggest.selected = !suggest.selected
      this.$emit('select:suggest', suggest)
    },

    setStatus() {
      this.suggests.forEach((suggest) => {
        const check = this.selected.find((sgst) => sgst.alias === suggest.alias && sgst.type === suggest.type)
        suggest.selected = !!check;
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variable.scss';

.suggests-block {
  border: 1px solid $color-gray;
  background: $color-white;
  display: inline-block;
  max-height: 250px;
  min-width: 50%;
  overflow: auto;
  margin: 5px 0;

  &__notify {
    padding: 0 10px;
    font-size: 14px;
  }
}

.suggest {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background: $color-gray;
  }

  &--selected {
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

    &-alias,
    &-caption {
      margin: 0;
      color: $color-gray-dark;
    }
  }
}
</style>
