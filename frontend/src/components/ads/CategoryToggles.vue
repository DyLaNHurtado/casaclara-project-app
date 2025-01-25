<template>
  <div class="flex space-x-2">
    <Button
      v-for="category in categories"
      :key="category"
      variant="outline"
      :color="categoryColors[category]"
      @click="toggleCategory(category)"
    >
      <component :is="categoryIcon(category)" class="w-5 h-5 mr-2" />
      <span>{{ category }}</span>
    </Button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import Button from '@/components/ui/Button.vue';
import { IconHome, IconBuilding, IconWarehouse, IconCar } from '@/components/common/icons';

const props = defineProps<{
  categories: string[];
}>();

const emit = defineEmits<{
  (e: 'update:categories', categories: string[]): void;
}>();

const selectedCategories = ref([...props.categories]);

const categoryColors: Record<string, 'blue' | 'green' | 'yellow' | 'purple'> = {
  'Piso': 'blue',
  'Casa': 'green',
  'Local': 'yellow',
  'Garaje': 'purple',
};

const categoryIcon = (category: string) => {
  switch (category) {
    case 'Piso': return IconHome;
    case 'Casa': return IconBuilding;
    case 'Local': return IconWarehouse;
    case 'Garaje': return IconCar;
    default: return null;
  }
};

const toggleCategory = (category: string) => {
  if (selectedCategories.value.includes(category)) {
    selectedCategories.value = selectedCategories.value.filter(c => c !== category);
  } else {
    selectedCategories.value.push(category);
  }
  emit('update:categories', selectedCategories.value);
};

watch(() => props.categories, (newCategories) => {
  selectedCategories.value = [...newCategories];
});
</script>

<style scoped>
/* Add any additional styles here */
</style>