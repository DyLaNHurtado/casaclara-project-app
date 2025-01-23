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
    default: 'bg-primary text-primary-foreground hover:bg-primary/80',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/80',
    outline: 'text-foreground border border-input hover:bg-accent hover:text-accent-foreground'
  }
  </script>
  
  