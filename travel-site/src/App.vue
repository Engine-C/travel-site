<template>
  <div class="min-h-screen flex flex-col bg-slate-50">
    <header class="bg-gradient-to-r from-primary to-accent text-white shadow-lg sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <RouterLink to="/" class="flex items-center gap-2 group">
          <svg class="w-8 h-8 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h1 class="text-xl sm:text-2xl font-bold">探索世界</h1>
        </RouterLink>
        <nav class="flex items-center gap-2 sm:gap-6">
          <RouterLink 
            class="px-3 py-2 rounded-lg hover:bg-white/10 transition-colors font-medium" 
            active-class="bg-white/20"
            to="/"
          >
            主页
          </RouterLink>
          <RouterLink 
            class="px-3 py-2 rounded-lg hover:bg-white/10 transition-colors font-medium" 
            active-class="bg-white/20"
            to="/booking"
          >
            预订
          </RouterLink>
        </nav>
      </div>
    </header>
    <main class="flex-1">
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
    <footer class="bg-gradient-to-r from-slate-800 to-slate-700 text-white mt-12">
      <div class="max-w-7xl mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="font-semibold text-lg mb-3">关于我们</h3>
            <p class="text-slate-300 text-sm">专业的旅游服务平台，为您提供全球精选目的地和贴心的旅行规划。</p>
          </div>
          <div>
            <h3 class="font-semibold text-lg mb-3">联系方式</h3>
            <p class="text-slate-300 text-sm">电话：400-123-4567</p>
            <p class="text-slate-300 text-sm">邮箱：info@travel.com</p>
          </div>
          <div>
            <h3 class="font-semibold text-lg mb-3">关注我们</h3>
            <div class="flex gap-4">
              <a href="#" class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <span class="text-sm">微信</span>
              </a>
              <a href="#" class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <span class="text-sm">微博</span>
              </a>
            </div>
          </div>
        </div>
        <div class="border-t border-slate-600 mt-6 pt-6 text-center text-slate-400 text-sm">
          © 2025 探索世界旅游网. All rights reserved.
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>


