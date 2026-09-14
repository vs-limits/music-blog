<template>
  <div class="relative w-full overflow-hidden bg-[#090a0d] text-white select-none">
    <!-- Ambient Atmospheric Glows -->
    <div
      class="absolute -top-24 left-1/4 w-[550px] h-[550px] bg-rose-600/15 rounded-full blur-[140px] pointer-events-none transition-opacity duration-1000"
      :class="isPlaying ? 'opacity-100' : 'opacity-30'"
    ></div>
    <div
      class="absolute top-12 right-10 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none transition-opacity duration-1000"
      :class="isPlaying ? 'opacity-100' : 'opacity-20'"
    ></div>

    <!-- Inner Content Container -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 lg:pt-16 pb-36 sm:pb-44 lg:pb-52 relative z-10">
      <div class="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14">
        <!-- Left Column: Title & Controls -->
        <div class="flex-1 text-center lg:text-left space-y-5 max-w-2xl">
          <!-- Live Pill Badge -->
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-semibold tracking-wider text-rose-300 shadow-sm">
            <span class="relative flex h-2 w-2">
              <span v-if="isPlaying" class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2" :class="isPlaying ? 'bg-rose-500' : 'bg-neutral-500'"></span>
            </span>
            <span>{{ isPlaying ? 'ON AIR · 正在播放背景乐' : 'STANDBY · 点击落针播放' }}</span>
            <span class="text-white/30">|</span>
            <span class="text-white/70 font-mono">33⅓ RPM STEREO</span>
          </div>

          <!-- Main Title: Two Lines -->
          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.2]">
            <span class="block">欢迎！</span>
            <span class="block mt-1 sm:mt-2">Lynmeto的歌单分享</span>
          </h1>

          <!-- Current BGM Info Badge -->
          <div class="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-300">
              <svg class="w-3.5 h-3.5 text-rose-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
              </svg>
              <span class="text-neutral-400">唱机原声：</span>
              <span class="font-medium text-white">Run Away (d4vd x Joji Type Beat)</span>
              <span class="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold">Free Beat</span>
            </div>
          </div>

          <!-- Interactive Player Controls Bar -->
          <div class="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
            <!-- Play / Pause Needle Button -->
            <button
              @click="togglePlay"
              class="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-bold text-xs transition-all duration-200 shadow-lg cursor-pointer active:scale-95 select-none"
              :class="isPlaying
                ? 'bg-rose-600 text-white hover:bg-rose-500 shadow-rose-600/30 ring-2 ring-rose-400/30'
                : 'bg-white text-neutral-900 hover:bg-neutral-100 shadow-white/20'"
              :title="isPlaying ? '抬起唱针暂停播放' : '落下唱针，播放背景音乐'"
            >
              <svg v-if="!isPlaying" class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              <svg v-else class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
              <span>{{ isPlaying ? '暂停播放与旋转' : '落针播放背景乐' }}</span>
            </button>

            <!-- Real-time Audio EQ Visualizer Bars (bounces to beat) -->
            <div
              @click="togglePlay"
              class="flex items-end gap-1 h-10 px-4 py-2 rounded-xl bg-neutral-900/90 border border-neutral-800 cursor-pointer hover:border-neutral-700 transition-colors shadow-inner"
              :title="isPlaying ? '真实声频律动跳跃中 · 点击暂停' : '点击落针播放'"
            >
              <span
                v-for="(height, i) in eqBars"
                :key="i"
                class="w-1.5 rounded-full transition-all duration-75 ease-out"
                :class="isPlaying ? 'bg-gradient-to-t from-rose-600 via-rose-400 to-amber-300' : 'bg-neutral-700'"
                :style="{
                  height: `${height}px`
                }"
              ></span>
            </div>

            <!-- Volume Mute/Unmute Button -->
            <button
              @click="toggleMute"
              class="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-all cursor-pointer select-none"
              :class="!isMuted
                ? 'bg-rose-500/15 text-rose-300 border-rose-500/40 hover:bg-rose-500/25'
                : 'bg-white/5 text-neutral-400 border-white/10 hover:bg-white/10'"
              :title="isMuted ? '取消静音' : '静音背景音乐'"
            >
              <svg v-if="!isMuted" class="w-3.5 h-3.5 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
              <svg v-else class="w-3.5 h-3.5 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
              <span>{{ isMuted ? '已静音' : '声音开' }}</span>
            </button>
          </div>
        </div>

        <!-- Right Column: Interactive Turntable Deck -->
        <div
          class="relative cursor-pointer group shrink-0"
          @click="togglePlay"
          :title="isPlaying ? '点击唱机抬针暂停' : '点击唱机落针播放背景乐'"
        >
          <!-- Turntable Plinth / Base Plate -->
          <div class="w-[300px] sm:w-[350px] h-[250px] sm:h-[280px] rounded-2xl bg-neutral-900 border border-neutral-700/60 p-5 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative flex items-center justify-between overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
            <!-- Brushed metal plate subtle sheen -->
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_70%)] pointer-events-none"></div>

            <!-- Turntable Deck Controls -->
            <!-- 1. Power Light Indicator -->
            <div class="absolute top-4 left-4 flex items-center gap-1.5">
              <span
                class="w-2 h-2 rounded-full transition-all duration-300"
                :class="isPlaying ? 'bg-emerald-400 shadow-[0_0_10px_#34d399]' : 'bg-neutral-600'"
              ></span>
              <span class="text-[9px] font-mono tracking-widest text-neutral-500 uppercase font-bold">POWER</span>
            </div>

            <!-- 2. Speed Buttons (33 / 45) -->
            <div class="absolute bottom-4 left-4 flex items-center gap-2">
              <div class="px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-[10px] font-mono text-rose-400 font-bold shadow-sm">33⅓</div>
              <div class="px-2 py-0.5 rounded bg-neutral-800/40 text-[10px] font-mono text-neutral-600">45</div>
            </div>

            <!-- 3. Turntable Platter with Vinyl Record -->
            <div class="relative w-[190px] sm:w-[220px] h-[190px] sm:h-[220px] rounded-full bg-neutral-950 p-2 shadow-inner border border-neutral-800 flex items-center justify-center">
              <!-- Strobe dots platter ring -->
              <div class="absolute inset-1 rounded-full border border-dashed border-neutral-700/50"></div>

              <!-- Spinning Vinyl Record -->
              <div
                class="w-full h-full rounded-full relative overflow-hidden transition-transform shadow-2xl flex items-center justify-center"
                :class="isPlaying ? 'animate-vinyl-spin' : ''"
                style="background: radial-gradient(circle, #1c1c1c 0%, #0d0d0d 60%, #050505 100%);"
              >
                <!-- Vinyl Grooves (Realistic Concentric Rings) -->
                <div class="absolute inset-2.5 rounded-full border border-neutral-800/80"></div>
                <div class="absolute inset-6 rounded-full border border-neutral-800/60"></div>
                <div class="absolute inset-10 rounded-full border border-neutral-800/80"></div>
                <div class="absolute inset-14 rounded-full border border-neutral-800/60"></div>
                <div class="absolute inset-18 rounded-full border border-neutral-800/80"></div>

                <!-- Vinyl Reflection Sheen (Glossy Conic Gradient) -->
                <div class="absolute inset-0 rounded-full opacity-25 pointer-events-none bg-[conic-gradient(from_45deg,transparent_0deg,rgba(255,255,255,0.4)_45deg,transparent_90deg,transparent_180deg,rgba(255,255,255,0.4)_225deg,transparent_270deg)]"></div>

                <!-- Center Record Label (Rose Coral) -->
                <div class="relative w-18 sm:w-20 h-18 sm:h-20 rounded-full bg-gradient-to-tr from-rose-700 to-rose-500 shadow-md flex flex-col items-center justify-center text-white border-2 border-neutral-900">
                  <span class="text-[7.5px] font-black tracking-wider uppercase">RUN AWAY</span>
                  <span class="text-[5.5px] font-medium text-rose-100 tracking-wider">JOJI BEAT</span>
                  <!-- Spindle Center Hole -->
                  <div class="w-3.5 h-3.5 rounded-full bg-neutral-900 border border-neutral-600 flex items-center justify-center my-0.5 shadow-inner">
                    <div class="w-1.5 h-1.5 rounded-full bg-neutral-300"></div>
                  </div>
                  <span class="text-[6px] font-mono text-rose-200">LYNMETO</span>
                </div>
              </div>
            </div>

            <!-- 4. Tonearm & Headshell (唱臂与唱针) -->
            <div class="absolute right-6 top-6 w-16 h-52 pointer-events-none">
              <!-- Tonearm Pivot Base -->
              <div class="absolute top-0 right-1 w-10 h-10 rounded-full bg-gradient-to-b from-neutral-700 to-neutral-800 border-2 border-neutral-600 shadow-md flex items-center justify-center">
                <div class="w-5 h-5 rounded-full bg-neutral-900 border border-neutral-500 flex items-center justify-center">
                  <div class="w-2 h-2 rounded-full bg-neutral-400"></div>
                </div>
              </div>

              <!-- Tonearm Rod (Pivots smoothly onto record when playing) -->
              <div
                class="absolute top-5 right-6 w-1.5 h-40 bg-gradient-to-r from-neutral-400 via-neutral-200 to-neutral-400 shadow-lg origin-top transition-all duration-700 ease-out"
                :style="{
                  transform: isPlaying ? 'rotate(25deg)' : 'rotate(2deg)'
                }"
              >
                <!-- Cartridge / Headshell (Stylus needle touching record) -->
                <div class="absolute -bottom-2 -left-2.5 w-6 h-8 rounded-sm bg-neutral-900 border border-neutral-600 shadow-sm flex flex-col items-center justify-between p-0.5">
                  <div class="w-full h-1 bg-rose-500 rounded-[1px]"></div>
                  <!-- Needle light reflection -->
                  <div class="w-1.5 h-2 bg-amber-300 rounded-full shadow-[0_0_6px_#fde047]"></div>
                </div>
              </div>

              <!-- Tonearm Rest Cradle -->
              <div class="absolute top-32 right-5 w-3.5 h-4 rounded-sm bg-neutral-800 border border-neutral-700"></div>
            </div>
          </div>

          <!-- Subtle interaction hint -->
          <div class="text-center mt-2.5 text-xs text-neutral-500 group-hover:text-rose-400 transition-colors">
            {{ isPlaying ? '⚡ 音乐播放中 · 点击唱机可暂停' : '👆 点击唱机落针播放' }}
          </div>
        </div>
      </div>
    </div>

    <!-- Smooth, Gradual Transition from Dark Top to Article Area (#FBFBFB) -->
    <div
      class="absolute inset-x-0 bottom-0 h-44 sm:h-56 lg:h-72 pointer-events-none z-20"
      style="background: linear-gradient(180deg, rgba(251, 251, 251, 0) 0%, rgba(251, 251, 251, 0.04) 15%, rgba(251, 251, 251, 0.16) 35%, rgba(251, 251, 251, 0.45) 58%, rgba(251, 251, 251, 0.78) 78%, rgba(251, 251, 251, 0.95) 92%, #FBFBFB 100%);"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isPlaying = ref(false)
const isMuted = ref(false)
const eqBars = ref([4, 4, 4, 4, 4, 4, 4, 4])

// Audio and Web Audio API nodes
let audioEl: HTMLAudioElement | null = null
let audioCtx: AudioContext | null = null
let analyser: AnalyserNode | null = null
let dataArray: Uint8Array | null = null
let sourceNode: MediaElementAudioSourceNode | null = null
let animFrameId: number | null = null

function initMusic() {
  if (audioEl) return

  audioEl = new Audio('/audio/bgm.mp3')
  audioEl.loop = true
  audioEl.volume = 0.65

  audioEl.addEventListener('play', () => {
    isPlaying.value = true
  })

  audioEl.addEventListener('pause', () => {
    isPlaying.value = false
  })

  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
      analyser = audioCtx.createAnalyser()
      analyser.fftSize = 64
      sourceNode = audioCtx.createMediaElementSource(audioEl)
      sourceNode.connect(analyser)
      analyser.connect(audioCtx.destination)
      dataArray = new Uint8Array(analyser.frequencyBinCount)
    }
  } catch (e) {
    console.warn('Analyser setup fallback', e)
  }
}

