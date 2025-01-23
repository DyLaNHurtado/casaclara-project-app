<template>
  <div class="relative">
    <input
      type="text"
      :value="modelValue"
      @input="handleInput"
      @focus="showSuggestions = true"
      @blur="handleBlur"
      placeholder="Buscar por título o ubicación"
      class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
import { ref, computed } from 'vue'
import { IconSearch } from '@/components/common/icons'

const props = defineProps<{
  modelValue: string
  suggestions: string[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const showSuggestions = ref(false)

const filteredSuggestions = computed(() => {
  return props.suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(props.modelValue.toLowerCase())
  ).slice(0, 5) // Limit to 5 suggestions
})

const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)
  showSuggestions.value = true
}

const selectSuggestion = (suggestion: string) => {
  emit('update:modelValue', suggestion)
  showSuggestions.value = false
}

const handleBlur = () => {
  setTimeout(() => {
    showSuggestions.value = false
  }, 200)
}

const highlightMatch = (suggestion: string) => {
  const regex = new RegExp(`(${props.modelValue})`, 'gi')
  return suggestion.replace(regex, '<strong class="bg-yellow-200">$1</strong>')
}
</script>

