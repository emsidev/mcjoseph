<script setup>
import { Motion } from "motion-v";

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
    <Motion :initial="{ scale: 1, rotate: 0 }" :whileHover="{ scale: 1.1, rotate: 5 }"
      :whileTap="{ scale: 0.85, rotate: -15 }" :transition="{ type: 'spring', stiffness: 400, damping: 10 }">
      <button
        class="relative flex h-full w-full items-center justify-center rounded-full text-gray-600 transition-colors hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
        @click="isDark = !isDark">
        <ClientOnly>
          <Transition name="theme-icon" mode="out-in">
            <Icon :key="isDark ? 'sun' : 'moon'" aria-hidden="true"
              :name="isDark ? 'solar:sun-2-outline' : 'solar:moon-outline'"
              style="width: var(--dock-icon-size, 20px); height: var(--dock-icon-size, 20px);" />
          </Transition>
        </ClientOnly>
        <span class="sr-only">Toggle theme</span>
      </button>
    </Motion>
  </UTooltip>
</template>

<style scoped>
.theme-icon-enter-active,
.theme-icon-leave-active {
  transition: all 0.3s ease;
}

.theme-icon-enter-from {
  opacity: 0;
  transform: rotate(-180deg) scale(0.5);
}

.theme-icon-leave-to {
  opacity: 0;
  transform: rotate(180deg) scale(0.5);
}

.theme-icon-enter-to,
.theme-icon-leave-from {
  opacity: 1;
  transform: rotate(0deg) scale(1);
}
</style>
