<template>
  <form
    class="suggests__search"
    role="search"
    aria-label="Suggest Search"
    @submit.prevent=""
  >
    <div class="form__group">
      <label
        v-if="label"
        v-html="label"
        class="form__label"
      />
      <div
        class="form__input-group"
        :class="{'form__input-group--error': valid}"
      >
        <input
          v-model="value"
          :placeholder="placeholder"
          :class="{'form__input--with-tags': tags.length}"
          class="form__input"
          ref="Search"
        />
        <div
          v-if="tags.length"
          class="form__tags"
        >
          <div
            v-for="tag in tags"
            :key="tag.type + tag.alias"
            :aria-label="tag.alias"
            class="form__tag"
            tabindex="0"
            role="button"
            ref="Tag"
            @keydown.enter="onDelete(tag)"
          >
            {{ tag.alias }}
            <span class="form__tag-close" @click="onDelete(tag)">x</span>
          </div>
        </div>
      </div>
      <p v-if="valid || error" class="form__input-error">
        <template v-if="valid">{{ valid }}</template>
        <template v-else-if="error">{{ error }}</template>
      </p>
    </div>
  </form>
</template>

<script>
export default {
  name: 'SuggestSearch',
  emits: ['update:search', 'delete:tag'],
  props: {
    search: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    tags: {
      type: Array,
      default: () => [],
    },
    valid: {
      type: String,
      default: '',
    },
    error: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      active: -1,
    }
  },
  computed: {
    value: {
      get() {
        return this.search
      },
      set(value) {
        this.$emit('update:search', value)
      }
    }
  },
  methods: {
    onDelete(tag) {
      tag.selected = false
      this.$emit('delete:tag', tag)
    },

    setActiveTag(nav) {
      if (this.tags.length) {
        this.active += nav
        if (this.active > this.tags.length - 1) {
          this.active = this.tags.length - 1
        }
        if (this.active < 0) {
          this.active = 0
        }
        this.$refs.Tag[this.active].focus()
      }
    },

    setFocusSearch() {
      this.$refs.Search.focus()
    },

    controlHandler(e) {
      const excludeKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter']
      if (e.key === 'ArrowLeft') this.setActiveTag(-1)
      else if (e.key === 'ArrowRight') this.setActiveTag(1)
      else if (!excludeKeys.includes(e.key)) this.setFocusSearch()
    },
  },
  created() {
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

.form {
  &__tags {
    @include flex($align:center, $wrap:wrap);
    width: 100%;
  }

  &__tag {
    color: $color-white;
    background: $color-blue;
    font-weight: bold;
    padding: 5px;
    font-size: 1.2rem;
    margin: 0 2px 2px 0;
    border-radius: 2px;

    &:focus {
      background: $color-purple-light;
      color: $color-gray-dark;
      outline: none;
    }

    &-close {
      font-weight: normal;
      cursor: pointer;
      padding: 5px 0;
    }
  }

  &__group {
    border: 1px solid $color-gray;
    padding: 10px 5px 2.4rem;
    position: relative;
  }

  &__label {
    display: block;
    font-size: 1.4rem;
    margin-bottom: 5px;
  }

  &__input {
    border: none;
    outline: none;
    padding: 5px;
    width: 100%;

    &--with-tags {
      border-bottom: 1px solid $color-gray;
      margin-bottom: 5px;
    }

    &-group {
      @include flex($align:center, $wrap:wrap);
      border: 1px solid $color-gray;
      transition: $transition;
      width: 100%;
      padding: 5px;
      border-radius: 5px;

      &--error {
        border-color: $color-red;
      }
    }

    &-error {
      color: $color-red;
      position: absolute;
      font-size: 1.2rem;
      margin: 5px 0 0;
    }
  }
}
</style>
