<template>
  <div class="pt-14 md:pt-16">
    <!-- Header -->
    <div class="max-w-6xl mx-auto px-6 md:px-8 mb-16 md:mb-24">
      <p
        class="text-xs uppercase tracking-[0.15em] text-gray-400 font-medium mb-5"
      >
        Portfolio
      </p>
      <h1
        class="text-4xl md:text-5xl lg:text-7xl font-light text-gray-900 tracking-tight leading-tight mb-5"
      >
        Our companies
      </h1>
      <p
        class="text-base md:text-lg text-gray-500 font-light leading-relaxed max-w-xl"
      >
        Brands built with intention — each one solving a real gap in the market.
      </p>
    </div>

    <!-- Loading -->
    <div
      v-if="!companies"
      class="max-w-6xl mx-auto px-6 md:px-8 py-20 text-center"
    >
      <div
        class="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"
      ></div>
    </div>

    <!-- Companies -->
    <div v-else class="max-w-6xl mx-auto px-6 md:px-8 mb-16 md:mb-20">
      <div class="space-y-8">
        <NuxtLink
          v-for="company in companies"
          :key="company._id"
          :to="`/portfolio/${company.slug.current}`"
          class="group block"
        >
          <div
            class="relative rounded-3xl overflow-hidden min-h-[480px] md:min-h-[560px] lg:min-h-[620px]"
            :style="
              !company.cardImage
                ? { background: cardGradient(company.cardColor) }
                : {}
            "
          >
            <!-- Card Image -->
            <img
              v-if="company.cardImage"
              :src="urlFor(company.cardImage).width(1200).auto('format').url()"
              :alt="company.name"
              class="absolute inset-0 w-full h-full object-cover"
            />

            <!-- Ambient glow fallback -->
            <div v-if="!company.cardImage" class="absolute inset-0 opacity-20">
              <div
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/5 blur-3xl"
              ></div>
            </div>

            <div
              class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
            ></div>

            <div
              class="relative h-full min-h-[480px] md:min-h-[560px] lg:min-h-[620px] flex flex-col justify-between p-8 md:p-10 lg:p-14"
            >
              <!-- Top: Metadata -->
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <span
                    class="text-[11px] uppercase tracking-[0.15em] text-white/60 font-medium"
                    >{{ company.category }}</span
                  >
                  <span class="w-1 h-1 rounded-full bg-white/30"></span>
                  <span
                    class="text-[11px] uppercase tracking-[0.15em] text-white/60 font-medium"
                    >Since {{ company.founded }}</span
                  >
                </div>
                <div
                  class="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-colors"
                >
                  <svg
                    class="w-5 h-5 text-white/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
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

              <!-- Bottom: Title + Description -->
              <div>
                <h2
                  class="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight mb-4"
                >
                  {{ company.name }}
                </h2>
                <p
                  class="text-sm md:text-base text-white/70 font-light leading-relaxed max-w-lg"
                >
                  {{ company.tagline }}
                </p>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- Partnership CTA -->
    <div class="max-w-6xl mx-auto px-6 md:px-8 mb-16 md:mb-20">
      <div class="bg-gray-950 rounded-3xl p-10 md:p-14 lg:p-20 text-center">
        <h2
          class="text-3xl md:text-4xl font-light text-white tracking-tight mb-5 leading-tight"
        >
          Partner with us
        </h2>
        <p
          class="text-base text-gray-400 font-light leading-relaxed max-w-lg mx-auto mb-8"
        >
          We're always looking for the next opportunity to build something
          meaningful. Let's talk.
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
</template>

<script setup>
import { useSanityQuery } from "~/composables/useSanity";
import { urlFor } from "~/utils/sanity";

useHead({
  title: "Portfolio - Banzab",
  meta: [
    {
      name: "description",
      content:
        "Explore Banzab's portfolio of food and beverage brands building the future of F&B in Kurdistan.",
    },
  ],
});

const { data: companies } = await useSanityQuery(
  "portfolio-list",
  `*[_type == "portfolioCompany"] | order(sortOrder asc) {
    _id,
    name,
    slug,
    tagline,
    category,
    founded,
    cardImage,
    cardColor
  }`,
);

function cardGradient(color) {
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
</script>
