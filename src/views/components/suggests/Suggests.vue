<template>
  <div class="suggests">
    <SuggestSearch
      :label="label"
      :placeholder="placeholder"
      :tags="selected"
      :search.sync="search"
      :valid="validation"
      :error="error"
      @update:search="onSearch"
      @delete:tag="onSelect"
    />

    <transition name="fade">
      <SuggestsList
        v-if="status === 'ready'"
        :suggests="suggests"
        :selected="selected"
        @select:suggest="onSelect"
      />
    </transition>

    <Loader v-show="status === 'loading'" />
  </div>
</template>

<script>
import SuggestsList from '@/views/components/suggests/SuggestsList.vue'
import SuggestSearch from '@/views/components/suggests/SuggestSearch.vue'
import Loader from '@/views/components/loader/Loader.vue'
import Suggest from '@/models/Suggest'

export default {
  name: 'Suggest',
  components: { SuggestsList, SuggestSearch, Loader },
  props: {
    label: {
      type: String,
      default: '<span class="color--red">*</span> Пользователь или компания',
    },
    placeholder: {
      type: String,
      default: 'Введите имя пользователя или компании',
    },
    url: {
      type: String,
      default: 'https://habr.com/kek/v2/publication/suggest-mention',
    },
    param: {
      type: String,
      default: 'q',
    },
  },
  data() {
    return {
      status: '',
      error: '',
      search: '',
      suggests: [],
      selected: [],
      timeout: null,
      xhr: new XMLHttpRequest(),
    }
  },
  computed: {
    query() {
      return `?${this.param}=${this.search}`
    },
    validation() {
      let error = ''
      if (this.search.length < 3 && this.search.length > 0) {
        error = 'Допустимая минимальная длина 3 символа'
      }
      const regexp = /^[а-яА-Яa-zA-Z0-9]*$/i
      if (!regexp.test(this.search)) {
        error = 'Можно использовать только буквы и цифры'
      }
      return error
    }
  },
  methods: {
    onSearch() {
      this.throttle(this.getData, 500)
    },

    onSelect(suggest) {
      const check = this.selected.find((sgst) => sgst.alias === suggest.alias && sgst.type === suggest.type)
      if (suggest.selected && !check) {
        this.selected.push(suggest)
      }
      if (!suggest.selected && check) {
        check.selected = false
      }
      this.selected = this.selected.filter((sgst) => sgst.selected)
    },

    onXHRLoad() {
      const res = JSON.parse(this.xhr.response)
      if (this.xhr.status === 200) {
        this.setData(res.data)
        this.status = 'ready'
      }
      else {
        this.error = `Ошибка ${res.code}: ${res.message}`
        this.status = 'error'
      }
    },

    onXHRError() {
      const message = this.xhr.status === 0 ? 'Нет доступа к интернету' : ''
      this.error = `Ошибка ${this.xhr.status}: ${message}`
      this.status = 'error'
    },

    getData() {
      this.error = null
      if (this.validation) return
      if (this.search) {
        this.status = 'loading'
        this.xhr.abort()
        this.xhr.open('GET', this.url + this.query)
        this.xhr.onload = this.onXHRLoad
        this.xhr.onerror = this.onXHRError
        this.xhr.send()
      }
    },

    setData(data) {
      if (data?.length) {
        this.suggests = data.map((item) => new Suggest(item))
        return
      }
      this.suggests = []
    },

    throttle(cb, ms) {
      if (this.timeout) return
      this.timeout = true
      setTimeout(() => {
        cb.call(this)
        this.timeout = false
      }, ms)
    },
  },
}
</script>
