<template>
  <div v-if="product" class="pt-14 md:pt-16">
    <!-- Breadcrumb -->
    <div class="max-w-6xl mx-auto px-6 md:px-8 mb-12 md:mb-16">
      <div
        class="flex items-center gap-2 text-sm text-gray-400 font-light mb-6 flex-wrap"
      >
        <NuxtLink to="/brands" class="hover:text-gray-900 transition-colors">
          Brands
        </NuxtLink>
        <svg
          class="w-3.5 h-3.5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M9 5l7 7-7 7"
          />
        </svg>
        <NuxtLink
          :to="`/brands/${brandSlug}`"
          class="hover:text-gray-900 transition-colors"
        >
          {{ brandName }}
        </NuxtLink>
        <svg
          class="w-3.5 h-3.5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M9 5l7 7-7 7"
          />
        </svg>
        <NuxtLink
          :to="`/brands/${brandSlug}/${categorySlug}`"
          class="hover:text-gray-900 transition-colors"
        >
          {{ categoryName }}
        </NuxtLink>
        <svg
          class="w-3.5 h-3.5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M9 5l7 7-7 7"
          />
        </svg>
        <span class="text-gray-900">{{ product.name }}</span>
      </div>
    </div>

    <!-- Hero: Image + Info -->
    <div class="max-w-6xl mx-auto px-6 md:px-8 mb-20 md:mb-28">
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center"
      >
        <!-- Product Image -->
        <div
          class="relative aspect-square rounded-3xl overflow-hidden"
          :style="{ background: productGradient(product.color) }"
        >
          <img
            v-if="product.image"
            :src="urlFor(product.image).width(800).auto('format').url()"
            :alt="product.name"
            class="absolute inset-0 w-full h-full object-cover"
          />
          <div v-else class="absolute inset-0 flex items-center justify-center">
            <span class="text-white/10 text-[10rem] font-light leading-none">
              {{ product.name.charAt(0) }}
            </span>
          </div>
        </div>

        <!-- Product Info -->
        <div>
          <div class="flex items-center gap-3 mb-4">
            <span
              class="text-[11px] uppercase tracking-[0.15em] text-gray-400 font-medium"
            >
              {{ categoryName }}
            </span>
            <span
              v-if="product.weight"
              class="w-1 h-1 rounded-full bg-gray-300"
            ></span>
            <span
              v-if="product.weight"
              class="text-[11px] uppercase tracking-[0.15em] text-gray-400 font-medium"
            >
              {{ product.weight }}
            </span>
          </div>

          <h1
            class="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 tracking-tight leading-[1.1] mb-5"
          >
            {{ product.name }}
          </h1>

          <p
            v-if="product.description"
            class="text-base md:text-lg text-gray-500 font-light leading-relaxed mb-8"
          >
            {{ product.description }}
          </p>

          <!-- Health Benefits -->
          <div
            v-if="product.healthBenefits && product.healthBenefits.length"
            class="mb-8"
          >
            <p
              class="text-[11px] uppercase tracking-[0.12em] text-gray-400 font-medium mb-3"
            >
              Health Benefits
            </p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="benefit in product.healthBenefits"
                :key="benefit"
                class="px-3 py-1.5 bg-gray-50 text-xs text-gray-600 font-medium rounded-full"
              >
                {{ benefit }}
              </span>
            </div>
          </div>

          <!-- Ingredients -->
          <div
            v-if="product.ingredients && product.ingredients.length"
            class="mb-8"
          >
            <p
              class="text-[11px] uppercase tracking-[0.12em] text-gray-400 font-medium mb-3"
            >
              Ingredients
            </p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="ingredient in product.ingredients"
                :key="ingredient"
                class="px-3 py-1.5 border border-gray-100 text-xs text-gray-500 font-medium rounded-full"
              >
                {{ ingredient }}
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Key Nutrition Info (dynamic) -->
    <div
      v-if="nutritionDisplay.length"
      class="max-w-6xl mx-auto px-6 md:px-8 mb-20 md:mb-28"
    >
      <div class="flex items-baseline gap-3 mb-8">
        <p
          class="text-xs uppercase tracking-[0.15em] text-gray-400 font-medium"
        >
          {{ product.nutritionSectionTitle || 'Key Nutrition Info' }}
        </p>
        <span
          v-if="product.nutritionServingNote"
          class="text-[11px] text-gray-300 font-light"
        >
          {{ product.nutritionServingNote }}
        </span>
      </div>
      <div
        class="grid gap-px bg-gray-200 rounded-2xl overflow-hidden"
        :class="nutritionGridCols"
      >
        <div
          v-for="item in nutritionDisplay"
          :key="item.label"
          class="bg-white p-6 text-center"
        >
          <div class="text-2xl font-light text-gray-900 mb-1">
            {{ item.value }}<span class="text-base text-gray-400 ml-0.5">{{ item.unit }}</span>
          </div>
          <div
            class="text-[11px] uppercase tracking-[0.12em] text-gray-400 font-medium"
          >
            {{ item.label }}
          </div>
        </div>
      </div>
    </div>

    <!-- Product Gallery -->
    <div
      v-if="product.productGallery && product.productGallery.length"
      class="max-w-6xl mx-auto px-6 md:px-8 mb-20 md:mb-28"
    >
      <p
        class="text-xs uppercase tracking-[0.15em] text-gray-400 font-medium mb-8"
      >
        Gallery
      </p>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        <div
          v-for="(photo, idx) in product.productGallery"
          :key="photo._key || idx"
          class="relative aspect-[4/3] rounded-2xl overflow-hidden"
        >
          <img
            :src="urlFor(photo).width(600).auto('format').url()"
            :alt="photo.alt || `${product.name} photo ${idx + 1}`"
            class="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </div>

    <!-- Serving Instructions -->
    <div
      v-if="product.servingInstructions && product.servingInstructions.length"
      class="max-w-6xl mx-auto px-6 md:px-8 mb-20 md:mb-28"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        <div>
          <p
            class="text-xs uppercase tracking-[0.15em] text-gray-400 font-medium mb-5"
          >
            How to enjoy
          </p>
          <h2
            class="text-3xl md:text-4xl font-light text-gray-900 tracking-tight leading-tight"
          >
            Serving instructions
          </h2>
        </div>
        <div class="space-y-6">
          <div
            v-for="(step, index) in product.servingInstructions"
            :key="step._key"
            class="flex gap-5"
          >
            <div
              class="flex-shrink-0 w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center"
            >
              <span class="text-sm font-light text-gray-900">
                {{ String(index + 1).padStart(2, "0") }}
              </span>
            </div>
            <div class="pt-1.5">
              <h3 class="text-base font-medium text-gray-900 mb-1">
                {{ step.title }}
              </h3>
              <p
                v-if="step.description"
                class="text-sm text-gray-500 font-light leading-relaxed"
              >
                {{ step.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Other Products in Category -->
    <div
      v-if="otherProducts && otherProducts.length"
      class="max-w-6xl mx-auto px-6 md:px-8 mb-20 md:mb-28"
    >
      <p
        class="text-xs uppercase tracking-[0.15em] text-gray-400 font-medium mb-8"
      >
        More {{ categoryName }}
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          v-for="p in otherProducts"
          :key="p._key"
          :to="`/brands/${brandSlug}/${categorySlug}/${p.slug?.current}`"
          class="group block"
        >
          <div class="rounded-2xl overflow-hidden">
            <div
              class="relative aspect-[4/3] overflow-hidden rounded-2xl"
              :style="{ background: productGradient(p.color) }"
            >
              <img
                v-if="p.image"
                :src="urlFor(p.image).width(600).auto('format').url()"
                :alt="p.name"
                class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div
                v-else
                class="absolute inset-0 flex items-center justify-center"
              >
                <span class="text-white/20 text-6xl font-light">{{
                  p.name.charAt(0)
                }}</span>
              </div>
            </div>
            <div class="pt-5">
              <h3
                class="text-lg font-light text-gray-900 tracking-tight group-hover:text-gray-500 transition-colors mb-1"
              >
                {{ p.name }}
              </h3>
              <span v-if="p.weight" class="text-xs text-gray-400 font-medium">{{
                p.weight
              }}</span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- Related Insights -->
    <div
      v-if="product.relatedArticles && product.relatedArticles.length"
      class="max-w-6xl mx-auto px-6 md:px-8 mb-16 md:mb-20"
    >
      <p
        class="text-xs uppercase tracking-[0.15em] text-gray-400 font-medium mb-8"
      >
        Insights
      </p>
      <div class="space-y-4">
        <NuxtLink
          v-for="article in product.relatedArticles"
          :key="article._id"
          :to="`/newsroom/${article.slug.current}`"
          class="group block rounded-2xl border border-gray-100 p-6 md:p-8 hover:border-gray-300 transition-colors"
        >
          <div class="flex items-start justify-between gap-6">
            <div>
              <div class="flex items-center gap-3 mb-3">
                <span
                  class="text-[11px] uppercase tracking-[0.15em] text-gray-400 font-medium"
                >
                  {{ article.category }}
                </span>
                <span class="w-1 h-1 rounded-full bg-gray-300"></span>
                <span class="text-[11px] text-gray-400 font-medium">
                  {{ formatDate(article.date) }}
                </span>
              </div>
              <h3
                class="text-lg font-light text-gray-900 tracking-tight group-hover:text-gray-500 transition-colors mb-2"
              >
                {{ article.title }}
              </h3>
              <p
                class="text-sm text-gray-500 font-light leading-relaxed line-clamp-2"
              >
                {{ article.description }}
              </p>
            </div>
            <div
              class="flex-shrink-0 w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-gray-50 transition-colors"
            >
              <svg
                class="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
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
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>

  <!-- 404 -->
  <div v-else-if="product === null" class="pt-14 md:pt-16">
    <div class="max-w-6xl mx-auto px-6 md:px-8 py-20 text-center">
      <h1
        class="text-3xl md:text-4xl font-light text-gray-900 tracking-tight mb-5"
      >
        Product not found
      </h1>
      <p class="text-base text-gray-500 font-light mb-8">
        The product you're looking for doesn't exist or has been moved.
      </p>
      <NuxtLink
        :to="`/brands/${brandSlug}/${categorySlug}`"
        class="inline-block bg-gray-900 text-white px-8 py-3.5 text-sm font-medium hover:bg-gray-800 transition-colors rounded-full"
      >
        Back to Category
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
  categorySlug: {
    type: String,
    required: true,
  },
  productSlug: {
    type: String,
    required: true,
  },
});

