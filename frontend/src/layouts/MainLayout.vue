<template>
  <div class="flex flex-col min-h-screen">
    <NavBar />
    <main class="flex-grow bg-gray-100 max-w-5xl mx-auto text-center">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/common/NavBar.vue';
import Footer from '@/components/common/Footer.vue';
</script>