function updateVisualizer() {
  if (isPlaying.value && analyser && dataArray) {
    analyser.getByteFrequencyData(dataArray)
    // Sample 8 frequency bands across spectrum
    const step = Math.max(1, Math.floor(dataArray.length / 8))
    eqBars.value = Array.from({ length: 8 }, (_, i) => {
      const val = dataArray![i * step] || 0
      // Map 0~255 to 4~30px
      return Math.max(4, Math.floor((val / 255) * 28) + 4)
    })
  } else if (!isPlaying.value) {
    eqBars.value = [4, 4, 4, 4, 4, 4, 4, 4]
  }
  animFrameId = requestAnimationFrame(updateVisualizer)
}

async function togglePlay() {
  initMusic()

  if (audioCtx && audioCtx.state === 'suspended') {
    try {
      await audioCtx.resume()
    } catch {}
  }

  if (isPlaying.value) {
    audioEl?.pause()
    isPlaying.value = false
  } else {
    try {
      await audioEl?.play()
      isPlaying.value = true
    } catch (e) {
      console.warn('Audio play prevented', e)
    }
  }
}

function toggleMute() {
  initMusic()
  isMuted.value = !isMuted.value
  if (audioEl) {
    audioEl.muted = isMuted.value
  }
}

onMounted(() => {
  animFrameId = requestAnimationFrame(updateVisualizer)
})

onUnmounted(() => {
  if (animFrameId) {
    cancelAnimationFrame(animFrameId)
  }
  if (audioEl) {
    audioEl.pause()
    audioEl.src = ''
    audioEl = null
  }
  if (audioCtx) {
    try {
      audioCtx.close()
    } catch {}
  }
})
</script>

<style scoped>
@keyframes vinylSpin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-vinyl-spin {
  animation: vinylSpin 2.8s linear infinite;
}
</style>
