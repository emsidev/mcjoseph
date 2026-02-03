<script setup lang="ts">
import type { CSSProperties } from "vue";
import { computed, ref, onMounted } from "vue";

interface Props {
  class?: string;
  width?: number;
  height?: number;
  mobileWidth?: number;
  mobileHeight?: number;
}

const props = withDefaults(defineProps<Props>(), {
  width: 320,
  height: 400,
  mobileWidth: 280,
  mobileHeight: 350,
});

const isVisible = ref(false);
const container = ref<HTMLElement | null>(null);
const hasPopped = ref(false);
const isMobile = ref(false);

if (process.client) {
  isMobile.value = window.innerWidth < 1024;
}

const previewStyle = computed<CSSProperties>(() => {
  if (!container.value) return {};

  const offset = isMobile.value ? 8 : 12;
  const previewWidth = isMobile.value ? props.mobileWidth : props.width;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const padding = isMobile.value ? 12 : 16;

  const triggerRect = container.value.getBoundingClientRect();

  // Center horizontally ve to trigger
  let x = triggerRect.left + (triggerRect.width / 2) - (previewWidth / 2);
  
  // Keep within horizontal bounds
  x = Math.min(Math.max(padding, x), viewportWidth - previewWidth - padding);

  const previewHeight = isMobile.value ? props.mobileHeight : props.height;

  // Position below with offset
  let y = triggerRect.bottom + offset;
  
  // If it goes off-screen at the bottom, flip to top
  if (y + previewHeight > viewportHeight - padding) {
    y = triggerRect.top - previewHeight - offset;
  }

  return {
    position: "fixed",
    left: `${x}px`,
    top: `${y}px`,
    width: `${previewWidth}px`,
    zIndex: 100,
  };
});

// Timers
let openTimer: NodeJS.Timeout | null = null;
let closeTimer: NodeJS.Timeout | null = null;

const popClass = computed(() => {
  if (!hasPopped.value) return "";
  return "animate-pop";
});

function showPreview() {
  if (closeTimer) {
    clearTimeout(closeTimer);
    closeTimer = null;
  }
  
  isVisible.value = true;
  
  if (openTimer) clearTimeout(openTimer);
  openTimer = setTimeout(() => {
    hasPopped.value = true;
  }, 50);
}

function hidePreview() {
  if (openTimer) {
    clearTimeout(openTimer);
    openTimer = null;
  }

  closeTimer = setTimeout(() => {
    isVisible.value = false;
    hasPopped.value = false;
  }, 300);
}

function handleClickOutside(event: MouseEvent) {
  if (!container.value) return;
  
  if (!container.value.contains(event.target as Node)) {
    hidePreview();
  }
}

onMounted(() => {
  if (process.client) {
    const handleResize = () => {
      isMobile.value = window.innerWidth < 1024;
    };
    const handleScroll = () => {
      if (isMobile.value && isVisible.value) {
        hidePreview();
      }
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }
});
</script>

<template>
  <div
    ref="container"
    class="relative inline-block"
    :class="[props.class]"
    @mouseenter="isMobile ? null : showPreview()"
    @mouseleave="isMobile ? null : hidePreview()"
    @click.stop="isMobile ? (isVisible ? hidePreview() : showPreview()) : null"
  >
    <!-- Trigger -->
    <div class="cursor-pointer">
      <slot />
    </div>

    <!-- Preview -->
    <ClientOnly>
      <div
        v-if="isVisible"
        class="absolute"
        :style="previewStyle"
      >
        <div
          class="overflow-hidden rounded-[24px] shadow-2xl"
          :class="[popClass]"
        >
          <div class="bg-white dark:bg-black pointer-events-auto">
            <slot name="preview" />
          </div>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<style scoped>
.animate-pop {
  animation: pop 1000ms ease forwards;
  will-change: transform;
}

@keyframes pop {
  0% {
    transform: scale3d(0.26, 0.26, 1);
    opacity: 0;
  }
  25% {
    transform: scale3d(1.1, 1.1, 1);
    opacity: 1;
  }
  65% {
    transform: scale3d(0.98, 0.98, 1);
  }
  100% {
    transform: scale3d(1, 1, 1);
    opacity: 1;
  }
}
</style>
