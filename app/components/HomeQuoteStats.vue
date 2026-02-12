<template>
  <section class="section-sheet sheet-1">
    <div class="sheet-content">
      <div class="py-24 md:py-32 lg:py-40">
        <div class="max-w-6xl mx-auto px-6 md:px-8">
          <!-- Eyebrow -->
          <div class="text-center mb-14 md:mb-20">
            <p
              class="text-xs uppercase tracking-[0.15em] text-gray-400 font-medium"
            >
              {{
                data?.quoteEyebrow ||
                "Building quality brands in Kurdistan's F&B sector"
              }}
            </p>
          </div>

          <!-- Quote -->
          <div class="max-w-4xl mx-auto mb-20 md:mb-28 text-center">
            <blockquote
              class="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 leading-snug mb-10"
            >
              "{{
                data?.quoteText ||
                "Food and beverage is evolving in Kurdistan. Banzab brings genuine quality, fresh thinking, and brands that set higher standards in the market."
              }}"
            </blockquote>
            <div v-if="data?.quoteAttribution">
              <p
                class="text-xs uppercase tracking-[0.15em] text-gray-500 font-medium"
              >
                {{ attributionName }}
              </p>
              <p
                v-if="attributionTitle"
                class="text-sm text-gray-400 font-light mt-1"
              >
                {{ attributionTitle }}
              </p>
            </div>
          </div>

          <!-- Divider -->
          <div class="w-full h-px bg-gray-200 mb-20 md:mb-28"></div>

          <!-- Stats -->
          <div
            v-if="data?.stats?.length"
            class="grid gap-8 md:gap-16 max-w-4xl mx-auto text-center"
            :class="statsGridCols"
          >
            <div v-for="stat in data.stats" :key="stat._key">
              <div class="text-5xl md:text-6xl font-light text-gray-900 mb-3">
                {{ stat.value }}
              </div>
              <p
                class="text-xs uppercase tracking-[0.15em] text-gray-400 font-medium"
              >
                {{ stat.label }}
              </p>
            </div>
          </div>

          <!-- Fallback stats -->
          <div
            v-else
            class="grid grid-cols-3 gap-8 md:gap-16 max-w-4xl mx-auto text-center"
          >
            <div>
              <div class="text-5xl md:text-6xl font-light text-gray-900 mb-3">
                6
              </div>
              <p
                class="text-xs uppercase tracking-[0.15em] text-gray-400 font-medium"
              >
                Active branches
              </p>
            </div>
            <div>
              <div class="text-5xl md:text-6xl font-light text-gray-900 mb-3">
                2
              </div>
              <p
                class="text-xs uppercase tracking-[0.15em] text-gray-400 font-medium"
              >
                Brands
              </p>
            </div>
            <div>
              <div class="text-5xl md:text-6xl font-light text-gray-900 mb-3">
                2019
              </div>
              <p
                class="text-xs uppercase tracking-[0.15em] text-gray-400 font-medium"
              >
                Year established
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

const attributionName = computed(() => {
  if (!props.data?.quoteAttribution) return "";
  return (
    props.data.quoteAttribution.split(",")[0]?.trim() ||
    props.data.quoteAttribution
  );
});

const attributionTitle = computed(() => {
  if (!props.data?.quoteAttribution) return "";
  const parts = props.data.quoteAttribution.split(",");
  return parts.length > 1 ? parts.slice(1).join(",").trim() : "";
});

const statsGridCols = computed(() => {
  const count = props.data?.stats?.length || 3;
  if (count <= 3) return "grid-cols-3";
  return "grid-cols-2 md:grid-cols-4";
});
</script>
