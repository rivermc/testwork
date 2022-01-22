<template>
  <div class="suggests">

    <SuggestSearch
      :label="label"
      :placeholder="placeholder"
      :tags="selected"
      :search.sync="search"
      :is-valid="validation()"
      :error="error"
      @update:search="onSearch"
      @delete:tag="onSelect"
    />

    <Loader v-if="status === 'loading'" />
    <transition name="fade">
      <SuggestsBlock
        v-if="status === 'ready'"
        :suggests="suggests"
        :selected="selected"
        @select:suggest="onSelect"
      />
    </transition>
  </div>
</template>

<script>
import SuggestsBlock from '@/views/components/suggests/SuggestsBlock.vue'
import SuggestSearch from '@/views/components/suggests/SuggestSearch.vue'
import Loader from '@/views/components/loader/Loader.vue'
import Suggest from "@/models/Suggest";

export default {
  name: 'Suggest',
  components: { SuggestsBlock, SuggestSearch, Loader },
  data() {
    return {
      status: null,
      search: '',
      collection: [],
      url: 'https://habr.com/kek/v2/publication/suggest-mention',
      label: '<span class="color--red">*</span> Пользователь или компания',
      placeholder: 'Введите имя пользователя или компании',
      param: 'q',
      throttlePause: null,
      error: '',
      xhr: new XMLHttpRequest(),
      selected: [],
    }
  },
  computed: {
    suggests() {
      return this.collection
    },
    query() {
      return `?${this.param}=${this.search}`
    },
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
        this.status = `error`
      }
    },

    onXHRError() {
      const message = this.xhr.status === 0 ? 'Нет доступа к интернету' : ''
      this.error = `Ошибка ${this.xhr.status}: ${message}`
      this.status = `error`
    },

    validation() {
      const regexp = /^[а-яА-Яa-zA-Z0-9]*$/i
      return this.search.length > 0 && regexp.test(this.search)
    },

    getData() {
      this.error = null
      if (!this.validation()) return
      this.status = 'loading'
      this.xhr.abort()
      this.xhr.open('GET', this.url + this.query)
      this.xhr.onload = this.onXHRLoad
      this.xhr.onerror = this.onXHRError
      this.xhr.send()
    },

    setData(data) {
      if (data?.length) {
        this.collection = data.map((item) => new Suggest(item))
        return
      }
      this.collection = []
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

<style lang="scss" scoped>
.suggests {
  position: relative;
}
</style>
