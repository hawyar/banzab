<template>
  <div v-if="company" class="pt-14 md:pt-16">
    <!-- Back Link + Header -->
    <div class="max-w-6xl mx-auto px-6 md:px-8 mb-16 md:mb-24">
      <NuxtLink
        to="/brands"
        class="inline-flex items-center gap-2 text-sm text-gray-400 font-light hover:text-gray-900 transition-colors mb-6"
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
        <span>Brands</span>
      </NuxtLink>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-end">
        <div class="md:col-span-7">
          <div class="flex items-center gap-3 mb-5">
            <span
              class="text-[11px] uppercase tracking-[0.15em] text-gray-400 font-medium"
              >{{ company.category }}</span
            >
            <span class="w-1 h-1 rounded-full bg-gray-300"></span>
            <span
              class="text-[11px] uppercase tracking-[0.15em] text-gray-400 font-medium"
              >{{ company.founded }}</span
            >
          </div>

          <h1
            class="text-4xl md:text-5xl lg:text-7xl font-light text-gray-900 tracking-tight leading-[1.05] mb-6"
          >
            {{ company.name }}
          </h1>

          <p
            class="text-base md:text-lg text-gray-500 font-light leading-relaxed max-w-xl"
          >
            {{ company.description }}
          </p>

          <!-- Instagram Link -->
          <a
            v-if="company.instagramUrl"
            :href="company.instagramUrl"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-2 mt-6 border border-gray-200 px-4 py-2 rounded-full text-sm font-light text-gray-500 hover:text-gray-900 hover:border-gray-400 transition-colors"
          >
            <svg
              class="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle
                cx="17.5"
                cy="6.5"
                r="1"
                fill="currentColor"
                stroke="none"
              />
            </svg>
            <span>Follow on Instagram</span>
            <svg
              class="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M7 17L17 7M17 7H7M17 7v10"
              />
            </svg>
          </a>
        </div>

        <div class="md:col-span-5">
          <div class="grid grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <div
                class="text-[11px] uppercase tracking-[0.12em] text-gray-400 font-medium mb-1.5"
              >
                Sector
              </div>
              <div class="text-sm text-gray-900 font-light">
                {{ company.sector }}
              </div>
            </div>
            <div>
              <div
                class="text-[11px] uppercase tracking-[0.12em] text-gray-400 font-medium mb-1.5"
              >
                Founded
              </div>
              <div class="text-sm text-gray-900 font-light">
                {{ company.founded }}
              </div>
            </div>
            <div>
              <div
                class="text-[11px] uppercase tracking-[0.12em] text-gray-400 font-medium mb-1.5"
              >
                Location
              </div>
              <div class="text-sm text-gray-900 font-light">
                {{ company.location }}
              </div>
            </div>
            <div v-if="company.metaLabel && company.metaValue">
              <div
                class="text-[11px] uppercase tracking-[0.12em] text-gray-400 font-medium mb-1.5"
              >
                {{ company.metaLabel }}
              </div>
              <div class="text-sm text-gray-900 font-light">
                {{ company.metaValue }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- About -->
    <div
      v-if="company.aboutHeading || company.aboutBody"
      class="max-w-6xl mx-auto px-6 md:px-8 mb-20 md:mb-28"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        <div>
          <p
            class="text-xs uppercase tracking-[0.15em] text-gray-400 font-medium mb-5"
          >
            About
          </p>
          <h2
            class="text-3xl md:text-4xl font-light text-gray-900 tracking-tight leading-tight"
          >
            {{ company.aboutHeading }}
          </h2>
        </div>
        <div v-if="company.aboutBody">
          <template v-for="block in company.aboutBody" :key="block._key">
            <p class="text-base text-gray-500 font-light leading-relaxed mb-6">
              {{ extractText(block) }}
            </p>
          </template>
        </div>
      </div>
    </div>

    <!-- Gallery -->
    <div
      v-if="company.galleryImages && company.galleryImages.length"
      class="max-w-6xl mx-auto px-6 md:px-8 mb-20 md:mb-28"
    >
      <p
        class="text-xs uppercase tracking-[0.15em] text-gray-400 font-medium mb-8"
      >
        Gallery
      </p>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        <div
          v-for="(image, index) in company.galleryImages"
          :key="image._key"
          class="overflow-hidden rounded-2xl"
          :class="index === 0 ? 'col-span-2 row-span-2' : ''"
        >
          <img
            :src="
              urlFor(image)
                .width(index === 0 ? 1200 : 600)
                .height(index === 0 ? 800 : 400)
                .auto('format')
                .url()
            "
            :alt="image.alt || company.name"
            class="w-full h-full object-cover aspect-[3/2] hover:scale-105 transition-transform duration-500"
            :class="index === 0 ? 'aspect-auto min-h-full' : ''"
          />
        </div>
      </div>
    </div>

    <!-- Highlights -->
    <div
      v-if="company.highlights && company.highlights.length"
      class="max-w-6xl mx-auto px-6 md:px-8 mb-20 md:mb-28"
    >
      <div
        class="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200 rounded-2xl overflow-hidden"
      >
        <div
          v-for="(highlight, index) in company.highlights"
          :key="highlight._key"
          class="bg-white p-8 md:p-10 text-center"
        >
          <div
            class="inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 mb-5"
          >
            <span class="text-sm font-light text-gray-900">{{
              String(index + 1).padStart(2, "0")
            }}</span>
          </div>
          <h3 class="text-lg font-light text-gray-900 tracking-tight mb-2">
            {{ highlight.title }}
          </h3>
          <p class="text-sm text-gray-500 font-light leading-relaxed">
            {{ highlight.description }}
          </p>
        </div>
      </div>
    </div>

    <!-- Product Categories -->
    <div
      v-if="company.productCategories && company.productCategories.length"
      class="max-w-6xl mx-auto px-6 md:px-8 mb-20 md:mb-28"
    >
      <div class="text-center mb-14 md:mb-20">
        <p
          class="text-xs uppercase tracking-[0.15em] text-gray-400 font-medium mb-5"
        >
          Products
        </p>
        <h2
          class="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 tracking-tight leading-tight mb-5"
        >
          {{ company.productSectionTitle || "Our products" }}
        </h2>
        <p
          v-if="company.productSectionSubtitle"
          class="text-base text-gray-500 font-light max-w-lg mx-auto"
        >
          {{ company.productSectionSubtitle }}
        </p>
      </div>

      <!-- Category Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          v-for="cat in company.productCategories"
          :key="cat._key"
          :to="`/brands/${brandSlug}/${cat.slug.current}`"
          class="group block"
        >
          <div
            class="rounded-2xl border border-gray-100 p-8 hover:border-gray-300 transition-colors"
          >
            <div class="flex items-center justify-between mb-5">
              <h3 class="text-lg font-light text-gray-900 tracking-tight">
                {{ cat.name }}
              </h3>
              <div
                class="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-gray-50 transition-colors"
              >
                <svg
                  class="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </div>
            <p
              v-if="cat.description"
              class="text-sm text-gray-500 font-light leading-relaxed mb-4"
            >
              {{ cat.description }}
            </p>
            <span class="text-xs text-gray-400 font-medium">
              {{ cat.products?.length || 0 }}
              {{ cat.products?.length === 1 ? "product" : "products" }}
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- CTA -->
    <div
      v-if="company.ctaHeading"
      class="max-w-6xl mx-auto px-6 md:px-8 mb-16 md:mb-20"
    >
      <div class="bg-gray-950 rounded-3xl p-10 md:p-14 lg:p-20 text-center">
        <h2
          class="text-3xl md:text-4xl font-light text-white tracking-tight mb-5 leading-tight"
        >
          {{ company.ctaHeading }}
        </h2>
        <p
          v-if="company.ctaDescription"
          class="text-base text-gray-400 font-light leading-relaxed max-w-lg mx-auto mb-8"
        >
          {{ company.ctaDescription }}
        </p>
        <a
          v-if="isExternalCtaLink"
          :href="company.ctaButtonLink"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center gap-3 text-white border border-white/30 px-8 py-3.5 rounded-full text-sm font-medium hover:bg-white/10 hover:border-white/50 transition-all"
        >
          <span>{{ company.ctaButtonText || "Get in Touch" }}</span>
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
              d="M7 17L17 7M17 7H7M17 7v10"
            />
          </svg>
        </a>
        <NuxtLink
          v-else
          :to="company.ctaButtonLink || '/contact'"
          class="inline-flex items-center gap-3 text-white border border-white/30 px-8 py-3.5 rounded-full text-sm font-medium hover:bg-white/10 hover:border-white/50 transition-all"
        >
          <span>{{ company.ctaButtonText || "Get in Touch" }}</span>
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
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </div>

  <!-- 404 -->
  <div v-else-if="company === null" class="pt-14 md:pt-16">
    <div class="max-w-6xl mx-auto px-6 md:px-8 py-20 text-center">
      <h1
        class="text-3xl md:text-4xl font-light text-gray-900 tracking-tight mb-5"
      >
        Company not found
      </h1>
      <p class="text-base text-gray-500 font-light mb-8">
        The company you're looking for doesn't exist or has been moved.
      </p>
      <NuxtLink
        to="/brands"
        class="inline-block bg-gray-900 text-white px-8 py-3.5 text-sm font-medium hover:bg-gray-800 transition-colors rounded-full"
      >
        Browse Brands
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useSanityQuery } from "~/composables/useSanity";
import { urlFor } from "~/utils/sanity";

