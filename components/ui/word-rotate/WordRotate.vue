<script setup lang="ts">
import { Motion, AnimatePresence } from "motion-v";
import { onMounted, onUnmounted, ref } from "vue";

interface Props {
  words: string[];
  duration?: number;
  framerProps?: any;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  duration: 2500,
  framerProps: () => ({
    initial: { opacity: 0, y: -20, filter: "blur(10px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: 20, filter: "blur(10px)" },
    transition: { duration: 0.25, ease: "easeOut" },
  }),
});

const index = ref(0);
let interval: any;

onMounted(() => {
  interval = setInterval(() => {
    index.value = (index.value + 1) % props.words.length;
  }, props.duration);
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
});
</script>

<template>
  <div class="overflow-hidden" :class="props.class">
    <AnimatePresence mode="wait">
      <Motion
        :key="words[index]"
        as="span"
        class="inline-block"
        :initial="framerProps.initial"
        :animate="framerProps.animate"
        :exit="framerProps.exit"
        :transition="framerProps.transition"
      >
        {{ words[index] }}
      </Motion>
    </AnimatePresence>
  </div>
</template>
