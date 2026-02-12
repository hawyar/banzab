<template>
  <div v-if="article" class="py-16 md:py-20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Article Header -->
      <header class="mb-12 md:mb-16 text-center">
        <div class="flex flex-wrap items-center justify-center gap-4 mb-6">
          <time :datetime="article.date" class="text-xs text-gray-500 font-light uppercase tracking-wider">
            {{ formatDate(article.date) }}
          </time>
          <span v-if="article.category" class="text-xs text-slate-900 font-medium uppercase tracking-wider">
            {{ article.category }}
          </span>
        </div>

        <h1 class="text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 mb-6 md:mb-8 tracking-tight leading-tight px-4">
          {{ article.title }}
        </h1>

        <div class="w-20 h-px bg-slate-900 mx-auto mb-6"></div>

        <p v-if="article.description" class="text-base md:text-lg text-gray-600 font-light leading-relaxed max-w-3xl mx-auto px-4">
          {{ article.description }}
        </p>

        <div v-if="article.author" class="mt-6 md:mt-8 text-sm text-gray-500 font-light">
          By {{ article.author }}
        </div>
      </header>

      <!-- Article Content -->
      <article class="article-content max-w-none">
        <ContentRenderer :value="article" />
      </article>

      <!-- Article Footer -->
      <div class="mt-16 md:mt-20 pt-8 md:pt-12 border-t border-gray-200 text-center">
        <NuxtLink to="/newsroom" class="inline-flex items-center text-slate-900 font-medium hover:text-gray-600 transition-colors duration-300 border-b border-gray-300 hover:border-gray-600 pb-1 text-sm uppercase tracking-wide">
          <svg class="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Back to Newsroom
        </NuxtLink>
      </div>

      <!-- Related Articles -->
      <div v-if="relatedArticles.length > 0" class="mt-16 md:mt-20">
        <div class="text-center mb-8 md:mb-12">
          <h2 class="text-2xl md:text-3xl font-light text-gray-900 mb-4 tracking-tight">
            Related Articles
          </h2>
          <div class="w-20 h-px bg-slate-900 mx-auto"></div>
        </div>
        <div class="space-y-8 md:space-y-12">
          <article
            v-for="related in relatedArticles"
            :key="related._path"
            class="group cursor-pointer border-b border-gray-200 pb-6 md:pb-8 hover:border-gray-300 transition-colors"
            @click="navigateToArticle(related._path)"
          >
            <time :datetime="related.date" class="text-xs text-gray-500 font-light uppercase tracking-wider block mb-4">
              {{ formatDate(related.date) }}
            </time>
            <h3 class="text-lg md:text-xl font-light text-gray-900 mb-4 group-hover:text-gray-700 transition-colors leading-tight">
              {{ related.title }}
            </h3>
            <p class="text-gray-600 font-light leading-relaxed text-sm md:text-base">
              {{ related.description }}
            </p>
            <div class="mt-4 md:mt-6">
              <span class="inline-flex items-center text-slate-900 font-medium group-hover:text-gray-600 transition-colors text-sm uppercase tracking-wide border-b border-gray-300 group-hover:border-gray-600 pb-1">
                Read Article
                <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </span>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>

  <!-- 404 State -->
  <div v-else class="py-16 md:py-24 text-center px-4">
    <h1 class="text-2xl md:text-3xl font-light text-gray-900 mb-6">Article Not Found</h1>
    <p class="text-gray-600 font-light mb-8">
      Sorry, we couldn't find the article you're looking for.
    </p>
    <NuxtLink to="/newsroom" class="inline-block bg-slate-900 text-white px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-medium hover:bg-slate-800 transition-colors duration-300">
      Browse Newsroom
    </NuxtLink>
  </div>
</template>

<script setup>
const route = useRoute();
const slug = Array.isArray(route.params.slug)
  ? route.params.slug.join("/")
  : route.params.slug;

const { data: article } = await useAsyncData(route.path, async () => {
  try {
    const allArticles = await queryCollection("newsroom").all();

    const foundArticle = allArticles.find((a) => {
      const stemFilename = a.stem ? a.stem.split("/").pop() : "";
      const titleSlug = a.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      return stemFilename === slug || titleSlug === slug;
    });

    if (foundArticle) {
      foundArticle._path = `/newsroom/${slug}`;
    }

    return foundArticle;
  } catch (err) {
    console.error("Error fetching newsroom article:", err);
    return null;
  }
});

const { data: allArticles } = await useAsyncData("all-newsroom-articles", () =>
  queryCollection("newsroom").sort({ date: -1 }).limit(3).find(),
);

