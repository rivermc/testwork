<template>
  <div class="form__group">
    <label
      v-if="label"
      v-html="label"
      :for="id"
      class="form__label"
    />
    <div class="form__input-group">
      <input
        v-model="value"
        :id="id"
        :placeholder="placeholder"
        :class="{'form__input--error': !isValid}"
        class="form__input"
      />
      <slot name="tags" />
    </div>
    <p v-if="!isValid" class="form__input-error">Некорректное значение</p>
    <p v-if="error" class="form__input-error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'FormInput',
  emits: ['update:model'],
  props: {
    id: {
      type: String,
      default: () => parseInt(Math.random() * 10000).toString()
    },
    model: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    isValid: {
      type: Boolean,
      default: true,
    },
    error: {
      type: String,
      default: null,
    },
  },
  computed: {
    value: {
      get() {
        return this.model
      },
      set(value) {
        this.$emit('update:model', value)
      }
    }
  },
}
</script>


<style lang="scss" scoped>
@import './../../../assets/styles/variable.scss';

.form {
  &__group {
    border: 1px solid $color-gray;
    padding: 5px;
  }

  &__label {
    display: block;
    font-size: 14px;
    margin-bottom: 5px;
  }

  &__input {
    border: 1px solid $color-gray;
    width: 100%;
    padding: 10px 5px;
    border-radius: 5px;
    outline: none;

    &-group {
      position: relative;
    }

    &-error {
      color: $color-red;
      font-size: 12px;
      margin: 5px 0 0;
    }

    &--error {
      border-color: $color-red;
    }
  }
}
</style>