const props = defineProps({
  brandSlug: {
    type: String,
    required: true,
  },
});

const { data: company } = await useSanityQuery(
  `brand-${props.brandSlug}`,
  `*[_type == "brand" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    tagline,
    description,
    sector,
    category,
    founded,
    location,
    metaLabel,
    metaValue,
    instagramUrl,
    aboutHeading,
    aboutBody,
    highlights,
    productSectionTitle,
    productSectionSubtitle,
    galleryImages[] {
      _key,
      alt,
      asset
    },
    productCategories[] {
      _key,
      name,
      slug,
      description,
      "productCount": count(products),
      products
    },
    ctaHeading,
    ctaDescription,
    ctaButtonText,
    ctaButtonLink
  }`,
  { slug: props.brandSlug },
);

function extractText(block) {
  if (!block.children) return "";
  return block.children.map((child) => child.text).join("");
}

const isExternalCtaLink = computed(() => {
  const link = company.value?.ctaButtonLink;
  if (!link) return false;
  return link.startsWith("http://") || link.startsWith("https://");
});

useHead({
  title: computed(() =>
    company.value
      ? `${company.value.name} - Banzab Brands`
      : "Company Not Found - Banzab",
  ),
  meta: computed(() => [
    {
      name: "description",
      content: company.value ? company.value.description : "Company not found",
    },
  ]),
});
</script>
