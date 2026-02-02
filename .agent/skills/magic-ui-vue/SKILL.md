---
name: magic-ui-vue
description: Expert at converting Magic UI (React/Motion) components to fully functional Vue 3 / Nuxt 3 components.
---

# Magic UI to Vue Converter

This skill provides a systematic approach to converting React-based Magic UI components (which typically use Framer Motion) into Vue 3/Nuxt 3 components.

## Core Conversion Principles

1.  **Framework**: Use Vue 3 Composition API with `<script setup lang="ts">`.
2.  **Styling**: Use Tailwind CSS, `clsx` (or `cn` utility), and `class-variance-authority` (cva).
3.  **Animation**: Replace Framer Motion with standard CSS transitions/animations where possible, or use `@vueuse/motion` for complex physics-based animations.
4.  **State/Logic**: detailed mapping of React hooks to Vue equivalents.

## Step-by-Step Conversion Guide

### 1. Structure & Imports

**React:**
```tsx
import React, { useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
```

**Vue:**
```vue
<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { cn } from "@/utils"; // Ensure path matches your project
import { cva, type VariantProps } from "class-variance-authority";
</script>
```

### 2. Props Definition

Convert React interface props to `defineProps` with `withDefaults`.

**React:**
```tsx
interface Props {
  className?: string;
  direction?: "top" | "bottom";
}
const Dock = ({ className, direction = "top" }: Props) => { ... }
```

**Vue:**
```ts
const props = withDefaults(
  defineProps<{
    className?: string;
    direction?: "top" | "bottom";
  }>(),
  {
    direction: "top",
  }
);
```

### 3. Variants & Class Names

Keep `cva` definitions almost identical, but use them in the template.

**React:**
```tsx
const dockVariants = cva("...", { ... });
return <div className={cn(dockVariants({ className }), className)} />
```

**Vue:**
```ts
const dockVariants = cva("...", { ... });
```
```html
<template>
  <div :class="cn(dockVariants({ className }), props.className)">
    <slot />
  </div>
</template>
```

### 4. Context (React Context -> Provide/Inject)

Magic UI often uses Context to share state (like mouse position) between parent and children.

**React:**
```tsx
const DockContext = createContext<DockContextType | null>(null);
const useDock = () => useContext(DockContext);
// Parent
<DockContext.Provider value={{ mouseX }}>...</DockContext.Provider>
```

**Vue:**
```ts
// Parent (Dock.vue)
import { provide, ref } from "vue";
const mouseX = ref(Infinity);
provide("dockIds", { mouseX }); // Use a unique string key

// Child (DockIcon.vue)
import { inject, type Ref } from "vue";
const dock = inject<{ mouseX: Ref<number> }>("dockIds");
if (!dock) throw new Error("Must be used within Dock");
```

### 5. Refs & DOM Access

**React:**
```tsx
const ref = useRef<HTMLDivElement>(null);
// ref.current.getBoundingClientRect()
```

**Vue:**
```ts
const ref = ref<HTMLElement | null>(null);
// ref.value?.getBoundingClientRect()
```

### 6. Event Handling & shared State

For components like Dock that track mouse movement:

**Parent (Vue):**
```html
<div @mousemove="(e) => mouseX = e.pageX" @mouseleave="mouseX = Infinity">
  <slot />
</div>
```

**Child (Vue):**
Computed properties are your friend for deriving values based on injected state.

```ts
const width = computed(() => {
  const distance = dock.mouseX.value - center;
  // logic...
  return calcWidth;
});
```

### 7. Slot Handling

Replace `{children}` with `<slot></slot>`.

### 8. Handling "Rest" Props

**React:**
```tsx
const { className, ...props } = args;
<div {...props}>
```

**Vue:**
Vue automatically applies non-prop attributes to the root element. If you need them explicitly or need to pass them deep:

```html
<div v-bind="$attrs">
<!-- OR if extracted in script -->
<script setup>
// defineProps consumes declared props, others are in $attrs
</script>
<template>
  <div v-bind="props"> <!-- Be careful not to double-bind -->
</template>
```
*Better approach in Vue:* Rely on fallthrough attributes for the root element, or use `v-bind="$attrs"` if you disabled `inheritAttrs: false`.

## Common Pitfalls

- **Unwrapping Refs**: Remember `.value` in `<script>` but NOT in `<template>`.
- **Injections**: `inject` can return undefined. Always handle the fallback or throw error if strict.
- **Motion**: Verify if `framer-motion` logic relies on physics (springs). If so, use `useSpring` from `@vueuse/motion` or plain CSS transitions for simple eases.
- **TypeScript**: Ensure imported types (like `HTMLDivElement`) are standard or imported from `vue`.

## Example: Dock Component Pattern

**Dock.vue (Parent):**
- Setup `ref(Infinity)` for mouseX.
- `provide` mouseX and config props (size, mag, dist).
- track `@mousemove` on container.

**DockIcon.vue (Child):**
- `inject` mouseX and config.
- `ref` the icon element to get its center position.
- `computed` width/height based on math (distance from mouseX to center).