const { data: brand } = await useSanityQuery(
  `brand-prod-${props.brandSlug}-${props.categorySlug}-${props.productSlug}`,
  `*[_type == "brand" && slug.current == $brandSlug][0] {
    name,
    productCategories[] {
      _key,
      name,
      slug,
      products[] {
        _key,
        name,
        slug,
        description,
        image,
        color,
        weight,
        price,
        healthBenefits,
        ingredients,
        nutritionSectionTitle,
        nutritionServingNote,
        nutritionItems,
        servingInstructions,
        productGallery,
        "relatedArticles": relatedArticles[]-> {
          _id,
          title,
          slug,
          description,
          date,
          category
        }
      }
    }
  }`,
  { brandSlug: props.brandSlug },
);

const brandName = computed(() => brand.value?.name || "");

const category = computed(() => {
  if (!brand.value?.productCategories) return null;
  return (
    brand.value.productCategories.find(
      (c) => c.slug?.current === props.categorySlug,
    ) || null
  );
});

const categoryName = computed(() => category.value?.name || "");

const product = computed(() => {
  if (!category.value?.products) return null;
  return (
    category.value.products.find(
      (p) => p.slug?.current === props.productSlug,
    ) || null
  );
});

const otherProducts = computed(() => {
  if (!category.value?.products) return [];
  return category.value.products.filter(
    (p) => p.slug?.current !== props.productSlug,
  );
});

const nutritionDisplay = computed(() => {
  if (!product.value?.nutritionItems?.length) return [];
  return product.value.nutritionItems.map((item) => ({
    label: item.label,
    value: item.value,
    unit: item.unit,
  }));
});

const nutritionGridCols = computed(() => {
  const count = nutritionDisplay.value.length;
  if (count <= 3) return 'grid-cols-2 md:grid-cols-3';
  if (count <= 4) return 'grid-cols-2 md:grid-cols-4';
  if (count <= 5) return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5';
  return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6';
});

function productGradient(color) {
  const hex = color?.hex || "#1a1a2e";
  return `linear-gradient(135deg, ${hex} 0%, ${adjustBrightness(hex, -30)} 50%, #111827 100%)`;
}

function adjustBrightness(hex, amount) {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amount));
  const b = Math.max(0, Math.min(255, (num & 0x0000ff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

useHead({
  title: computed(() =>
    product.value
      ? `${product.value.name} - ${brandName.value} - Banzab`
      : "Product Not Found - Banzab",
  ),
  meta: computed(() => [
    {
      name: "description",
      content: product.value?.description || "Product not found",
    },
  ]),
});
</script>
