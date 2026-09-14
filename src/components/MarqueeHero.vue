<template>
  <div class="relative mb-10 overflow-hidden">
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
      <div class="space-y-2">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200/60 text-xs font-semibold tracking-wider text-rose-600">
          <svg class="w-3.5 h-3.5 animate-spin-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="4" fill="#f43f5e" />
          </svg>
          <span>VINYL RUNWAY · 流动黑胶展带</span>
        </div>

        <!-- Main Title Requested by User -->
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-900 leading-[1.2]">
          <span class="block">欢迎！</span>
          <span class="block mt-1 sm:mt-2">Lynmeto的歌单分享</span>
        </h1>
      </div>

      <!-- Controls: Pause & Speed -->
      <div class="flex items-center gap-3 self-start sm:self-end">
        <button
          @click="isPaused = !isPaused"
          class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 shadow-sm transition-all cursor-pointer select-none active:scale-95"
          :title="isPaused ? '恢复展带滚动' : '暂停展带滚动'"
        >
          <svg v-if="!isPaused" class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
          <svg v-else class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          <span>{{ isPaused ? '继续滚动' : '暂停流动' }}</span>
        </button>

        <span class="text-xs text-neutral-400 font-mono hidden md:inline-block">
          👆 鼠标悬停任意唱片可定格
        </span>
      </div>
    </div>

    <!-- Infinite Marquee Track Container -->
    <div
      class="relative w-full py-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 group overflow-hidden"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <!-- Gradient Edge Fade Masks -->
      <div class="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#FBFBFB] via-[#FBFBFB]/90 to-transparent z-20"></div>
      <div class="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#FBFBFB] via-[#FBFBFB]/90 to-transparent z-20"></div>

      <!-- Moving Marquee Track -->
      <div
        class="marquee-track flex items-center gap-6 sm:gap-8 will-change-transform"
        :class="{ 'paused': isPaused || isHovered }"
      >
        <!-- First Loop (Repeated items to form seamless infinite flow) -->
        <div
          v-for="(item, idx) in displayPosts"
          :key="`first-${item.id || idx}`"
          class="shrink-0"
        >
          <router-link
            :to="`/post/${item.slug}`"
            class="marquee-card group/item block w-[190px] sm:w-[220px] p-3 rounded-2xl bg-white border border-neutral-200/80 shadow-sm hover:shadow-xl hover:border-neutral-300 transition-all duration-300 text-left"
          >
            <!-- 3D Vinyl Showcase Container -->
            <div class="relative w-full aspect-square mb-3">
              <!-- Vinyl Disc Behind -->
              <div class="marquee-vinyl" aria-hidden="true">
                <div class="w-7 h-7 rounded-full bg-rose-600 border-2 border-neutral-900 flex items-center justify-center">
                  <div class="w-2 h-2 rounded-full bg-white"></div>
                </div>
              </div>

              <!-- Album Sleeve Cover -->
              <div class="marquee-sleeve">
                <img
                  :src="item.cover_image_url"
                  :alt="item.song_title"
                  class="w-full h-full object-cover select-none"
                  loading="lazy"
                />
              </div>
            </div>

            <!-- Meta text -->
            <div class="space-y-1">
              <h4 class="text-sm font-bold text-neutral-900 truncate group-hover/item:text-rose-600 transition-colors">
                《{{ item.song_title }}》
              </h4>
              <div class="flex items-center justify-between text-xs text-neutral-500">
                <span class="truncate">{{ item.artist }}</span>
                <span class="font-mono text-[11px] text-neutral-400 shrink-0">{{ item.release_year }}</span>
              </div>
              <div class="pt-1 flex items-center gap-1.5">
                <span class="px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600 text-[10px] font-medium">
                  {{ item.genre }}
                </span>
                <span class="text-[10px] text-rose-500 font-medium opacity-0 group-hover/item:opacity-100 transition-opacity ml-auto">
                  阅读乐评 →
                </span>
              </div>
            </div>
          </router-link>
        </div>

        <!-- Second Duplicate Loop for Infinite Seamlessness -->
        <div
          v-for="(item, idx) in displayPosts"
          :key="`second-${item.id || idx}`"
          class="shrink-0"
          aria-hidden="true"
        >
          <router-link
            :to="`/post/${item.slug}`"
            tabindex="-1"
            class="marquee-card group/item block w-[190px] sm:w-[220px] p-3 rounded-2xl bg-white border border-neutral-200/80 shadow-sm hover:shadow-xl hover:border-neutral-300 transition-all duration-300 text-left"
          >
            <!-- 3D Vinyl Showcase Container -->
            <div class="relative w-full aspect-square mb-3">
              <!-- Vinyl Disc Behind -->
              <div class="marquee-vinyl" aria-hidden="true">
                <div class="w-7 h-7 rounded-full bg-rose-600 border-2 border-neutral-900 flex items-center justify-center">
                  <div class="w-2 h-2 rounded-full bg-white"></div>
                </div>
              </div>

              <!-- Album Sleeve Cover -->
              <div class="marquee-sleeve">
                <img
                  :src="item.cover_image_url"
                  :alt="item.song_title"
                  class="w-full h-full object-cover select-none"
                  loading="lazy"
                />
              </div>
            </div>

            <!-- Meta text -->
            <div class="space-y-1">
              <h4 class="text-sm font-bold text-neutral-900 truncate group-hover/item:text-rose-600 transition-colors">
                《{{ item.song_title }}》
              </h4>
              <div class="flex items-center justify-between text-xs text-neutral-500">
                <span class="truncate">{{ item.artist }}</span>
                <span class="font-mono text-[11px] text-neutral-400 shrink-0">{{ item.release_year }}</span>
              </div>
              <div class="pt-1 flex items-center gap-1.5">
                <span class="px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600 text-[10px] font-medium">
                  {{ item.genre }}
                </span>
                <span class="text-[10px] text-rose-500 font-medium opacity-0 group-hover/item:opacity-100 transition-opacity ml-auto">
                  阅读乐评 →
                </span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Post } from '../types'

