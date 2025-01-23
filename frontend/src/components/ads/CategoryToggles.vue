<template>
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
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import Button from '@/components/ui/Button.vue'
  import { IconHome, IconBuilding, IconWarehouse, IconCar } from '@/components/common/icons'
  
  const props = defineProps<{
    categories: string[]
  }>()
  
  const emit = defineEmits<{
    (e: 'update:categories', categories: string[]): void
  }>()
  
  const selectedCategories = ref(props.categories)
  
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
  
  const toggleCategory = (category: string) => {
    const index = selectedCategories.value.indexOf(category)
    if (index === -1) {
      selectedCategories.value.push(category)
    } else {
      selectedCategories.value.splice(index, 1)
    }
    emit('update:categories', selectedCategories.value)
  }
  </script>
  
  