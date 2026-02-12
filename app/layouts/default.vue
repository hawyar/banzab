<template>
  <div class="min-h-screen bg-white flex flex-col">
    <!-- Navigation -->
    <AppHeader />

    <!-- Main Content -->
    <main class="flex-1" :class="{ 'pt-20': !isHomePage }">
      <slot />
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup>
const route = useRoute();

// Check if we're on the home page
const isHomePage = computed(() => route.path === '/');
</script>