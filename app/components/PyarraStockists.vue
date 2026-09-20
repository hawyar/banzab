<template>
  <section aria-labelledby="stockists-heading" class="stockists max-w-6xl mx-auto px-6 md:px-8 mb-20 md:mb-28">
    <div class="mb-8 md:mb-10">
      <p class="brand-eyebrow mb-4">Where to find us</p>
      <h2 id="stockists-heading" class="brand-heading text-3xl md:text-4xl font-light tracking-tight mb-4">Find Pyarra</h2>
      <p class="brand-body text-base font-light">Available at these locations across Erbil.</p>
    </div>

    <div class="stockist-directory">
      <ul v-for="(column, columnIndex) in stockistColumns" :key="columnIndex" class="stockist-column">
        <li v-for="retailer in column" :key="retailer.id" class="stockist-group">
          <h3 class="stockist-name">{{ retailer.name }}</h3>
          <component
            :is="retailer.kind === 'chain' ? 'button' : 'a'"
            :href="retailer.kind === 'single' ? retailer.branches[0].mapUrl : undefined"
            :target="retailer.kind === 'single' ? '_blank' : undefined"
            :rel="retailer.kind === 'single' ? 'noopener noreferrer' : undefined"
            :type="retailer.kind === 'chain' ? 'button' : undefined"
            :aria-haspopup="retailer.kind === 'chain' ? 'dialog' : undefined"
            :aria-label="retailer.kind === 'chain' ? `${retailer.name}, view ${retailer.branches.length} branches` : `${retailer.name}, open in Maps (new tab)`"
            class="stockist-location"
            @click="retailer.kind === 'chain' && openRetailer(retailer, $event)"
          >
            <span>{{ retailer.kind === 'chain' ? `${retailer.branches.length} branches` : 'Open in Maps' }}</span>
            <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path v-if="retailer.kind === 'single'" d="M7 17 17 7M7 7h10v10" />
              <path v-else d="M4 12h16m-6-6 6 6-6 6" />
            </svg>
          </component>
        </li>
      </ul>
    </div>

    <dialog ref="dialog" class="stockist-dialog" aria-labelledby="stockist-dialog-title" aria-describedby="stockist-dialog-description" @close="onClosed" @cancel.prevent="closeDialog" @click="onBackdropClick" @keydown="containFocus">
      <template v-if="activeRetailer">
        <header class="dialog-header">
          <div>
            <p class="stockist-type mb-2">Find Pyarra</p>
            <h2 id="stockist-dialog-title">{{ activeRetailer.name }}</h2>
            <p id="stockist-dialog-description">{{ activeRetailer.branches.length }} branches across Erbil</p>
          </div>
          <button type="button" class="dialog-close" aria-label="Close locations" autofocus @click="closeDialog">
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m6 6 12 12M6 18 18 6" /></svg>
          </button>
        </header>
        <div class="dialog-content" data-lenis-prevent>
          <div class="dialog-map">
            <ClientOnly>
              <LazyPyarraStockistMap :branches="activeRetailer.branches" :selected-id="selectedBranchId" @select="selectedBranchId = $event" />
              <template #fallback><p class="map-placeholder">Loading map…</p></template>
            </ClientOnly>
          </div>
          <div class="dialog-branches">
            <p class="branch-list-label">Choose a branch</p>
            <ol>
              <li v-for="(branch, index) in activeRetailer.branches" :key="branch.id" :class="{ 'branch-active': selectedBranchId === branch.id }">
                <button type="button" :aria-pressed="selectedBranchId === branch.id" :aria-label="`Show ${branch.name} on the map`" class="branch-select" @click="selectedBranchId = branch.id">
                  <span class="branch-number" aria-hidden="true">{{ index + 1 }}</span>
                  <span>{{ branch.name }}</span>
                </button>
                <a :href="branch.mapUrl" target="_blank" rel="noopener noreferrer" :aria-label="`${activeRetailer.name}, ${branch.name}, open in Maps (new tab)`" class="branch-directions">Open in Maps <span aria-hidden="true">↗</span></a>
              </li>
            </ol>
          </div>
        </div>
      </template>
    </dialog>
  </section>
</template>

<script setup lang="ts">
import type Lenis from 'lenis';
import { pyarraStockists, type ChainStockist } from '~/data/pyarraStockists';

const columnBreak = Math.ceil(pyarraStockists.length / 2);
const stockistColumns = [pyarraStockists.slice(0, columnBreak), pyarraStockists.slice(columnBreak)];

const lenis = useNuxtApp().$lenis as Lenis | undefined;
const dialog = ref<HTMLDialogElement>();
const activeRetailer = ref<ChainStockist | null>(null);
const selectedBranchId = ref<string | null>(null);
let trigger: HTMLElement | null = null;
let previousOverflow: string | null = null;
let resumeSmoothScroll = false;

async function openRetailer(retailer: ChainStockist, event: Event) {
  trigger = event.currentTarget as HTMLElement;
  activeRetailer.value = retailer;
  selectedBranchId.value = null;
  await nextTick();
  if (!dialog.value || !activeRetailer.value) return;
  previousOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  if (lenis && !lenis.isStopped) {
    lenis.stop();
    resumeSmoothScroll = true;
  }
  dialog.value.showModal();
}

function restoreScroll() {
  if (previousOverflow !== null) {
    document.body.style.overflow = previousOverflow;
    previousOverflow = null;
  }
  if (resumeSmoothScroll) {
    lenis?.start();
    resumeSmoothScroll = false;
  }
}

