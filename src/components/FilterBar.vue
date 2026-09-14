<template>
  <div class="bg-white/80 backdrop-blur-sm border border-neutral-200/80 rounded-2xl p-4 sm:p-5 shadow-sm mb-8 transition-all">
    <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <!-- Title / Active status -->
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-rose-500"></span>
        <span class="text-xs uppercase font-bold tracking-wider text-neutral-500">探索黑胶唱片库</span>
        <span v-if="hasActiveFilter" class="px-2 py-0.5 text-[11px] font-semibold bg-rose-50 text-rose-600 rounded-full border border-rose-200/50">
          已启用筛选
        </span>
      </div>

      <!-- Filter Controls Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto">
        <!-- 1. Artist Select -->
        <div class="relative min-w-[150px]">
          <select
            :value="modelValue.artist || ''"
            @change="updateFilter('artist', ($event.target as HTMLSelectElement).value)"
            class="w-full appearance-none bg-neutral-50 hover:bg-neutral-100/80 text-neutral-800 text-xs font-medium rounded-xl px-3.5 py-2.5 pr-8 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all cursor-pointer"
          >
            <option value="">全部歌手</option>
            <option v-for="a in options.artists" :key="a" :value="a">{{ a }}</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-neutral-400">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </div>
        </div>

        <!-- 2. Genre Select -->
        <div class="relative min-w-[140px]">
          <select
            :value="modelValue.genre || ''"
            @change="updateFilter('genre', ($event.target as HTMLSelectElement).value)"
            class="w-full appearance-none bg-neutral-50 hover:bg-neutral-100/80 text-neutral-800 text-xs font-medium rounded-xl px-3.5 py-2.5 pr-8 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all cursor-pointer"
          >
            <option value="">全部流派</option>
            <option v-for="g in options.genres" :key="g" :value="g">{{ g }}</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-neutral-400">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </div>
        </div>

        <!-- 3. Release Year Select -->
        <div class="relative min-w-[130px]">
          <select
            :value="modelValue.release_year || ''"
            @change="updateFilter('release_year', ($event.target as HTMLSelectElement).value ? Number(($event.target as HTMLSelectElement).value) : undefined)"
            class="w-full appearance-none bg-neutral-50 hover:bg-neutral-100/80 text-neutral-800 text-xs font-medium rounded-xl px-3.5 py-2.5 pr-8 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all cursor-pointer"
          >
            <option value="">全部年代</option>
            <option v-for="y in options.years" :key="y" :value="y">{{ y }} 年</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-neutral-400">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- Clear Button -->
      <button
        v-if="hasActiveFilter"
        @click="clearAll"
        class="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-neutral-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all w-full md:w-auto"
      >
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
        <span>清除筛选</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { FilterOptions, PostQueryParams } from '../types'

const props = defineProps<{
  options: FilterOptions
  modelValue: PostQueryParams
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: PostQueryParams): void
}>()

const hasActiveFilter = computed(() => {
  return !!(props.modelValue.artist || props.modelValue.genre || props.modelValue.release_year)
})

function updateFilter(key: keyof PostQueryParams, value: any) {
  const updated: PostQueryParams = { ...props.modelValue, page: 1 }
  if (!value) {
    delete (updated as any)[key]
  } else {
    (updated as any)[key] = value
  }
  emit('update:modelValue', updated)
}

function clearAll() {
  emit('update:modelValue', { page: 1, page_size: props.modelValue.page_size || 12 })
}
</script>
