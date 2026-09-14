<template>
  <div class="min-h-screen flex flex-col bg-[#FBFBFB]">
    <!-- Navbar -->
    <Navbar />

    <!-- Main Views with Subtle Transition -->
    <div class="flex-1">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>

    <!-- Editorial Footer -->
    <footer class="border-t border-neutral-200/80 bg-white py-8 mt-16 text-center text-xs text-neutral-400">
      <div class="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <span class="font-bold text-neutral-800 tracking-tight">Musicplate</span>
          <span>© 2026 音乐专辑与乐评杂志</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import Navbar from './components/Navbar.vue'
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease, transform 200ms ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
