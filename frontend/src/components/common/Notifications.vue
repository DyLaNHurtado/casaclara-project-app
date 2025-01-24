<template>
    <div class="absolute right-0 top-14 mt-2 w-100 bg-white rounded-md shadow-lg overflow-hidden z-20">
      <div class="py-2">
        <h3 class="text-lg font-semibold text-gray-900 px-4 py-2">Notificaciones</h3>
        <div class="divide-y divide-gray-200">
          <div v-for="notification in notifications" :key="notification.id" class="px-4 py-3 hover:bg-gray-50 transition-colors flex justify-between items-center">
            <div class="flex items-start space-x-3">
              <img :src="notification.image" :alt="notification.title" class="w-10 h-10 rounded-md object-cover">
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900">
                  {{ notification.title }}
                </p>
                <p class="text-sm text-gray-500 truncate">
                  {{ notification.description }}
                </p>
              </div>
              <div class="flex-shrink-0">
                <span :class="[
                  'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                  notification.isRead ? 'bg-gray-100 text-gray-800' : 'bg-blue-100 text-blue-800'
                ]">
                  {{ notification.isRead ? 'Leído' : 'Nuevo' }}
                </span>
              </div>
            </div>
            <button @click="deleteNotification(notification.id, $event)" class="text-red-500 hover:text-red-700 transition-colors">
              Eliminar
            </button>
          </div>
        </div>
      </div>
      <div class="bg-gray-50 px-4 py-3 text-center">
        <button @click="goToNotificationView($event)" class="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors">
          Ver todas las notificaciones
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, defineEmits } from 'vue';
  
  const notifications = ref([
    {
      id: 1,
      title: 'Nuevo mensaje',
      description: 'Has recibido un nuevo mensaje sobre tu anuncio',
      image: '/placeholder.svg?height=40&width=40',
      isRead: false
    },
    {
      id: 2,
      title: 'Oferta recibida',
      description: 'Alguien ha hecho una oferta en tu propiedad',
      image: '/placeholder.svg?height=40&width=40',
      isRead: false
    },
    {
      id: 3,
      title: 'Recordatorio',
      description: 'Tu anuncio expirará en 3 días',
      image: '/placeholder.svg?height=40&width=40',
      isRead: true
    }
  ]);
  
  const emit = defineEmits(['close', 'deleteNotification']);
  
  const deleteNotification = (id: number, event: MouseEvent) => {
    event.stopPropagation();
    notifications.value = notifications.value.filter(notification => notification.id !== id);
    emit('deleteNotification', id);
  };
  const goToNotificationView = (event: MouseEvent) => {
    event.stopPropagation();
    console.log('Go to notification view');
    // Implement navigation logic here
  };
  </script>
  
  <style scoped>
  /* Add any additional styles here */
  </style>