<template>
    <div class="space-y-2">
      <div class="flex justify-between text-sm text-gray-500">
        <span>{{ modelValue[0].toLocaleString() }}€</span>
        <span>{{ modelValue[1].toLocaleString() }}€</span>
      </div>
      <div class="relative pt-1">
        <div class="h-1 bg-gray-200 rounded-full">
          <div
            class="absolute h-1 bg-blue-500 rounded-full"
            :style="{ left: `${leftPercentage}%`, width: `${rightPercentage - leftPercentage}%` }"
          ></div>
        </div>
        <input
          type="range"
          :min="min"
          :max="max"
          :step="step"
          :value="modelValue[0]"
          @input="updateMin"
          class="absolute w-full top-0 h-1 opacity-0 cursor-pointer"
        />
        <input
          type="range"
          :min="min"
          :max="max"
          :step="step"
          :value="modelValue[1]"
          @input="updateMax"
          class="absolute w-full top-0 h-1 opacity-0 cursor-pointer"
        />
        <div
          class="absolute w-4 h-4 bg-blue-500 rounded-full top-0 -mt-1.5"
          :style="{ left: `calc(${leftPercentage}% - 8px)` }"
        ></div>
        <div
          class="absolute w-4 h-4 bg-blue-500 rounded-full top-0 -mt-1.5"
          :style="{ left: `calc(${rightPercentage}% - 8px)` }"
        ></div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  
  const props = defineProps<{
    modelValue: [number, number]
    min: number
    max: number
    step: number
  }>()
  
  const emit = defineEmits<{
    (e: 'update:modelValue', value: [number, number]): void
  }>()
  
  const leftPercentage = computed(() => ((props.modelValue[0] - props.min) / (props.max - props.min)) * 100)
  const rightPercentage = computed(() => ((props.modelValue[1] - props.min) / (props.max - props.min)) * 100)
  
  const updateMin = (event: Event) => {
    const value = Number((event.target as HTMLInputElement).value)
    if (value < props.modelValue[1]) {
      emit('update:modelValue', [value, props.modelValue[1]])
    }
  }
  
  const updateMax = (event: Event) => {
    const value = Number((event.target as HTMLInputElement).value)
    if (value > props.modelValue[0]) {
      emit('update:modelValue', [props.modelValue[0], value])
    }
  }
  </script>
  
  