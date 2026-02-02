<script setup lang="ts">
import { computed, provide } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from '~/lib/utils'
import { DOCK_CONTEXT_KEY, createMotionValue } from '~/composables/useDock'

// Types
export interface DockProps {
  class?: string
  iconSize?: number
  iconMagnification?: number
  disableMagnification?: boolean
  iconDistance?: number
  direction?: 'top' | 'middle' | 'bottom'
}

// Constants
const DEFAULT_SIZE = 40
const DEFAULT_MAGNIFICATION = 60
const DEFAULT_DISTANCE = 140

// Dock variants using CVA
const dockVariants = cva(
  'supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 mx-auto mt-8 flex h-[58px] w-max items-center justify-center gap-2 rounded-2xl border p-2 backdrop-blur-md'
)

// Props with defaults
const props = withDefaults(defineProps<DockProps>(), {
  iconSize: DEFAULT_SIZE,
  iconMagnification: DEFAULT_MAGNIFICATION,
  disableMagnification: false,
  iconDistance: DEFAULT_DISTANCE,
  direction: 'middle',
})

// Mouse position tracking
const mouseX = createMotionValue(Infinity)

// Provide context to child DockIcon components
provide(DOCK_CONTEXT_KEY, {
  mouseX,
  iconSize: props.iconSize,
  iconMagnification: props.iconMagnification,
  disableMagnification: props.disableMagnification,
  iconDistance: props.iconDistance,
})

// Event handlers
const handleMouseMove = (e: MouseEvent) => {
  mouseX.set(e.pageX)
}

const handleMouseLeave = () => {
  mouseX.set(Infinity)
}

// Computed classes
const dockClasses = computed(() =>
  cn(dockVariants(), props.class, {
    'items-start': props.direction === 'top',
    'items-center': props.direction === 'middle',
    'items-end': props.direction === 'bottom',
  })
)
</script>

<template>
  <div
    :class="dockClasses"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <slot />
  </div>
</template>
