<template>
  <div class="suggests">
    <SuggestSearch
      :url="url"
      :label="label"
      :placeholder="placeholder"
      :tags="tags"
      :status.sync="status"
      @update:data="onSetData"
      @delete:tag="onDelete"
    />
    <Loader :is-loading="status === 'loading'" />
    <transition name="fade">
      <SuggestsBlock
        v-if="status === 'ready'"
        :suggests="suggests"
        @select:suggest="onSelect"
        @multiselect:suggest="onMultiSelect"
      />
    </transition>
  </div>
</template>

<script>
import SuggestsCollection from '@/collections/SuggestsCollection'
import SuggestsBlock from '@/views/components/suggests/SuggestsBlock.vue'
import SuggestSearch from '@/views/components/suggests/SuggestSearch.vue'
import Loader from '@/views/components/loader/Loader.vue'

export default {
  name: 'Suggest',
  components: { SuggestsBlock, SuggestSearch, Loader },
  data() {
    return {
      status: null,
      search: '',
      collection: new SuggestsCollection(),
      suggest: null,
      url: 'https://habr.com/kek/v2/publication/suggest-mention',
      label: '<span class="color--red">*</span> Пользователь или компания',
      placeholder: 'Введите имя пользователя или компании',
      param: 'q',
      suggestSelected: [],
    }
  },
  computed: {
    suggests() {
      return this.collection.asArray()
    },
    tags() {
      return this.suggestSelected.length ? this.suggestSelected.map((tag) => `@${tag.alias}`) : []
    },
  },
  methods: {
    onSetData(data) {
      if (data === null) {
        return
      }
      if (data?.length) {
        this.collection.set(data)
        return
      }
      this.collection = new SuggestsCollection()
    },
    onSelect(suggest) {
      this.suggestSelected = [suggest]
    },
    onMultiSelect(suggest) {
      const check = this.suggestSelected.find((item) => item.alias === suggest.alias)
      if (!check) {
        this.suggestSelected.push(suggest)
      }
    },
    onDelete(i) {
      this.suggestSelected.splice(i, 1)
    },
  }
}
</script>

<style lang="scss" scoped>
.suggests {
  position: relative;
}
</style>
