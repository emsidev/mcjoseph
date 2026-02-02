<script setup lang="ts">
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
  <div class="h-32"></div>
  <UContainer>
    <NuxtPage />
    <UNotifications />
  </UContainer>
  <div class="h-32"></div>
  <AppFooter />
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
