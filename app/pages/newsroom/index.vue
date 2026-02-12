<template>
  <div class="pt-14 md:pt-16">
    <!-- Centered Header -->
    <div class="max-w-3xl mx-auto px-6 md:px-8 text-center mb-14 md:mb-20">
      <p
        class="text-xs uppercase tracking-[0.15em] text-gray-400 font-medium mb-5"
      >
        Newsroom
      </p>
      <h1
        class="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 tracking-tight leading-tight mb-5"
      >
        Latest updates
      </h1>
      <p
        class="text-base text-gray-500 font-light leading-relaxed max-w-md mx-auto"
      >
        News, insights, and updates from Banzab and our portfolio companies.
      </p>
    </div>

    <!-- Divider -->
    <div class="max-w-3xl mx-auto px-6 md:px-8">
      <div class="w-full h-px bg-gray-200"></div>
    </div>

    <!-- Loading -->
    <div
      v-if="!articles"
      class="max-w-3xl mx-auto px-6 md:px-8 py-20 text-center"
    >
      <div
        class="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"
      ></div>
    </div>

    <!-- Articles -->
    <div v-else class="max-w-3xl mx-auto px-6 md:px-8 mb-16 md:mb-20">
      <div v-if="articles.length === 0" class="py-20 text-center">
        <p class="text-gray-500 font-light">No articles yet.</p>
      </div>

      <div v-else>
        <article
          v-for="article in articles"
          :key="article._id"
          class="group cursor-pointer border-b border-gray-200 py-10 md:py-12"
          @click="navigateTo(`/newsroom/${article.slug.current}`)"
        >
          <div class="flex items-center gap-3 mb-4">
            <time
              :datetime="article.date"
              class="text-[11px] uppercase tracking-[0.12em] text-gray-400 font-medium"
            >
              {{ formatDate(article.date) }}
            </time>
            <span
              v-if="article.category"
              class="w-1 h-1 rounded-full bg-gray-300"
            ></span>
            <span
              v-if="article.category"
              class="text-[11px] uppercase tracking-[0.12em] text-gray-400 font-medium"
            >
              {{ article.category }}
            </span>
          </div>

          <h2
            class="text-2xl md:text-3xl font-light text-gray-900 tracking-tight leading-snug mb-3 group-hover:text-gray-500 transition-colors"
          >
            {{ article.title }}
          </h2>

          <p
            class="text-sm md:text-base text-gray-500 font-light leading-relaxed mb-5"
          >
            {{ article.description }}
          </p>

          <span v-if="article.author" class="text-xs text-gray-400 font-light">
            By {{ article.author }}
          </span>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSanityQuery } from "~/composables/useSanity";

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

const { data: articles } = await useSanityQuery(
  "newsroom-list",
  `*[_type == "newsroomArticle"] | order(date desc) {
    _id,
    title,
    slug,
    description,
    date,
    category,
    author,
    featured
  }`,
);

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
</script>
