<template>
  <div>
    <!-- Hero Video Section - Fixed Background -->
    <div class="hero-wrapper">
      <section class="hero-section">
        <div
          class="video-container"
          :style="{
            width: videoWidth + '%',
            height: videoHeight + '%',
            borderRadius: videoBorderRadius + 'px',
          }"
        >
          <video
            ref="videoRef"
            autoplay
            muted
            loop
            playsinline
            preload="auto"
            class="w-full h-full object-cover"
            src="https://ve5dvwwadbjuag7n.public.blob.vercel-storage.com/banzab-hero.mp4"
          ></video>

          <!-- Dark overlay -->
          <div class="absolute inset-0 bg-black/50"></div>

          <!-- Hero Content -->
          <div
            class="hero-content-wrapper"
            :style="{
              transform: `translateY(${heroTextOffset}px)`,
              opacity: heroTextOpacity,
            }"
          >
            <div class="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 w-full">
              <div
                class="flex flex-col md:flex-row md:items-center md:justify-between gap-8"
              >
                <!-- Left: Big heading -->
                <div class="max-w-2xl">
                  <h1
                    class="text-4xl md:text-2xl lg:text-3xl xl:text-5xl font-light text-white tracking-tight leading-[1.1]"
                  >
                    {{
                      homepage?.heroHeading ||
                      "Building exceptional companies that define industries"
                    }}
                  </h1>
                </div>

                <!-- Right: Brand logos -->
                <div
                  v-if="homepage?.brandShowcaseLogos?.length"
                  class="flex items-center gap-8 flex-shrink-0"
                >
                  <NuxtLink
                    v-for="item in homepage.brandShowcaseLogos"
                    :key="item._key"
                    :to="(item.link?.startsWith('/') ? item.link : `/${item.link}`) || '/brands'"
                    class="group block"
                  >
                    <img
                      :src="
                        urlFor(item.logo).height(44).auto('format').url()
                      "
                      :alt="item.name"
                      class="h-8 md:h-11 w-auto opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Section Components -->
    <HomeQuoteStats :data="homepage" />
    <HomeMarquee :items="homepage?.marqueeItems" />
    <HomeWhyBanzab :data="homepage" />
    <HomeBrands />
    <HomePartners :data="homepage" />
    <HomeCTA :data="homepage" />

    <!-- Footer -->
    <div class="homepage-footer">
      <AppFooter />
    </div>
  </div>
</template>

<script setup>
import { useSanityQuery } from "~/composables/useSanity";
import { urlFor } from "~/utils/sanity";

definePageMeta({
  layout: "default",
});

const { data: homepage } = await useSanityQuery(
  "homepage",
  `*[_type == "homepage"][0] {
    heroHeading,
    brandShowcaseText,
    brandShowcaseLogos[] {
      _key,
      name,
      logo,
      link
    },
    quoteEyebrow,
    quoteText,
    quoteAttribution,
    stats,
    marqueeItems,
    whyBanzabEyebrow,
    whyBanzabHeading,
    whyBanzabSubtitle,
    pillars,
    brandsEyebrow,
    brandsHeading,
    brandsSubtitle,
    partnersEyebrow,
    partnersHeading,
    partnersList,
    ctaHeading,
    ctaDescription,
    ctaButtonText
  }`,
);

const videoRef = ref(null);
const videoWidth = ref(92);
const videoHeight = ref(80);
const videoBorderRadius = ref(16);
const heroTextOffset = ref(0);
const heroTextOpacity = ref(1);

onMounted(() => {
  if (videoRef.value) {
    videoRef.value.muted = true;
    videoRef.value.play().catch(() => {});
  }

  if (process.client) {
    window.addEventListener("scroll", handleScroll, { passive: true });
  }
});

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener("scroll", handleScroll);
  }
});

const handleScroll = () => {
  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;

  const expandEnd = windowHeight * 0.4;

  if (scrollPosition >= expandEnd) {
    videoWidth.value = 100;
    videoHeight.value = 100;
    videoBorderRadius.value = 0;
  } else {
    const progress = scrollPosition / expandEnd;
    videoWidth.value = 90 + progress * 10;
    videoHeight.value = 80 + progress * 20;
    videoBorderRadius.value = 16 - progress * 16;
  }

  const textFadeEnd = windowHeight * 0.5;

  if (scrollPosition > textFadeEnd) {
    heroTextOffset.value = 300;
    heroTextOpacity.value = 0;
  } else {
    const progress = scrollPosition / textFadeEnd;
    heroTextOffset.value = scrollPosition * 1.5;
    heroTextOpacity.value = Math.max(0, 1 - progress * 1.5);
  }
};

useHead({
  title: "Banzab - Building Exceptional Companies",
  meta: [
    {
      name: "description",
      content:
        "Banzab builds exceptional companies that define industries through innovation, quality, and sustainable growth.",
    },
  ],
});
</script>

<style scoped>
.hero-wrapper {
  height: 100vh;
  position: relative;
}

.hero-section {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1;
}

.video-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  max-width: 1280px;
  transition:
    width 0.3s ease-out,
    height 0.3s ease-out,
    border-radius 0.3s ease-out;
}

.hero-content-wrapper {
  position: absolute;
  bottom: 12%;
  left: 0;
  right: 0;
  pointer-events: auto;
}

video {
  object-position: center center;
}

.homepage-footer {
  position: relative;
  z-index: 5;
}

@media (max-width: 768px) {
  .hero-content-wrapper {
    bottom: 10%;
  }
}
</style>
