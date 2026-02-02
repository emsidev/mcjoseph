<template>
  <div ref="headerRef" :style="styles" class="fixed top-0 w-full z-50 flex justify-center">
    <nav class="mx-auto mt-6 flex items-center justify-center gap-1 rounded-full border bg-white/10 px-4 py-2 backdrop-blur-md dark:border-white/10 dark:bg-black/10">
      <template v-for="item in items" :key="item.path">
        <UTooltip :text="item.name" :ui="{ popper: { strategy: 'absolute' } }">
          <ULink
            :to="item.path"
            class="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
            active-class="text-primary-600 dark:text-primary-400 bg-gray-100 dark:bg-white/10"
          >
            <Icon
              aria-hidden="true"
              :name="item.icon"
              class="h-5 w-5"
            />
            <span class="sr-only">{{ item.name }}</span>
          </ULink>
        </UTooltip>
      </template>

      <!-- Separator -->
      <div class="mx-2 h-8 w-px bg-gray-200 dark:bg-gray-800"></div>

      <AppThemeToggle />
    </nav>
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
    icon: "solar:folder-with-files-outline",
  },
   {
    name: "Articles",
    path: "/articles",
    icon: "solar:document-add-outline",
  },
  {
    name: "Interesting facts about me",
    path: "/facts",
    icon: "solar:document-add-outline",
  },
  {
    name: "Bookmarks",
    path: "/bookmarks",
    icon: "solar:document-add-outline",
  },
  { name: "Contact", path: "/contact", icon: "heroicons:beaker" },

];
</script>
