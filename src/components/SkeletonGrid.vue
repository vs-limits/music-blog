<template>
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
    <div v-for="n in count" :key="n" class="animate-pulse space-y-4">
      <!-- Square Album Placeholder -->
      <div class="aspect-square bg-neutral-200/80 rounded-xl"></div>
      <!-- Text Lines Placeholder -->
      <div class="space-y-2">
        <div class="h-4 bg-neutral-200/80 rounded-md w-4/5"></div>
        <div class="h-3 bg-neutral-200/60 rounded-md w-3/5"></div>
        <div class="h-3 bg-neutral-200/40 rounded-md w-2/5 pt-1"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    count?: number
  }>(),
  {
    count: 8,
  }
)
</script>
