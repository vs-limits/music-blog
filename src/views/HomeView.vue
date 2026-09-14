<template>
  <div>
    <!-- Full-Width Top Turntable Hero (Covers top, smoothly transitions to white) -->
    <TurntableHero />

    <!-- Article Content Area -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-24 lg:-mt-28 relative z-30 pb-16">
      <!-- Filter Bar -->
      <FilterBar
      :options="filterOptions"
      :model-value="queryParams"
      @update:model-value="onFilterChange"
    />

    <!-- Main Content Area -->
    <main>
      <!-- Loading State -->
      <SkeletonGrid v-if="loading" :count="queryParams.page_size || 8" />

      <!-- Error State -->
      <div
        v-else-if="error"
        class="text-center py-16 bg-white border border-neutral-200 rounded-2xl p-8 max-w-md mx-auto"
      >
        <div class="w-12 h-12 rounded-full bg-rose-50 text-rose-500 mx-auto flex items-center justify-center mb-3">
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h3 class="text-base font-bold text-neutral-900 mb-1">加载唱片列表失败</h3>
        <p class="text-xs text-neutral-500 mb-4">{{ error }}</p>
        <button
          @click="loadData"
          class="px-4 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl transition-all shadow-sm"
        >
          重试加载
        </button>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="posts.length === 0"
        class="text-center py-20 bg-white border border-neutral-200/80 rounded-2xl p-8"
      >
        <div class="w-14 h-14 rounded-full bg-neutral-100 text-neutral-400 mx-auto flex items-center justify-center mb-3">
          <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <path d="m4.93 4.93 14.14 14.14" />
          </svg>
        </div>
        <h3 class="text-lg font-bold text-neutral-800 mb-1">未找到匹配的唱片</h3>
        <p class="text-sm text-neutral-500 mb-5">尝试清除或调整当前的流派、歌手或年代筛选条件</p>
        <button
          @click="resetFilters"
          class="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-all"
        >
          <span>重置所有筛选</span>
        </button>
      </div>

      <!-- Album Grid (2 cols mobile, 3 cols tablet, 4 cols desktop) -->
      <div
        v-else
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12"
      >
        <AlbumCard v-for="post in posts" :key="post.id" :post="post" />
      </div>

      <!-- Pagination -->
      <div
        v-if="!loading && totalPages > 1"
        class="mt-14 flex items-center justify-center gap-2"
      >
        <button
          :disabled="queryParams.page === 1"
          @click="goToPage((queryParams.page || 1) - 1)"
          class="px-3 py-2 text-xs font-medium rounded-xl border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 disabled:opacity-40 disabled:pointer-events-none transition-all"
        >
          上一页
        </button>

        <span class="px-4 py-2 text-xs font-mono text-neutral-500">
          第 {{ queryParams.page || 1 }} / {{ totalPages }} 页 (共 {{ total }} 篇)
        </span>

        <button
          :disabled="(queryParams.page || 1) >= totalPages"
          @click="goToPage((queryParams.page || 1) + 1)"
          class="px-3 py-2 text-xs font-medium rounded-xl border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 disabled:opacity-40 disabled:pointer-events-none transition-all"
        >
          下一页
        </button>
      </div>
    </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchPublishedPosts, fetchFilterOptions } from '../api/posts'
import type { Post, FilterOptions, PostQueryParams } from '../types'
import AlbumCard from '../components/AlbumCard.vue'
import FilterBar from '../components/FilterBar.vue'
import SkeletonGrid from '../components/SkeletonGrid.vue'
import TurntableHero from '../components/TurntableHero.vue'

const route = useRoute()
const router = useRouter()

const posts = ref<Post[]>([])
const total = ref(0)
const loading = ref(true)
const error = ref<string | null>(null)

const filterOptions = ref<FilterOptions>({
  artists: [],
  genres: [],
  years: [],
})

const queryParams = ref<PostQueryParams>({
  page: 1,
  page_size: 12,
})

const totalPages = computed(() => {
  const size = queryParams.value.page_size || 12
  return Math.ceil(total.value / size)
})

// Sync query params from route
function parseRouteQuery() {
  const q: PostQueryParams = {
    page: route.query.page ? Number(route.query.page) : 1,
    page_size: 12,
  }
  if (route.query.artist) q.artist = String(route.query.artist)
  if (route.query.genre) q.genre = String(route.query.genre)
  if (route.query.release_year) q.release_year = Number(route.query.release_year)
  queryParams.value = q
}

// Sync query params to route
function syncQueryToRoute(params: PostQueryParams) {
  const query: Record<string, any> = {}
  if (params.page && params.page > 1) query.page = params.page
  if (params.artist) query.artist = params.artist
  if (params.genre) query.genre = params.genre
  if (params.release_year) query.release_year = params.release_year

  router.push({ query })
}

function onFilterChange(newParams: PostQueryParams) {
  queryParams.value = newParams
  syncQueryToRoute(newParams)
}

function goToPage(page: number) {
  queryParams.value.page = page
  syncQueryToRoute(queryParams.value)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function resetFilters() {
  onFilterChange({ page: 1, page_size: 12 })
}

async function loadData() {
  loading.value = true
  error.value = null
  try {
    const [postsRes, filtersRes] = await Promise.all([
      fetchPublishedPosts(queryParams.value),
      fetchFilterOptions(),
    ])
    posts.value = postsRes.items
    total.value = postsRes.total
    filterOptions.value = filtersRes
  } catch (err: any) {
    error.value = err.message || '获取数据失败'
  } finally {
    loading.value = false
  }
}

watch(
  () => route.query,
  () => {
    parseRouteQuery()
    loadData()
  }
)

onMounted(() => {
  parseRouteQuery()
  loadData()
})
</script>
