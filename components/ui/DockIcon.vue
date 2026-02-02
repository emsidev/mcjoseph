<script setup lang="ts">
import { ref, computed, inject, onMounted, onUnmounted } from 'vue'
import { cn } from '~/lib/utils'
import { DOCK_CONTEXT_KEY } from '~/composables/useDock'

// Props
export interface DockIconProps {
  class?: string
  size?: number
  magnification?: number
  disableMagnification?: boolean
  distance?: number
}

const props = defineProps<DockIconProps>()

// Inject context from parent Dock
const dockContext = inject(DOCK_CONTEXT_KEY, null)

// Use injected values or props with defaults
const iconSize = computed(() => props.size ?? dockContext?.iconSize ?? 40)
const magnification = computed(() => props.magnification ?? dockContext?.iconMagnification ?? 60)
const disableMagnification = computed(() => props.disableMagnification ?? dockContext?.disableMagnification ?? false)
const distance = computed(() => props.distance ?? dockContext?.iconDistance ?? 140)

// Ref for the icon element
const iconRef = ref<HTMLDivElement | null>(null)

// Calculate padding
const padding = computed(() => Math.max(6, iconSize.value * 0.2))

// Current animated size
const currentSize = ref(iconSize.value)

// Animation frame ID for cleanup
let animationFrameId: number | null = null

// Update size based on mouse position
const updateSize = () => {
  if (!iconRef.value || !dockContext?.mouseX) {
    currentSize.value = iconSize.value
    return
  }
  
  const bounds = iconRef.value.getBoundingClientRect()
  const iconCenter = bounds.x + bounds.width / 2
  const mousePosition = dockContext.mouseX.get()
  const distanceFromMouse = Math.abs(mousePosition - iconCenter)
  
  const dist = distance.value
  const targetMagnification = disableMagnification.value ? iconSize.value : magnification.value
  
  if (distanceFromMouse > dist || mousePosition === Infinity) {
    currentSize.value = iconSize.value
  } else {
    // Smooth interpolation based on distance using cosine easing
    const ratio = Math.cos((distanceFromMouse / dist) * (Math.PI / 2))
    currentSize.value = iconSize.value + (targetMagnification - iconSize.value) * ratio
  }
  
  animationFrameId = requestAnimationFrame(updateSize)
}

onMounted(() => {
  if (dockContext?.mouseX) {
    animationFrameId = requestAnimationFrame(updateSize)
  }
})

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
})

// Computed styles with CSS transition for smooth spring-like effect
const iconStyle = computed(() => ({
  width: `${currentSize.value}px`,
  height: `${currentSize.value}px`,
  padding: `${padding.value}px`,
  '--dock-icon-size': `${currentSize.value - padding.value * 2}px`,
}))

const containerClasses = computed(() =>
  cn(
    'flex aspect-square cursor-pointer items-center justify-center rounded-full',
    props.class
  )
)
</script>

<template>
  <div
    ref="iconRef"
    :class="containerClasses"
    :style="iconStyle"
  >
    <slot />
  </div>
</template>
