<template>
  <div class="space-y-6">
    <NuxtImg src="/avatar.png" alt="Mc Joseph Agbanlog"
      class="ring-2 border ring-gray-200 border-gray-300 dark:ring-white/10 dark:border-gray-800 hover:ring-4 transition-all duration-300 bg-gray-200 dark:bg-gray-900 rounded-full h-12 w-12 sm:h-16 sm:w-16"
      sizes="48px sm:64px" placeholder format="webp" />
    <h1 class="text-xl font-bold tracking-tight text-gray-800 dark:text-gray-100">
      Kumusta!
    </h1>
    <p class="text-gray-900 dark:text-gray-400">
      I'm Mc, a fullstack developer from Quezon City, Philippines. I specialize in
      building web applications using ASP .NET with Razor Pages and websites using
      React and NextJS. I also design UI/UX in Figma and love integrating AI into
      my workflow with tools like Google Antigravity, Claude, Figma Make, v0.dev,
      and Cursor. After years of procrastination, I've finally built my own portfolio to share to 
      the internet my projects, interesting facts about me and my thoughts.
    </p>
    <p class="text-gray-900 dark:text-gray-400">
      During the day, I work as a Fullstack Developer at
      <a href="https://wizard.group/" target="_blank" class="underline">Wizard Group</a>,
      while my nights and weekends are dedicated to tinkering with side projects
      and building experimental applications.
    </p>
  </div>
</template>

<script setup>
useSeoMeta({
  title: "McJoseph",
  description:
    "Fullstack Developer from Quezon City, Philippines, specializing in ASP.NET, React, and NextJS. Explore my portfolio of web applications, UI/UX designs, and insights on AI integration.",
});
</script>
