<template>
  <div v-if="announcement && !isDismissed" class="bg-stone-100 text-gray-800 border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="py-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-1.5 h-1.5 bg-slate-900 rounded-full flex-shrink-0"></div>
            <div>
              <p class="text-sm font-light text-gray-800">
                {{ announcement.text }}
              </p>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <NuxtLink :to="announcement.link" class="text-xs font-medium text-slate-900 hover:text-slate-700 transition-colors duration-200 uppercase tracking-wide">
              Learn More
            </NuxtLink>
            <button @click="dismissBanner" class="text-gray-500 hover:text-gray-700 transition-colors duration-200 p-1" aria-label="Dismiss announcement">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const isDismissed = ref(false);

const announcement = {
  text: "Banzab Announces Strategic Partnership with TechFlow Solutions to Expand Enterprise Offerings",
  link: "/newsroom",
};

onMounted(() => {
  if (process.client) {
    const dismissed = localStorage.getItem("announcement_dismissed");
    isDismissed.value = dismissed === "true";
  }
});

function dismissBanner() {
  isDismissed.value = true;
  if (process.client) {
    localStorage.setItem("announcement_dismissed", "true");
  }
}
</script>