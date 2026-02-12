<template>
  <section class="section-sheet sheet-3">
    <div class="sheet-content">
      <div class="py-24 md:py-32 lg:py-40">
        <div class="max-w-6xl mx-auto px-6 md:px-8">
          <!-- Header -->
          <div class="text-center mb-16 md:mb-24">
            <p
              class="text-xs uppercase tracking-[0.15em] text-gray-400 font-medium mb-6"
            >
              {{ data?.whyBanzabEyebrow || "Why Banzab" }}
            </p>
            <h2
              class="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-gray-900 mb-5 leading-tight"
            >
              {{ data?.whyBanzabHeading || "What sets us apart" }}
            </h2>
            <p
              v-if="data?.whyBanzabSubtitle"
              class="text-base text-gray-500 font-light leading-relaxed max-w-lg mx-auto"
            >
              {{ data.whyBanzabSubtitle }}
            </p>
          </div>

          <!-- Pillars -->
          <div
            class="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-12"
          >
            <div
              v-for="(pillar, index) in displayPillars"
              :key="pillar._key || index"
              class="text-center"
            >
              <div
                class="inline-flex items-center justify-center w-12 h-12 rounded-full border border-gray-200 mb-6"
              >
                <span class="text-lg font-light text-gray-900">{{
                  String(index + 1).padStart(2, "0")
                }}</span>
              </div>
              <h3
                class="text-xl md:text-2xl font-light text-gray-900 tracking-tight mb-3"
              >
                {{ pillar.title }}
              </h3>
              <p
                class="text-sm md:text-base text-gray-500 font-light leading-relaxed max-w-xs mx-auto"
              >
                {{ pillar.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  data: { type: Object, default: null },
});

const fallbackPillars = [
  {
    title: "Quality",
    description:
      "We never compromise on standards. Every product we bring to market is crafted with care, using the best ingredients and processes available.",
  },
  {
    title: "Innovation",
    description:
      "We bring fresh thinking to Kurdistan's F&B sector. From new product lines to modern retail experiences, we're always pushing forward.",
  },
  {
    title: "Rooted Locally",
    description:
      "Built in Kurdistan, for Kurdistan. We understand the market, the culture, and the people we serve — because we're part of it.",
  },
];

const displayPillars = computed(() => {
  return props.data?.pillars?.length ? props.data.pillars : fallbackPillars;
});
</script>
