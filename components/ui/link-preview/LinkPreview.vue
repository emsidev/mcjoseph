<script setup lang="ts">
import type { CSSProperties } from "vue";
import { computed, reactive, ref, onMounted } from "vue";

interface BaseProps {
  class?: string;
  linkClass?: string;
  width?: number;
  height?: number;
  mobileWidth?: number;
  mobileHeight?: number;
}

// Props for static image mode
interface StaticImageProps extends BaseProps {
  isStatic?: true;
  imageSrc?: string;
  url?: string; // optional in static mode
}

// Props for URL preview mode
interface URLPreviewProps extends BaseProps {
  isStatic?: false; // optional but must be false if specified
  imageSrc?: string; // optional in URL mode
  url?: string;
}

// Combined type that enforces the requirements
type Props = StaticImageProps | URLPreviewProps;
const props = withDefaults(defineProps<Props>(), {
  isStatic: false,
  imageSrc: "",
  url: "",
  width: 200,
  height: 125,
  mobileWidth: 160,
  mobileHeight: 100,
});

const isVisible = ref(false);
const isLoading = ref(true);
const preview = ref<HTMLElement | null>(null);
const hasPopped = ref(false);
const isMobile = ref(false);

if (process.client) {
  isMobile.value = window.innerWidth < 1024;
}

// Generate preview URL
const previewSrc = computed(() => {
  if (props.isStatic) return props.imageSrc;

  const params = new URLSearchParams({
    url: props.url,
    screenshot: "true",
    meta: "false",
    embed: "screenshot.url",
    colorScheme: "light",
    "viewport.isMobile": "true",
    "viewport.deviceScaleFactor": "1",
    "viewport.width": String(props.width * 3),
    "viewport.height": String(props.height * 3),
  });

  return `https://api.microlink.io/?${params.toString()}`;
});

// Position tracking
const mousePosition = reactive({
  x: 0,
  y: 0,
});

// Calculate preview position
const previewStyle = computed<CSSProperties>(() => {
  if (!preview.value) return {};

  const offset = isMobile.value ? 10 : 20;
  const previewWidth = isMobile.value ? props.mobileWidth : props.width;
  const previewHeight = isMobile.value ? props.mobileHeight : props.height;
  const viewportWidth = window.innerWidth;
  const padding = 8;

  let x = mousePosition.x - previewWidth / 2;
  x = Math.min(Math.max(padding, x), viewportWidth - previewWidth - padding);

  const linkRect = preview.value.parentElement?.getBoundingClientRect();
  const y = linkRect ? linkRect.top - previewHeight - offset : 0;

  return {
    position: "fixed",
    left: `${x}px`,
    top: `${y}px`,
    width: `${previewWidth}px`,
    height: `${previewHeight}px`,
  };
});

// Image specific styling
const imageStyle = computed<CSSProperties>(() => {
  const w = isMobile.value ? props.mobileWidth : props.width;
  const h = isMobile.value ? props.mobileHeight : props.height;
  return {
    width: `${w}px`,
    height: `${h}px`,
  };
});

// Pop animation class
const popClass = computed(() => {
  if (!hasPopped.value) return "";
  return "animate-pop";
});

function handleMouseMove(event: MouseEvent) {
  mousePosition.x = event.clientX;
  mousePosition.y = event.clientY;
}

function showPreview() {
  isVisible.value = true;
  setTimeout(() => {
    hasPopped.value = true;
  }, 50);
}

function hidePreview() {
  isVisible.value = false;
  hasPopped.value = false;
}

function handleClickOutside(event: MouseEvent) {
  if (!preview.value) return;

  const previewElement = preview.value;
  const triggerElement = preview.value.parentElement;

  if (!previewElement.contains(event.target as Node) &&
    !triggerElement?.contains(event.target as Node)) {
    hidePreview();
  }
}

function handleTriggerClick() {
  if (isMobile.value) {
    isVisible.value ? hidePreview() : showPreview();
  }
}

function handleImageLoad() {
  isLoading.value = false;
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
  <div class="relative inline-block" :class="[props.class]">
    <!-- Trigger -->
    <NuxtLink :to="url" target="_blank" class="text-black dark:text-white" :class="[props.linkClass]"
      @mousemove="handleMouseMove" @mouseenter="isMobile ? null : showPreview()"
      @mouseleave="isMobile ? null : hidePreview()" @click.stop="isMobile ? handleTriggerClick() : null">
      <slot />
    </NuxtLink>

    <!-- Preview -->
    <div v-if="isVisible" ref="preview" class="pointer-events-none absolute z-50 transition-container"
      :style="previewStyle">
      <div class="overflow-hidden rounded-xl shadow-xl" :class="[popClass, { 'transform-gpu': !props.isStatic }]">
        <div class="block rounded-xl border-2 border-transparent bg-white p-1 shadow-lg dark:bg-gray-900">
          <img :src="previewSrc" :width="width" :height="height" class="size-full rounded-lg object-cover"
            :style="imageStyle" alt="preview" @load="handleImageLoad" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.transform-gpu {
  transform: scale3d(0.26, 0.26, 1);
  transform-origin: center bottom;
  will-change: transform;
}

.animate-pop {
  animation: pop 1000ms ease forwards;
  will-change: transform;
}

@keyframes pop {
  0% {
    transform: scale3d(0.26, 0.26, 1);
  }

  25% {
    transform: scale3d(1.1, 1.1, 1);
  }

  65% {
    transform: scale3d(0.98, 0.98, 1);
  }

  100% {
    transform: scale3d(1, 1, 1);
  }
}
</style>
