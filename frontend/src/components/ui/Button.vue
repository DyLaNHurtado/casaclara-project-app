<template>
  <button
    :class="[
      'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
      variants[props.variant],
      sizes[props.size],
      props.className
    ]"
    :disabled="props.disabled"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">

const props = withDefaults(defineProps<{
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
  disabled?: boolean
}>(), {
  variant: 'default',
  size: 'default',
  className: '',
  disabled: false
})

const variants = {
  default: '',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  outline: 'border-2 border-gray-700 hover:bg-accent hover:bg-gray-700 hover:text-gray-200',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  ghost: 'bg-gray-100 text-primary-foreground hover:bg-gray-800 hover:text-gray-200',
  link: 'underline-offset-4 hover:underline text-primary'
}

const sizes = {
  default: 'h-10 py-2 px-4',
  sm: 'h-9 px-3 rounded-md',
  lg: 'h-11 px-8 rounded-md',
  icon: 'h-10 w-10'
}

defineEmits(['click'])
</script>

