<template>
  <div>
    <h2 class="uppercase text-xs font-semibold text-gray-400 mb-6">
      WHAT PEOPLE SAY
    </h2>
    <div class="relative flex w-full flex-col items-center justify-center overflow-hidden py-10">
      <UiMarquee pause-on-hover class="[--duration:20s]">
        <div
          v-for="testimonial in testimonials"
          :key="testimonial._path"
          class="relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05] dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
        >
          <div class="flex flex-row items-center gap-2">
            <UAvatar
              :src="testimonial.avatar"
              :alt="testimonial.name"
              size="sm"
            />
            <div class="flex flex-col">
              <span class="text-sm font-medium dark:text-white">
                {{ testimonial.name }}
              </span>
              <p class="text-xs font-medium text-gray-400">
                {{ testimonial.role }}
              </p>
            </div>
          </div>
          <blockquote class="mt-2 text-sm italic text-gray-600 dark:text-gray-300">
            "{{ testimonial.comment }}"
          </blockquote>
        </div>
      </UiMarquee>
      
      <!-- Gradient overlays for smooth fade -->
      <div class="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-gray-50 dark:from-black"></div>
      <div class="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-gray-50 dark:from-black"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { data: testimonials } = await useAsyncData("testimonials", () =>
  queryContent("/testimonials").find()
);
</script>
