<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
    <!-- 页面标题 -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-slate-800 mb-2">预订行程</h1>
      <p class="text-slate-600">填写您的旅行信息，我们将为您安排完美的行程</p>
    </div>

    <div class="grid md:grid-cols-3 gap-6">
      <!-- 预订表单 -->
      <div class="md:col-span-2 bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-slate-100">
        <div class="flex items-center gap-2 mb-6">
          <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </div>
          <h2 class="text-2xl font-semibold text-slate-800">预订信息</h2>
        </div>

        <form @submit.prevent="onSubmit" class="space-y-6">
          <!-- 目的地和日期 -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">📍 目的地</label>
              <select 
                v-model="form.destination" 
                class="border-2 border-slate-200 rounded-lg px-4 py-3 w-full focus:border-primary focus:outline-none transition-colors bg-white"
                required
              >
                <option disabled value="">请选择目的地</option>
                <option value="bali">🏖️ 巴厘岛</option>
                <option value="alps">⛰️ 阿尔卑斯山</option>
                <option value="tokyo">🏙️ 东京</option>
                <option value="maldives">🏖️ 马尔代夫</option>
                <option value="paris">🏙️ 巴黎</option>
                <option value="santorini">🏖️ 圣托里尼</option>
                <option value="swiss">⛰️ 瑞士</option>
                <option value="dubai">🏙️ 迪拜</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">👥 人数</label>
              <input 
                type="number" 
                min="1" 
                max="20"
                v-model.number="form.people" 
                class="border-2 border-slate-200 rounded-lg px-4 py-3 w-full focus:border-primary focus:outline-none transition-colors" 
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">📅 出发日期</label>
              <input 
                type="date" 
                v-model="form.startDate" 
                class="border-2 border-slate-200 rounded-lg px-4 py-3 w-full focus:border-primary focus:outline-none transition-colors" 
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">📅 返回日期</label>
              <input 
                type="date" 
                v-model="form.endDate" 
                class="border-2 border-slate-200 rounded-lg px-4 py-3 w-full focus:border-primary focus:outline-none transition-colors" 
                required
              />
            </div>
          </div>

          <!-- 房间类型 -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-3">🛏️ 房间类型</label>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label 
                v-for="room in roomTypes" 
                :key="room.value"
                class="relative flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all"
                :class="form.roomType === room.value ? 'border-primary bg-primary/5' : 'border-slate-200 hover:border-primary/50'"
              >
                <input 
                  type="radio" 
                  v-model="form.roomType" 
                  :value="room.value"
                  class="w-4 h-4 text-primary"
                />
                <div class="flex-1">
                  <div class="font-medium text-slate-800">{{ room.label }}</div>
                  <div class="text-xs text-slate-500">+¥{{ room.price }}</div>
                </div>
              </label>
            </div>
          </div>

          <!-- 额外服务 -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-3">✨ 额外服务（可多选）</label>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label 
                v-for="service in services" 
                :key="service.value"
                class="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all"
                :class="form.services.includes(service.value) ? 'border-accent bg-accent/5' : 'border-slate-200 hover:border-accent/50'"
              >
                <input 
                  type="checkbox" 
                  v-model="form.services" 
                  :value="service.value"
                  class="w-4 h-4 text-accent rounded"
                />
                <div class="flex-1">
                  <div class="font-medium text-slate-800">{{ service.icon }} {{ service.label }}</div>
                  <div class="text-xs text-slate-500">+¥{{ service.price }}/人</div>
                </div>
              </label>
            </div>
          </div>

          <!-- 联系信息 -->
          <div class="border-t pt-6">
            <h3 class="text-lg font-semibold text-slate-800 mb-4">联系信息</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2">姓名</label>
                <input 
                  type="text" 
                  v-model="form.name"
                  class="border-2 border-slate-200 rounded-lg px-4 py-3 w-full focus:border-primary focus:outline-none transition-colors" 
                  placeholder="请输入您的姓名"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2">手机号</label>
                <input 
                  type="tel" 
                  v-model="form.phone"
                  class="border-2 border-slate-200 rounded-lg px-4 py-3 w-full focus:border-primary focus:outline-none transition-colors" 
                  placeholder="请输入您的手机号"
                  required
                />
              </div>
            </div>
          </div>

          <!-- 备注 -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">💬 特殊要求（可选）</label>
            <textarea 
              v-model="form.note" 
              rows="4" 
              class="border-2 border-slate-200 rounded-lg px-4 py-3 w-full focus:border-primary focus:outline-none transition-colors resize-none" 
              placeholder="请告诉我们您的特殊需求..."
            />
          </div>

          <!-- 提交按钮 -->
          <div class="pt-4">
            <button 
              type="submit"
              class="w-full bg-gradient-to-r from-primary to-accent text-white rounded-lg px-6 py-4 font-semibold text-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              确认预订
            </button>
          </div>
        </form>
      </div>

      <!-- 价格明细 -->
      <aside class="h-fit">
        <div class="bg-gradient-to-br from-primary to-accent text-white rounded-2xl shadow-xl p-6 sticky top-24">
          <div class="flex items-center gap-2 mb-6">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 class="text-xl font-bold">价格明细</h3>
          </div>

          <div class="space-y-3 mb-6">
            <div class="flex justify-between items-center text-white/90">
              <span>基础价格</span>
              <span class="font-semibold">¥{{ basePrice.toLocaleString() }}</span>
            </div>
            <div class="flex justify-between items-center text-white/90">
              <span>房型加价</span>
              <span class="font-semibold">¥{{ roomSurcharge.toLocaleString() }}</span>
            </div>
            <div class="flex justify-between items-center text-white/90">
              <span>服务加价</span>
              <span class="font-semibold">¥{{ servicesSurcharge.toLocaleString() }}</span>
            </div>
            <div class="flex justify-between items-center text-white/90">
              <span>行程天数</span>
              <span class="font-semibold">{{ tripDays }} 天</span>
            </div>
          </div>

          <div class="border-t border-white/20 pt-4 mb-4">
            <div class="flex justify-between items-center">
              <span class="text-lg">总计</span>
              <div class="text-right">
                <div class="text-3xl font-bold">¥{{ totalPrice.toLocaleString() }}</div>
                <div class="text-xs text-white/70">已含税费</div>
              </div>
            </div>
          </div>

          <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-sm space-y-2">
            <div class="flex items-start gap-2">
              <svg class="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>免费取消</span>
            </div>
            <div class="flex items-start gap-2">
              <svg class="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>24小时客服</span>
            </div>
            <div class="flex items-start gap-2">
              <svg class="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>最优价格保证</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, watchEffect } from 'vue'
