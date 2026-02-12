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
            borderRadius: videoBorderRadius + 'px'
          }"
        >
          <video
            ref="videoRef"
            autoplay
            muted
            loop
            playsinline
            preload="metadata"
            class="w-full h-full object-cover"
          >
            <source type="video/mp4" />
          </video>

          <div
            class="hero-text-wrapper"
            :style="{
              transform: `translateY(${heroTextOffset}px)`,
              opacity: heroTextOpacity
            }"
          >
            <div class="max-w-5xl mx-auto px-6 md:px-8 text-center">
              <h1 class="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white tracking-tight leading-tight">
                Building exceptional companies that define industries
              </h1>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Section 1: Quote/Stats - White Sheet -->
    <section class="section-sheet sheet-1">
      <div class="sheet-content">
        <div class="py-24 md:py-32 lg:py-40">
          <div class="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
            <div class="text-center mb-16 md:mb-20">
              <p class="text-xs uppercase tracking-widest text-gray-500 font-medium">
                Building quality brands in Iraq's F&B sector
              </p>
            </div>

            <div class="max-w-5xl mx-auto mb-20 md:mb-32">
              <blockquote class="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 leading-tight mb-12 text-center">
                "Food and beverage is evolving in Iraq. Banzab brings genuine quality, fresh thinking, and brands that set higher standards in the market."
              </blockquote>
              <div class="text-right">
                <p class="text-sm uppercase tracking-widest text-gray-500 font-medium mb-1">
                  Arkan Yaseen
                </p>
                <p class="text-sm text-gray-400 font-light">
                  Founder & CEO
                </p>
                <div class="mt-4 flex items-center justify-end">
                  <span class="text-lg font-medium text-gray-900">Banzab</span>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 lg:gap-20">
              <div>
                <p class="text-sm text-gray-600 font-light mb-6">
                  Iraq's fastest-growing smoothie and juice chain
                </p>
                <div class="text-5xl md:text-6xl font-light text-gray-900 mb-2">6</div>
                <p class="text-xs uppercase tracking-widest text-gray-500 font-medium">
                  Active branches
                </p>
              </div>
              <div>
                <p class="text-sm text-gray-600 font-light mb-6">
                  Healthy snacks launching soon
                </p>
                <div class="text-5xl md:text-6xl font-light text-gray-900 mb-2">1</div>
                <p class="text-xs uppercase tracking-widest text-gray-500 font-medium">
                  New brand coming
                </p>
              </div>
              <div>
                <p class="text-sm text-gray-600 font-light mb-6">
                  Setting quality standards in the market
                </p>
                <div class="text-5xl md:text-6xl font-light text-gray-900 mb-2">2019</div>
                <p class="text-xs uppercase tracking-widest text-gray-500 font-medium">
                  Year established
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2: What We Do - White Sheet -->
    <section class="section-sheet sheet-2">
      <div class="sheet-content">
        <div class="py-24 md:py-32 lg:py-40">
          <div class="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
            <div class="max-w-4xl mx-auto text-center">
              <div class="text-xs uppercase tracking-widest text-gray-500 font-medium mb-6">
                Our Focus
              </div>
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-gray-900 mb-8 leading-tight">
                What we do
              </h2>
              <p class="text-lg md:text-xl text-gray-600 leading-relaxed font-light">
                We run Smoothie Season, the country's fastest-growing smoothie and juice chain, and are preparing to launch Pyarra, a new line of healthy snacks. Our goal is simple: deliver quality products that set higher standards in the market.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: Portfolio - Gray Sheet -->
    <section class="section-sheet sheet-3">
      <div class="sheet-content bg-gray-50">
        <div class="py-24 md:py-32 lg:py-40">
          <div class="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
            <div class="text-center mb-20 md:mb-32">
              <div class="text-xs uppercase tracking-widest text-gray-500 font-medium mb-6">
                Portfolio
              </div>
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-gray-900 mb-6">
                Our Companies
              </h2>
              <p class="text-lg md:text-xl text-gray-600 font-light max-w-2xl mx-auto">
                Building brands that matter in Iraq's evolving market.
              </p>
            </div>

            <div class="space-y-32 md:space-y-40">
              <!-- Smoothie Season -->
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div class="order-2 lg:order-1">
                  <div class="space-y-6">
                    <div>
                      <span class="text-xs uppercase tracking-widest text-gray-500 font-medium">
                        Drinks
                      </span>
                    </div>
                    <h3 class="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 tracking-tight">
                      Smoothie Season
                    </h3>
                    <p class="text-base md:text-lg text-gray-600 font-light leading-relaxed">
                      Iraq's leading smoothie and juice brand with 6 active branches across Erbil. A new flagship dine-in location is opening soon in Erbil Avenue.
                    </p>
                    <div class="pt-4">
                      <NuxtLink
                        to="/portfolio"
                        class="inline-flex items-center text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors group"
                      >
                        <span class="border-b border-gray-900 group-hover:border-gray-600 pb-0.5">Learn more</span>
                        <svg class="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                        </svg>
                      </NuxtLink>
                    </div>
                  </div>
                </div>
                <div class="order-1 lg:order-2">
                  <div class="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg"></div>
                </div>
              </div>

              <!-- Pyarra -->
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div class="order-1">
                  <div class="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg"></div>
                </div>
                <div class="order-2">
                  <div class="space-y-6">
                    <div>
                      <span class="text-xs uppercase tracking-widest text-gray-500 font-medium">
                        Snacks
                      </span>
                    </div>
                    <h3 class="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 tracking-tight">
                      Pyarra
                    </h3>
                    <p class="text-base md:text-lg text-gray-600 font-light leading-relaxed">
                      A new line of healthy snacks launching soon, designed to bring quality and innovation to Iraq's snacking market.
                    </p>
                    <div class="pt-4">
                      <span class="inline-flex items-center text-sm font-medium text-gray-400">
                        <span class="border-b border-gray-300 pb-0.5">Launching Soon</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 4: CTA - White Sheet -->
    <section class="section-sheet sheet-4">
      <div class="sheet-content">
        <div class="py-32 md:py-40 lg:py-48">
          <div class="max-w-4xl mx-auto px-6 md:px-8 text-center">
            <div class="space-y-10">
              <h2 class="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 leading-tight">
                Building the future of F&B in Iraq
              </h2>
              <p class="text-lg md:text-xl text-gray-600 font-light leading-relaxed max-w-2xl mx-auto">
                Interested in learning more about our companies or exploring partnership opportunities?
              </p>
              <div class="pt-6">
                <NuxtLink
                  to="/contact"
                  class="inline-block bg-gray-900 text-white px-10 py-4 text-sm font-medium hover:bg-gray-800 transition-colors rounded-full"
                >
                  Get in Touch
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default",
});

