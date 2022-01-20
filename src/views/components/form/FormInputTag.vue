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
.form {
  &__tags {
    border: 1px solid #ddd;
    border-radius: 5px;
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }

  &__tag {
    color: #fff;
    background: #7ca5b5;
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
