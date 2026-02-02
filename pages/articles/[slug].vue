<template>
  <main class="min-h-screen">
    <!-- Breadcrumbs -->
    <UiBreadcrumb class="mb-6">
      <UiBreadcrumbList>
        <UiBreadcrumbItem>
          <UiBreadcrumbLink to="/">Home</UiBreadcrumbLink>
        </UiBreadcrumbItem>
        <UiBreadcrumbSeparator />
        <UiBreadcrumbItem>
          <UiBreadcrumbLink to="/articles">Articles</UiBreadcrumbLink>
        </UiBreadcrumbItem>
        <UiBreadcrumbSeparator />
        <UiBreadcrumbItem>
          <UiBreadcrumbPage>{{ article?.title || 'Article' }}</UiBreadcrumbPage>
        </UiBreadcrumbItem>
      </UiBreadcrumbList>
    </UiBreadcrumb>

    <div
      v-if="article"
      class="prose dark:prose-invert prose-blockquote:not-italic prose-pre:bg-gray-900 prose-img:ring-1 prose-img:ring-gray-200 dark:prose-img:ring-white/10 prose-img:rounded-lg"
    >
      <article>
        <h1>{{ article.title }}</h1>
        <ContentRenderer :value="article" />
      </article>
    </div>
    <div v-else class="text-center py-20">
      <p class="text-gray-500">Article not found.</p>
    </div>
  </main>
</template>
<script setup>
const route = useRoute();
const slug = route.params.slug;

const { data: article } = await useAsyncData(`article-${slug}`, () =>
  queryContent("/articles", slug).findOne()
);

useSeoMeta({
  title: article.value?.title,
  ogImage: `${process.env.BASE_URL}/articles/${slug}.png`,
  twitterCard: "summary_large_image",
  articleAuthor: "Mc Joseph Agbanlog",
});
</script>
<style>
.prose h2 a,
.prose h3 a {
  @apply no-underline;
}
</style>
