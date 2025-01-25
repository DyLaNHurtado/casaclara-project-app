<template>
    <div class="absolute right-0 top-14 mt-2 w-96 bg-white rounded-lg shadow-xl overflow-hidden z-20 border border-gray-200">
      <div class="py-3 px-4 bg-gray-50 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Notificaciones</h3>
      </div>
      <div class="divide-y divide-gray-200 max-h-96 overflow-y-auto">
        <TransitionGroup name="notification-list" tag="div">
          <div 
            v-for="notification in notifications" 
            :key="notification.id" 
            class="px-4 py-3 hover:bg-gray-50 transition-colors flex items-start space-x-3"
            @click="markAsRead(notification.id)"
          >
            <img :src="notification.image" :alt="notification.title" class="w-10 h-10 rounded-full object-cover flex-shrink-0">
            <div class="flex-grow min-w-0">
              <div class="flex justify-between items-start">
                <p class="text-sm font-medium text-gray-900 truncate">
                  {{ notification.title }}
                </p>
                <span :class="[
                  'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                  notification.isRead ? 'bg-gray-100 text-gray-800' : 'bg-blue-100 text-blue-800'
                ]">
                  {{ notification.isRead ? 'Leído' : 'Nuevo' }}
                </span>
              </div>
              <p class="text-sm text-gray-500 line-clamp-2">
                {{ notification.description }}
              </p>
              <p class="text-xs text-gray-400 mt-1">
                {{ formatDate(notification.date.toDateString()) }}
              </p>
            </div>
            <button 
              @click.stop="deleteNotification(notification.id)"
              class="text-gray-400 hover:text-red-500 transition-colors"
            >
              <IconTrash class="w-5 h-5" />
            </button>
          </div>
        </TransitionGroup>
      </div>
      <div class="bg-gray-50 px-4 py-3 text-center border-t border-gray-200">
        <button @click="goToNotificationView" class="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors">
          Ver todas las notificaciones
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, defineEmits } from 'vue';
  import { useRouter } from 'vue-router';
  import { formatDate } from '@/utils/formatters';
  import { IconTrash } from '@/components/common/icons';
  
  interface Notification {
    id: number;
    title: string;
    description: string;
    image: string;
    isRead: boolean;
    date: Date;
  }
  
  const notifications = ref<Notification[]>([
    {
      id: 1,
      title: 'Nuevo mensaje',
      description: 'Has recibido un nuevo mensaje sobre tu anuncio de "Piso céntrico en Madrid"',
      image: '/placeholder.svg?height=40&width=40',
      isRead: false,
      date: new Date('2023-05-15T10:30:00')
    },
    {
      id: 2,
      title: 'Oferta recibida',
      description: 'Alguien ha hecho una oferta de 250.000€ en tu propiedad "Casa con jardín en Barcelona"',
      image: '/placeholder.svg?height=40&width=40',
      isRead: false,
      date: new Date('2023-05-14T15:45:00')
    },
    {
      id: 3,
      title: 'Recordatorio',
      description: 'Tu anuncio "Local comercial en Valencia" expirará en 3 días. Considera renovarlo.',
      image: '/placeholder.svg?height=40&width=40',
      isRead: true,
      date: new Date('2023-05-13T09:00:00')
    }
  ]);
  
  const emit = defineEmits(['close', 'deleteNotification', 'markAsRead']);
  const router = useRouter();
  
  const deleteNotification = (id: number) => {
    notifications.value = notifications.value.filter(notification => notification.id !== id);
    emit('deleteNotification', id);
  };
  
  const markAsRead = (id: number) => {
    const notification = notifications.value.find(n => n.id === id);
    if (notification && !notification.isRead) {
      notification.isRead = true;
      emit('markAsRead', id);
    }
  };
  
  const goToNotificationView = () => {
    router.push({ name: 'notifications' });
    emit('close');
  };
  </script>
  
  <style scoped>
  .notification-list-enter-active,
  .notification-list-leave-active {
    transition: all 0.5s ease;
  }
  .notification-list-enter-from,
  .notification-list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
  </style>
  
  