const relatedArticles = computed(() => {
  if (!allArticles.value || !article.value) return [];
  return allArticles.value
    .filter((a) => a.title !== article.value.title)
    .slice(0, 2);
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

useHead({
  title: computed(() =>
    article.value
      ? `${article.value.title} - Banzab`
      : "Article Not Found - Banzab",
  ),
  meta: computed(() => [
    {
      name: "description",
      content: article.value
        ? article.value.description ||
          `Read this article from Banzab: ${article.value.title}`
        : "Article not found at Banzab",
    },
  ]),
});
</script>

<style scoped>
.article-content {
  text-decoration: none;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.article-content :deep(h1) {
  font-size: 1.875rem;
  font-weight: 300;
  color: #111827;
  margin: 2.5rem 0 1.5rem 0;
  line-height: 1.2;
  letter-spacing: -0.025em;
}

@media (min-width: 768px) {
  .article-content :deep(h1) {
    font-size: 2.25rem;
    margin: 3rem 0 2rem 0;
  }
}

.article-content :deep(h2) {
  font-size: 1.5rem;
  font-weight: 300;
  color: #111827;
  margin: 2rem 0 1.25rem 0;
  line-height: 1.3;
  letter-spacing: -0.025em;
}

@media (min-width: 768px) {
  .article-content :deep(h2) {
    font-size: 1.875rem;
    margin: 2.5rem 0 1.5rem 0;
  }
}

.article-content :deep(h3) {
  font-size: 1.25rem;
  font-weight: 400;
  color: #111827;
  margin: 1.75rem 0 1rem 0;
  line-height: 1.4;
}

@media (min-width: 768px) {
  .article-content :deep(h3) {
    font-size: 1.5rem;
    margin: 2rem 0 1rem 0;
  }
}

.article-content :deep(h4) {
  font-size: 1.125rem;
  font-weight: 500;
  color: #111827;
  margin: 1.5rem 0 0.75rem 0;
  line-height: 1.4;
}

.article-content :deep(p) {
  font-size: 1rem;
  font-weight: 300;
  color: #374151;
  line-height: 1.75;
  margin-bottom: 1.5rem;
}

@media (min-width: 768px) {
  .article-content :deep(p) {
    font-size: 1.125rem;
    line-height: 1.8;
    margin-bottom: 1.75rem;
  }
}

.article-content :deep(strong) {
  font-weight: 500;
  color: #111827;
}

.article-content :deep(em) {
  font-style: italic;
  color: #374151;
}

.article-content :deep(ul),
.article-content :deep(ol) {
  margin: 1.5rem 0;
  padding-left: 1.5rem;
}

@media (min-width: 768px) {
  .article-content :deep(ul),
  .article-content :deep(ol) {
    margin: 1.75rem 0;
    padding-left: 2rem;
  }
}

.article-content :deep(li) {
  font-size: 1rem;
  font-weight: 300;
  color: #374151;
  line-height: 1.75;
  margin-bottom: 0.5rem;
}

@media (min-width: 768px) {
  .article-content :deep(li) {
    font-size: 1.125rem;
    line-height: 1.8;
  }
}

.article-content :deep(ul li)::marker {
  color: #111827;
}

.article-content :deep(ol li)::marker {
  color: #111827;
  font-weight: 500;
}

.article-content :deep(blockquote) {
  border-left: 3px solid #111827;
  background: #f9fafb;
  margin: 2rem 0;
  padding: 1.5rem;
  font-style: italic;
  font-size: 1.125rem;
  font-weight: 300;
  color: #4b5563;
  line-height: 1.7;
}

@media (min-width: 768px) {
  .article-content :deep(blockquote) {
    margin: 2.5rem 0;
    padding: 2rem;
    font-size: 1.25rem;
  }
}

.article-content :deep(blockquote p) {
  margin-bottom: 0;
  font-size: inherit;
  font-weight: inherit;
  color: inherit;
  line-height: inherit;
}

.article-content :deep(a) {
  color: #111827;
  text-decoration: none;
  border-bottom: 1px solid #111827;
  transition: opacity 0.2s ease;
}

.article-content :deep(a:hover) {
  opacity: 0.7;
}

.article-content :deep(code) {
  background: #f3f4f6;
  color: #111827;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-family: "SF Mono", Monaco, Menlo, monospace;
  font-weight: 400;
}

.article-content :deep(pre) {
  background: #111827;
  color: #f9fafb;
  padding: 1.5rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 2rem 0;
  font-family: "SF Mono", Monaco, Menlo, monospace;
  font-size: 0.875rem;
  line-height: 1.6;
}

@media (min-width: 768px) {
  .article-content :deep(pre) {
    padding: 2rem;
    border-radius: 0.75rem;
    margin: 2.5rem 0;
  }
}

.article-content :deep(pre code) {
  background: transparent;
  color: inherit;
  padding: 0;
  border-radius: 0;
}

.article-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 2rem 0;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
  font-size: 0.875rem;
}

@media (min-width: 768px) {
  .article-content :deep(table) {
    margin: 2.5rem 0;
    border-radius: 0.75rem;
    font-size: 1rem;
  }
}

.article-content :deep(th) {
  background: #f9fafb;
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 500;
  color: #111827;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #e5e7eb;
}

@media (min-width: 768px) {
  .article-content :deep(th) {
    padding: 1rem 1.5rem;
    font-size: 0.875rem;
  }
}

.article-content :deep(td) {
  padding: 0.75rem 1rem;
  color: #374151;
  font-weight: 300;
  border-bottom: 1px solid #f3f4f6;
  line-height: 1.6;
}

@media (min-width: 768px) {
  .article-content :deep(td) {
    padding: 1rem 1.5rem;
  }
}

.article-content :deep(tr:last-child td) {
  border-bottom: none;
}

.article-content :deep(hr) {
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 2.5rem 0;
}

@media (min-width: 768px) {
  .article-content :deep(hr) {
    margin: 3rem 0;
  }
}

.article-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  margin: 2rem 0;
}

@media (min-width: 768px) {
  .article-content :deep(img) {
    border-radius: 0.75rem;
    margin: 2.5rem 0;
  }
}
</style>