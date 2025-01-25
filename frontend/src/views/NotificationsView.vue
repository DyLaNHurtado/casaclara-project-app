<template>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Todas las notificaciones</h1>
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
          <div class="flex space-x-2">
            <Button @click="markAllAsRead" variant="outline" :disabled="allRead">
              Marcar todas como leídas
            </Button>
            <Button @click="deleteAllRead" variant="outline" :disabled="noReadNotifications">
              Eliminar leídas
            </Button>
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-sm text-gray-500">Filtrar por:</span>
            <select v-model="filter" class="form-select text-sm">
              <option value="all">Todas</option>
              <option value="unread">No leídas</option>
              <option value="read">Leídas</option>
            </select>
          </div>
        </div>
        <TransitionGroup name="notification-list" tag="div" class="divide-y divide-gray-200">
          <div 
            v-for="notification in filteredNotifications" 
            :key="notification.id" 
            class="p-4 hover:bg-gray-50 transition-colors flex items-start space-x-4"
          >
            <img :src="notification.image" :alt="notification.title" class="w-12 h-12 rounded-full object-cover flex-shrink-0">
            <div class="flex-grow min-w-0">
              <div class="flex justify-between items-start">
                <p class="text-lg font-medium text-gray-900">
                  {{ notification.title }}
                </p>
                <span :class="[
                  'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                  notification.isRead ? 'bg-gray-100 text-gray-800' : 'bg-blue-100 text-blue-800'
                ]">
                  {{ notification.isRead ? 'Leído' : 'Nuevo' }}
                </span>
              </div>
              <p class="text-gray-500 mt-1">
                {{ notification.description }}
              </p>
              <p class="text-sm text-gray-400 mt-2">
                {{ formatDate(notification.date.toDateString()) }}
              </p>
            </div>
            <div class="flex-shrink-0 space-y-2">
              <Button 
                @click="markAsRead(notification.id)" 
                variant="ghost" 
                size="sm"
                :disabled="notification.isRead"
              >
                <IconCheck class="w-4 h-4 mr-1" />
                Marcar como leída
              </Button>
              <Button 
                @click="deleteNotification(notification.id)" 
                variant="ghost" 
                size="sm"
              >
                <IconTrash class="w-4 h-4 mr-1" />
                Eliminar
              </Button>
            </div>
          </div>
        </TransitionGroup>
        <div v-if="filteredNotifications.length === 0" class="p-8 text-center text-gray-500">
          No hay notificaciones para mostrar.
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import Button from '@/components/ui/Button.vue';
  import { formatDate } from '@/utils/formatters';
  import { IconCheck, IconTrash } from '@/components/common/icons';
  
  interface Notification {
    id: number;
    title: string;
    description: string;
    image: string;
    isRead: boolean;
    date: Date;
  }
  
  const notifications = ref<Notification[]>([
    // ... (same notifications as in the Notifications component)
  ]);
  
  const filter = ref('all');
  
  const filteredNotifications = computed(() => {
    if (filter.value === 'unread') {
      return notifications.value.filter(n => !n.isRead);
    } else if (filter.value === 'read') {
      return notifications.value.filter(n => n.isRead);
    }
    return notifications.value;
  });
  
  const allRead = computed(() => notifications.value.every(n => n.isRead));
  const noReadNotifications = computed(() => !notifications.value.some(n => n.isRead));
  
  const markAsRead = (id: number) => {
    const notification = notifications.value.find(n => n.id === id);
    if (notification) {
      notification.isRead = true;
    }
  };
  
  const deleteNotification = (id: number) => {
    notifications.value = notifications.value.filter(n => n.id !== id);
  };
  
  const markAllAsRead = () => {
    notifications.value.forEach(n => n.isRead = true);
  };
  
  const deleteAllRead = () => {
    notifications.value = notifications.value.filter(n => !n.isRead);
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
    transform: translateY(30px);
  }
  </style>
  
  