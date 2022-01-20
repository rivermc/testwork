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
          :items="items"
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
  props: {
    url: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      search: '',
      collection: new SuggestsCollection(),
      suggest: null,
      isShowSuggests: null,
    }
  },
  computed: {
    items() {
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
