<template>
  <div class="space-y-6 w-full max-w-md mx-auto">
    <div class="flex justify-between items-center">
      <div class="space-y-1">
        <label class="text-sm font-medium text-gray-700">Precio mínimo</label>
        <div class="text-lg font-semibold text-blue-600">{{ formattedMinValue }}</div>
      </div>
      <div class="space-y-1 text-right">
        <label class="text-sm font-medium text-gray-700">Precio máximo</label>
        <div class="text-lg font-semibold text-blue-600">{{ formattedMaxValue }}</div>
      </div>
    </div>
    <div class="relative pt-1">
      <div class="h-2 bg-gray-200 rounded-full shadow-inner">
        <div
          class="absolute h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-300 ease-in-out"
          :style="{ left: `${leftPercentage}%`, width: `${rightPercentage - leftPercentage}%` }"
        ></div>
      </div>
      <input
        type="range"
        :min="min"
        :max="max"
        :step="step"
        v-model="tempMinValue"
        @input="updateTempMin"
        @change="updateMin"
        class="absolute w-full top-0 left-0 h-2 opacity-0 cursor-pointer z-30"
      />
      <input
        type="range"
        :min="min"
        :max="max"
        :step="step"
        v-model="tempMaxValue"
        @input="updateTempMax"
        @change="updateMax"
        class="absolute w-full top-0 left-0 h-2 opacity-0 cursor-pointer z-40"
      />
      <div
        class="absolute w-6 h-6 bg-white border-2 border-blue-500 rounded-full top-0 -mt-2 shadow-md transition-all duration-300 ease-in-out z-20 transform hover:scale-110"
        :style="{ left: `calc(${leftPercentage}% - 12px)` }"
      ></div>
      <div
        class="absolute w-6 h-6 bg-white border-2 border-blue-500 rounded-full top-0 -mt-2 shadow-md transition-all duration-300 ease-in-out z-20 transform hover:scale-110"
        :style="{ left: `calc(${rightPercentage}% - 12px)` }"
      ></div>
    </div>
    <div class="flex justify-between text-xs text-gray-500">
      <span>{{ formatPriceLong(min) }}</span>
      <span>{{ formatPriceLong(max) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { formatPrice, formatPriceLong } from '@/utils/formatters';

const props = defineProps<{
  modelValue: [number, number]
  min: number
  max: number
  step: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: [number, number]): void
}>()

const minValue = ref(props.modelValue[0]);
const maxValue = ref(props.modelValue[1]);
const tempMinValue = ref(props.modelValue[0]);
const tempMaxValue = ref(props.modelValue[1]);

const leftPercentage = computed(() => ((tempMinValue.value - props.min) / (props.max - props.min)) * 100)
const rightPercentage = computed(() => ((tempMaxValue.value - props.min) / (props.max - props.min)) * 100)

const formattedMinValue = computed(() => formatPrice(tempMinValue.value));
const formattedMaxValue = computed(() => formatPrice(tempMaxValue.value));

let animationFrameId: number | null = null;

const updateTempMin = (event: Event) => {
  const value = Number((event.target as HTMLInputElement).value);
  if (value < tempMaxValue.value) {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    animationFrameId = requestAnimationFrame(() => {
      tempMinValue.value = value;
      animationFrameId = null;
    });
  }
};

const updateTempMax = (event: Event) => {
  const value = Number((event.target as HTMLInputElement).value);
  if (value > tempMinValue.value) {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    animationFrameId = requestAnimationFrame(() => {
      tempMaxValue.value = value;
      animationFrameId = null;
    });
  }
};

const updateMin = () => {
  minValue.value = tempMinValue.value;
  emit('update:modelValue', [minValue.value, maxValue.value]);
};

const updateMax = () => {
  maxValue.value = tempMaxValue.value;
  emit('update:modelValue', [minValue.value, maxValue.value]);
};

watch(() => props.modelValue, (newValue) => {
  minValue.value = newValue[0];
  maxValue.value = newValue[1];
  tempMinValue.value = newValue[0];
  tempMaxValue.value = newValue[1];
});
</script>

<style scoped>
input[type="range"] {
  pointer-events: none;
  -webkit-appearance: none;
  appearance: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  background: white;
  border: 2px solid #3b82f6;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.1);
}

input[type="range"]::-moz-range-thumb {
  width: 24px;
  height: 24px;
  background: white;
  border: 2px solid #3b82f6;
  border-radius: 50%;
  cursor: pointer;
  pointer-events: auto;
  transition: all 0.3s ease-in-out;
}

input[type="range"]::-moz-range-thumb:hover {
  transform: scale(1.1);
}
</style>

