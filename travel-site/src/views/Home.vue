<template>
  <div>
    <!-- Hero Section -->
    <section class="relative overflow-hidden">
      <div class="h-[400px] sm:h-[500px] md:h-[600px] bg-gradient-to-br from-primary via-accent to-primary text-white flex items-center relative">
        <!-- 装饰性背景元素 -->
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div class="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <h2 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 animate-fade-in">发现你的下一站</h2>
          <p class="text-lg sm:text-xl text-white/90 max-w-2xl mb-6 leading-relaxed">
            精选海滨、山地、城市等热门目的地，开启一段难忘的旅程
          </p>
          <div class="flex flex-wrap gap-4">
            <span class="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">🏖️ 海滨度假</span>
            <span class="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">⛰️ 山地探险</span>
            <span class="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">🏙️ 都市风光</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Search Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 -mt-12 relative z-20 mb-12">
      <div class="bg-white rounded-2xl shadow-2xl p-6 md:p-8 border border-slate-100">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="relative">
            <label class="block text-xs font-medium text-slate-600 mb-2">目的地搜索</label>
            <input 
              v-model="query" 
              class="border-2 border-slate-200 rounded-lg px-4 py-3 w-full focus:border-primary focus:outline-none transition-colors" 
              placeholder="搜索目的地" 
            />
          </div>
          <div class="relative">
            <label class="block text-xs font-medium text-slate-600 mb-2">旅行类型</label>
            <select 
              v-model="selectedType" 
              class="border-2 border-slate-200 rounded-lg px-4 py-3 w-full focus:border-primary focus:outline-none transition-colors appearance-none bg-white"
            >
              <option value="">全部类型</option>
              <option value="beach">🏖️ 海滨</option>
              <option value="mountain">⛰️ 山地</option>
              <option value="city">🏙️ 城市</option>
            </select>
          </div>
          <div class="relative">
            <label class="block text-xs font-medium text-slate-600 mb-2">预算上限</label>
            <input 
              type="number" 
              v-model.number="maxPrice" 
              class="border-2 border-slate-200 rounded-lg px-4 py-3 w-full focus:border-primary focus:outline-none transition-colors" 
              placeholder="最高价格" 
            />
          </div>
          <div class="flex items-end">
            <button class="bg-gradient-to-r from-primary to-accent text-white rounded-lg px-6 py-3 w-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200">
              🔍 搜索
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Destinations Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h3 class="text-2xl sm:text-3xl font-bold text-slate-800">热门目的地</h3>
          <p class="text-slate-600 mt-1">为你精选的旅行圣地</p>
        </div>
        <span class="text-sm text-slate-500">共 {{ filteredDestinations.length }} 个目的地</span>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <article 
          v-for="d in filteredDestinations" 
          :key="d.id" 
          class="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2"
        >
          <div class="relative overflow-hidden h-52">
            <img 
              :src="d.image" 
              :alt="d.name" 
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
            />
            <div class="absolute top-3 right-3 bg-accent text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
              {{ getTypeLabel(d.type) }}
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <div class="p-5">
            <h4 class="font-bold text-lg text-slate-800 mb-2">{{ d.name }}</h4>
            <p class="text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">{{ d.description }}</p>
            <div class="flex items-center justify-between pt-3 border-t border-slate-100">
              <div>
                <span class="text-xs text-slate-500">起价</span>
                <div class="text-primary font-bold text-xl">¥{{ d.price.toLocaleString() }}</div>
              </div>
              <RouterLink 
                class="flex items-center gap-1 text-accent hover:text-accent/80 font-semibold text-sm group-hover:gap-2 transition-all" 
                :to="{ name: 'booking', query: { dest: d.id } }"
              >
                查看详情
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </RouterLink>
            </div>
          </div>
        </article>
      </div>

      <!-- Empty State -->
      <div v-if="filteredDestinations.length === 0" class="text-center py-16">
        <div class="text-6xl mb-4">🔍</div>
        <h4 class="text-xl font-semibold text-slate-700 mb-2">未找到匹配的目的地</h4>
        <p class="text-slate-500">试试调整搜索条件</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'

type Destination = {
  id: string
  name: string
  description: string
  price: number
  type: 'beach' | 'mountain' | 'city'
  image: string
}

const destinations = ref<Destination[]>([
  { id: 'bali', name: '巴厘岛', description: '阳光海滩与文化之旅，体验热带风情和当地传统', price: 1999, type: 'beach', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop' },
  { id: 'alps', name: '阿尔卑斯山', description: '雪山与徒步探险，感受大自然的壮美与宁静', price: 2599, type: 'mountain', image: 'https://images.unsplash.com/photo-1504194104404-433180773017?q=80&w=1200&auto=format&fit=crop' },
  { id: 'tokyo', name: '东京', description: '现代都市与传统文化完美融合的国际大都会', price: 2899, type: 'city', image: 'https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=1200&auto=format&fit=crop' },
  { id: 'maldives', name: '马尔代夫', description: '度假天堂蓝色海域，享受顶级海岛度假体验', price: 3999, type: 'beach', image: 'https://images.unsplash.com/photo-1505764706515-aa95265c5abc?q=80&w=1200&auto=format&fit=crop' },
  { id: 'paris', name: '巴黎', description: '浪漫之都，艺术与时尚的完美结合', price: 3299, type: 'city', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop' },
  { id: 'santorini', name: '圣托里尼', description: '爱琴海明珠，蓝白建筑与绝美日落', price: 3599, type: 'beach', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200&auto=format&fit=crop' },
  { id: 'swiss', name: '瑞士', description: '雪山湖泊，童话般的自然风光', price: 4299, type: 'mountain', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop' },
  { id: 'dubai', name: '迪拜', description: '沙漠中的奇迹之城，奢华与现代的象征', price: 3899, type: 'city', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop' }
])

const query = ref('')
const selectedType = ref('')
const maxPrice = ref<number | null>(null)

const filteredDestinations = computed(() => {
  return destinations.value.filter(d => {
    const matchQuery = !query.value || d.name.includes(query.value)
    const matchType = !selectedType.value || d.type === selectedType.value
    const matchPrice = maxPrice.value == null || d.price <= maxPrice.value
    return matchQuery && matchType && matchPrice
  })
})

const getTypeLabel = (type: string) => {
  const labels = {
    beach: '🏖️ 海滨',
    mountain: '⛰️ 山地',
    city: '🏙️ 城市'
  }
  return labels[type as keyof typeof labels] || type
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>