import dayjs from 'dayjs'

type RoomType = 'standard' | 'deluxe' | 'suite'

const basePriceMap: Record<string, number> = {
  bali: 1999,
  alps: 2599,
  tokyo: 2899,
  maldives: 3999,
  paris: 3299,
  santorini: 3599,
  swiss: 4299,
  dubai: 3899
}

const roomTypes = [
  { value: 'standard', label: '标准间', price: 0 },
  { value: 'deluxe', label: '豪华间', price: 300 },
  { value: 'suite', label: '套房', price: 800 }
]

const services = [
  { value: 'breakfast', label: '早餐', icon: '🍳', price: 100 },
  { value: 'pickup', label: '接机', icon: '✈️', price: 200 },
  { value: 'guide', label: '导游', icon: '🗺️', price: 150 }
]

const form = reactive({
  destination: '',
  startDate: dayjs().add(7, 'day').format('YYYY-MM-DD'),
  endDate: dayjs().add(14, 'day').format('YYYY-MM-DD'),
  people: 2,
  roomType: 'standard' as RoomType,
  services: [] as string[],
  name: '',
  phone: '',
  note: ''
})

const basePrice = computed(() => (form.destination ? basePriceMap[form.destination] : 0) * form.people)

const roomSurcharge = computed(() => {
  const room = roomTypes.find(r => r.value === form.roomType)
  return room ? room.price * form.people : 0
})

const servicesSurcharge = computed(() => {
  return form.services.reduce((total, serviceValue) => {
    const service = services.find(s => s.value === serviceValue)
    return total + (service ? service.price * form.people : 0)
  }, 0)
})

const tripDays = computed(() => {
  if (!form.startDate || !form.endDate) return 0
  const start = dayjs(form.startDate)
  const end = dayjs(form.endDate)
  return Math.max(0, end.diff(start, 'day'))
})

const totalPrice = computed(() => basePrice.value + roomSurcharge.value + servicesSurcharge.value)

function onSubmit() {
  const message = `
预订成功！

目的地：${form.destination}
联系人：${form.name}
电话：${form.phone}
出行人数：${form.people}人
行程：${form.startDate} 至 ${form.endDate}（${tripDays.value}天）
总价：¥${totalPrice.value.toLocaleString()}

我们将尽快与您联系确认行程！
  `.trim()
  
  alert(message)
}

// If navigated from Home with dest query, prefill
watchEffect(() => {
  const params = new URLSearchParams(location.search)
  const dest = params.get('dest')
  if (dest && Object.keys(basePriceMap).includes(dest)) {
    form.destination = dest
  }
})
</script>


