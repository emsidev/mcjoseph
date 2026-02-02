<template>
  <div class="space-y-3">
    <ProfilePreview>
      <NuxtImg src="/avatar.png" alt="Mc Joseph Agbanlog"
        class="ring-2 border ring-gray-200 border-gray-300 dark:ring-white/10 dark:border-gray-800 hover:ring-4 transition-all duration-300 bg-gray-200 dark:bg-gray-900 rounded-full h-12 w-12 sm:h-16 sm:w-16 cursor-pointer"
        sizes="48px sm:64px" placeholder format="webp" />

      <template #preview>
        <HomeProfileCard />
      </template>
    </ProfilePreview>
    <div class="h-10 sm:h-12 flex items-center">
      <WordRotate 
        :words="['Kumusta', 'Hi there!', 'Let\'s work together']" 
        class="text-xl font-bold tracking-tight text-gray-800 dark:text-gray-100"
      />
    </div>
    <div class="text-gray-900 dark:text-gray-400">
      I'm <h1 class="inline font-bold"><TextHighlight 
        class="name-highlight" 
        text-end-color="var(--name-text-color)"
      >Mc Joseph Agbanlog</TextHighlight></h1>, a fullstack developer from Quezon City, Philippines. I specialize in
      building web applications using
      <LinkPreview url="https://dotnet.microsoft.com/en-us/apps/aspnet" link-class="underline">ASP.NET</LinkPreview>
      with
      <LinkPreview url="https://learn.microsoft.com/en-us/aspnet/core/razor-pages" link-class="underline">Razor Pages</LinkPreview>
      and websites using
      <LinkPreview url="https://react.dev" link-class="underline">React</LinkPreview>
      and
      <LinkPreview url="https://nextjs.org" link-class="underline">NextJS</LinkPreview>.
      I also design UI/UX in
      <LinkPreview url="https://www.figma.com" link-class="underline">Figma</LinkPreview>
      and love integrating AI into my workflow with tools like
      <LinkPreview url="https://labs.google.com/search/experiment/2" link-class="underline">Google Antigravity</LinkPreview>,
      <LinkPreview url="https://claude.ai" link-class="underline">Claude</LinkPreview>,
      <LinkPreview url="https://www.figma.com/ai" link-class="underline">Figma Make</LinkPreview>,
      <LinkPreview url="https://v0.dev" link-class="underline">v0.dev</LinkPreview>,
      and
      <LinkPreview url="https://www.cursor.com" link-class="underline">Cursor</LinkPreview>.
      After years of procrastination, I've finally built my own portfolio to share to
      the internet my projects, interesting facts about me and my thoughts.
    </div>
    <p class="text-gray-900 dark:text-gray-400">
      During the day, I work as a Fullstack Developer at
      <LinkPreview url="https://wizard.group" link-class="underline">Wizard Group</LinkPreview>,
      while my nights and weekends are dedicated to tinkering with side projects
      and building experimental applications.
    </p>

    <ClientOnly>
      <div class="flex flex-wrap items-center gap-3 pt-2">
        <AppBookCallButton />
        <AppViewResumeButton />
      </div>
      <template #fallback>
        <div class="flex flex-wrap items-center gap-3 pt-2">
          <UButton 
            label="Book a Call" 
            color="sky" 
            size="lg" 
            class="rounded-full px-6 font-semibold" 
          />
          <UButton
            label="View Resume"
            color="secondary"
            variant="solid"
            size="lg"
            class="rounded-full px-6 font-semibold"
          />
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ProfilePreview } from "~/components/ui/profile-preview";
import { LinkPreview } from "~/components/ui/link-preview";
import { WordRotate } from "~/components/ui/word-rotate";
import TextHighlight from "~/components/ui/text-highlight/TextHighlight.vue";

useSeoMeta({
  title: "Home",
  description:
    "Fullstack Developer from Quezon City, Philippines, specializing in ASP.NET, React, and NextJS. Explore my portfolio of web applications, UI/UX designs, and insights on AI integration.",
});
</script>

<style scoped>
.name-highlight {
  --name-text-color: #000;
}
.dark .name-highlight {
  --name-text-color: #fff;
}
</style>
