<script setup lang="ts">
import type { Options as ConfettiOptions } from "canvas-confetti";
import confetti from "canvas-confetti";
import { inject, ref } from "vue";

interface ConfettiButtonProps {
  options?: ConfettiOptions & { canvas?: HTMLCanvasElement };
  class?: string;
}

const props = defineProps<ConfettiButtonProps>();
const confettiContext = inject<{ fire: (opts?: ConfettiOptions) => void }>("ConfettiContext");

const containerRef = ref<HTMLElement | null>(null);

// Handle manual fire
function fire(opts: ConfettiOptions = {}) {
  if (!containerRef.value) return;

  const rect = containerRef.value.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  confetti({
    ...props.options,
    ...opts,
    origin: {
      x: x / window.innerWidth,
      y: y / window.innerHeight,
    },
  });

  if (confettiContext) {
    confettiContext.fire({ ...props.options, ...opts });
  }
}

// Handle click event (optional, for manual firing we don't always need this)
function handleClick() {
  // fire();
}

defineExpose({
  fire,
});
</script>

<template>
  <div ref="containerRef" :class="props.class || 'inline-block'" @click="handleClick">
    <slot />
  </div>
</template>
