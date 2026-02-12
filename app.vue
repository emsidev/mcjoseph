<script setup lang="ts">
import { useFixedHeader } from 'vue-use-fixed-header'
import { ref } from 'vue'
import { Motion } from 'motion-v'

const themeToggleRef = ref(null)
const { styles } = useFixedHeader(themeToggleRef)

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Mc Joseph Agbanlog` : 'Mc Joseph Agbanlog - Fullstack Developer';
  }
})

useSeoMeta({
  ogImage: '/avatar.png',
  twitterTitle: 'Mc Joseph Agbanlog',
  twitterDescription: 'Fullstack Developer from Quezon City, Philippines.',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <NuxtLoadingIndicator color="#0ea5e9" />
  <AppNavbar />
  <AppMobileNavbar />
  <div ref="themeToggleRef" :style="styles"
    class="fixed top-0 right-0 md:p-7 p-4 flex items-center justify-center gap-3 z-50">

    <UTooltip text="Bookmarks" :ui="{ popper: { strategy: 'absolute' } }">
      <Motion :initial="{ scale: 1, y: 0 }" :whileHover="{ scale: 1.1, y: -2 }" :whileTap="{ scale: 0.85, rotate: 15 }"
        :transition="{ type: 'spring', stiffness: 400, damping: 10 }">
        <ULink to="/bookmarks"
          class="flex items-center md:hidden justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-md border border-gray-200 dark:border-white/10 shadow-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          active-class="text-primary-600 dark:text-primary-400">
          <Icon name="solar:bookmark-outline" class="h-5 w-5 md:h-6 md:w-6" />
        </ULink>
      </Motion>
    </UTooltip>

    <div
      class="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-md border border-gray-200 dark:border-white/10 shadow-sm transition-colors">
      <AppThemeToggle />
    </div>
  </div>
  <div class="h-10 md:h-32"></div>
  <UContainer class="pb-20 md:pb-0">
    <NuxtPage />
    <UNotifications />
  </UContainer>
  <div class="h-10 md:h-32"></div>
  <AppFooter class="mb-16 md:mb-0" />
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(5px);
}
</style>
