<template>
  <div class="space-y-6">
    <SearchInput
      v-model="filters.search"
      :suggestions="suggestions"
      @update:modelValue="updateSearch"
    />
    <CategoryToggles
      :categories="allCategories"
      @update:categories="updateCategories"
    />
    <PriceRangeSlider
      v-model="filters.priceRange"
      :min="0"
      :max="1000000"
      :step="10000"
      @update:modelValue="updatePriceRange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import SearchInput from '@/components/ui/SearchInput.vue'
import CategoryToggles from '@/components/ads/CategoryToggles.vue'
import PriceRangeSlider from '@/components/ads/PriceRangeSlider.vue'
const props = defineProps<{
  initialFilters: {
    search: string
    categories: string[]
    priceRange: [number, number]
  }
  suggestions: string[]
}>()

const emit = defineEmits<{
  (e: 'update:filters', filters: typeof props.initialFilters): void
}>()

const filters = ref(props.initialFilters)
const allCategories = ['Piso', 'Casa', 'Local', 'Garaje', 'Trastero', 'Terreno']

const updateSearch = (value: string) => {
  filters.value.search = value
  emitUpdate()
}

const updateCategories = (categories: string[]) => {
  filters.value.categories = categories
  emitUpdate()
}

const updatePriceRange = (range: [number, number]) => {
  filters.value.priceRange = range
  emitUpdate()
}

const emitUpdate = () => {
  emit('update:filters', filters.value)
}

watch(() => props.initialFilters, (newFilters) => {
  filters.value = newFilters
}, { deep: true })
</script>

