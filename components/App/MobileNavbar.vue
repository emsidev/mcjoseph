<script setup lang="ts">
import { Motion } from "motion-v";

const mainItems = [
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
];

const contactItem = { name: "Contact", shortName: "Contact", path: "/contact", icon: "solar:chat-round-dots-bold" };
</script>

<template>
  <div
    class="fixed bottom-0 left-0 z-50 w-full border-t border-gray-200 bg-white/80 pb-safe backdrop-blur-md dark:border-gray-800 dark:bg-black/80 md:hidden">
    <div class="flex h-16 items-center justify-around px-2 relative">
      <!-- Left Items -->
      <template v-for="item in mainItems.slice(0, 2)" :key="item.path">
        <Motion :initial="{ scale: 1 }" :whileTap="{ scale: 0.95 }"
          :transition="{ type: 'spring', stiffness: 400, damping: 17 }">
          <ULink :to="item.path"
            class="flex flex-col items-center justify-center gap-1 text-gray-500 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 p-2 rounded-xl w-14"
            active-class="text-primary-600 dark:text-primary-400 bg-gray-100/50 dark:bg-white/5">
            <Icon :name="item.icon" class="h-6 w-6" />
            <span class="text-[10px] font-medium">{{ item.shortName || item.name }}</span>
          </ULink>
        </Motion>
      </template>

      <!-- Center CTA -->
      <div class="-mt-8">
        <Motion :initial="{ scale: 1 }" :whileTap="{ scale: 0.9 }"
          :transition="{ type: 'spring', stiffness: 400, damping: 17 }">
          <ULink :to="contactItem.path"
            class="flex h-14 w-14 items-center justify-center rounded-full bg-primary-500 text-white shadow-lg shadow-primary-500/40 transition-transform dark:bg-primary-500 dark:text-white"
            active-class="icon-scale-110">
            <Icon :name="contactItem.icon" class="h-8 w-8" />
            <span class="sr-only">{{ contactItem.name }}</span>
          </ULink>
        </Motion>
      </div>

      <!-- Right Items -->
      <template v-for="item in mainItems.slice(2, 4)" :key="item.path">
        <Motion :initial="{ scale: 1 }" :whileTap="{ scale: 0.95 }"
          :transition="{ type: 'spring', stiffness: 400, damping: 17 }">
          <ULink :to="item.path"
            class="flex flex-col items-center justify-center gap-1 text-gray-500 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 p-2 rounded-xl w-14"
            active-class="text-primary-600 dark:text-primary-400 bg-gray-100/50 dark:bg-white/5">
            <Icon :name="item.icon" class="h-6 w-6" />
            <span class="text-[10px] font-medium">{{ item.shortName || item.name }}</span>
          </ULink>
        </Motion>
      </template>
    </div>
  </div>
</template>

<style scoped>
/* Support for safe area inset on newer iPhones */
.pb-safe {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
