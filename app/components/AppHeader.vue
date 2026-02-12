<template>
  <nav
    :class="[
      'absolute top-0 left-0 right-0 z-50',
      isHomePage ? 'bg-transparent' : 'bg-white border-b border-gray-100',
    ]"
  >
    <div class="max-w-7xl mx-auto px-6 md:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <NuxtLink
            to="/"
            class="text-xl font-medium tracking-tight text-gray-900"
          >
            Banzab
          </NuxtLink>
        </div>

        <!-- Desktop Navigation - Centered -->
        <div class="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="text-sm font-medium tracking-tight transition-opacity duration-200 uppercase hover:opacity-70 text-gray-900"
            active-class="opacity-100"
          >
            {{ item.name }}
          </NuxtLink>
        </div>

        <!-- Get in Touch Button - Desktop -->
        <div class="hidden md:block">
          <NuxtLink
            to="/contact"
            class="inline-block bg-gray-900 text-white px-5 py-2 text-sm font-medium hover:bg-gray-800 transition-colors rounded-full"
          >
            Get in Touch
          </NuxtLink>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="focus:outline-none p-2 text-gray-900"
          >
            <div
              class="w-6 h-6 flex flex-col justify-center items-center space-y-1"
            >
              <span
                :class="[
                  'block w-6 h-0.5 bg-current transition-transform duration-200',
                  mobileMenuOpen ? 'rotate-45 translate-y-1.5' : '',
                ]"
              ></span>
              <span
                :class="[
                  'block w-6 h-0.5 bg-current transition-opacity duration-200',
                  mobileMenuOpen ? 'opacity-0' : '',
                ]"
              ></span>
              <span
                :class="[
                  'block w-6 h-0.5 bg-current transition-transform duration-200',
                  mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : '',
                ]"
              ></span>
            </div>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div
        :class="[
          'md:hidden transition-all duration-300 overflow-hidden',
          mobileMenuOpen ? 'max-h-screen pb-6' : 'max-h-0',
        ]"
      >
        <div class="pt-6 space-y-4 border-t border-gray-200">
          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            @click="mobileMenuOpen = false"
            class="block text-base font-medium tracking-tight transition-opacity duration-200 uppercase py-2 hover:opacity-70 text-gray-900"
            active-class="opacity-100"
          >
            {{ item.name }}
          </NuxtLink>
          <div class="pt-4">
            <NuxtLink
              to="/contact"
              @click="mobileMenuOpen = false"
              class="block text-center bg-gray-900 text-white px-6 py-3 text-sm font-medium hover:bg-gray-800 transition-colors rounded-full"
            >
              Get in Touch
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
const mobileMenuOpen = ref(false);
const route = useRoute();

const navigation = [
  { name: "Portfolio", href: "/portfolio" },
  { name: "Newsroom", href: "/newsroom" },
  { name: "Our Story", href: "/about" },
];

// Check if we're on the home page
const isHomePage = computed(() => route.path === "/");

watch(
  () => route.path,
  () => {
    mobileMenuOpen.value = false;
  },
);
</script>