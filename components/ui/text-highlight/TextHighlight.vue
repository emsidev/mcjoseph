<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed } from "vue";

interface Props {
  delay?: number;
  duration?: number;
  class?: HTMLAttributes["class"];
  textEndColor?: string;
  highlightColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  delay: 0,
  duration: 2000,
  textEndColor: "inherit",
  highlightColor: "rgba(14, 165, 233, 0.35)",
});

const delayMs = computed(() => `${props.delay}ms`);
const durationMs = computed(() => `${props.duration}ms`);
</script>

<template>
  <span class="relative inline-block px-1 group highlight-container" :class="[props.class]">
    <span class="relative z-10 text-element">
      <slot />
    </span>
  </span>
</template>

<style scoped>
.highlight-container::before {
  content: "";
  position: absolute;
  top: 15%;
  left: -2px;
  right: -2px;
  bottom: 8%;
  background-color: v-bind(highlightColor);
  z-index: 0;
  transform: skewX(-12deg) scaleX(0);
  transform-origin: left;
  animation: highlight-expand v-bind(durationMs) cubic-bezier(0.23, 1, 0.32, 1) v-bind(delayMs) forwards;
  pointer-events: none;
  /* Organic edges simulation */
  clip-path: polygon(
    0% 5%, 
    100% 0%, 
    98% 95%, 
    2% 100%
  );
}

@keyframes highlight-expand {
  to {
    transform: skewX(-12deg) scaleX(1);
  }
}

.text-element {
  animation: text-color-sync v-bind(durationMs) ease-out v-bind(delayMs) forwards;
}

@keyframes text-color-sync {
  to {
    color: v-bind(textEndColor);
  }
}
</style>
