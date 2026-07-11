<script lang="ts">
  import { gameStore } from '$lib/stores/gameStore.svelte';
  import {
    FlaskConical,
    Star,
    TrendingUp,
    TrendingDown,
    Minus,
    ArrowUpCircle,
    Lock,
    Clock,
    DollarSign,
    Award,
    Sparkles,
    CheckCircle2,
    AlertCircle
  } from 'lucide-svelte';

  // Derived values
  const unlockedFlavors = $derived(gameStore.unlockedFlavors);
  const lockedFlavors = $derived(gameStore.lockedFlavors);
  const reputation = $derived(gameStore.state.reputation);
  const cash = $derived(gameStore.state.cash);
  const week = $derived(gameStore.state.week);

  const TIER_LABELS: Record<string, string> = {
    basic: 'Podstawowy',
    regional: 'Regionalny',
    premium: 'Premium',
    healthy: 'Zdrowy'
  };

  const TIER_BADGE_COLORS: Record<string, string> = {
    basic: 'badge-gray',
    regional: 'badge-blue',
    premium: 'badge-yellow',
    healthy: 'badge-green'
  };

  const TIER_BG_COLORS: Record<string, string> = {
    basic: 'bg-gray-800 border-gray-700',
    regional: 'bg-blue-900/30 border-blue-800',
    premium: 'bg-yellow-900/30 border-yellow-800',
    healthy: 'bg-green-900/30 border-green-800'
  };

  function getTrendIcon(trend: string) {
    switch (trend) {
      case 'rising': return TrendingUp;
      case 'falling': return TrendingDown;
      default: return Minus;
    }
  }

  function getTrendBadge(trend: string): string {
    switch (trend) {
      case 'rising': return 'badge-green';
      case 'falling': return 'badge-red';
      default: return 'badge-gray';
    }
  }

  function getTrendLabel(trend: string): string {
    switch (trend) {
      case 'rising': return 'Rosnący';
      case 'falling': return 'Spadkowy';
      default: return 'Stabilny';
    }
  }

  function getFlavorUpgradeCost(flavor: typeof unlockedFlavors[0]): number {
    return flavor.qualityLevel * 10000;
  }

  function getStarArray(level: number): boolean[] {
    return Array.from({ length: 5 }, (_, i) => i < level);
  }
</script>

