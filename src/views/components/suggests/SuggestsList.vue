<template>
  <ul class="suggests-list">
    <template v-if="suggests.length">
      <li
        v-for="suggest in suggests"
        :key="suggest.alias + suggest.type"
        :aria-label="suggest.name"
        :class="{'suggest': true, 'suggest--selected': suggest.selected}"
        ref="Suggest"
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
      </li>
    </template>
    <template v-else>
      <p class="suggests-list__notify">По Вашему запросу ничего не найдено</p>
    </template>
  </ul>
</template>

<script>

export default {
  name: 'SuggestsList',
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
  data() {
    return {
      active: -1,
    }
  },
  watch: {
    selected() {
      this.setSelected()
    }
  },
  methods: {
    onSelect(suggest) {
      suggest.selected = !suggest.selected
      this.$emit('select:suggest', suggest)
    },

    setSelected() {
      this.suggests.forEach((suggest) => {
        const check = this.selected.find((sgst) => sgst.alias === suggest.alias && sgst.type === suggest.type)
        suggest.selected = !!check
      })
    },

    setActiveSuggest(nav) {
      if (this.suggests.length) {
        this.active += nav
        if (this.active > this.suggests.length - 1) {
          this.active = this.suggests.length - 1
        }
        if (this.active < 0) {
          this.active = 0
        }
        this.$refs.Suggest[this.active].focus()
      }
    }
  },
  mounted() {
    this.setSelected()
  },
  created() {
    this.controlHandler = (e) => {
      if (e.key === 'ArrowUp') this.setActiveSuggest(-1)
      if (e.key === 'ArrowDown') this.setActiveSuggest(1)
    }
    window.addEventListener('keyup', this.controlHandler)
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.controlHandler)
  },
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variable.scss';
@import '~@/assets/styles/mixins.scss';

.suggests-list {
  border: 1px solid $color-gray;
  background: $color-white;
  display: inline-block;
  max-height: 250px;
  min-width: 50%;
  overflow: auto;
  margin: 5px 0;
  padding: 0;

  @media screen and (max-width: 576px) {
    width: 100%;
  }

  &__notify {
    padding: 0 10px;
    font-size: 1.4rem;
  }
}

.suggest {
  @include flex($align:center);
  border-bottom: 1px solid $color-white;
  padding: 10px;
  cursor: pointer;

  &:focus {
    outline: none;
    background: $color-purple-light;
  }

  &:hover {
    background: $color-gray;
  }

  &--selected {
    background: $color-blue-light;
  }

  &__image {
    max-width: 40px;
    max-height: 40px;
    margin-right: 10px;
  }

  &__text {
    font-size: 1.4rem;

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
