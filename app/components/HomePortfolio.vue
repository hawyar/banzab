<template>
  <section class="section-sheet sheet-4">
    <div class="sheet-content">
      <div class="py-24 md:py-32 lg:py-40">
        <div class="max-w-6xl mx-auto px-6 md:px-8">
          <!-- Header -->
          <div class="text-center mb-16 md:mb-24">
            <p
              class="text-xs uppercase tracking-[0.15em] text-gray-400 font-medium mb-6"
            >
              Portfolio
            </p>
            <h2
              class="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-gray-900 mb-5 leading-tight"
            >
              Our companies
            </h2>
          </div>

          <!-- Company Cards -->
          <div v-if="companies?.length" class="space-y-8">
            <NuxtLink
              v-for="company in companies"
              :key="company._id"
              :to="`/portfolio/${company.slug.current}`"
              class="group block"
            >
              <div
                class="relative rounded-3xl overflow-hidden min-h-[400px] md:min-h-[480px]"
                :class="
                  company.cardImage
                    ? ''
                    : `bg-gradient-to-br ${company.cardGradient || 'from-gray-800 to-gray-900'}`
                "
              >
                <img
                  v-if="company.cardImage"
                  :src="
                    urlFor(company.cardImage).width(1200).auto('format').url()
                  "
                  :alt="company.name"
                  class="absolute inset-0 w-full h-full object-cover"
                />

                <div
                  v-if="!company.cardImage"
                  class="absolute inset-0 opacity-20"
                >
                  <div
                    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/5 blur-3xl"
                  ></div>
                </div>

                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
                ></div>

                <div
                  class="relative h-full min-h-[400px] md:min-h-[480px] flex flex-col justify-between p-8 md:p-10 lg:p-14"
                >
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

                  <div>
                    <h3
                      class="text-3xl md:text-4xl lg:text-5xl font-light text-white tracking-tight mb-3"
                    >
                      {{ company.name }}
                    </h3>
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

          <!-- View All -->
          <div class="text-center mt-12">
            <NuxtLink
              to="/portfolio"
              class="inline-flex items-center gap-3 text-sm font-medium text-gray-900 hover:text-gray-500 transition-colors"
            >
              <span>View All Companies</span>
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
    </div>
  </section>
</template>

<script setup>
import { useSanityQuery } from "~/composables/useSanity";
import { urlFor } from "~/utils/sanity";

const { data: companies } = await useSanityQuery(
  "home-portfolio",
  `*[_type == "portfolioCompany"] | order(sortOrder asc) {
    _id,
    name,
    slug,
    tagline,
    category,
    founded,
    cardImage,
    cardGradient
  }`,
);
</script>
