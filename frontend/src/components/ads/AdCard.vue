<template>
  <div class="bg-white h-full flex flex-col group rounded-lg shadow-md overflow-hidden hover:shadow-lg cursor-pointer hover:scale-105 transition-all duration-300" @click="goToDetails">
    <!-- <span v-if="props.ad.destacado" class="absolute top-0 right-0 bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded-bl-lg">Destacado</span> -->
     <div class="h-48 overflow-hidden">
      <img :src="props.ad.fotos[0] || '/placeholder.svg'" :alt="props.ad.nombre" class="w-full h-full object-cover">
     </div>
   
    <div class="p-4 flex-grow h-full flex-1">
      <div class="flex justify-between items-center mb-2">
        <h1 class="text-lg font-bold text-gray-800 m-0">{{ props.ad.nombre }}</h1>
        <Button
          variant="ghost"
          size="icon"
          @click="$emit('toggle-favorite', props.ad.id)"
          class="text-red-500 hover:text-red-700"
        >
          <IconHeart class="w-5 h-5" />
        </Button>
      </div>
      <Badge  :class="categoryColors[props.ad.categoria], {'opacity-0': !props.ad.categoria}" class="mb-2">
        {{ props.ad.categoria }}
      </Badge>
      <div class="grid grid-cols-2 gap-2 mb-2 text-sm">
        <div class="flex items-center">
          <IconEuro class="w-4 h-4 mr-2 text-green-600" />
          <span class="font-bold text-gray-700 text-md ">{{ formatPriceWithDots(props.ad.precio).toLocaleString() }}</span>
        </div>
        <div class="flex items-center">
          <IconMap class="w-4 h-4 mr-2 text-blue-600" />
          <span class="text-sm text-gray-500">{{ props.ad.ubicacion }}</span>
        </div>
        <div class="flex items-center col-span-2">
          <IconPhone class="w-4 h-4 mr-2 text-gray-500" />
          <span class="text-sm text-gray-500">{{ props.ad.telefono }}</span>
        </div>
      </div>
      <div class="text-xs text-start my-2 text-gray-400">
        A {{ ad.id }} km de tu ubicación
      </div>
      <router-link 
        :to="{ name: 'adDetails', params: { id: props.ad.id } }" 
        class="inline-block w-full text-center bg-gray-700 group-hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
      >
        Ver detalles
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import Badge from '@/components/ui/Badge.vue'
import { IconHeart, IconEuro, IconMap, IconPhone } from '@/components/common/icons'
import { useRouter } from 'vue-router'
import type { Anuncio } from '@/types/anuncio'
import { formatPriceWithDots } from '@/utils/formatters'

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

const router = useRouter()

const goToDetails = () => {
  router.push({ name: 'adDetails', params: { id: props.ad.id } })
}
</script>

