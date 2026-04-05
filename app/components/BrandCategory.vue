<template>
  <div v-if="category" class="pt-14 md:pt-16">
    <!-- Breadcrumb -->
    <div class="max-w-6xl mx-auto px-6 md:px-8 mb-16 md:mb-24">
      <div
        class="flex items-center gap-2 text-sm text-gray-400 font-light mb-6"
      >
        <NuxtLink to="/brands" class="hover:text-gray-900 transition-colors">
          Brands
        </NuxtLink>
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
          class="w-3.5 h-3.5"
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
        <span class="text-gray-900">{{ category.name }}</span>
      </div>

      <h1
        class="text-4xl md:text-5xl lg:text-7xl font-light text-gray-900 tracking-tight leading-[1.05] mb-5"
      >
        {{ category.name }}
      </h1>
      <p
        v-if="category.description"
        class="text-base md:text-lg text-gray-500 font-light leading-relaxed max-w-xl"
      >
        {{ category.description }}
      </p>
    </div>

    <!-- Products Grid -->
    <div
      v-if="category.products && category.products.length"
      class="max-w-6xl mx-auto px-6 md:px-8 mb-20 md:mb-28"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          v-for="product in category.products"
          :key="product._key"
          :to="`/brands/${brandSlug}/${categorySlug}/${product.slug.current}`"
          class="group block"
        >
          <div class="rounded-2xl overflow-hidden">
            <!-- Product Image / Gradient -->
            <div
              class="relative aspect-[4/3] overflow-hidden rounded-2xl"
              :style="!product.image ? { background: productGradient(product.color) } : {}"
            >
              <img
                v-if="product.image"
                :src="urlFor(product.image).width(600).auto('format').url()"
                :alt="product.name"
                class="absolute inset-0 w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
              <div
                v-else
                class="absolute inset-0 flex items-center justify-center"
              >
                <span class="text-white/20 text-6xl font-light">
                  {{ product.name.charAt(0) }}
                </span>
              </div>
            </div>

            <!-- Product Info -->
            <div class="pt-5">
              <div class="flex items-center justify-between mb-2">
                <h3
                  class="text-lg font-light text-gray-900 tracking-tight group-hover:text-gray-500 transition-colors"
                >
                  {{ product.name }}
                </h3>
                <span
                  v-if="product.weight"
                  class="text-xs text-gray-400 font-medium"
                >
                  {{ product.weight }}
                </span>
              </div>
              <p
                v-if="product.description"
                class="text-sm text-gray-500 font-light leading-relaxed mb-3 line-clamp-2"
              >
                {{ product.description }}
              </p>
              <div
                v-if="product.healthBenefits && product.healthBenefits.length"
                class="flex flex-wrap gap-1.5"
              >
                <span
                  v-for="benefit in product.healthBenefits.slice(0, 3)"
                  :key="benefit"
                  class="px-2.5 py-1 bg-gray-50 text-[11px] text-gray-500 font-medium rounded-full"
                >
                  {{ benefit }}
                </span>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- Other Categories -->
    <div
      v-if="otherCategories && otherCategories.length"
      class="max-w-6xl mx-auto px-6 md:px-8 mb-16 md:mb-20"
    >
      <p
        class="text-xs uppercase tracking-[0.15em] text-gray-400 font-medium mb-8"
      >
        More from {{ brandName }}
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          v-for="cat in otherCategories"
          :key="cat._key"
          :to="`/brands/${brandSlug}/${cat.slug.current}`"
          class="group block"
        >
          <div
            class="rounded-2xl border border-gray-100 p-6 hover:border-gray-300 transition-colors"
          >
            <div class="flex items-center justify-between">
              <h3 class="text-base font-light text-gray-900 tracking-tight">
                {{ cat.name }}
              </h3>
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
            <span class="text-xs text-gray-400 font-medium">
              {{ cat.products?.length || 0 }}
              {{ cat.products?.length === 1 ? "product" : "products" }}
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>

  <!-- 404 -->
  <div v-else-if="category === null" class="pt-14 md:pt-16">
    <div class="max-w-6xl mx-auto px-6 md:px-8 py-20 text-center">
      <h1
        class="text-3xl md:text-4xl font-light text-gray-900 tracking-tight mb-5"
      >
        Category not found
      </h1>
      <p class="text-base text-gray-500 font-light mb-8">
        The category you're looking for doesn't exist or has been moved.
      </p>
      <NuxtLink
        :to="`/brands/${brandSlug}`"
        class="inline-block bg-gray-900 text-white px-8 py-3.5 text-sm font-medium hover:bg-gray-800 transition-colors rounded-full"
      >
        Back to Brand
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
});

const { data: brand } = await useSanityQuery(
  `brand-cat-${props.brandSlug}-${props.categorySlug}`,
  `*[_type == "brand" && slug.current == $brandSlug][0] {
    name,
    productCategories[] {
      _key,
      name,
      slug,
      description,
      products[] {
        _key,
        name,
        slug,
        description,
        image,
        color,
        weight,
        healthBenefits
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

const otherCategories = computed(() => {
  if (!brand.value?.productCategories) return [];
  return brand.value.productCategories.filter(
    (c) => c.slug?.current !== props.categorySlug,
  );
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

useHead({
  title: computed(() =>
    category.value
      ? `${category.value.name} - ${brandName.value} - Banzab`
      : "Category Not Found - Banzab",
  ),
  meta: computed(() => [
    {
      name: "description",
      content: category.value?.description || "Category not found",
    },
  ]),
});
</script>
