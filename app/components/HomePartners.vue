<template>
  <section class="section-sheet sheet-5">
    <div class="sheet-content">
      <div class="py-24 md:py-32 lg:py-40">
        <div class="max-w-6xl mx-auto px-6 md:px-8">
          <!-- Header -->
          <div class="text-center mb-16 md:mb-24">
            <p
              class="text-xs uppercase tracking-[0.15em] text-gray-400 font-medium mb-6"
            >
              {{ data?.partnersEyebrow || "Trusted By" }}
            </p>
            <h2
              class="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-gray-900 mb-5 leading-tight"
            >
              {{ data?.partnersHeading || "Partners & Collaborators" }}
            </h2>
          </div>

          <!-- Partner Grid -->
          <div
            class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-gray-200"
          >
            <div
              v-for="partner in displayPartners"
              :key="partner"
              class="bg-white flex items-center justify-center py-10 md:py-14"
            >
              <span
                class="text-base md:text-lg font-light text-gray-400 tracking-tight"
              >
                {{ partner }}
              </span>
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

const fallbackPartners = [
  "Partner One",
  "Partner Two",
  "Partner Three",
  "Partner Four",
  "Partner Five",
  "Partner Six",
  "Partner Seven",
  "Partner Eight",
];

const displayPartners = computed(() => {
  return props.data?.partnersList?.length
    ? props.data.partnersList
    : fallbackPartners;
});
</script>
