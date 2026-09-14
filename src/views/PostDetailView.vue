<template>
  <div class="relative min-h-[85vh]">
    <!-- Loading Indicator -->
    <div v-if="loading" class="max-w-4xl mx-auto px-4 py-20 animate-pulse space-y-8">
      <div class="h-6 bg-neutral-200 rounded w-24"></div>
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div class="md:col-span-5 aspect-square bg-neutral-200 rounded-2xl"></div>
        <div class="md:col-span-7 space-y-4">
          <div class="h-8 bg-neutral-200 rounded w-3/4"></div>
          <div class="h-4 bg-neutral-200 rounded w-1/2"></div>
          <div class="h-4 bg-neutral-200 rounded w-1/3"></div>
        </div>
      </div>
      <div class="space-y-4 pt-8">
        <div class="h-4 bg-neutral-200 rounded w-full"></div>
        <div class="h-4 bg-neutral-200 rounded w-full"></div>
        <div class="h-4 bg-neutral-200 rounded w-4/5"></div>
      </div>
    </div>

    <!-- Error / Not Found State -->
    <div v-else-if="error || !post" class="max-w-md mx-auto px-4 py-24 text-center">
      <div class="w-14 h-14 rounded-full bg-rose-50 text-rose-500 mx-auto flex items-center justify-center mb-4">
        <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </div>
      <h2 class="text-xl font-bold text-neutral-900 mb-2">未找到该专栏文章</h2>
      <p class="text-xs text-neutral-500 mb-6">{{ error || '文章可能已被撤回或不存在' }}</p>
      <router-link
        to="/"
        class="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl transition-all shadow-sm"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        <span>返回唱片画廊</span>
      </router-link>
    </div>

    <!-- Article Content View -->
    <article v-else class="ambient-glow-bg pb-24" :style="{ '--ambient-color': ambientColor }">
      <!-- Top Navigation Breadcrumb -->
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 relative z-10">
        <router-link
          to="/"
          class="inline-flex items-center gap-2 text-xs font-medium text-neutral-500 hover:text-neutral-900 transition-colors group"
        >
          <svg class="w-4 h-4 transition-transform group-hover:-translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          <span>返回唱片架</span>
        </router-link>
      </div>

      <!-- Hero Header Section -->
      <header class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <!-- Album Cover Jacket (Left on desktop) -->
          <div class="md:col-span-5 flex justify-center md:justify-start">
            <div class="w-64 h-64 sm:w-72 sm:h-72 rounded-2xl overflow-hidden shadow-2xl border border-white/60 bg-neutral-100 ring-1 ring-black/5 relative group">
              <img
                :src="post.cover_image_url"
                :alt="`${post.album} 封面`"
                class="w-full h-full object-cover"
              />
            </div>
          </div>

          <!-- Metadata & Headings (Right on desktop) -->
          <div class="md:col-span-7 space-y-4 text-center md:text-left">
            <!-- Badges -->
            <div class="flex items-center justify-center md:justify-start gap-2 flex-wrap">
              <span class="px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-rose-600 text-white shadow-sm">
                {{ post.genre }}
              </span>
              <span class="px-2.5 py-1 text-xs font-mono font-medium rounded-full bg-white/80 text-neutral-700 border border-neutral-200/80 backdrop-blur-sm">
                {{ post.release_year }} 年发行
              </span>
            </div>

            <!-- Song Title -->
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight leading-tight">
              《{{ post.song_title }}》
            </h1>

            <!-- Artist & Album -->
            <div class="space-y-1 text-sm sm:text-base text-neutral-600">
              <p class="font-medium text-neutral-900 flex items-center justify-center md:justify-start gap-1.5">
                <span>艺术家：</span>
                <span class="font-semibold text-neutral-950">{{ post.artist }}</span>
              </p>
              <p class="text-neutral-500 flex items-center justify-center md:justify-start gap-1.5">
                <span>收录专辑：</span>
                <span class="italic">{{ post.album }}</span>
              </p>
            </div>

            <!-- Publish Date -->
            <div class="pt-2 text-xs text-neutral-400 font-mono">
              发布于 {{ formatDate(post.published_at || post.created_at) }}
            </div>
          </div>
        </div>
      </header>

      <!-- Excerpt Card (If provided) -->
      <section v-if="post.excerpt" class="max-w-3xl mx-auto px-4 sm:px-6 my-8 relative z-10">
        <div class="bg-white/90 backdrop-blur-sm border-l-4 border-rose-500 rounded-r-2xl p-5 sm:p-6 shadow-sm border border-neutral-200/60">
          <p class="text-sm sm:text-base text-neutral-700 font-serif italic leading-relaxed">
            “{{ post.excerpt }}”
          </p>
        </div>
      </section>

      <!-- Article Body Markdown Content -->
      <section class="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        <div
          class="markdown-body bg-white border border-neutral-200/80 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm"
          v-html="renderedBody"
        ></div>
      </section>
    </article>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchPostBySlug } from '../api/posts'
import { extractAmbientColor } from '../utils/ambient'
import { renderMarkdown } from '../utils/markdown'
import type { Post } from '../types'

const route = useRoute()
const post = ref<Post | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const ambientColor = ref('rgba(244, 63, 94, 0.18)')

const renderedBody = computed(() => {
  if (!post.value?.body_markdown) return ''
  return renderMarkdown(post.value.body_markdown)
})

function formatDate(dateStr: string | null) {
  if (!dateStr) return ''
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return dateStr
  }
}

async function loadPost() {
  const slug = String(route.params.slug)
  if (!slug) return

  loading.value = true
  error.value = null

  try {
    const res = await fetchPostBySlug(slug)
    post.value = res

    // Update document title
    document.title = `《${res.song_title}》- ${res.artist} | Musicplate 乐评杂志`

    // Extract dominant color for Ambient Glow
    if (res.cover_image_url) {
      ambientColor.value = await extractAmbientColor(res.cover_image_url)
    }
  } catch (err: any) {
    error.value = err.message || '获取文章详情失败'
  } finally {
    loading.value = false
  }
}

watch(() => route.params.slug, loadPost)

onMounted(() => {
  loadPost()
})
</script>
