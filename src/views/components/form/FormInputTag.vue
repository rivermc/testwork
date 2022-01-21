<template>
  <div class="form__tags">
    <div
      v-for="(tag, i) in tags"
      :key="i + tag.alias"
      :aria-label="`@${tag.alias}`"
      class="form__tag"
      tabindex="0"
      role="button"
      @keydown.enter="onDelete(i)"
    >
      {{ `@${tag.alias}` }}
      <span class="form__tag-close" @click="onDelete(i)">x</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormInput',
  emits: ['delete:tag'],
  props: {
    tags: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    onDelete(i) {
      this.$emit('delete:tag', i)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../../assets/styles/variable.scss';

.form {
  &__tags {
    border: 1px solid $color-gray;
    background: $color-white;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    border-radius: 5px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100%;
  }

  &__tag {
    color: $color-white;
    background: $color-blue;
    padding: 5px;
    border-radius: 2px;
    font-size: 12px;
    margin-left: 5px;
    font-weight: bold;

    &-close {
      font-weight: normal;
      cursor: pointer;
      padding: 5px 0;
    }
  }
}
</style>
