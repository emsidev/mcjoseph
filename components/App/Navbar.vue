<template>
  <div ref="headerRef" :style="styles" class="fixed top-0 w-full z-50 flex justify-center px-4">
    <div class="flex items-center gap-4">
      <UiDock
        :icon-size="40"
        :icon-magnification="56"
        :icon-distance="100"
        direction="middle"
        class="mt-6 h-14 gap-1 rounded-full border bg-white/80 px-3 py-2 backdrop-blur-md dark:border-white/10 dark:bg-black/50"
      >
        <template v-for="item in items" :key="item.path">
          <UiDockIcon class="bg-transparent">
            <UTooltip :text="item.name" :ui="{ popper: { strategy: 'absolute' } }">
              <ULink
                :to="item.path"
                class="flex items-center justify-center rounded-full text-gray-600 transition-colors hover:text-primary-600 hover:w-14 hover:h-14 dark:text-gray-400 dark:hover:text-primary-400 w-14 h-14"
                active-class="text-primary-600 dark:text-primary-400 bg-gray-100 dark:bg-white/10 w-9 h-9"
              >
                <Icon
                  aria-hidden="true"
                  :name="item.icon"
                  class="w-[var(--dock-icon-size,20px)] h-[var(--dock-icon-size,20px)]"
                />
                <span class="sr-only">{{ item.name }}</span>
              </ULink>
            </UTooltip>
          </UiDockIcon>
        </template>

        <!-- Separator -->
        <div class="mx-1 h-8 w-px bg-gray-300 dark:bg-gray-700"></div>

        <UiDockIcon class="bg-transparent">
          <AppThemeToggle />
        </UiDockIcon>
      </UiDock>

      <div class="hidden md:block mt-6">
        <AppBookCallButton class="h-11 shadow-lg shadow-sky-500/20" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFixedHeader } from 'vue-use-fixed-header'
const headerRef = ref(null);
const { styles } = useFixedHeader(headerRef);

const items = [
  { name: "Home", path: "/", icon: "solar:home-smile-outline" },
  {
    name: "Projects",
    path: "/projects",
    icon: "solar:code-square-outline",
  },
  {
    name: "Articles",
    path: "/articles",
    icon: "solar:document-text-outline",
  },
  {
    name: "Interesting facts about me",
    path: "/facts",
    icon: "solar:star-outline",
  },
  {
    name: "Bookmarks",
    path: "/bookmarks",
    icon: "solar:bookmark-outline",
  },
  { name: "Contact", path: "/contact", icon: "solar:letter-outline" },
];
</script>
