<template>
  <div class="min-h-screen py-16 md:py-20">
    <!-- Page Header -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 md:mb-20">
      <h1 class="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-6 md:mb-8 tracking-tight">
        Newsroom
      </h1>
      <p class="text-base md:text-lg text-gray-600 font-light leading-relaxed">
        Latest news, insights, and updates from Banzab and our portfolio
        companies
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="text-center py-20">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-20">
      <p class="text-gray-600 font-light">Unable to load newsroom articles.</p>
    </div>

    <!-- News Articles -->
    <div v-else class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="newsArticles.length === 0" class="text-center py-20">
        <p class="text-gray-500 font-light">No articles available.</p>
      </div>

      <div v-else class="space-y-12 md:space-y-16">
        <article
          v-for="article in newsArticles"
          :key="article._path"
          class="group cursor-pointer"
          @click="navigateToArticle(article._path)"
        >
          <div class="border-b border-gray-200 pb-8 md:pb-12 hover:border-gray-300 transition-colors">
            <!-- Date and Category -->
            <div class="flex flex-wrap items-center gap-4 mb-4">
              <time :datetime="article.date" class="text-xs text-gray-500 font-light uppercase tracking-wider">
                {{ formatDate(article.date) }}
              </time>
              <span v-if="article.category" class="text-xs text-slate-900 font-medium uppercase tracking-wider">
                {{ article.category }}
              </span>
            </div>

            <!-- Title -->
            <h2 class="text-xl md:text-2xl font-light text-gray-900 mb-4 md:mb-6 group-hover:text-gray-700 transition-colors leading-tight">
              {{ article.title }}
            </h2>

            <!-- Description -->
            <p class="text-base text-gray-600 leading-relaxed mb-6 md:mb-8 font-light">
              {{ article.description }}
            </p>

            <p v-if="article.excerpt" class="text-gray-500 mb-6 md:mb-8 font-light text-sm">
              {{ article.excerpt }}
            </p>

            <!-- Meta -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div class="flex flex-wrap items-center gap-4 md:gap-6">
                <span v-if="article.author" class="text-sm text-gray-500 font-light">
                  {{ article.author }}
                </span>
                <span v-if="article.featured" class="text-xs text-slate-900 font-medium uppercase tracking-wider">
                  Featured
                </span>
              </div>

              <span class="inline-flex items-center text-slate-900 font-medium group-hover:text-gray-600 transition-colors text-sm uppercase tracking-wide border-b border-gray-300 group-hover:border-gray-600 pb-1">
                Read Article
                <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "Newsroom - Banzab",
  meta: [
    {
      name: "description",
      content:
        "Stay up to date with the latest news, insights, and updates from Banzab and our portfolio companies.",
    },
  ],
});

const {
  data: newsArticles,
  pending,
  error,
} = await useAsyncData("newsroom", async () => {
  try {
    const result = await queryCollection("newsroom").all();
    return result
      .map((article) => {
        const slug = article.stem
          ? article.stem.split("/").pop()
          : article.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "");
        return {
          ...article,
          _path: `/newsroom/${slug}`,
        };
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (err) {
    console.error("Query error:", err);
    throw err;
  }
});

function navigateToArticle(path) {
  navigateTo(path);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
</script>