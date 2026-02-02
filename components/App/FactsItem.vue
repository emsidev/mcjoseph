<template>
  <li>
    <NuxtLink
      v-if="item.url"
      :to="item.url"
      class="group"
      target="_blank"
      external
    >
      <p
        class="text-base font-semibold text-gray-700 dark:text-gray-300 group-hover:text-primary-600"
      >
        {{ item.name }}
      </p>
      <p class="text-sm text-gray-500" v-html="item.description"></p>
    </NuxtLink>
    <div v-else class="group">
      <p
        class="text-base font-semibold text-gray-700 dark:text-gray-300"
      >
        {{ item.name }}
      </p>
      <p class="text-sm text-gray-500" v-html="item.description"></p>
    </div>
  </li>
</template>

<script setup>
defineProps({
  item: Object,
  required: true,
});
</script>
