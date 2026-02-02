<template>
  <div>
    <h2 class="uppercase text-xs font-semibold text-gray-400 mb-4">FIND ME ON</h2>
    <div class="space-y-5">
      <NuxtLink
        v-for="link in links"
        :key="link.icon"
        :to="link.url"
        target="_blank"
        external
        class="flex items-center gap-4 dark:hover:text-gray-300 group"
      >
        <span class="text-sm">
          {{ link.name }}
        </span>
        <div
          class="flex-1 border-b border-dashed border-gray-300 dark:border-gray-800 group-hover:border-gray-700"
        ></div>
        <Icon :name="link.icon" class="w-6 h-6"></Icon>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
type Link = {
  name: string;
  url: string;
  icon: string;
};
const links: Link[] = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/emsijusep",
    icon: "mdi:facebook",
  },
  {
    name: "GitHub",
    url: "https://github.com/emsijoseph",
    icon: "mdi:github",
  },
  {
    name: "Linkedin",
    url: "https://www.linkedin.com/in/mcagbanlog",
    icon: "mdi:linkedin",
  }
];
</script>
