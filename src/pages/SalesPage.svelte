<script lang="ts">
  import { gameStore } from '$lib/stores/gameStore.svelte';
  import type { SalesChannel } from '$lib/types';
  import { ShoppingCart, Handshake, Lock, TrendingUp, BarChart3, Globe } from 'lucide-svelte';

  const channelsWithContracts = $derived(gameStore.state.salesChannels.filter(c => c.currentContract));
  const channelsWithoutContracts = $derived(gameStore.state.salesChannels.filter(c => !c.currentContract && c.isUnlocked));
  const lockedChannels = $derived(gameStore.state.salesChannels.filter(c => !c.isUnlocked));

  const totalWeeklySales = $derived(gameStore.state.salesChannels.reduce((s, c) => s + c.weeklySales, 0));
  const totalAllTimeSales = $derived(gameStore.state.salesChannels.reduce((s, c) => s + c.totalSales, 0));
  const avgMargin = $derived(
    channelsWithContracts.length > 0
      ? Math.round(channelsWithContracts.reduce((s, c) => s + (c.currentContract?.agreedMargin || 0), 0) / channelsWithContracts.length)
      : 0
  );
  const bestChannel = $derived(
    gameStore.state.salesChannels.reduce((best, c) => c.totalSales > best.totalSales ? c : best, gameStore.state.salesChannels[0])
  );

  const typeLabels: Record<string, string> = {
    discount: 'Dyskont',
    supermarket: 'Supermarket',
    convenience: 'Convenience',
    export: 'Eksport',
    online: 'Online',
  };

  const typeColors: Record<string, string> = {
    discount: 'badge-blue',
    supermarket: 'badge-green',
    convenience: 'badge-yellow',
    export: 'badge-blue',
    online: 'badge-green',
  };

  function getNegotiatorBonus(): number {
    const negotiators = gameStore.state.employees.filter(e => e.isHired && (e.role === 'sales_negotiator' || e.role === 'marketing_director'));
    const best = negotiators.sort((a, b) => b.skills.negotiation - a.skills.negotiation)[0];
    return best ? Math.round(best.skills.negotiation) : 30;
  }
</script>

