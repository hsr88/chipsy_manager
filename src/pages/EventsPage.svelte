<script lang="ts">
  import { gameStore } from '$lib/stores/gameStore.svelte';
  import type { GameEvent } from '$lib/types';
  import { Bell, AlertTriangle, CheckCircle, TrendingUp, TrendingDown, Zap, Shield, Gavel, Clock } from 'lucide-svelte';

  const activeEvents = $derived(gameStore.state.activeEvents);
  const eventHistory = $derived(gameStore.state.eventHistory.slice(0, 20));
  const log = $derived(gameStore.eventLog);

  const typeLabels: Record<string, string> = {
    market: 'Rynek',
    production: 'Produkcja',
    opportunity: 'Okazja',
    crisis: 'Kryzys',
    competition: 'Konkurencja',
    regulatory: 'Prawo',
  };

  const typeColors: Record<string, { bg: string; border: string; text: string; icon: any }> = {
    market: { bg: 'bg-blue-900/20', border: 'border-blue-800', text: 'text-blue-400', icon: TrendingUp },
    production: { bg: 'bg-orange-900/20', border: 'border-orange-800', text: 'text-orange-400', icon: Zap },
    opportunity: { bg: 'bg-green-900/20', border: 'border-green-800', text: 'text-green-400', icon: TrendingUp },
    crisis: { bg: 'bg-red-900/20', border: 'border-red-800', text: 'text-red-400', icon: AlertTriangle },
    competition: { bg: 'bg-purple-900/20', border: 'border-purple-800', text: 'text-purple-400', icon: Shield },
    regulatory: { bg: 'bg-yellow-900/20', border: 'border-yellow-800', text: 'text-yellow-400', icon: Gavel },
  };

  const severityLabels = {
    low: 'Niskie',
    medium: 'Średnie',
    high: 'Poważne',
  };

  const severityColors = {
    low: 'badge-blue',
    medium: 'badge-yellow',
    high: 'badge-red',
  };

  function dismissEvent(eventId: string) {
    gameStore.dismissEvent(eventId);
  }
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-3">
      <Bell size={24} class="text-primary-400" />
      <div>
        <h1 class="section-title mb-0">Wydarzenia</h1>
        <p class="text-sm text-gray-500">Aktualne i historyczne wydarzenia</p>
      </div>
    </div>
    {#if activeEvents.length > 0}
      <span class="badge-red">{activeEvents.length} aktywnych</span>
    {/if}
  </div>

  <!-- Active Events -->
  <div class="card">
    <h2 class="font-semibold text-gray-100 mb-4 flex items-center gap-2">
      <AlertTriangle size={18} class={activeEvents.length > 0 ? 'text-yellow-400' : 'text-gray-500'} />
      Aktywne Wydarzenia
    </h2>
    {#if activeEvents.length === 0}
      <p class="text-sm text-gray-500 text-center py-6">Brak aktywnych wydarzeń. Wszystko pod kontrolą!</p>
    {:else}
      <div class="space-y-3">
        {#each activeEvents as event}
          {@const colors = typeColors[event.type] || typeColors.market}
          {@const IconComp = colors.icon}
          <div class="p-4 rounded-lg border {colors.bg} {colors.border}">
            <div class="flex items-start justify-between mb-2">
              <div class="flex items-center gap-2">
                <IconComp size={18} class={colors.text} />
                <h3 class="font-medium text-gray-100">{event.title}</h3>
              </div>
              <div class="flex items-center gap-2">
                <span class="badge {severityColors[event.severity]}">{severityLabels[event.severity]}</span>
                <span class="badge {colors.bg} {colors.border} {colors.text}">{typeLabels[event.type]}</span>
              </div>
            </div>
            <p class="text-sm text-gray-300 mb-3">{event.description}</p>
            <div class="flex items-center justify-between">
              <span class="text-xs text-gray-500 flex items-center gap-1">
                <Clock size={12} />
                Tydzień {event.week}
              </span>
              <button class="btn-secondary text-xs py-1 px-3 flex items-center gap-1" onclick={() => dismissEvent(event.id)}>
                <CheckCircle size={12} />
                Oznacz jako rozpatrzone
              </button>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>

  <!-- Event History -->
  <div class="card">
    <h2 class="font-semibold text-gray-100 mb-4 flex items-center gap-2">
      <Clock size={18} class="text-gray-400" />
      Historia Wydarzeń
    </h2>
    {#if eventHistory.length === 0}
      <p class="text-sm text-gray-500 text-center py-6">Brak historii wydarzeń.</p>
    {:else}
      <div class="overflow-x-auto max-h-96 overflow-y-auto">
        <table class="w-full">
          <thead class="sticky top-0 bg-dark-900">
            <tr>
              <th class="table-header">Tydzień</th>
              <th class="table-header">Typ</th>
              <th class="table-header">Tytuł</th>
              <th class="table-header">Opis</th>
              <th class="table-header">Powaga</th>
            </tr>
          </thead>
          <tbody>
            {#each eventHistory as event}
              {@const colors = typeColors[event.type] || typeColors.market}
              <tr class="table-row {event.severity === 'high' ? 'bg-red-900/10' : event.severity === 'medium' ? 'bg-yellow-900/10' : ''}">
                <td class="table-cell text-gray-400">{event.week}</td>
                <td class="table-cell"><span class="badge {colors.bg} {colors.border} {colors.text}">{typeLabels[event.type]}</span></td>
                <td class="table-cell font-medium text-gray-200">{event.title}</td>
                <td class="table-cell text-gray-400 max-w-xs truncate">{event.description}</td>
                <td class="table-cell"><span class="badge {severityColors[event.severity]}">{severityLabels[event.severity]}</span></td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </div>

  <!-- Game Log -->
  <div class="card">
    <h2 class="font-semibold text-gray-100 mb-4 flex items-center gap-2">
      <Clock size={18} class="text-gray-400" />
      Log Gry
    </h2>
    <div class="max-h-64 overflow-y-auto space-y-1 bg-dark-800/50 rounded-lg p-3">
      {#each log as entry}
        <p class="text-xs text-gray-500 font-mono">{entry}</p>
      {/each}
    </div>
  </div>
</div>