<div class="space-y-3 md:space-y-6 p-3 md:p-6">
  <!-- Header -->
  <div class="flex flex-wrap items-center justify-between gap-2 md:gap-4">
    <div class="flex items-center gap-3">
      <FlaskConical class="h-7 w-7 text-primary-400" />
      <h1 class="section-title">Badania i Rozwój</h1>
    </div>
    <div class="flex flex-wrap items-center gap-2 md:gap-4 text-sm text-gray-400">
      <div class="flex items-center gap-2">
        <Award class="h-4 w-4 text-yellow-400" />
        <span>Reputacja: <strong class="text-gray-100">{reputation.overall}</strong></span>
      </div>
      <div class="flex items-center gap-2">
        <Star class="h-4 w-4 text-primary-400" />
        <span>Jakość: <strong class="text-gray-100">{reputation.quality}</strong></span>
      </div>
      <div class="flex items-center gap-2">
        <Sparkles class="h-4 w-4 text-blue-400" />
        <span>Świadomość marki: <strong class="text-gray-100">{reputation.brandAwareness}</strong></span>
      </div>
      <div class="flex items-center gap-2">
        <CheckCircle2 class="h-4 w-4 text-green-400" />
        <span>Lojalność: <strong class="text-gray-100">{reputation.customerLoyalty}</strong></span>
      </div>
    </div>
  </div>

  <!-- Section 1: Unlocked Flavors -->
  <section>
    <h2 class="mb-3 md:mb-4 flex items-center gap-2 text-lg font-semibold text-gray-100">
      <CheckCircle2 class="h-5 w-5 text-green-400" />
      Odblokowane Smaki
      <span class="badge-blue text-xs">{unlockedFlavors.length}</span>
    </h2>
    {#if unlockedFlavors.length === 0}
      <div class="card py-8 text-center">
        <Lock class="mx-auto mb-2 h-8 w-8 text-gray-600" />
        <p class="text-gray-400">Brak odblokowanych smaków. Rozpocznij badania poniżej.</p>
      </div>
    {:else}
      <div class="grid grid-cols-1 gap-2 md:gap-4 md:grid-cols-1 md:grid-cols-2 lg:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {#each unlockedFlavors as flavor (flavor.id)}
          <div class="card card-hover border {TIER_BG_COLORS[flavor.tier] || 'bg-dark-800 border-dark-700'}">
            <!-- Header -->
            <div class="mb-3 flex items-start justify-between">
              <div>
                <h3 class="font-semibold text-gray-100">{flavor.name}</h3>
                <p class="mt-0.5 text-xs text-gray-400">{flavor.description}</p>
              </div>
              <span class="{TIER_BADGE_COLORS[flavor.tier] || 'badge-gray'} text-xs">
                {TIER_LABELS[flavor.tier] || flavor.tier}
              </span>
            </div>

            <!-- Stats Grid -->
            <div class="mb-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div class="rounded bg-dark-950/50 p-2">
                <p class="text-xs text-gray-500">Popularność</p>
                <div class="progress-bar mt-1">
                  <div
                    class="progress-fill h-full rounded-full bg-primary-500"
                    style="width: {flavor.popularity}%"
                  ></div>
                </div>
                <p class="mt-0.5 text-right text-xs text-gray-300">{flavor.popularity}%</p>
              </div>
              <div class="rounded bg-dark-950/50 p-2">
                <p class="text-xs text-gray-500">Marża</p>
                <p class="font-medium text-green-400">{flavor.marginPercent}%</p>
              </div>
              <div class="rounded bg-dark-950/50 p-2">
                <p class="text-xs text-gray-500">Koszt prod.</p>
                <p class="font-medium text-gray-200">{flavor.productionCost.toLocaleString('pl-PL')} PLN</p>
              </div>
              <div class="flex items-center gap-1 rounded bg-dark-950/50 p-2">
                <span class="{getTrendBadge(flavor.trend)} flex items-center gap-1 text-xs">
                  {#if flavor.trend === 'rising'}
                    <TrendingUp class="h-3 w-3" />
                  {:else if flavor.trend === 'falling'}
                    <TrendingDown class="h-3 w-3" />
                  {:else}
                    <Minus class="h-3 w-3" />
                  {/if}
                  {getTrendLabel(flavor.trend)}
                </span>
              </div>
            </div>

            <!-- Quality Stars -->
            <div class="mb-3 flex items-center justify-between rounded bg-dark-950/50 p-2">
              <span class="text-xs text-gray-500">Jakość</span>
              <div class="flex items-center gap-1">
                {#each getStarArray(flavor.qualityLevel) as filled, i (i)}
                  <Star
                    class="h-4 w-4 {filled ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}"
                  />
                {/each}
              </div>
            </div>

            <!-- Upgrade Button -->
            {#if flavor.qualityLevel < 5}
              <button
                class="btn-primary w-full flex items-center justify-center gap-2 text-sm"
                onclick={() => gameStore.upgradeFlavorQuality(flavor.id)}
                disabled={cash < getFlavorUpgradeCost(flavor)}
              >
                <ArrowUpCircle class="h-4 w-4" />
                Ulepsz jakość
                <span class="text-xs opacity-80">
                  ({getFlavorUpgradeCost(flavor).toLocaleString('pl-PL')} PLN)
                </span>
              </button>
              {#if cash < getFlavorUpgradeCost(flavor)}
                <p class="mt-1 flex items-center justify-center gap-1 text-xs text-red-400">
                  <AlertCircle class="h-3 w-3" />
                  Niewystarczające środki
                </p>
              {/if}
            {:else}
              <div class="flex items-center justify-center gap-2 rounded-lg bg-green-900/30 py-2 text-sm text-green-400">
                <Star class="h-4 w-4 fill-yellow-400 text-yellow-400" />
                Maksymalna jakość
              </div>
            {/if}
          </div>
        {/each}
      </div>
    {/if}
  </section>

  <!-- Section 2: Locked Flavors Research -->
  <section>
    <h2 class="mb-3 md:mb-4 flex items-center gap-2 text-lg font-semibold text-gray-100">
      <FlaskConical class="h-5 w-5 text-primary-400" />
      Badania — Nowe Smaki
      <span class="badge-gray text-xs">{lockedFlavors.length} dostępne</span>
    </h2>
    {#if lockedFlavors.length === 0}
      <div class="card py-8 text-center">
        <Sparkles class="mx-auto mb-2 h-8 w-8 text-primary-400" />
        <p class="text-gray-400">Wszystkie smaki zostały odblokowane!</p>
      </div>
    {:else}
      <div class="grid grid-cols-1 gap-2 md:gap-4 md:grid-cols-1 md:grid-cols-2 lg:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {#each lockedFlavors as flavor (flavor.id)}
          {@const canAfford = cash >= flavor.researchCost}
          <div
            class="card card-hover border {canAfford ? TIER_BG_COLORS[flavor.tier] || 'bg-dark-800 border-dark-700' : 'bg-dark-950 border-dark-800 opacity-60'}"
          >
            <div class="mb-3 flex items-start justify-between">
              <div class="flex items-center gap-2">
                <Lock class="h-4 w-4 text-gray-500" />
                <h3 class="font-medium text-gray-100">{flavor.name}</h3>
              </div>
              <span class="{TIER_BADGE_COLORS[flavor.tier] || 'badge-gray'} text-xs">
                {TIER_LABELS[flavor.tier] || flavor.tier}
              </span>
            </div>

            <p class="mb-3 text-sm text-gray-400">{flavor.description}</p>

            <div class="mb-3 space-y-1 text-sm">
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-1 text-gray-400">
                  <Clock class="h-3.5 w-3.5" />
                  Czas badań:
                </span>
                <span class="text-gray-200">{flavor.researchWeeksRequired} tyg.</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-1 text-gray-400">
                  <DollarSign class="h-3.5 w-3.5" />
                  Koszt badań:
                </span>
                <span class="font-medium {canAfford ? 'text-gray-100' : 'text-red-400'}">
                  {flavor.researchCost.toLocaleString('pl-PL')} PLN
                </span>
              </div>
            </div>

            <button
              class="btn-primary w-full flex items-center justify-center gap-2 text-sm"
              onclick={() => gameStore.startResearch(flavor.id)}
              disabled={!canAfford}
            >
              <FlaskConical class="h-4 w-4" />
              Rozpocznij badania
            </button>
            {#if !canAfford}
              <p class="mt-1 flex items-center justify-center gap-1 text-xs text-red-400">
                <AlertCircle class="h-3 w-3" />
                Niewystarczające środki
              </p>
            {/if}
          </div>
        {/each}
      </div>
    {/if}
  </section>

  <!-- Section 3: Available Flavors for Assignment -->
  <section>
    <h2 class="mb-3 md:mb-4 flex items-center gap-2 text-lg font-semibold text-gray-100">
      <CheckCircle2 class="h-5 w-5 text-blue-400" />
      Dostępne Smaki do Przypisania
    </h2>
    <div class="card">
      {#if unlockedFlavors.length === 0}
        <p class="py-4 text-center text-sm text-gray-500">
          Brak dostępnych smaków. Odblokuj smaki w sekcji badań.
        </p>
      {:else}
        <div class="divide-y divide-dark-800">
          {#each unlockedFlavors as flavor (flavor.id)}
            <div class="flex items-center justify-between py-3 first:pt-0 last:pb-0">
              <div class="flex items-center gap-3">
                <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-900">
                  <Sparkles class="h-4 w-4 text-primary-400" />
                </div>
                <div>
                  <p class="font-medium text-gray-100">{flavor.name}</p>
                  <p class="text-xs text-gray-400">{flavor.description}</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <span class="{TIER_BADGE_COLORS[flavor.tier] || 'badge-gray'} text-xs">
                  {TIER_LABELS[flavor.tier] || flavor.tier}
                </span>
                <span class="{getTrendBadge(flavor.trend)} flex items-center gap-1 text-xs">
                  {#if flavor.trend === 'rising'}
                    <TrendingUp class="h-3 w-3" />
                  {:else if flavor.trend === 'falling'}
                    <TrendingDown class="h-3 w-3" />
                  {:else}
                    <Minus class="h-3 w-3" />
                  {/if}
                  {getTrendLabel(flavor.trend)}
                </span>
                <div class="flex items-center gap-0.5">
                  {#each getStarArray(flavor.qualityLevel) as filled, i (i)}
                    <Star
                      class="h-3 w-3 {filled ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}"
                    />
                  {/each}
                </div>
                <span class="badge-blue text-xs">
                  {flavor.marginPercent}% marży
                </span>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </section>
</div>
