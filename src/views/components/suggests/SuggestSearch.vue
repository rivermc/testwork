<template>
  <FormInput
    :model.sync="search"
    :is-valid="validation"
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
</template>

<script>
import { FormInput, FormInputTag } from '@/views/components/form/'

export default {
  name: 'SuggestSearch',
  emits: ['update:data', 'delete:tag'],
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
    tags: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      search: '',
      throttlePause: null,
      xhr: new XMLHttpRequest()
    }
  },
  computed: {
    validation() {
      const regexp = /^[a-zA-Z0-9]*$/i;
      return this.search.length > 2 && regexp.test(this.search)
    }
  },
  methods: {
    onDelete() {
      this.$emit('delete:tag')
    },
    onSearch() {
      this.getData()
    },

    getData() {
      if (!this.validation) { return }

      this.xhr.open('GET', `${this.url}?q=${this.search}`);
      this.xhr.onload = () => {
        if (this.xhr.status !== 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
          console.log(`Ошибка ${this.xhr.status}: ${this.xhr.statusText}`); // Например, 404: Not Found
        }
        else { // если всё прошло гладко, выводим результат
          const res = JSON.parse(this.xhr.response)
          this.$emit('update:data', res.data)
        }
      };
      this.xhr.send()
    },

    throttle(callback, time) {
      console.log(callback.call())
      if (throttlePause) return;
      let throttlePause = true;
      setTimeout(() => {
        callback.call();
        throttlePause = false;
      }, time);
    },
  }
}
</script>
