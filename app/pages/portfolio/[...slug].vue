<template>
  <div v-if="company" class="pt-14 md:pt-16">
    <!-- Back Link + Header -->
    <div class="max-w-6xl mx-auto px-6 md:px-8 mb-16 md:mb-24">
      <NuxtLink
        to="/portfolio"
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
        <span>Portfolio</span>
      </NuxtLink>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-end">
        <!-- Left: Title + Description -->
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
        </div>

        <!-- Right: Metadata -->
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

    <!-- Products / Menu -->
    <div
      v-if="company.productCategories && company.productCategories.length"
      class="max-w-6xl mx-auto px-6 md:px-8 mb-20 md:mb-28"
    >
      <div class="text-center mb-14 md:mb-20">
        <p
          class="text-xs uppercase tracking-[0.15em] text-gray-400 font-medium mb-5"
        >
          Menu
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

      <!-- Category Tabs -->
      <div class="flex flex-wrap justify-center gap-2 mb-12 md:mb-16">
        <button
          v-for="cat in company.productCategories"
          :key="cat._key"
          @click="activeCategory = cat._key"
          :class="[
            'px-5 py-2.5 rounded-full text-sm font-medium transition-all',
            activeCategory === cat._key
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700',
          ]"
        >
          {{ cat.name }}
        </button>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div
          v-for="product in activeProducts"
          :key="product._key"
          class="rounded-2xl border border-gray-100 p-6"
        >
          <div class="flex items-start justify-between mb-4">
            <h3
              class="text-lg font-light text-gray-900 tracking-tight leading-snug pr-4"
            >
              {{ product.name }}
            </h3>
            <span class="text-sm font-light text-gray-400 flex-shrink-0">
              {{
                product.price
                  ? `$${product.price.toFixed(2)}`
                  : product.weight || ""
              }}
            </span>
          </div>
          <p
            v-if="product.description"
            class="text-sm text-gray-500 font-light leading-relaxed mb-5"
          >
            {{ product.description }}
          </p>
          <!-- Ingredients -->
          <div
            v-if="product.ingredients && product.ingredients.length"
            class="flex flex-wrap gap-1.5 mb-5"
          >
            <span
              v-for="ingredient in product.ingredients.slice(0, 4)"
              :key="ingredient"
              class="px-2.5 py-1 bg-gray-50 text-[11px] text-gray-500 font-medium rounded-full"
            >
              {{ ingredient }}
            </span>
            <span
              v-if="product.ingredients.length > 4"
              class="px-2.5 py-1 bg-gray-50 text-[11px] text-gray-400 font-medium rounded-full"
            >
              +{{ product.ingredients.length - 4 }}
            </span>
          </div>
          <!-- Nutrition -->
          <div
            v-if="product.nutrition"
            class="flex items-center gap-5 pt-5 border-t border-gray-100"
          >
            <div v-if="product.nutrition.calories != null">
              <div class="text-sm font-light text-gray-900">
                {{ product.nutrition.calories }}
              </div>
              <div class="text-[10px] uppercase tracking-[0.1em] text-gray-400">
                Cal
              </div>
            </div>
            <div v-if="product.nutrition.protein != null">
              <div class="text-sm font-light text-gray-900">
                {{ product.nutrition.protein }}g
              </div>
              <div class="text-[10px] uppercase tracking-[0.1em] text-gray-400">
                Protein
              </div>
            </div>
            <div v-if="product.nutrition.fiber != null">
              <div class="text-sm font-light text-gray-900">
                {{ product.nutrition.fiber }}g
              </div>
              <div class="text-[10px] uppercase tracking-[0.1em] text-gray-400">
                Fiber
              </div>
            </div>
            <div v-if="product.nutrition.sugar != null">
              <div class="text-sm font-light text-gray-900">
                {{ product.nutrition.sugar }}g
              </div>
              <div class="text-[10px] uppercase tracking-[0.1em] text-gray-400">
                Sugar
              </div>
            </div>
          </div>
        </div>
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
        <NuxtLink
          to="/contact"
          class="inline-flex items-center gap-3 text-white border border-white/30 px-8 py-3.5 rounded-full text-sm font-medium hover:bg-white/10 hover:border-white/50 transition-all"
        >
          <span>Get in Touch</span>
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
        to="/portfolio"
        class="inline-block bg-gray-900 text-white px-8 py-3.5 text-sm font-medium hover:bg-gray-800 transition-colors rounded-full"
      >
        Browse Portfolio
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useSanityQuery } from "~/composables/useSanity";

const route = useRoute();
const slug = Array.isArray(route.params.slug)
  ? route.params.slug.join("/")
  : route.params.slug;

const { data: company } = await useSanityQuery(
  `portfolio-${slug}`,
  `*[_type == "portfolioCompany" && slug.current == $slug][0] {
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
    aboutHeading,
    aboutBody,
    highlights,
    productSectionTitle,
    productSectionSubtitle,
    productCategories,
    ctaHeading,
    ctaDescription
  }`,
  { slug },
);

const activeCategory = ref("");

watchEffect(() => {
  if (company.value?.productCategories?.length && !activeCategory.value) {
    activeCategory.value = company.value.productCategories[0]._key;
  }
});

const activeProducts = computed(() => {
  if (!company.value?.productCategories) return [];
  const cat = company.value.productCategories.find(
    (c) => c._key === activeCategory.value,
  );
  return cat?.products || [];
});

function extractText(block) {
  if (!block.children) return "";
  return block.children.map((child) => child.text).join("");
}

useHead({
  title: computed(() =>
    company.value
      ? `${company.value.name} - Banzab Portfolio`
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
