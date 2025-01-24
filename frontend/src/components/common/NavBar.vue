<template>
  <nav class="bg-neutral text-gray-800 border-b border-gray-200">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <span @click="goHome" class="text-3xl font-bold cursor-pointer">CasaClara</span>
      <div class="flex items-center space-x-4">
        <div v-if="isLoggedIn" class="relative">
        <button @click="toggleNotifications" class="p-2 text-gray-600 hover:text-blue-600 transition-colors">
          <IconBell class="w-6 h-6" />
          <span v-if="unreadNotifications" class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {{ unreadNotifications }}
          </span>
        </button>
        <Notifications v-if="showNotifications" @close="showNotifications = false" @deleteNotification="deleteNotification" />
        </div>
        <div v-if="isLoggedIn" class="relative">
          <button @click="toggleUserMenu" class="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
            <img :src="user.avatar || '/placeholder-avatar.png'" alt="User avatar" class="w-8 h-8 rounded-full object-cover">
            <span class="font-medium">{{ user.name }}</span>
            <IconChevronDown class="w-3 h-3" />
          </button>
          <UserMenu v-if="showUserMenu" @close="showUserMenu = false" class="top-14" />
        </div>
        <Button v-else @click="openAuthModal" variant="outline">Iniciar sesión</Button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { IconBell, IconChevronDown } from '@/components/common/icons';
import Notifications from '@/components/common/Notifications.vue';
import UserMenu from '@/components/common/UserMenu.vue';
import Button from '@/components/ui/Button.vue';

const isLoggedIn = ref(true);
const user = ref({ name: 'John Doe', avatar: '' });
const showNotifications = ref(false);
const showUserMenu = ref(false);
const unreadNotifications = ref(3);

const router = useRouter();

const openAuthModal = () => {
  // Implement authentication modal logic here
  console.log('Open authentication modal');
  // Example: router.push('/login');
};

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value;
  if (showNotifications.value) showUserMenu.value = false;
};

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value;
  if (showUserMenu.value) showNotifications.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.relative')) {
    showNotifications.value = false;
    showUserMenu.value = false;
  }
};

const deleteNotification = (id: number) => {
  // Implement delete notification logic here
  //Evitar que se cierre el muenu copntextual con el evento click

  // Example: unreadNotifications.value--;
  console.log(`Notification ${id} deleted`);
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

const goHome = () => {
  router.push('/');
};
</script>

<style scoped>
/* Add any additional styles here */
</style>