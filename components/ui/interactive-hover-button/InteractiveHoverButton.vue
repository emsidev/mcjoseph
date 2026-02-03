<script lang="ts" setup>
import { ref } from "vue";

interface Props {
  text?: string;
  class?: string;
  disabled?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  text: "Button",
  disabled: false,
});

const buttonRef = ref<HTMLButtonElement>();
</script>

<template>
  <button
    ref="buttonRef"
    :disabled="disabled"
    class="group relative w-auto cursor-pointer overflow-hidden rounded-full border border-sky-500 bg-sky-500 p-2 px-6 text-center font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed justify-center"
    :class="[props.class]"
  >
    <div class="flex items-center justify-center gap-2">
      <div
        class="size-2 scale-100 rounded-lg bg-white transition-all duration-300 group-hover:scale-[100.8]"
      />
      <span
        class="inline-block whitespace-nowrap transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0"
      >
        {{ text }}
      </span>
    </div>

    <div
      class="absolute top-0 z-10 flex size-full translate-x-12 items-center justify-center gap-2 text-sky-500 opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100"
    >
      <span class="whitespace-nowrap">{{ text }}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-arrow-right"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    </div>
  </button>
</template>

<style></style>
