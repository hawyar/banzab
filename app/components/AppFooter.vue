<template>
  <footer class="bg-slate-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div class="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12">
        <div class="col-span-1 md:col-span-2">
          <!-- Logo -->
          <div class="mb-6">
            <NuxtLink to="/">
              <img
                v-if="logoUrl"
                :src="logoUrl"
                alt="Banzab"
                class="h-7 w-auto"
              />
              <span v-else class="text-xl font-light text-white tracking-wide"
                >Banzab</span
              >
            </NuxtLink>
          </div>
          <p
            class="text-gray-300 mb-8 max-w-md font-light leading-relaxed text-sm"
          >
            Building exceptional companies that define industries through
            innovation, quality, and sustainable growth.
          </p>

          <!-- Brand Logos -->
          <div v-if="brands?.length" class="flex items-center gap-6">
            <NuxtLink
              v-for="brand in brands"
              :key="brand._id"
              :to="`/brands/${brand.slug?.current}`"
              class="opacity-60 hover:opacity-100 transition-opacity"
            >
              <img
                v-if="brand.logo"
                :src="urlFor(brand.logo).height(48).auto('format').url()"
                :alt="brand.name"
                class="h-8 w-auto"
              />
              <span v-else class="text-sm text-gray-400 font-light">{{
                brand.name
              }}</span>
            </NuxtLink>
          </div>
        </div>

        <div>
          <h4
            class="text-sm font-medium text-white mb-6 uppercase tracking-wider"
          >
            Navigation
          </h4>
          <ul class="space-y-3">
            <li v-for="link in quickLinks" :key="link.name">
              <NuxtLink
                :to="link.href"
                class="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-light"
              >
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h4
            class="text-sm font-medium text-white mb-6 uppercase tracking-wider"
          >
            Contact
          </h4>
          <div class="space-y-4">
            <div>
              <p class="text-gray-400 text-sm font-light">
                Erbil, Kurdistan Region
              </p>
            </div>
            <div>
              <a
                href="mailto:contact@banzab.com"
                class="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-light"
              >
                contact@banzab.com
              </a>
            </div>
          </div>
        </div>

        <div>
          <h4
            class="text-sm font-medium text-white mb-6 uppercase tracking-wider"
          >
            Social Media
          </h4>
          <ul class="space-y-3">
            <li v-for="social in activeSocialLinks" :key="social.name">
              <a
                :href="social.href"
                target="_blank"
                rel="noopener"
                class="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-light"
                :aria-label="social.name"
              >
                {{ social.name }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-800 mt-12 pt-8">
        <div
          class="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p class="text-gray-500 text-sm font-light">
            &copy; {{ currentYear }} Banzab. All rights reserved.
          </p>
          <div class="flex space-x-6">
            <NuxtLink
              to="/privacy"
              class="text-gray-500 hover:text-gray-300 transition-colors duration-200 text-sm font-light"
            >
              Privacy Policy
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useSanityQuery } from "~/composables/useSanity";
import { urlFor } from "~/utils/sanity";

const currentYear = new Date().getFullYear();

const { data: settings } = await useSanityQuery(
  "site-settings-footer",
  `*[_type == "siteSettings"][0] {
    logoLight,
    linkedinUrl
  }`,
);

const { data: brands } = await useSanityQuery(
  "footer-brands",
  `*[_type == "brand"] | order(sortOrder asc) {
    _id,
    name,
    slug,
    logo
  }`,
);

const logoUrl = computed(() => {
  if (!settings.value?.logoLight?.asset) return null;
  return urlFor(settings.value.logoLight).height(56).auto("format").url();
});

const activeSocialLinks = computed(() => {
  const links = [];
  if (settings.value?.linkedinUrl) {
    links.push({ name: "LinkedIn", href: settings.value.linkedinUrl });
  }
  return links;
});

const quickLinks = [
  { name: "Brands", href: "/brands" },
  { name: "Newsroom", href: "/newsroom" },
  { name: "Our Story", href: "/about" },
  { name: "Contact", href: "/contact" },
];
</script>
