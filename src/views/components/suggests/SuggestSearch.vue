<template>
  <div class="suggests__search">
    <FormInput
      :model.sync="search"
      :is-valid="validation"
      :error="error"
      :label="label"
      :placeholder="placeholder"
      @update:model="onSearch"
    >
      <template #tags>
        <FormInputTag
          v-if="tags"
          :value="tags"
          @delete:tag="onDelete"
        />
      </template>
    </FormInput>
    <Loader :is-loading="isLoading" />
  </div>
</template>

<script>
import { FormInput, FormInputTag } from '@/views/components/form/'
import Loader from '@/views/components/loader/Loader.vue'

export default {
  name: 'SuggestSearch',
  emits: ['update:data', 'delete:tag'],
  components: { FormInput, FormInputTag, Loader },
  props: {
    url: {
      type: String,
      default: 'https://habr.com/kek/v2/publication/suggest-mention'
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    tags: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      search: '',
      error: null,
      throttlePause: null,
      xhr: new XMLHttpRequest(),
      isLoading: false,
    }
  },
  computed: {
    validation() {
      const regexp = /^[а-яА-Яa-zA-Z0-9]*$/i;
      return this.search.length > 2 && regexp.test(this.search)
    }
  },
  methods: {
    onDelete() {
      this.$emit('delete:tag')
    },

    onSearch() {
      this.throttle(this.getData, 500)
    },

    getData() {
      this.error = null
      if (!this.validation) {
        this.$emit('update:data', null)
        return
      }
      this.isLoading = true
      this.xhr.open('GET', `${this.url}?q=${this.search}`)
      this.xhr.onload = () => {
        if (this.xhr.status === 200) {
          const res = JSON.parse(this.xhr.response)
          this.$emit('update:data', res.data)
        }
        else {
          this.error = `Ошибка ${this.xhr.status}: ${this.xhr.statusText}`
        }
        this.isLoading = false
      };
      this.xhr.send()
    },

    throttle(cb, ms) {
      if (this.throttlePause) return
      this.throttlePause = true
      setTimeout(() => {
        cb.call(this)
        this.throttlePause = false
      }, ms)
    },
  }
}
</script>
