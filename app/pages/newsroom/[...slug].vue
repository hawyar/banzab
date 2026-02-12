<template>
  <div v-if="article" class="pt-14 md:pt-16">
    <!-- Back -->
    <div class="max-w-3xl mx-auto px-6 md:px-8 mb-8">
      <NuxtLink
        to="/newsroom"
        class="inline-flex items-center gap-2 text-sm text-gray-400 font-light hover:text-gray-900 transition-colors"
      >
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M7 17l-4-4m0 0l4-4m-4 4h18"
          />
        </svg>
        <span>Newsroom</span>
      </NuxtLink>
    </div>

    <!-- Article Header - Centered -->
    <div class="max-w-3xl mx-auto px-6 md:px-8 text-center mb-12 md:mb-16">
      <div class="flex items-center justify-center gap-3 mb-6">
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

      <h1
        class="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 tracking-tight leading-tight mb-6"
      >
        {{ article.title }}
      </h1>

      <p
        v-if="article.description"
        class="text-base md:text-lg text-gray-500 font-light leading-relaxed max-w-xl mx-auto mb-6"
      >
        {{ article.description }}
      </p>

      <p v-if="article.author" class="text-xs text-gray-400 font-light">
        By {{ article.author }}
      </p>
    </div>

    <!-- Divider -->
    <div class="max-w-3xl mx-auto px-6 md:px-8">
      <div class="w-full h-px bg-gray-200 mb-12 md:mb-14"></div>
    </div>

    <!-- Article Body -->
    <div class="max-w-2xl mx-auto px-6 md:px-8 mb-20 md:mb-28">
      <div class="article-content">
        <template v-for="block in article.content" :key="block._key">
          <!-- Headings -->
          <h2 v-if="block._type === 'block' && block.style === 'h2'">
            {{ extractText(block) }}
          </h2>
          <h3 v-else-if="block._type === 'block' && block.style === 'h3'">
            {{ extractText(block) }}
          </h3>
          <!-- Blockquote -->
          <blockquote
            v-else-if="block._type === 'block' && block.style === 'blockquote'"
          >
            {{ extractText(block) }}
          </blockquote>
          <!-- Image -->
          <figure
            v-else-if="block._type === 'image' && block.asset"
            class="my-8"
          >
            <img
              :src="urlFor(block).width(800).auto('format').url()"
              :alt="block.alt || ''"
              class="w-full rounded-xl"
            />
            <figcaption
              v-if="block.caption"
              class="text-xs text-gray-400 font-light mt-3 text-center"
            >
              {{ block.caption }}
            </figcaption>
          </figure>
          <!-- Normal paragraph -->
          <p
            v-else-if="block._type === 'block'"
            v-html="renderBlock(block)"
          ></p>
        </template>
      </div>
    </div>

    <!-- Related Articles -->
    <div
      v-if="relatedArticles && relatedArticles.length > 0"
      class="max-w-3xl mx-auto px-6 md:px-8 mb-16 md:mb-20"
    >
      <div class="border-t border-gray-200 pt-12 md:pt-14">
        <p
          class="text-xs uppercase tracking-[0.15em] text-gray-400 font-medium text-center mb-10"
        >
          More from the newsroom
        </p>
        <div>
          <article
            v-for="related in relatedArticles"
            :key="related._id"
            class="group cursor-pointer border-b border-gray-200 py-8 md:py-10"
            @click="navigateTo(`/newsroom/${related.slug.current}`)"
          >
            <div class="flex items-center gap-3 mb-3">
              <time
                :datetime="related.date"
                class="text-[11px] uppercase tracking-[0.12em] text-gray-400 font-medium"
              >
                {{ formatDate(related.date) }}
              </time>
              <span
                v-if="related.category"
                class="w-1 h-1 rounded-full bg-gray-300"
              ></span>
              <span
                v-if="related.category"
                class="text-[11px] uppercase tracking-[0.12em] text-gray-400 font-medium"
              >
                {{ related.category }}
              </span>
            </div>
            <h3
              class="text-xl md:text-2xl font-light text-gray-900 tracking-tight leading-snug mb-2 group-hover:text-gray-500 transition-colors"
            >
              {{ related.title }}
            </h3>
            <p class="text-sm text-gray-500 font-light leading-relaxed">
              {{ related.description }}
            </p>
          </article>
        </div>
      </div>
    </div>
  </div>

  <!-- 404 -->
  <div v-else-if="article === null" class="pt-14 md:pt-16">
    <div class="max-w-3xl mx-auto px-6 md:px-8 py-20 text-center">
      <h1
        class="text-3xl md:text-4xl font-light text-gray-900 tracking-tight mb-5"
      >
        Article not found
      </h1>
      <p class="text-base text-gray-500 font-light mb-8">
        The article you're looking for doesn't exist or has been moved.
      </p>
      <NuxtLink
        to="/newsroom"
        class="inline-block bg-gray-900 text-white px-8 py-3.5 text-sm font-medium hover:bg-gray-800 transition-colors rounded-full"
      >
        Browse Newsroom
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useSanityQuery } from "~/composables/useSanity";
import { urlFor } from "~/utils/sanity";

const route = useRoute();
const slug = Array.isArray(route.params.slug)
  ? route.params.slug.join("/")
  : route.params.slug;

const { data: article } = await useSanityQuery(
  `newsroom-${slug}`,
  `*[_type == "newsroomArticle" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    date,
    category,
    author,
    content
  }`,
  { slug },
);

const { data: relatedArticles } = await useSanityQuery(
  `newsroom-related-${slug}`,
  `*[_type == "newsroomArticle" && slug.current != $slug] | order(date desc) [0...2] {
    _id,
    title,
    slug,
    description,
    date,
    category
  }`,
  { slug },
);

function extractText(block) {
  if (!block.children) return "";
  return block.children.map((child) => child.text).join("");
}

function renderBlock(block) {
  if (!block.children) return "";
  return block.children
    .map((child) => {
      let text = child.text || "";
      // Escape HTML
      text = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      if (child.marks && child.marks.includes("strong")) {
        text = `<strong>${text}</strong>`;
      }
      if (child.marks && child.marks.includes("em")) {
        text = `<em>${text}</em>`;
      }
      // Handle link annotations
      if (child.marks) {
        child.marks.forEach((mark) => {
          const markDef = block.markDefs?.find((m) => m._key === mark);
          if (markDef && markDef._type === "link") {
            text = `<a href="${markDef.href}" target="_blank" rel="noopener">${text}</a>`;
          }
        });
      }
      return text;
    })
    .join("");
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
      content: article.value ? article.value.description : "Article not found",
    },
  ]),
});
</script>

<style>
.article-content h2 {
  font-size: 1.5rem;
  font-weight: 300;
  color: #111827;
  letter-spacing: -0.025em;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
}

.article-content h3 {
  font-size: 1.25rem;
  font-weight: 300;
  color: #111827;
  letter-spacing: -0.025em;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}

.article-content p {
  font-size: 1.05rem;
  font-weight: 300;
  color: #6b7280;
  line-height: 1.85;
  margin-bottom: 1.25rem;
}

.article-content strong {
  font-weight: 500;
  color: #111827;
}

.article-content em {
  font-style: italic;
}

.article-content blockquote {
  border-left: 2px solid #e5e7eb;
  padding-left: 1.5rem;
  margin: 2rem 0;
  font-style: italic;
  color: #9ca3af;
  font-size: 1.05rem;
  line-height: 1.85;
}

.article-content a {
  color: #111827;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.article-content a:hover {
  color: #6b7280;
}
</style>
