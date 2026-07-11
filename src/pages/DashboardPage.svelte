<script lang="ts">
  import { gameStore } from '$lib/stores/gameStore.svelte';
  import { TrendingUp, TrendingDown, Users, Factory, Wallet, Package, AlertTriangle, Zap, CalendarDays } from 'lucide-svelte';

  // KPI calculations
  const weeklyRevenue = $derived(gameStore.state.currentWeekFinance.revenue);
  const weeklyProfit = $derived(gameStore.state.currentWeekFinance.netProfit);
  const weeklyCosts = $derived(
    gameStore.state.currentWeekFinance.materialCosts +
    gameStore.state.currentWeekFinance.salaryCosts +
    gameStore.state.currentWeekFinance.maintenanceCosts +
    gameStore.state.currentWeekFinance.rndCosts +
    gameStore.state.currentWeekFinance.otherCosts
  );

  // Production stats
  const activeLines = $derived(gameStore.state.productionLines.filter(l => l.isActive).length);
  const totalLines = $derived(gameStore.state.productionLines.length);
  const avgMaintenance = $derived(
    gameStore.state.productionLines.length > 0
      ? Math.round(gameStore.state.productionLines.reduce((s, l) => s + l.maintenanceLevel, 0) / gameStore.state.productionLines.length)
      : 0
  );

  // Finance history for chart (last 6 weeks)
  const financeHistory = $derived(
    gameStore.state.weeklyReports.slice(-6)
  );

  // Recent events (last 5)
  const recentEvents = $derived(gameStore.state.activeEvents.slice(0, 5));

  // Material stock percentages
  function getStockPercent(stock: number, max: number = 10000): number {
    return Math.min(100, Math.round((stock / max) * 100));
  }

  function getStockColor(percent: number): string {
    if (percent > 50) return 'bg-green-500';
    if (percent > 20) return 'bg-yellow-500';
    return 'bg-red-500';
  }

  // Max bar height for mini chart
  const maxRevenue = $derived(
    financeHistory.length > 0
      ? Math.max(...financeHistory.map(r => Math.max(r.revenue, r.materialCosts + r.salaryCosts)))
      : 1
  );
</script>

