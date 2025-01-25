<template>
  <div class="relative">
    <input
      type="text"
      :value="modelValue"
      @input="handleInput"
      @focus="showSuggestions = true"
      @blur="handleBlur"
      placeholder="Buscar por título o ubicación"
      class="bg-gray-200 w-full pl-10 pr-5 py-2 shadow-sm shadow-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
    <IconSearch class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    <ul
      v-if="showSuggestions && filteredSuggestions.length > 0"
      class="absolute z-10 w-full bg-white border border-gray-200 rounded-md mt-1 max-h-60 overflow-auto shadow-lg"
    >
      <li
        v-for="(suggestion, index) in filteredSuggestions"
        :key="index"
        @mousedown="selectSuggestion(suggestion)"
        class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
      >
        <span v-html="highlightMatch(suggestion)"></span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { IconSearch } from '@/components/common/icons'
import debounce from 'lodash.debounce'

const props = defineProps<{
  modelValue: string
  suggestions: string[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const showSuggestions = ref(false)
const searchQuery = ref(props.modelValue)

const filteredSuggestions = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return props.suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(query)
  ).slice(0, 10) // Limit to 10 suggestions
})

const handleInput = debounce((event: Event) => {
  const value = (event.target as HTMLInputElement).value
  searchQuery.value = value
  emit('update:modelValue', value)
  showSuggestions.value = true
}, 300)

const selectSuggestion = (suggestion: string) => {
  emit('update:modelValue', suggestion)
  searchQuery.value = suggestion
  showSuggestions.value = false
}

const handleBlur = () => {
  setTimeout(() => {
    showSuggestions.value = false
  }, 200)
}

const highlightMatch = (suggestion: string) => {
  const regex = new RegExp(`(${searchQuery.value})`, 'gi')
  return suggestion.replace(regex, '<strong class="bg-yellow-200">$1</strong>')
}

watch(() => props.modelValue, (newValue) => {
  searchQuery.value = newValue
})
</script>

