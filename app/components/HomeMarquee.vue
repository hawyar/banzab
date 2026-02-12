<template>
  <section class="section-sheet sheet-2">
    <div class="sheet-content">
      <div class="py-16 md:py-20 overflow-hidden">
        <div class="marquee-track">
          <div class="marquee-content">
            <template v-for="(item, i) in displayItems" :key="'a-' + i">
              <span
                :class="i % 2 === 0 ? 'text-gray-900' : 'text-gray-300'"
                class="marquee-item"
                >{{ item }}</span
              >
              <span class="marquee-dot"></span>
            </template>
          </div>
          <div class="marquee-content" aria-hidden="true">
            <template v-for="(item, i) in displayItems" :key="'b-' + i">
              <span
                :class="i % 2 === 0 ? 'text-gray-900' : 'text-gray-300'"
                class="marquee-item"
                >{{ item }}</span
              >
              <span class="marquee-dot"></span>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  items: { type: Array, default: null },
});

const displayItems = computed(() => {
  return props.items?.length
    ? props.items
    : ["Smoothie Season", "Pyarra", "Quality First", "Built in Kurdistan"];
});
</script>

<style scoped>
.marquee-track {
  display: flex;
  mask-image: linear-gradient(
    to right,
    transparent,
    black 10%,
    black 90%,
    transparent
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    black 10%,
    black 90%,
    transparent
  );
}

.marquee-content {
  display: flex;
  align-items: center;
  gap: 0;
  flex-shrink: 0;
  animation: marquee 30s linear infinite;
}

.marquee-item {
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 300;
  letter-spacing: -0.02em;
  white-space: nowrap;
  padding: 0 1.5rem;
}

.marquee-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #d1d5db;
  flex-shrink: 0;
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}
</style>
