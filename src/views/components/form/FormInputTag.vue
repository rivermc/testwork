<template>
  <div class="form__tags">
    <div class="form__tag">
      {{ `@${value}` }}
      <span class="form__tag-close" @click="onDelete">x</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormInput',
  props: {
    value: {
      type: String,
      default: ''
    },
  },
  methods: {
    onDelete() {
      this.$emit('delete:tag')
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
    border-radius: 5px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
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
