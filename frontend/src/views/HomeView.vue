<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-teal-400 text-transparent bg-clip-text">
      Tu espacio perfecto está aquí
    </h1>

    <Search
      :suggestions="suggestions"
      :filters="filters"
      @update:search="updateSearch"
      @update:categories="updateCategories"
      @update:price-range="updatePriceRange"
    />

    <div class="flex justify-center mb-8 space-x-4">
      <Button @click="openMap" variant="default" class="flex items-center">
        <IconMap class="w-4 h-4 mr-2" />
        Ver mapa
      </Button>
      <Button @click="exportToCSV" variant="outline" class="flex items-center">
        <IconFileDown class="w-4 h-4 mr-2" />
        Exportar CSV
      </Button>
      <Button @click="exportToPDF" variant="outline" class="flex items-center">
        <IconFileText class="w-4 h-4 mr-2" />
        Exportar PDF
      </Button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <AdCard
        v-for="ad in ads"
        :key="ad.id"
        :ad="ad"
        @toggle-favorite="toggleFavorite"
      />
    </div>

    <div ref="loader" class="h-10 mt-8"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAdStore } from '@/stores/adStore'
import Search from '@/components/Search.vue'
import AdCard from '@/components/AdCard.vue'
import Button from '@/components/ui/Button.vue'
import { IconMap, IconFileDown, IconFileText } from '@/components/common/icons'
import type { Anuncio } from '@/types/anuncio'

const adStore = useAdStore()
const ads = ref<Anuncio[]>([])
const page = ref(1)
const loader = ref<HTMLElement | null>(null)
const suggestions = ref<string[]>([])

const filters = ref({
  search: '',
  categories: ['Piso', 'Casa', 'Local', 'Garaje'],
  minPrice: 0,
  maxPrice: 1000000,
})

const updateSearch = (value: string) => {
  filters.value.search = value
  // Implement search logic here
}

const updateCategories = (categories: string[]) => {
  filters.value.categories = categories
  // Implement category filter logic here
}

const updatePriceRange = ([min, max]: [number, number]) => {
  filters.value.minPrice = min
  filters.value.maxPrice = max
  // Implement price range filter logic here
}

const openMap = () => {
  console.log('Opening interactive map...')
  // Implement map opening logic here
}

const exportToCSV = () => {
  console.log('Exporting to CSV...')
  // Implement CSV export logic here
}

const exportToPDF = () => {
  console.log('Exporting to PDF...')
  // Implement PDF export logic here
}

const toggleFavorite = (id: number) => {
  console.log(`Toggling favorite for ad ${id}`)
  // Implement favorite toggling logic here
}

const fetchAds = async () => {
  const newAds = (await adStore.fetchAds({ ...filters.value, page: page.value }) as unknown) as Anuncio[] || []
  ads.value = page.value === 1 ? newAds : [...ads.value, ...newAds]
  page.value++
}

onMounted(() => {
  fetchAds()
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        fetchAds()
      }
    },
    { threshold: 1.0 }
  )

  if (loader.value) {
    observer.observe(loader.value)
  }

  onUnmounted(() => {
    if (loader.value) {
      observer.unobserve(loader.value)
    }
  })
})
</script>