<div class="space-y-3 md:space-y-6">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-3">
      <ShoppingCart size={24} class="text-primary-400" />
      <div>
        <h1 class="section-title mb-0">Sprzedaż i Dystrybucja</h1>
        <p class="text-sm text-gray-500">Zarządzaj kanałami sprzedaży i kontraktami</p>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <span class="badge-green">{gameStore.activeContracts} aktywnych kontraktów</span>
    </div>
  </div>

  <!-- Active Contracts -->
  {#if channelsWithContracts.length > 0}
    <div class="card">
      <h2 class="font-semibold text-gray-100 mb-3 md:mb-4 flex items-center gap-2">
        <Handshake size={18} class="text-green-400" />
        Aktywne Kontrakty
      </h2>
      <div class="overflow-x-auto">
        <div class="table-scroll"><table class="w-full">
          <thead>
            <tr>
              <th class="table-header">Kanał</th>
              <th class="table-header">Typ</th>
              <th class="table-header">Marża</th>
              <th class="table-header">Wolumen tyg.</th>
              <th class="table-header">Pozostało tyg.</th>
              <th class="table-header">Negocjacja za</th>
              <th class="table-header">Sprzedaż tyg.</th>
              <th class="table-header">Akcja</th>
            </tr>
          </thead>
          <tbody>
            {#each channelsWithContracts as ch}
              <tr class="table-row">
                <td class="table-cell font-medium text-gray-200">{ch.name}</td>
                <td class="table-cell"><span class="badge {typeColors[ch.type]}">{typeLabels[ch.type]}</span></td>
                <td class="table-cell text-green-400 font-medium">{ch.currentContract!.agreedMargin}%</td>
                <td class="table-cell">{ch.currentContract!.weeklyVolume.toLocaleString('pl-PL')}</td>
                <td class="table-cell">{ch.currentContract!.weeksRemaining}</td>
                <td class="table-cell text-gray-400">{ch.currentContract!.renegotiableIn} tyg.</td>
                <td class="table-cell font-medium">{ch.weeklySales.toLocaleString('pl-PL')}</td>
                <td class="table-cell">
                  {#if ch.currentContract!.renegotiableIn <= 0}
                    <button class="btn-primary text-xs py-1 px-2" onclick={() => gameStore.negotiateContract(ch.id)}>
                      Renegocjuj
                    </button>
                  {:else}
                    <span class="text-xs text-gray-600">-</span>
                  {/if}
                </td>
              </tr>
            {/each}
          </tbody>
        </table></div>
      </div>
    </div>
  {/if}

  <!-- Available Channels -->
  <div class="card">
    <h2 class="font-semibold text-gray-100 mb-3 md:mb-4 flex items-center gap-2">
      <Handshake size={18} class="text-primary-400" />
      Dostępne Kanały
    </h2>
    {#if channelsWithoutContracts.length === 0}
      <p class="text-sm text-gray-500 text-center py-6">Brak dostępnych kanałów bez kontraktu.</p>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
        {#each channelsWithoutContracts as ch}
          <div class="card-hover">
            <div class="flex items-start justify-between mb-3">
              <div>
                <h3 class="font-medium text-gray-200">{ch.name}</h3>
                <span class="badge {typeColors[ch.type]}">{typeLabels[ch.type]}</span>
              </div>
              <BarChart3 size={16} class="text-gray-500" />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mb-3">
              <div><span class="text-gray-500">Podst. marża:</span> <span class="text-gray-300">{ch.marginPercent}%</span></div>
              <div><span class="text-gray-500">Multiplikator:</span> <span class="text-gray-300">{ch.volumeMultiplier}x</span></div>
              <div><span class="text-gray-500">Stabilność:</span> <span class="text-gray-300">{ch.stability}%</span></div>
              <div><span class="text-gray-500">Wym. reputacja:</span> <span class="text-gray-300">{ch.reputationRequired}%</span></div>
            </div>
            <div class="text-xs text-gray-500 mb-3">
              Bonus negocjacyjny: +{getNegotiatorBonus()}%
            </div>
            <button class="btn-primary w-full text-sm" onclick={() => gameStore.negotiateContract(ch.id)}>
              <Handshake size={14} class="inline mr-1" />
              Wynegocjuj kontrakt
            </button>
          </div>
        {/each}
      </div>
    {/if}
  </div>

  <!-- Locked Channels -->
  {#if lockedChannels.length > 0}
    <div class="card">
      <h2 class="font-semibold text-gray-100 mb-3 md:mb-4 flex items-center gap-2">
        <Lock size={18} class="text-gray-500" />
        Zablokowane Kanały
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
        {#each lockedChannels as ch}
          {@const cost = ch.reputationRequired * 500}
          {@const canUnlock = gameStore.state.reputation.overall >= ch.reputationRequired && gameStore.state.cash >= cost}
          <div class="card opacity-60">
            <div class="flex items-start justify-between mb-3">
              <div>
                <h3 class="font-medium text-gray-200">{ch.name}</h3>
                <span class="badge {typeColors[ch.type]}">{typeLabels[ch.type]}</span>
              </div>
              <Lock size={16} class="text-gray-600" />
            </div>
            <div class="text-sm mb-3 space-y-1">
              <p class="text-gray-500">Wymagana reputacja: <span class="text-gray-300">{ch.reputationRequired}%</span></p>
              <p class="text-gray-500">Koszt odblokowania: <span class="text-gray-300">{cost.toLocaleString('pl-PL')} PLN</span></p>
              <p class="text-gray-500">Potencjalna marża: <span class="text-green-400">{ch.marginPercent}%</span></p>
            </div>
            <button class="btn-secondary w-full text-sm" disabled={!canUnlock} onclick={() => gameStore.unlockChannel(ch.id)}>
              {canUnlock ? 'Odblokuj' : 'Niespełnione wymagania'}
            </button>
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Sales Summary -->
  <div class="grid grid-cols-1 md:grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
    <div class="stat-card">
      <span class="stat-label">Sprzedaż tyg.</span>
      <span class="stat-value text-primary-400">{totalWeeklySales.toLocaleString('pl-PL')}</span>
      <span class="text-xs text-gray-500">sztuk</span>
    </div>
    <div class="stat-card">
      <span class="stat-label">Całkowita sprzedaż</span>
      <span class="stat-value">{totalAllTimeSales.toLocaleString('pl-PL')}</span>
      <span class="text-xs text-gray-500">sztuk</span>
    </div>
    <div class="stat-card">
      <span class="stat-label">Średnia marża</span>
      <span class="stat-value text-green-400">{avgMargin}%</span>
      <span class="text-xs text-gray-500">z kontraktów</span>
    </div>
    <div class="stat-card">
      <span class="stat-label">Najlepszy kanał</span>
      <span class="stat-value text-sm">{bestChannel?.name ?? '-'}</span>
      <span class="text-xs text-gray-500">{bestChannel ? bestChannel.totalSales.toLocaleString('pl-PL') + ' szt.' : ''}</span>
    </div>
  </div>
</div>
