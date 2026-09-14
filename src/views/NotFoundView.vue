<template>
  <div class="max-w-md mx-auto px-4 py-28 text-center">
    <div class="w-16 h-16 rounded-full bg-neutral-100 text-neutral-400 mx-auto flex items-center justify-center mb-4">
      <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    </div>
    <h1 class="text-3xl font-extrabold text-neutral-900 mb-2">404 - 页面不存在</h1>
    <p class="text-sm text-neutral-500 mb-8">你访问的唱片或页面可能已被移动或删除。</p>
    <router-link
      to="/"
      class="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl transition-all shadow-sm"
    >
      <span>返回唱片画廊首页</span>
    </router-link>
  </div>
</template>

<script setup lang="ts">
// 404 View
</script>
