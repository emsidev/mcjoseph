<script setup>
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
</script>

<template>
  <UTooltip text="Toggle theme" :ui="{ popper: { strategy: 'absolute' } }">
    <button
      class="relative flex h-full w-full items-center justify-center rounded-full text-gray-600 transition hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
      @click="isDark = !isDark"
    >
      <Icon
        aria-hidden="true"
        :name="isDark ? 'solar:sun-2-outline' : 'solar:moon-outline'"
        style="width: var(--dock-icon-size, 20px); height: var(--dock-icon-size, 20px);"
      />
      <span class="sr-only">Toggle theme</span>
    </button>
  </UTooltip>
</template>
