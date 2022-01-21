<template>
  <form
    role="search"
    aria-label="Suggest Search"
    class="suggests__search"
    @submit.prevent="onSearch"
  >
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
          v-if="tags.length"
          :tags="tags"
          @delete:tag="onDelete"
        />
      </template>
    </FormInput>
  </form>
</template>

<script>
import { FormInput, FormInputTag } from '@/views/components/form/'

export default {
  name: 'SuggestSearch',
  emits: ['update:data', 'delete:tag', 'update:status'],
  components: { FormInput, FormInputTag },
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
    param: {
      type: String,
      default: 'q'
    },
    tags: {
      type: Array,
      default: null
    },
    status: {
      type: String,
      default: null
    },
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
    },
    query() {
      return `?${this.param}=${this.search}`
    }
  },
  methods: {
    onDelete(i) {
      this.$emit('delete:tag', i)
    },

    onSearch() {
      this.throttle(this.getData, 500)
    },

    getData() {
      this.error = null
      this.xhr.abort()
      if (!this.validation) {
        this.$emit('update:data', null)
        this.$emit('update:status', 'invalid')
        return
      }
      this.isLoading = true
      this.$emit('update:status', 'loading')
      this.xhr.open('GET', this.url + this.query)
      this.xhr.onload = () => {
        if (this.xhr.status === 200) {
          const res = JSON.parse(this.xhr.response)
          this.$emit('update:data', res.data)
          this.$emit('update:status', 'ready')
        }
        else {
          this.error = `Ошибка ${this.xhr.status}: ${this.xhr.statusText}`
          this.$emit('update:status', `error - ${this.xhr.status}`)
        }
        this.isLoading = false
      };
      this.xhr.onerror = () => {
        this.error = `Ошибка ${this.xhr.status}: ${this.xhr.statusText}`
        this.$emit('update:status', `error - ${this.xhr.status}`)
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
