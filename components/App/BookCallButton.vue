<template>
  <UiInteractiveHoverButton text="Book a Call" v-bind="$attrs" class="w-full" @click="openCalPopup" />
</template>

<script setup lang="ts">
const { openCalPopup } = useCal();
</script>
