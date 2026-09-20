<template>
  <div class="stockist-map-wrap">
    <div ref="container" class="stockist-map" role="region" aria-label="Branch locations map" :aria-busy="loading" />
    <p v-if="loading || error" class="map-status" role="status">{{ error || 'Loading map…' }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Map as LeafletMap, Marker } from 'leaflet';
import type { MappedBranch } from '~/data/pyarraStockists';

const props = defineProps<{ branches: MappedBranch[]; selectedId: string | null }>();
const emit = defineEmits<{ select: [id: string] }>();
const container = ref<HTMLElement>();
const loading = ref(true);
const error = ref('');
let map: LeafletMap | undefined;
let alive = true;
let timer: ReturnType<typeof setTimeout> | undefined;
let observer: ResizeObserver | undefined;
const markers = new Map<string, Marker>();
const failureMessage = 'Map unavailable. You can still open each branch in Maps from the list.';

function reflectSelection() {
  for (const [id, marker] of markers) {
    const selected = id === props.selectedId;
    marker.getElement()?.classList.toggle('pyarra-pin-selected', selected);
    marker.getElement()?.setAttribute('aria-label', `${marker.options.title}, map pin`);
    marker.getElement()?.setAttribute('aria-pressed', String(selected));
    marker.setZIndexOffset(selected ? 1000 : 0);
    if (selected) {
      map?.setView(marker.getLatLng(), Math.max(map.getZoom(), 15), { animate: false });
      marker.openTooltip();
    } else marker.closeTooltip();
  }
}
watch(() => props.selectedId, reflectSelection);

onMounted(async () => {
  timer = setTimeout(() => { if (alive && loading.value) { loading.value = false; error.value = failureMessage; } }, 15000);
  try {
    const [L] = await Promise.all([import('leaflet'), import('leaflet/dist/leaflet.css')]);
    if (!alive || !container.value) return;
    map = L.map(container.value, { scrollWheelZoom: false });
    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
    });
    tiles.on('tileload', () => { if (alive) { loading.value = false; clearTimeout(timer); } });
    tiles.on('tileerror', () => { if (alive) { loading.value = false; error.value = failureMessage; clearTimeout(timer); } });
    tiles.addTo(map);
    props.branches.forEach((branch, index) => {
      const label = document.createElement('span');
      label.textContent = String(index + 1);
      const tooltip = document.createElement('span');
      tooltip.textContent = branch.name;
      const marker = L.marker(branch.coordinates, {
        title: branch.name,
        alt: branch.name,
        icon: L.divIcon({ className: 'pyarra-map-pin', html: label, iconSize: [32, 32], iconAnchor: [16, 16] }),
      }).addTo(map!).bindTooltip(tooltip, { direction: 'top', offset: [0, -18] });
      marker.on('click', () => emit('select', branch.id));
      markers.set(branch.id, marker);
    });
    map.fitBounds(L.latLngBounds(props.branches.map(branch => branch.coordinates)), { padding: [38, 38], maxZoom: 15 });
    // Div markers need the same Enter/Space behavior as native buttons.
    for (const [id, marker] of markers) {
      marker.getElement()?.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          event.stopPropagation();
          emit('select', id);
        }
      });
    }
    reflectSelection();
    observer = new ResizeObserver(() => map?.invalidateSize());
    observer.observe(container.value);
  } catch {
    if (alive) { loading.value = false; error.value = failureMessage; clearTimeout(timer); }
  }
});
onBeforeUnmount(() => {
  alive = false;
  clearTimeout(timer);
  observer?.disconnect();
  map?.remove();
  markers.clear();
});
</script>

<style>
.stockist-map-wrap { position: relative; height: 100%; background: #eceee7; }
.stockist-map { width: 100%; height: 100%; z-index: 0; }
.map-status { position: absolute; top: 12px; left: 55px; right: 12px; z-index: 1; padding: .75rem 1rem; border: 1px solid #e0d8c9; border-radius: 8px; background: #fffdfa; color: #625d55; font-size: .8rem; line-height: 1.5; pointer-events: none; }
.stockist-map .pyarra-map-pin { display: flex; align-items: center; justify-content: center; border: 2px solid #fffdfa; border-radius: 50%; background: #78532d; color: white; font: 500 12px/1 system-ui, sans-serif; box-shadow: 0 2px 8px #302c2740; }
.stockist-map .pyarra-pin-selected { background: #302c27; outline: 3px solid #d6b992; outline-offset: 2px; }
.stockist-map .pyarra-map-pin:focus-visible { outline: 3px solid #302c27; outline-offset: 3px; }
.stockist-map .leaflet-control-attribution { font-size: 10px; }
</style>
