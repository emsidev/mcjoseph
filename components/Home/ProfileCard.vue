<template>
  <div
    class="w-full max-w-80 rounded-[24px] bg-white p-4 sm:p-5 shadow-2xl border border-gray-200 dark:bg-black dark:border-white/40">
    <!-- Top Row: Avatar and Action -->
    <div class="flex items-start justify-between w-full">
      <NuxtImg src="/avatar.png" alt="Mc Joseph Agbanlog"
        class="h-20 w-20 flex-shrink-0 rounded-full bg-gray-100 object-cover dark:bg-gray-800" placeholder
        format="webp" />
    </div>

    <!-- User Details -->
    <div class="mt-3 space-y-0.5">
      <div class="flex items-center gap-1 flex-wrap">
        <h3 class="text-lg sm:text-xl font-extrabold tracking-tight text-gray-900 dark:text-white break-words">Mc Joseph
          Agbanlog</h3>
        <UIcon name="i-heroicons-check-badge-20-solid" class="h-5 w-5 flex-shrink-0 text-sky-500" />
      </div>
      <p class="text-sm sm:text-[15px] text-gray-500 dark:text-zinc-500">@emsidev</p>
    </div>

    <!-- Bio -->
    <p class="mt-3 text-sm sm:text-[15px] leading-normal text-gray-800 dark:text-gray-200">
      Fullstack Developer building with <span class="text-sky-500">ASP.NET</span>, <span
        class="text-sky-500">React</span>, and <span class="text-sky-500">Nuxt</span>. UI/UX Enthusiast. AI integration
      explorer.
    </p>

    <!-- Stats -->
    <div class="mt-4 flex gap-3 sm:gap-4 text-sm sm:text-[15px] text-gray-900 dark:text-white">
      <div class="flex gap-1">
        <span class="font-bold">482</span>
        <span class="text-gray-500 dark:text-zinc-500">Following</span>
      </div>
      <div class="flex gap-1">
        <span class="font-bold">1.2K</span>
        <span class="text-gray-500 dark:text-zinc-500">Followers</span>
      </div>
    </div>

    <!-- Book Call Button -->
    <div class="mt-4 sm:mt-5">
      <AppBookCallButton
        class="w-full items-center justify-center rounded-full font-bold hover:opacity-90 transition-opacity text-sm sm:text-base" />
    </div>

    <!-- Bottom Action: Profile Summary -->
    <div class="mt-3">
      <button
        class="flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 py-2 sm:py-2.5 px-3 sm:px-4 text-sm sm:text-[15px] font-bold text-gray-900 transition-colors hover:bg-gray-50 dark:border-zinc-800 dark:text-white dark:hover:bg-zinc-900">
        <UIcon name="i-heroicons-sparkles" class="h-5 w-5 flex-shrink-0" />
        <span>Profile Summary</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// No extra logic needed
</script>
