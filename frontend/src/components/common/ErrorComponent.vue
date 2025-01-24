<template>
    <div class="flex flex-col items-center justify-center text-red-600">
      <div class="flex flex-col items-center">
        <IconError class="text-red-500"/>
        <span class="text-xl p-5">{{ props.error }}</span>
        <button @click="retry" class="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
          Reintentar
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import {IconError} from "@/components/common/icons";

const props = defineProps<{
  error: string
}>()

  const retry = () => {
    window.location.reload();
  };
  </script>