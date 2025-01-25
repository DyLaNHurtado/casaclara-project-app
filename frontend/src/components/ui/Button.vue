<template>
  <button
    :class="[ 
      'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
      variants[props.variant],
      sizes[props.size],
      colorClasses
    ]"
    :disabled="props.disabled"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
  disabled?: boolean
  color?: 'blue' | 'green' | 'yellow' | 'purple'
}>(), {
  variant: 'default',
  size: 'default',
  className: '',
  disabled: false,
  color: undefined
});

const variants = {
  default: '',
  destructive: 'bg-red-500 text-white hover:bg-red-600',
  outline: 'border-2',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  ghost: 'bg-transparent text-gray-800 hover:bg-gray-100',
  link: 'underline-offset-4 hover:underline text-blue-600'
};

const sizes = {
  default: 'h-10 py-2 px-4',
  sm: 'h-9 px-3 rounded-md',
  lg: 'h-11 px-8 rounded-md',
  icon: 'h-10 w-10'
};

const colorClasses = computed(() => {
  if (props.variant === 'outline' && props.color) {
    return `border-${props.color}-500 text-${props.color}-500 hover:bg-${props.color}-100`;
  }
  return '';
});

defineEmits(['click']);
</script>

<style scoped>
/* Add any additional styles here */
</style>