const props = defineProps<{
  posts?: Post[]
}>()

const isPaused = ref(false)
const isHovered = ref(false)

// Fallback curated records if posts are still fetching
const defaultRecords: Partial<Post>[] = [
  {
    id: 'sample-1',
    slug: 'plastic-love-mariya-takeuchi',
    song_title: 'Plastic Love',
    artist: 'Mariya Takeuchi',
    album: 'Variety',
    release_year: 1984,
    genre: 'City Pop',
    cover_image_url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'sample-2',
    slug: 'come-fly-with-me-frank-sinatra',
    song_title: 'Come Fly with Me',
    artist: 'Frank Sinatra',
    album: 'Come Fly with Me',
    release_year: 1958,
    genre: 'Jazz / Swing',
    cover_image_url: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'sample-3',
    slug: 'dreams-fleetwood-mac',
    song_title: 'Dreams',
    artist: 'Fleetwood Mac',
    album: 'Rumours',
    release_year: 1977,
    genre: 'Classic Rock',
    cover_image_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'sample-4',
    slug: 'instant-crush-daft-punk',
    song_title: 'Instant Crush',
    artist: 'Daft Punk',
    album: 'Random Access Memories',
    release_year: 2013,
    genre: 'Electronic',
    cover_image_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80',
  },
]

const displayPosts = computed(() => {
  if (props.posts && props.posts.length > 0) {
    // If fewer than 4 items, double them up to make a continuous long runway
    if (props.posts.length < 4) {
      return [...props.posts, ...props.posts]
    }
    return props.posts
  }
  return defaultRecords as Post[]
})
</script>

<style scoped>
/* Infinite Marquee Keyframe */
@keyframes marqueeScroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.marquee-track {
  width: max-content;
  animation: marqueeScroll 28s linear infinite;
}

.marquee-track.paused {
  animation-play-state: paused;
}

/* Mini Vinyl & Sleeve for Marquee items */
.marquee-vinyl {
  position: absolute;
  top: 4%;
  left: 4%;
  width: 92%;
  height: 92%;
  border-radius: 50%;
  background: radial-gradient(
    circle at center,
    #d1d5db 0%,
    #374151 12%,
    #111827 20%,
    #1f2937 38%,
    #111827 50%,
    #1f2937 65%,
    #111827 78%,
    #030712 100%
  );
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 400ms cubic-bezier(0.25, 1, 0.5, 1);
  transform: translate(0, 0) rotate(0deg);
  z-index: 1;
}

.marquee-sleeve {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 8px 16px -4px rgba(0, 0, 0, 0.12);
  transition: transform 350ms cubic-bezier(0.16, 1, 0.3, 1);
  background-color: #ffffff;
}

/* On Card Hover in Marquee */
.group\/item:hover .marquee-vinyl {
  transform: translate(32%, -10%) rotate(50deg);
}

.group\/item:hover .marquee-sleeve {
  transform: scale(1.02);
}
</style>
