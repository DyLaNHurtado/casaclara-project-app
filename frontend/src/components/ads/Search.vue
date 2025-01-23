<template>
    <div class="mb-8 space-y-4">
      <div class="relative">
        <input
          type="text"
          :value="modelValue"
          @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
          placeholder="Buscar por título o ubicación"
          class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <IconSearch class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <ul v-if="suggestions.length > 0" class="absolute z-10 w-full bg-white border border-gray-200 rounded-md mt-1 max-h-60 overflow-auto">
          <li
            v-for="(suggestion, index) in suggestions"
            :key="index"
            class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            @click="selectSuggestion(suggestion)"
          >
            {{ suggestion }}
          </li>
        </ul>
      </div>
  
      <div class="flex flex-wrap gap-2 justify-center">
        <Button
          v-for="category in categories"
          :key="category"
          :variant="selectedCategories.includes(category) ? 'default' : 'outline'"
          @click="toggleCategory(category)"
          :class="[
            'flex items-center px-3 py-1 rounded-full text-sm',
            selectedCategories.includes(category) ? categoryColors[category] : ''
          ]"
        >
          <component :is="categoryIcon(category)" class="w-4 h-4 mr-2" />
          <span>{{ category }}</span>
        </Button>
      </div>
  
      <div class="space-y-2">
        <div class="flex justify-between text-sm text-gray-500">
          <span>{{ priceRange[0].toLocaleString() }}€</span>
          <span>{{ priceRange[1].toLocaleString() }}€</span>
        </div>
        <Slider
          :min="0"
          :max="1000000"
          :step="10000"
          :modelValue="priceRange"
          @update:modelValue="updatePriceRange"
          class="w-full"
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import Button from '@/components/ui/Button.vue'
  import Slider from '@/components/ui/Slider.vue'
  import { IconSearch, IconHome, IconBuilding, IconWarehouse, IconCar } from '@/components/common/icons'
  
  const props = defineProps<{
    modelValue: string
    suggestions: string[]
    categories: string[]
  }>()
  
  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
    (e: 'update:categories', categories: string[]): void
    (e: 'update:priceRange', range: [number, number]): void
  }>()
  
  const selectedCategories = ref(props.categories)
  const priceRange = ref<[number, number]>([0, 1000000])
  
  const categoryColors: { [key: string]: string } = {
    'Piso': 'bg-blue-100 text-blue-800',
    'Casa': 'bg-green-100 text-green-800',
    'Local': 'bg-yellow-100 text-yellow-800',
    'Garaje': 'bg-purple-100 text-purple-800',
  }
  
  const categoryIcon = (category: string) => {
    switch (category) {
      case 'Piso': return IconHome
      case 'Casa': return IconBuilding
      case 'Local': return IconWarehouse
      case 'Garaje': return IconCar
      default: return IconHome
    }
  }
  
  const selectSuggestion = (suggestion: string) => {
    emit('update:modelValue', suggestion)
  }
  
  const toggleCategory = (category: string) => {
    const index = selectedCategories.value.indexOf(category)
    if (index === -1) {
      selectedCategories.value.push(category)
    } else {
      selectedCategories.value.splice(index, 1)
    }
    emit('update:categories', selectedCategories.value)
  }
  
  const updatePriceRange = (value: [number, number]) => {
    priceRange.value = value
    emit('update:priceRange', value)
  }
  </script>
  
  