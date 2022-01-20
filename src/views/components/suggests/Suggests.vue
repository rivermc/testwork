<template>
  <div>
    <SuggestSearch
      :url="url"
      :label="label"
      :placeholder="placeholder"
      :tags="tags"
      @update:data="onSetData"
      @delete:tag="onDelete"
    />
    <transition name="fade">
      <keep-alive>
        <SuggestsBlock
          v-if="isShowSuggests"
          :suggests="suggests"
          @select:suggest="onSelect"
        />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import SuggestsCollection from '@/collections/SuggestsCollection'
import SuggestsBlock from '@/views/components/suggests/SuggestsBlock.vue'
import SuggestSearch from '@/views/components/suggests/SuggestSearch.vue'

export default {
  name: 'Suggest',
  components: { SuggestsBlock, SuggestSearch },
  data() {
    return {
      search: '',
      collection: new SuggestsCollection(),
      suggest: null,
      isShowSuggests: null,
      url: 'https://habr.com/kek/v2/publication/suggest-mention',
      label: '<span class="color-red">*</span> Пользователь или компания',
      placeholder: 'Введите имя пользователя или компании',
    }
  },
  computed: {
    suggests() {
      return this.collection.asArray()
    },
    tags() {
      return this.suggest ? this.suggest.alias : ''
    },
  },
  methods: {
    onSetData(data) {
      this.collection.set(data)
      this.isShowSuggests = true
    },
    onSelect(suggest) {
      this.suggest = suggest
      this.isShowSuggests = false
    },
    onDelete() {
      this.suggest = null
      this.isShowSuggests = true
    },
  }
}
</script>
