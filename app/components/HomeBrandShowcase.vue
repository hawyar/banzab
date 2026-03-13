<template>
  <section class="section-sheet sheet-0">
    <div class="sheet-content">
      <div class="py-10 md:py-14">
        <div class="max-w-6xl mx-auto px-6 md:px-8">
          <div
            class="flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-16"
          >
            <!-- Text -->
            <p
              class="text-base md:text-lg text-gray-500 font-light leading-relaxed max-w-xl"
            >
              {{
                text ||
                "Two brands, one vision — redefining food and beverage in Kurdistan with quality, creativity, and care."
              }}
            </p>

            <!-- Logos -->
            <div
              v-if="logos?.length"
              class="flex items-center gap-8 md:gap-10 flex-shrink-0"
            >
              <component
                :is="item.link ? 'NuxtLink' : 'div'"
                v-for="item in logos"
                :key="item._key"
                v-bind="item.link ? { to: item.link } : {}"
                class="group"
              >
                <img
                  :src="urlFor(item.logo).height(48).auto('format').url()"
                  :alt="item.name"
                  class="h-8 md:h-12 w-auto opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                />
              </component>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { urlFor } from "~/utils/sanity";

defineProps({
  text: { type: String, default: null },
  logos: { type: Array, default: null },
});
</script>
