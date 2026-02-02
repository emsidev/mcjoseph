<template>
  <main class="min-h-screen">
    <AppHeader
      class="mb-12"
      title="Facts about me"
      :description="description"
    />
    <div class="space-y-24">
      <ul class="space-y-8">
        <AppFactsHeader title="Work" />
        <AppFactsItem v-for="(item, id) in work" :key="id" :item="item" />
      </ul>
      <ul class="space-y-8">
        <AppFactsHeader title="Life" />
        <AppFactsItem v-for="(item, id) in life" :key="id" :item="item" />
      </ul>
      <ul class="space-y-8">
        <AppFactsHeader title="Interests" />
        <AppFactsItem v-for="(item, id) in interests" :key="id" :item="item" />
      </ul>
      <ul class="space-y-8">
        <AppFactsHeader title="Random" />
        <AppFactsItem v-for="(item, id) in random" :key="id" :item="item" />
      </ul>
    </div>
  </main>
</template>

<script setup>
const description =
  "A collection of random facts, skills, and experiences.";
useHead({
  title: "Facts about me",
  meta: [{ name: "description", content: description }],
});
const { data: items } = await useAsyncData("facts", () =>
  queryContent("/facts").find()
);
const work = items.value.filter((item) => item.category === "work");
const life = items.value.filter((item) => item.category === "life");
const interests = items.value.filter((item) => item.category === "interests");
const random = items.value.filter((item) => item.category === "random");
</script>
