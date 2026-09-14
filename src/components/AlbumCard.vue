<template>
  <router-link
    :to="`/post/${post.slug}`"
    class="vinyl-card group block text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded-xl p-2 -m-2 transition-colors"
    :aria-label="`阅读 ${post.song_title} - ${post.artist} 的专栏文章`"
  >
    <!-- Vinyl 3D Container -->
    <div class="vinyl-wrapper mb-4">
      <!-- Vinyl Record (Hidden behind, slides out on hover) -->
      <div class="vinyl-disc" aria-hidden="true">
        <div class="vinyl-label">
          <div class="vinyl-spindle"></div>
        </div>
      </div>

      <!-- Album Sleeve / Cover Jacket -->
      <div class="vinyl-sleeve border border-neutral-200/80 bg-neutral-100">
        <img
          :src="post.cover_image_url"
          :alt="`${post.album} 封面`"
          loading="lazy"
          class="w-full h-full object-cover select-none"
          @error="handleImageError"
        />
      </div>
    </div>

    <!-- Metadata Content -->
    <div class="space-y-1.5 px-0.5">
      <!-- Song Title -->
      <h3 class="font-bold text-base text-neutral-900 line-clamp-1 group-hover:text-rose-600 transition-colors">
        《{{ post.song_title }}》
      </h3>

      <!-- Artist & Year -->
      <div class="flex items-center justify-between text-xs text-neutral-600">
        <span class="font-medium truncate mr-2">{{ post.artist }}</span>
        <span class="text-neutral-600 font-mono text-[11px] shrink-0">{{ post.release_year }}</span>
      </div>

      <!-- Album & Genre Tag -->
      <div class="flex items-center justify-between gap-2 pt-1 border-t border-neutral-100 text-[11px] text-neutral-600">
        <span class="truncate italic max-w-[65%]">{{ post.album }}</span>
        <span class="inline-block px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600 font-medium text-[10px] shrink-0">
          {{ post.genre }}
        </span>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import type { Post } from '../types'

defineProps<{
  post: Post
}>()

const defaultCover = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80'

function handleImageError(event: Event) {
  const target = event.target as HTMLImageElement
  if (target && target.src !== defaultCover) {
    target.src = defaultCover
  }
}
</script>
