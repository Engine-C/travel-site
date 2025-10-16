<template>
  <div v-if="destination" class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
    <!-- Hero Image Section -->
    <div class="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-8 shadow-2xl">
      <img 
        :src="destination.image" 
        :alt="destination.name" 
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
      <div class="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
        <div class="flex items-center gap-3 mb-3">
          <span class="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
            {{ getTypeLabel(destination.type) }}
          </span>
        </div>
        <h1 class="text-4xl sm:text-5xl font-bold mb-2">{{ destination.name }}</h1>
        <p class="text-lg text-white/90 max-w-2xl">{{ destination.description }}</p>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid md:grid-cols-3 gap-8">
      <!-- Left Column - Details -->
      <div class="md:col-span-2 space-y-6">
        <!-- Overview Section -->
        <section class="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
          <h2 class="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            目的地概览
          </h2>
          <div class="space-y-3 text-slate-600">
            <p class="leading-relaxed">
              {{ destination.name }}是一个令人向往的旅游胜地，以其独特的{{ destination.type === 'beach' ? '海滨风光' : destination.type === 'mountain' ? '山地景观' : '都市魅力' }}而闻名。
              这里为游客提供了丰富多样的体验，从文化探索到休闲娱乐，应有尽有。
            </p>
            <p class="leading-relaxed">
              无论您是寻求冒险、放松还是文化体验，{{ destination.name }}都能满足您的期待，为您带来一段难忘的旅程。
            </p>
          </div>
        </section>

        <!-- Highlights Section -->
        <section class="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
          <h2 class="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
            </svg>
            旅行亮点
          </h2>
          <div class="grid sm:grid-cols-2 gap-4">
            <div v-for="(highlight, index) in highlights" :key="index" class="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
              <div class="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span class="text-xl">{{ highlight.icon }}</span>
              </div>
              <div>
                <h3 class="font-semibold text-slate-800 mb-1">{{ highlight.title }}</h3>
                <p class="text-sm text-slate-600">{{ highlight.description }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- What's Included Section -->
        <section class="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
          <h2 class="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            套餐包含
          </h2>
          <div class="grid sm:grid-cols-2 gap-3">
            <div v-for="(item, index) in included" :key="index" class="flex items-center gap-2 text-slate-700">
              <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>{{ item }}</span>
            </div>
          </div>
        </section>
      </div>

      <!-- Right Column - Booking Card -->
      <aside class="h-fit">
        <div class="bg-gradient-to-br from-primary to-accent text-white rounded-2xl shadow-xl p-6 sticky top-24">
          <div class="mb-6">
            <div class="text-sm text-white/80 mb-1">起价</div>
            <div class="text-4xl font-bold mb-1">¥{{ destination.price.toLocaleString() }}</div>
            <div class="text-sm text-white/80">每人起</div>
          </div>

          <div class="space-y-4 mb-6 bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div class="text-sm">
                <div class="font-semibold">灵活安排</div>
                <div class="text-white/80">可根据您的时间定制</div>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              <div class="text-sm">
                <div class="font-semibold">团队优惠</div>
                <div class="text-white/80">多人同行更优惠</div>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
              <div class="text-sm">
                <div class="font-semibold">安心保障</div>
                <div class="text-white/80">免费取消与退款</div>
              </div>
            </div>
          </div>

          <RouterLink 
            :to="{ name: 'booking', query: { dest: destination.id } }"
            class="block w-full bg-white text-primary text-center font-bold py-4 rounded-lg hover:bg-white/90 transition-all hover:shadow-lg hover:scale-105"
          >
            立即预订
          </RouterLink>

          <button 
            @click="goBack"
            class="block w-full mt-3 text-white/90 text-center font-semibold py-3 rounded-lg hover:bg-white/10 transition-all"
          >
            返回列表
          </button>
        </div>
      </aside>
    </div>
  </div>

  <!-- Not Found State -->
  <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
    <div class="text-6xl mb-4">❓</div>
    <h1 class="text-3xl font-bold text-slate-800 mb-2">目的地未找到</h1>
    <p class="text-slate-600 mb-6">抱歉，我们找不到您要查看的目的地</p>
    <RouterLink 
      to="/"
      class="inline-block bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
    >
      返回首页
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'

type Destination = {
  id: string
  name: string
  description: string
  price: number
  type: 'beach' | 'mountain' | 'city'
  image: string
}

const route = useRoute()
const router = useRouter()

// Destination data (same as in Home.vue)
const destinations: Destination[] = [
  { id: 'bali', name: '巴厘岛', description: '阳光海滩与文化之旅，体验热带风情和当地传统', price: 1999, type: 'beach', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop' },
  { id: 'alps', name: '阿尔卑斯山', description: '雪山与徒步探险，感受大自然的壮美与宁静', price: 2599, type: 'mountain', image: 'https://images.unsplash.com/photo-1504194104404-433180773017?q=80&w=1200&auto=format&fit=crop' },
  { id: 'tokyo', name: '东京', description: '现代都市与传统文化完美融合的国际大都会', price: 2899, type: 'city', image: 'https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=1200&auto=format&fit=crop' },
  { id: 'maldives', name: '马尔代夫', description: '度假天堂蓝色海域，享受顶级海岛度假体验', price: 3999, type: 'beach', image: 'https://images.unsplash.com/photo-1505764706515-aa95265c5abc?q=80&w=1200&auto=format&fit=crop' },
  { id: 'paris', name: '巴黎', description: '浪漫之都，艺术与时尚的完美结合', price: 3299, type: 'city', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop' },
  { id: 'santorini', name: '圣托里尼', description: '爱琴海明珠，蓝白建筑与绝美日落', price: 3599, type: 'beach', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200&auto=format&fit=crop' },
  { id: 'swiss', name: '瑞士', description: '雪山湖泊，童话般的自然风光', price: 4299, type: 'mountain', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop' },
  { id: 'dubai', name: '迪拜', description: '沙漠中的奇迹之城，奢华与现代的象征', price: 3899, type: 'city', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop' }
]

const destination = computed(() => {
  const id = route.params.id as string
  return destinations.find(d => d.id === id)
})

const highlights = computed(() => {
  if (!destination.value) return []
  
  const baseHighlights = [
    { icon: '🌟', title: '精选体验', description: '专业导游带领，深度体验当地文化' },
    { icon: '🏨', title: '优质住宿', description: '精选高品质酒店，舒适安心' },
  ]

  if (destination.value.type === 'beach') {
    return [
      ...baseHighlights,
      { icon: '🏖️', title: '海滨风光', description: '享受阳光沙滩，尽情放松身心' },
      { icon: '🤿', title: '水上活动', description: '潜水、冲浪等丰富水上项目' }
    ]
  } else if (destination.value.type === 'mountain') {
    return [
      ...baseHighlights,
      { icon: '⛰️', title: '山地探险', description: '徒步登山，探索壮美自然景观' },
      { icon: '🎿', title: '户外运动', description: '滑雪、攀岩等刺激户外项目' }
    ]
  } else {
    return [
      ...baseHighlights,
      { icon: '🏙️', title: '都市风情', description: '感受现代都市的繁华与魅力' },
      { icon: '🎭', title: '文化体验', description: '博物馆、艺术展等文化活动' }
    ]
  }
})

const included = computed(() => {
  return [
    '往返机票',
    '酒店住宿',
    '旅游保险',
    '景点门票',
    '中文导游',
    '部分餐食',
    '机场接送',
    '24小时客服'
  ]
})

const getTypeLabel = (type: string) => {
  const labels = {
    beach: '🏖️ 海滨',
    mountain: '⛰️ 山地',
    city: '🏙️ 城市'
  }
  return labels[type as keyof typeof labels] || type
}

const goBack = () => {
  router.push('/')
}
</script>

<style scoped>
</style>
