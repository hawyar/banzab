<template>
  <footer class="bg-slate-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
        <div class="col-span-1 md:col-span-2">
          <h3 class="text-xl font-light text-white mb-6 tracking-wide">Banzab</h3>
          <p class="text-gray-300 mb-8 max-w-md font-light leading-relaxed text-sm">
            Building exceptional companies that define industries through innovation, quality, and sustainable growth.
          </p>
          <div class="flex space-x-6">
            <a v-for="social in socialLinks" :key="social.name" :href="social.href" class="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-light tracking-wide uppercase" :aria-label="social.name">
              {{ social.name }}
            </a>
          </div>
        </div>

        <div>
          <h4 class="text-sm font-medium text-white mb-6 uppercase tracking-wider">Navigation</h4>
          <ul class="space-y-3">
            <li v-for="link in quickLinks" :key="link.name">
              <NuxtLink :to="link.href" class="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-light">
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-sm font-medium text-white mb-6 uppercase tracking-wider">Contact</h4>
          <div class="space-y-4">
            <div>
              <p class="text-gray-400 text-sm font-light">
                123 Business Plaza<br />
                New York, NY 10001
              </p>
            </div>
            <div>
              <a href="tel:+12125551234" class="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-light">
                (212) 555-1234
              </a>
            </div>
            <div>
              <a href="mailto:hello@banzab.com" class="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-light">
                hello@banzab.com
              </a>
            </div>
            <div class="pt-2">
              <p class="text-gray-500 text-xs font-light uppercase tracking-wide mb-2">Hours</p>
              <p class="text-gray-400 text-sm font-light">
                Monday - Friday: 9AM - 6PM<br />
                By appointment only
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-800 mt-12 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-gray-500 text-sm font-light">
            © {{ currentYear }} Banzab. All rights reserved.
          </p>
        
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear();

const quickLinks = [
  { name: "Portfolio", href: "/portfolio" },
  { name: "Newsroom", href: "/newsroom" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const socialLinks = [
  { name: "LinkedIn", href: "#" },
  { name: "Twitter", href: "#" },
];
</script>