function closeDialog() { dialog.value?.close(); }
function containFocus(event: KeyboardEvent) {
  if (event.key !== 'Tab' || !dialog.value) return;
  const focusable = [...dialog.value.querySelectorAll<HTMLElement>('button, a[href], [tabindex]')]
    .filter(element => element.tabIndex >= 0 && !element.hasAttribute('disabled') && element.getClientRects().length);
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last?.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first?.focus();
  }
}
function onClosed() {
  activeRetailer.value = null;
  selectedBranchId.value = null;
  restoreScroll();
  trigger?.focus({ preventScroll: true });
  trigger = null;
}
function onBackdropClick(event: MouseEvent) {
  if (event.target !== dialog.value) return;
  const bounds = dialog.value.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeDialog();
}
onBeforeUnmount(restoreScroll);
</script>

<style scoped>
.stockists { --stockist-ink: #302c27; --stockist-muted: #625d55; }
.stockists .brand-eyebrow { color: var(--brand-primary, #92400e); font-size: .6875rem; font-weight: 600; letter-spacing: .15em; text-transform: uppercase; }
.stockists .brand-heading { color: var(--brand-text, #2f2117); }
.stockists .brand-body { color: var(--brand-muted, #756355); }
.stockist-directory { display: grid; grid-template-columns: minmax(0, 1fr); column-gap: 4rem; }
.stockist-column { list-style: none; margin: 0; padding: 0; min-width: 0; }
.stockist-group { min-width: 0; padding: 1.25rem 0; border-bottom: 1px solid #d9d5cf; color: var(--stockist-ink); }
.stockist-column:first-child .stockist-group:first-child { padding-top: 0; }
.stockist-column:last-child .stockist-group:last-child { border-bottom: 0; }
.stockist-name { margin: 0; font-size: 1.25rem; font-weight: 400; letter-spacing: -.025em; line-height: 1.4; }
.stockist-location { display: inline-flex; align-items: center; gap: .875rem; min-height: 44px; padding: .5rem 0; color: var(--stockist-muted); font-size: .875rem; line-height: 1.5; text-align: left; }
.stockist-location svg { flex-shrink: 0; opacity: .65; }
.stockist-location:hover { color: var(--stockist-ink); text-decoration: underline; text-underline-offset: 4px; }
.stockist-location:hover svg { opacity: 1; }
.stockist-type { display: block; color: var(--stockist-muted); font-size: 10px; font-weight: 600; letter-spacing: .13em; text-transform: uppercase; }
@media (min-width: 768px) {
  .stockist-directory { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .stockist-column .stockist-group:first-child { padding-top: 0; }
  .stockist-column .stockist-group:last-child { border-bottom: 0; }
}
.stockists :is(a, button):focus-visible { outline: 2px solid #78532d; outline-offset: 4px; }
.stockist-dialog { color: var(--stockist-ink); background: #fffdfa; border: 1px solid #e7e1d7; border-radius: 24px; padding: 0; width: min(960px, calc(100vw - 4rem)); max-width: none; max-height: calc(100dvh - 4rem); margin: auto; overflow: hidden; }
.stockist-dialog::backdrop { background: rgba(29, 27, 23, .45); }
.stockist-dialog[open] { display: flex; flex-direction: column; }
.dialog-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; padding: 1.75rem 2rem; border-bottom: 1px solid #e7e1d7; flex-shrink: 0; }
.dialog-header h2 { font-size: 1.75rem; font-weight: 300; letter-spacing: -.025em; line-height: 1.2; }
.dialog-header p:last-child { color: var(--stockist-muted); font-size: .8rem; margin-top: .5rem; }
.dialog-close { display: flex; justify-content: center; align-items: center; width: 44px; height: 44px; border-radius: 50%; border: 1px solid #ded7cb; flex-shrink: 0; }
.dialog-close:hover { background: #f2ede4; }
.dialog-content { display: grid; grid-template-columns: minmax(0, 1fr) 300px; min-height: 0; overflow: auto; overscroll-behavior: contain; }
.dialog-map { min-width: 0; height: 440px; }
.map-placeholder { padding: 2rem; color: var(--stockist-muted); }
.dialog-branches { padding: 1.5rem; max-height: 440px; overflow: auto; }
.branch-list-label { font-size: .75rem; color: var(--stockist-muted); margin-bottom: 1rem; }
.dialog-branches li { padding: .6rem .6rem .75rem; border-radius: 10px; border: 1px solid transparent; margin-bottom: .25rem; }
.dialog-branches .branch-active { background: #f3ede2; border-color: #ddd0ba; }
.branch-select { display: flex; align-items: center; gap: .65rem; width: 100%; min-height: 36px; text-align: left; font-size: .875rem; }
.branch-number { display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; flex-shrink: 0; border: 1px solid #d9cfbf; border-radius: 50%; font-size: 11px; }
.branch-active .branch-number { background: #78532d; color: white; border-color: #78532d; }
.branch-directions { display: flex; align-items: center; gap: .4rem; margin-left: 2.15rem; min-height: 36px; width: fit-content; font-size: .75rem; color: var(--stockist-muted); text-decoration: underline; text-underline-offset: 3px; }
@media (max-width: 767px) {
  .stockist-dialog { width: 100%; height: 100dvh; max-height: 100dvh; border: 0; border-radius: 0; }
  .dialog-header { padding: max(1.25rem, env(safe-area-inset-top)) 1.5rem 1.25rem; }
  .dialog-content { display: block; }
  .dialog-map { height: 300px; height: clamp(240px, 40dvh, 360px); }
  .dialog-branches { max-height: none; overflow: visible; padding-bottom: max(1.5rem, env(safe-area-inset-bottom)); }
}
</style>
