<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  to?: string
}>()
</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to"
    :class="cn('transition-colors hover:text-gray-900 dark:hover:text-gray-100', props.class)"
  >
    <slot />
  </NuxtLink>
  <span
    v-else
    :class="cn('transition-colors hover:text-gray-900 dark:hover:text-gray-100', props.class)"
    role="link"
  >
    <slot />
  </span>
</template>
