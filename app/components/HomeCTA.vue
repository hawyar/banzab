<template>
  <section class="section-sheet sheet-6">
    <div class="sheet-content">
      <div class="py-24 md:py-32 lg:py-40">
        <div class="max-w-3xl mx-auto px-6 md:px-8 text-center">
          <h2
            class="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-gray-900 leading-tight mb-5"
          >
            {{ data?.ctaHeading || "Building the future of F&B in Kurdistan" }}
          </h2>

          <p
            class="text-base md:text-lg text-gray-500 font-light leading-relaxed max-w-xl mx-auto mb-8"
          >
            {{
              data?.ctaDescription ||
              "Interested in learning more about our companies or exploring partnership opportunities?"
            }}
          </p>

          <NuxtLink
            to="/contact"
            class="inline-block bg-gray-900 text-white px-8 py-3.5 text-sm font-medium hover:bg-gray-800 transition-colors rounded-full"
          >
            {{ data?.ctaButtonText || "Get in Touch" }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  data: { type: Object, default: null },
});
</script>