<div class="space-y-6">
  <!-- Welcome Header -->
  <div class="flex items-center justify-between">
    <div>
      <h1 class="section-title mb-1">Dashboard</h1>
      <p class="text-sm text-gray-500">Tydzień {gameStore.state.week} | {gameStore.state.companyName}</p>
    </div>
    <button class="btn-primary flex items-center gap-2" onclick={() => gameStore.nextWeek()}>
      <Zap size={16} />
      Następny tydzień
    </button>
  </div>

  <!-- KPI Cards -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <!-- Cash -->
    <div class="stat-card">
      <div class="flex items-center justify-between">
        <span class="stat-label">Gotówka</span>
        <Wallet size={16} class={gameStore.state.cash >= 0 ? 'text-green-400' : 'text-red-400'} />
      </div>
      <span class="stat-value {gameStore.state.cash >= 0 ? 'text-green-400' : 'text-red-400'}">
        {gameStore.state.cash.toLocaleString('pl-PL')} PLN
      </span>
      <span class="text-xs {gameStore.state.cash > 50000 ? 'text-green-500' : gameStore.state.cash > 20000 ? 'text-yellow-500' : 'text-red-500'}">
        {gameStore.state.cash > 50000 ? 'Stabilna sytuacja' : gameStore.state.cash > 20000 ? 'Uważaj na wydatki' : 'Ryzyko bankructwa!'}
      </span>
    </div>

    <!-- Weekly Revenue -->
    <div class="stat-card">
      <div class="flex items-center justify-between">
        <span class="stat-label">Przychód (tyg.)</span>
        <TrendingUp size={16} class="text-primary-400" />
      </div>
      <span class="stat-value text-primary-400">{weeklyRevenue.toLocaleString('pl-PL')} PLN</span>
      <span class="text-xs text-gray-500">
        Szacowane koszty: {weeklyCosts.toLocaleString('pl-PL')} PLN
      </span>
    </div>

    <!-- Weekly Profit -->
    <div class="stat-card">
      <div class="flex items-center justify-between">
        <span class="stat-label">Zysk netto (tyg.)</span>
        {#if weeklyProfit >= 0}
          <TrendingUp size={16} class="text-green-400" />
        {:else}
          <TrendingDown size={16} class="text-red-400" />
        {/if}
      </div>
      <span class="stat-value {weeklyProfit >= 0 ? 'text-green-400' : 'text-red-400'}">
        {weeklyProfit >= 0 ? '+' : ''}{weeklyProfit.toLocaleString('pl-PL')} PLN
      </span>
      <span class="text-xs {weeklyProfit >= 0 ? 'text-green-600' : 'text-red-600'}">
        {weeklyProfit >= 0 ? 'Na plusie' : 'Strata!'} (po podatku)
      </span>
    </div>

    <!-- Employees -->
    <div class="stat-card">
      <div class="flex items-center justify-between">
        <span class="stat-label">Zespół</span>
        <Users size={16} class="text-blue-400" />
      </div>
      <span class="stat-value">{gameStore.totalEmployees}</span>
      <span class="text-xs text-gray-500">
        Pensje: {gameStore.weeklySalaryCost.toLocaleString('pl-PL')} PLN/tyg.
      </span>
    </div>
  </div>

  <!-- Production Overview + Materials -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Production Status -->
    <div class="card">
      <div class="flex items-center gap-2 mb-4">
        <Factory size={18} class="text-primary-400" />
        <h2 class="font-semibold text-gray-100">Produkcja</h2>
      </div>
      <div class="space-y-4">
        <div class="flex justify-between text-sm">
          <span class="text-gray-400">Aktywne linie:</span>
          <span class="font-medium {activeLines > 0 ? 'text-green-400' : 'text-red-400'}">{activeLines} / {totalLines}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-400">Całkowita pojemność:</span>
          <span class="font-medium text-gray-200">{Math.round(gameStore.totalCapacity)} jedn./tyg.</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-400">Stan techniczny (śr.):</span>
          <span class="font-medium {avgMaintenance >= 70 ? 'text-green-400' : avgMaintenance >= 40 ? 'text-yellow-400' : 'text-red-400'}">{avgMaintenance}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill {avgMaintenance >= 70 ? 'bg-green-500' : avgMaintenance >= 40 ? 'bg-yellow-500' : 'bg-red-500'}" style="width: {avgMaintenance}%"></div>
        </div>
        <div class="pt-2 border-t border-dark-800">
          <p class="text-xs text-gray-500 mb-2">Produkowane smaki:</p>
          <div class="flex flex-wrap gap-2">
            {#each gameStore.state.productionLines.filter(l => l.isActive && l.assignedFlavor) as line}
              {@const flavor = gameStore.state.flavors.find(f => f.id === line.assignedFlavor)}
              {#if flavor}
                <span class="badge-green">{flavor.name}</span>
              {/if}
            {/each}
            {#if gameStore.state.productionLines.filter(l => l.isActive && l.assignedFlavor).length === 0}
              <span class="text-xs text-gray-600">Brak przypisanych smaków</span>
            {/if}
          </div>
        </div>
      </div>
    </div>

    <!-- Material Stock -->
    <div class="card">
      <div class="flex items-center gap-2 mb-4">
        <Package size={18} class="text-primary-400" />
        <h2 class="font-semibold text-gray-100">Magazyn Surowców</h2>
      </div>
      <div class="space-y-3">
        {#each gameStore.state.rawMaterials as material}
          <div>
            <div class="flex justify-between text-sm mb-1">
              <span class="text-gray-300">{material.name}</span>
              <span class="text-gray-400">{Math.round(material.stock)} szt. | {material.currentPrice.toFixed(2)} PLN</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill {getStockColor(getStockPercent(material.stock))}" style="width: {getStockPercent(material.stock)}%"></div>
            </div>
          </div>
        {/each}
      </div>
      <div class="mt-4 pt-3 border-t border-dark-800 flex gap-2">
        <button class="btn-secondary text-xs flex-1" onclick={() => gameStore.currentPage = 'production'}>
          Zarządzaj produkcją
        </button>
        <button class="btn-secondary text-xs flex-1" onclick={() => gameStore.currentPage = 'sales'}>
          Sprzedaż
        </button>
      </div>
    </div>
  </div>

  <!-- Finance Mini Chart + Active Events -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Mini Finance Chart -->
    <div class="card lg:col-span-2">
      <div class="flex items-center gap-2 mb-4">
        <TrendingUp size={18} class="text-green-400" />
        <h2 class="font-semibold text-gray-100">Historia Finansowa (ostatnie 6 tygodni)</h2>
      </div>
      {#if financeHistory.length === 0}
        <p class="text-sm text-gray-500 text-center py-8">Rozpocznij grę, aby zobaczyć historię finansową.</p>
      {:else}
        <div class="flex items-end gap-2 h-40 mb-4">
          {#each financeHistory as report}
            {@const revenueHeight = maxRevenue > 0 ? Math.max(5, (report.revenue / maxRevenue) * 100) : 5}
            {@const costHeight = maxRevenue > 0 ? Math.max(5, ((report.materialCosts + report.salaryCosts + report.maintenanceCosts) / maxRevenue) * 100) : 5}
            <div class="flex-1 flex flex-col items-center gap-1">
              <div class="w-full flex gap-0.5 items-end h-32">
                <div class="flex-1 bg-green-700 rounded-t" style="height: {revenueHeight}%"></div>
                <div class="flex-1 bg-red-700 rounded-t" style="height: {costHeight}%"></div>
              </div>
              <span class="text-[10px] text-gray-500">T{report.week}</span>
            </div>
          {/each}
        </div>
        <div class="flex gap-4 text-xs text-gray-400 justify-center">
          <span class="flex items-center gap-1"><div class="w-3 h-3 bg-green-700 rounded"></div> Przychody</span>
          <span class="flex items-center gap-1"><div class="w-3 h-3 bg-red-700 rounded"></div> Koszty</span>
        </div>
      {/if}
    </div>

    <!-- Active Events -->
    <div class="card">
      <div class="flex items-center gap-2 mb-4">
        <AlertTriangle size={18} class={recentEvents.length > 0 ? 'text-yellow-400' : 'text-gray-500'} />
        <h2 class="font-semibold text-gray-100">Wydarzenia</h2>
        {#if recentEvents.length > 0}
          <span class="badge-yellow">{recentEvents.length}</span>
        {/if}
      </div>
      <div class="space-y-3 max-h-48 overflow-y-auto">
        {#if recentEvents.length === 0}
          <p class="text-sm text-gray-500 text-center py-4">Brak aktywnych wydarzeń.</p>
        {:else}
          {#each recentEvents as event}
            <div class="p-3 rounded-lg border border-dark-700 {event.severity === 'high' ? 'bg-red-900/20 border-red-800' : event.severity === 'medium' ? 'bg-yellow-900/20 border-yellow-800' : 'bg-blue-900/20 border-blue-800'}">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xs font-medium {event.severity === 'high' ? 'text-red-400' : event.severity === 'medium' ? 'text-yellow-400' : 'text-blue-400'}">
                  {event.severity === 'high' ? 'Poważne' : event.severity === 'medium' ? 'Średnie' : 'Niskie'}
                </span>
                <span class="text-[10px] text-gray-500">Tydzień {event.week}</span>
              </div>
              <p class="text-sm font-medium text-gray-200">{event.title}</p>
              <p class="text-xs text-gray-400 mt-1">{event.description}</p>
            </div>
          {/each}
        {/if}
      </div>
      <button class="btn-secondary text-xs w-full mt-3" onclick={() => gameStore.currentPage = 'events'}>
        Wszystkie wydarzenia
      </button>
    </div>
  </div>

  <!-- Quick Actions -->
  <div class="card">
    <h2 class="font-semibold text-gray-100 mb-3">Szybkie Akcje</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <button class="btn-primary text-sm" onclick={() => gameStore.currentPage = 'employees'}>
        <Users size={14} class="inline mr-1" />
        Zatrudnij
      </button>
      <button class="btn-primary text-sm" onclick={() => gameStore.currentPage = 'research'}>
        <Zap size={14} class="inline mr-1" />
        Badania
      </button>
      <button class="btn-secondary text-sm" onclick={() => gameStore.saveGame()}>
        Zapisz grę
      </button>
      <button class="btn-secondary text-sm" onclick={() => gameStore.loadGame()}>
        Wczytaj grę
      </button>
    </div>
  </div>
</div>
