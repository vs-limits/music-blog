<template>
  <div class="my-6 rounded-2xl bg-white/95 backdrop-blur-md border border-neutral-200/80 shadow-md p-4 sm:p-5 transition-all">
    <!-- Header Bar -->
    <div class="flex items-center justify-between gap-3 mb-3">
      <div class="flex items-center gap-2">
        <!-- NetEase Cloud Music Logo Icon -->
        <div class="w-6 h-6 rounded-full bg-[#C20C0C] flex items-center justify-center text-white shadow-sm shrink-0">
          <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/>
          </svg>
        </div>
        <div>
          <h4 class="text-xs font-bold text-neutral-900 tracking-tight flex items-center gap-1.5">
            网易云音乐
            <span class="text-[10px] font-semibold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-100">
              正版试听
            </span>
          </h4>
        </div>
      </div>

      <!-- Direct Jump Button to NetEase Page -->
      <a
        :href="neteaseJumpUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-white bg-[#C20C0C] hover:bg-[#A90909] shadow-sm transition-all duration-200 active:scale-95 shrink-0"
        :title="`在网易云音乐中收听《${songTitle}》`"
      >
        <span>在网易云打开</span>
        <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </a>
    </div>

    <!-- 1. Official Outlink Iframe Player (When Song ID is Available) -->
    <div v-if="neteaseId" class="w-full overflow-hidden rounded-xl border border-neutral-200/60 bg-neutral-50 shadow-inner">
      <iframe
        frameborder="no"
        border="0"
        marginwidth="0"
        marginheight="0"
        width="100%"
        height="86"
        :src="`//music.163.com/outchain/player?type=2&id=${neteaseId}&auto=0&height=66`"
        class="w-full block"
        loading="lazy"
        title="网易云外链播放器"
      ></iframe>
    </div>

    <!-- 2. Fallback Direct Search Card (When Song ID is Not Configured Yet) -->
    <div v-else class="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/60">
      <div class="flex items-center gap-2.5 text-xs text-neutral-600 truncate w-full sm:w-auto">
        <svg class="w-4 h-4 text-rose-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" />
          <polygon points="10 8 16 12 10 16 10 8" />
        </svg>
        <span class="truncate">
          原唱曲目：<strong class="text-neutral-900 font-semibold">{{ songTitle }}</strong> · {{ artist }}
        </span>
      </div>

      <a
        :href="neteaseJumpUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors shrink-0"
      >
        <span>前往网易云试听完整版</span>
        <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  songTitle: string
  artist: string
  neteaseId?: string | number
  markdownBody?: string
  excerpt?: string
  slug?: string
}>()

// Built-in seed mapping for standard classic albums
const defaultNeteaseIds: Record<string, string> = {
  'plastic-love-mariya-takeuchi': '4937229',
  'come-fly-with-me-frank-sinatra': '1946808',
  'dreams-fleetwood-mac': '26830207',
  'instant-crush-daft-punk': '26562854',
}

// Regex supporting English/Chinese colons, spaces, equals, and URLs:
// e.g. netease：1837757778, netease: 1837757778, 网易云：1837757778, song?id=1837757778
const neteasePattern = /(?:(?:netease|网易云|163)(?::|：|\s*=\s*|\s+)\s*|\/song\?(?:[^&\s]*&)*id=|\/song\/)(\d+)/i

// Detect or extract NetEase ID
const neteaseId = computed<string | null>(() => {
  // 0. Explicit prop (from Frontmatter or API)
  if (props.neteaseId) {
    return String(props.neteaseId)
  }

  // 1. Check seed default map
  if (props.slug && defaultNeteaseIds[props.slug]) {
    return defaultNeteaseIds[props.slug]
  }

  // 2. Check if body markdown specifies NetEase ID
  if (props.markdownBody) {
    const match = props.markdownBody.match(neteasePattern)
    if (match && match[1]) {
      return match[1]
    }
  }

  // 3. Check if excerpt specifies NetEase ID
  if (props.excerpt) {
    const match = props.excerpt.match(neteasePattern)
    if (match && match[1]) {
      return match[1]
    }
  }

  return null
})

// NetEase Cloud Music direct jump URL
const neteaseJumpUrl = computed(() => {
  if (neteaseId.value) {
    return `https://music.163.com/#/song?id=${neteaseId.value}`
  }
  // Universal search link
  const query = `${props.songTitle} ${props.artist}`.trim()
  return `https://music.163.com/#/search/m/?s=${encodeURIComponent(query)}&type=1`
})
</script>
