<script lang="ts">
  import { onMount } from 'svelte';
  import { currentPath, initRouter, isGameRoute } from './landing/router';
  import LandingLayout from './landing/LandingLayout.svelte';
  import HomePage from './landing/HomePage.svelte';
  import HowToPlay from './landing/HowToPlay.svelte';
  import FAQ from './landing/FAQ.svelte';
  import About from './landing/About.svelte';
  import GameApp from './GameApp.svelte';

  let path = $state('/');
  let showGame = $state(false);

  onMount(() => {
    initRouter();
    const unsubscribe = currentPath.subscribe((p: string) => {
      path = p;
      showGame = isGameRoute();
    });
    // Check initial hash
    showGame = isGameRoute();
    return unsubscribe;
  });
</script>

<!-- SEO Defaults -->
<svelte:head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="keywords" content="gra tycoon, gra ekonomiczna, symulator biznesu, gra przeglądarkowa, darmowa gra online, polska gra indie, chipsy ziemniaczane, football manager alternatywa, gra menadżerska, symulator produkcji, zarządzanie fabryką, gra po polsku, browser game, business simulation" />
  <meta name="author" content="Chipsy Top Manager" />
  <meta name="robots" content="index, follow" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Chipsy Top Manager — Darmowa polska gra tycoon o produkcji chipsów" />
  <meta property="og:description" content="Zarządzaj fabryką chipsów ziemniaczanych! Zatrudniaj, produkuj, badaj smaki i buduj imperium chrupków. Gra przeglądarkowa po polsku." />
  <meta property="og:image" content="/hero-logo.png" />
  <link rel="canonical" href="https://chipsy.top" />
</svelte:head>

{#if showGame}
  <!-- Game Mode: Full retro UI -->
  <GameApp />
{:else}
  <!-- Landing Mode: SEO-friendly pages -->
  <LandingLayout>
    {#if path === '/' || path === ''}
      <HomePage />
    {:else if path === '/jak-grac'}
      <HowToPlay />
    {:else if path === '/faq'}
      <FAQ />
    {:else if path === '/o-grze'}
      <About />
    {:else}
      <HomePage />
    {/if}
  </LandingLayout>
{/if}
