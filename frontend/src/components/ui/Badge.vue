<template>
    <span
      :class="[
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
        variants[variant],
        className
      ]"
    >
      <slot></slot>
    </span>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  
  const props = withDefaults(defineProps<{
    variant?: 'default' | 'secondary' | 'destructive' | 'outline'
    className?: string
  }>(), {
    variant: 'default',
    className: ''
  })
  
  const variant = computed(() => props.variant);
  const className = computed(() => props.className);

  const variants = {
    default: 'bg-gray-500 text-gray-800 hover:bg-primary/80',
    secondary: 'bg-gray-500 text-gray-800 hover:bg-secondary/80',
    destructive: 'bg-gray-500 text-gray-800 hover:bg-destructive/80',
    outline: 'text-foreground border border-input hover:bg-accent hover:text-accent-foreground'
  }
  </script>
  
  