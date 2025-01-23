<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
    <img :src="props.ad.fotos[0] || '/placeholder.svg'" :alt="props.ad.nombre" class="w-full h-48 object-cover">
    <div class="p-4">
      <div class="flex justify-between items-start mb-2">
        <h2 class="text-lg font-semibold text-gray-800">{{ props.ad.nombre }}</h2>
        <Button
          variant="ghost"
          size="icon"
          @click="$emit('toggle-favorite', props.ad.id)"
          class="text-red-500 hover:text-red-700"
        >
          <IconHeart class="w-5 h-5" />
        </Button>
      </div>
      <Badge :class="categoryColors[props.ad.categoria]" class="mb-2">
        {{ props.ad.categoria }}
      </Badge>
      <div class="grid grid-cols-2 gap-2 mb-2">
        <div class="flex items-center">
          <IconEuro class="w-4 h-4 mr-2 text-green-600" />
          <span class="font-medium text-gray-700">{{ props.ad.precio.toLocaleString() }}€</span>
        </div>
        <div class="flex items-center">
          <IconMap class="w-4 h-4 mr-2 text-blue-600" />
          <span class="text-sm text-gray-600">{{ props.ad.ubicacion }}</span>
        </div>
        <div class="flex items-center col-span-2">
          <IconPhone class="w-4 h-4 mr-2 text-gray-500" />
          <span class="text-sm text-gray-600">{{ props.ad.telefono }}</span>
        </div>
      </div>
      <div class="text-xs text-gray-400">
        <!-- A {{ ad.distance }} km de tu ubicación -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import Badge from '@/components/ui/Badge.vue'
import { IconHeart, IconEuro, IconMap, IconPhone } from '@/components/common/icons'
import type { Anuncio } from '@/types/anuncio'

const props = defineProps<{
  ad: Anuncio
}>()

const categoryColors: { [key: string]: string } = {
  'Piso': 'bg-blue-100 text-blue-800',
  'Casa': 'bg-green-100 text-green-800',
  'Local': 'bg-yellow-100 text-yellow-800',
  'Garaje': 'bg-purple-100 text-purple-800',
}

defineEmits<{
  (e: 'toggle-favorite', id: number): void
}>()
</script>