const videoRef = ref(null);
const videoWidth = ref(90);
const videoHeight = ref(70);
const videoBorderRadius = ref(16);
const heroTextOffset = ref(0);
const heroTextOpacity = ref(1);

onMounted(() => {
  if (videoRef.value) {
    const source = videoRef.value.querySelector('source');
    if (source) {
      source.src = "https://www.pexels.com/download/video/34682750/"
      videoRef.value.load();

      setTimeout(() => {
        videoRef.value.play().catch((e) => {
          console.log("Video autoplay prevented:", e);
        });
      }, 500);
    }
  }

  if (process.client) {
    window.addEventListener('scroll', handleScroll, { passive: true });
  }
});

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('scroll', handleScroll);
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
    videoWidth.value = 90 + (progress * 10);
    videoHeight.value = 70 + (progress * 30);
    videoBorderRadius.value = 16 - (progress * 16);
  }

  const textFadeEnd = windowHeight * 0.5;

  if (scrollPosition > textFadeEnd) {
    heroTextOffset.value = 300;
    heroTextOpacity.value = 0;
  } else {
    const progress = scrollPosition / textFadeEnd;
    heroTextOffset.value = scrollPosition * 1.5;
    heroTextOpacity.value = Math.max(0, 1 - (progress * 1.5));
  }
};

useHead({
  title: "Banzab - Building Exceptional Companies",
  meta: [
    {
      name: "description",
      content: "Banzab builds exceptional companies that define industries through innovation, quality, and sustainable growth.",
    },
  ],
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");

* {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.tracking-tight {
  letter-spacing: -0.025em;
}

.tracking-widest {
  letter-spacing: 0.1em;
}

/* Hero Wrapper */
.hero-wrapper {
  height: 100vh;
  position: relative;
}

/* Hero Section - Fixed */
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
  transition: width 0.3s ease-out, height 0.3s ease-out, border-radius 0.3s ease-out;
}

.hero-text-wrapper {
  position: absolute;
  bottom: 15%;
  left: 0;
  right: 0;
  pointer-events: none;
}

/* Section Sheets */
.section-sheet {
  position: relative;
  z-index: 10;
}

.sheet-content {
  background: white;
  border-radius: 32px 32px 0 0;
  position: relative;
}

/* Sheet Stacking */
.sheet-1 {
  z-index: 40;
}

.sheet-2 {
  z-index: 30;
  margin-top: -32px;
}

.sheet-3 {
  z-index: 20;
  margin-top: -32px;
}

.sheet-4 {
  z-index: 10;
  margin-top: -32px;
}

video {
  object-position: center center;
}

@media (max-width: 768px) {
  .hero-text-wrapper {
    bottom: 12%;
  }

  .sheet-content {
    border-radius: 24px 24px 0 0;
  }

  .sheet-2, .sheet-3, .sheet-4 {
    margin-top: -24px;
  }
}
</style>
