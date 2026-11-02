<template>
  <header
    class="sticky top-0 z-40 w-full backdrop-blur-md transition-colors duration-300"
    :class="headerClasses"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <!-- Logo & Brand -->
      <router-link to="/" class="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded-lg p-1">
        <div class="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
          <!-- Vinyl Center Icon -->
          <svg class="w-5 h-5 text-rose-500 animate-spin-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" stroke="currentColor" />
            <circle cx="12" cy="12" r="4" stroke="currentColor" fill="#f43f5e" />
            <circle cx="12" cy="12" r="1" fill="white" />
          </svg>
        </div>
        <div>
          <span
            class="font-extrabold text-lg sm:text-xl tracking-tight flex items-center gap-1.5 transition-colors duration-300"
            :class="isDarkNav ? 'text-white' : 'text-neutral-900'"
          >
            Musicplate
            <span
              class="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded transition-colors duration-300"
              :class="isDarkNav ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-rose-100 text-rose-700'"
            >
              Magazine
            </span>
          </span>
        </div>
      </router-link>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isScrolled = ref(false)
const isAtTop = ref(true)

function handleScroll() {
  const y = window.scrollY
  isAtTop.value = y <= 40
  isScrolled.value = y > 360
}

const isDarkNav = computed(() => {
  return route.path === '/' && !isScrolled.value
})

const headerClasses = computed(() => {
  if (isDarkNav.value) {
    if (isAtTop.value) {
      return 'bg-[#090a0d] border-b border-transparent text-white'
    }
    return 'bg-[#090a0d]/90 border-b border-white/10 text-white'
  }
  return 'bg-[#FBFBFB]/85 border-b border-neutral-200/60 text-neutral-900'
})

watch(
  () => route.path,
  () => {
    handleScroll()
  }
)

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
