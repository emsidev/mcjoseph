<template>
  <div class="fixed bottom-0 left-0 z-50 w-full border-t border-gray-200 bg-white/80 pb-safe backdrop-blur-md dark:border-gray-800 dark:bg-black/80 md:hidden">
    <div class="flex h-16 items-center justify-around px-2">
      <template v-for="item in items" :key="item.path">
        <ULink
          :to="item.path"
          class="flex flex-col items-center justify-center gap-1 text-gray-500 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 p-2 rounded-xl"
          active-class="text-primary-600 dark:text-primary-400 bg-gray-100/50 dark:bg-white/5"
        >
          <Icon
            :name="item.icon"
            class="h-6 w-6"
          />
          <span class="text-[10px] font-medium">{{ item.shortName || item.name }}</span>
        </ULink>
      </template>

      <!-- Theme Toggle specific for mobile -->
      <div class="flex flex-col items-center justify-center gap-1 p-2 text-gray-500 dark:text-gray-400">
        <AppThemeToggle />
        <span class="text-[10px] font-medium">Theme</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const items = [
  { name: "Home", shortName: "Home", path: "/", icon: "solar:home-smile-outline" },
  {
    name: "Projects",
    shortName: "Projects", 
    path: "/projects",
    icon: "solar:code-square-outline",
  },
  {
    name: "Articles",
    shortName: "Articles",
    path: "/articles",
    icon: "solar:document-text-outline",
  },
  {
    name: "Facts",
    shortName: "Facts",
    path: "/facts",
    icon: "solar:star-outline",
  },
  {
    name: "Bookmarks",
    shortName: "Marks",
    path: "/bookmarks",
    icon: "solar:bookmark-outline",
  },
  { name: "Contact", shortName: "Contact", path: "/contact", icon: "solar:letter-outline" },
];
</script>

<style scoped>
/* Support for safe area inset on newer iPhones */
.pb-safe {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
