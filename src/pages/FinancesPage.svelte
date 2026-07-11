<script lang="ts">
  import { gameStore } from '$lib/stores/gameStore.svelte';
  import { Wallet, TrendingUp, TrendingDown, PiggyBank, Receipt, AlertTriangle } from 'lucide-svelte';

  const f = $derived(gameStore.state.currentWeekFinance);
  
  const history = $derived(
    gameStore.state.weeklyReports.slice(-12).reverse()
  );

  let loanAmount = $state(20000);

  const totalCosts = $derived(
    f.materialCosts + f.salaryCosts + f.maintenanceCosts + f.rndCosts + f.otherCosts + f.taxAmount
  );

  const avgWeeklyProfit = $derived(
    gameStore.state.weeklyReports.length > 0
      ? Math.round(gameStore.state.weeklyReports.reduce((s, r) => s + r.netProfit, 0) / gameStore.state.weeklyReports.length)
      : 0
  );

  function getProfitClass(val: number): string {
    return val >= 0 ? 'text-green-400' : 'text-red-400';
  }

  function getProfitBg(val: number): string {
    return val >= 0 ? 'bg-green-900/30 border-green-800' : 'bg-red-900/30 border-red-800';
  }

  const weeklyPayment = $derived(Math.round((loanAmount * 1.08) / 20));
  const totalRepay = $derived(Math.round(loanAmount * 1.08));
</script>

<div class="space-y-3 md:space-y-6">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-3">
      <Wallet size={24} class="text-primary-400" />
      <div>
        <h1 class="section-title mb-0">Finanse</h1>
        <p class="text-sm text-gray-500">Szczegółowy przegląd finansowy</p>
      </div>
    </div>
    <div class="text-right">
      <p class="text-sm text-gray-400">Gotówka:</p>
      <p class="text-2xl font-bold {getProfitClass(gameStore.state.cash)}">
        {gameStore.state.cash.toLocaleString('pl-PL')} PLN
      </p>
    </div>
  </div>

  <!-- Weekly Summary -->
  <div class="card">
    <h2 class="font-semibold text-gray-100 mb-3 md:mb-4 flex items-center gap-2">
      <Receipt size={18} class="text-primary-400" />
      Podsumowanie Tygodniowe (Tydzień {gameStore.state.week})
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 md:grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
      <!-- Revenue -->
      <div class="card bg-green-900/20 border-green-800">
        <span class="stat-label text-green-400">Przychody</span>
        <span class="stat-value text-green-400">+{f.revenue.toLocaleString('pl-PL')} PLN</span>
      </div>
      <!-- Material Costs -->
      <div class="card bg-red-900/20 border-red-800">
        <span class="stat-label text-red-400">Koszty materiałów</span>
        <span class="stat-value text-red-400">-{f.materialCosts.toLocaleString('pl-PL')} PLN</span>
      </div>
      <!-- Salary Costs -->
      <div class="card bg-red-900/20 border-red-800">
        <span class="stat-label text-red-400">Koszty osobowe</span>
        <span class="stat-value text-red-400">-{f.salaryCosts.toLocaleString('pl-PL')} PLN</span>
      </div>
      <!-- Maintenance -->
      <div class="card bg-red-900/20 border-red-800">
        <span class="stat-label text-red-400">Utrzymanie</span>
        <span class="stat-value text-red-400">-{f.maintenanceCosts.toLocaleString('pl-PL')} PLN</span>
      </div>
      <!-- R&D -->
      <div class="card bg-red-900/20 border-red-800">
        <span class="stat-label text-red-400">R&D</span>
        <span class="stat-value text-red-400">-{f.rndCosts.toLocaleString('pl-PL')} PLN</span>
      </div>
      <!-- Other -->
      <div class="card bg-red-900/20 border-red-800">
        <span class="stat-label text-red-400">Inne koszty</span>
        <span class="stat-value text-red-400">-{f.otherCosts.toLocaleString('pl-PL')} PLN</span>
      </div>
      <!-- Tax -->
      <div class="card bg-yellow-900/20 border-yellow-800">
        <span class="stat-label text-yellow-400">Podatek (19%)</span>
        <span class="stat-value text-yellow-400">-{f.taxAmount.toLocaleString('pl-PL')} PLN</span>
      </div>
      <!-- Net Profit -->
      <div class="card {getProfitBg(f.netProfit)}">
        <span class="stat-label {getProfitClass(f.netProfit)}">Zysk netto</span>
        <span class="stat-value {getProfitClass(f.netProfit)}">
          {f.netProfit >= 0 ? '+' : ''}{f.netProfit.toLocaleString('pl-PL')} PLN
        </span>
      </div>
    </div>
  </div>

  <!-- Finance History -->
  <div class="card">
    <h2 class="font-semibold text-gray-100 mb-3 md:mb-4 flex items-center gap-2">
      <TrendingUp size={18} class="text-primary-400" />
      Historia Finansowa (ostatnie 12 tygodni)
    </h2>
    {#if history.length === 0}
      <p class="text-sm text-gray-500 text-center py-8">Brak historii — rozegraj pierwszy tydzień.</p>
    {:else}
      <div class="overflow-x-auto">
        <div class="table-scroll"><table class="w-full">
          <thead>
            <tr>
              <th class="table-header">Tydzień</th>
              <th class="table-header">Przychody</th>
              <th class="table-header">Koszty</th>
              <th class="table-header">Zysk netto</th>
            </tr>
          </thead>
          <tbody>
            {#each history as report}
              {@const costs = report.materialCosts + report.salaryCosts + report.maintenanceCosts + report.rndCosts + report.otherCosts + report.taxAmount}
              <tr class="table-row">
                <td class="table-cell font-medium">{report.week}</td>
                <td class="table-cell text-green-400">{report.revenue.toLocaleString('pl-PL')} PLN</td>
                <td class="table-cell text-red-400">-{costs.toLocaleString('pl-PL')} PLN</td>
                <td class="table-cell font-medium {getProfitClass(report.netProfit)}">
                  {report.netProfit >= 0 ? '+' : ''}{report.netProfit.toLocaleString('pl-PL')} PLN
                </td>
              </tr>
            {/each}
          </tbody>
        </table></div>
      </div>
    {/if}
  </div>

  <!-- Loans -->
  <div class="grid grid-cols-1 lg:grid-cols-1 md:grid-cols-2 gap-3 md:p-6">
    <!-- Active Loans -->
    <div class="card">
      <h2 class="font-semibold text-gray-100 mb-3 md:mb-4 flex items-center gap-2">
        <Receipt size={18} class="text-yellow-400" />
        Aktywne Kredyty
      </h2>
      {#if gameStore.state.loans.length === 0}
        <p class="text-sm text-gray-500 text-center py-6">Brak aktywnych kredytów.</p>
      {:else}
        <div class="space-y-3">
          {#each gameStore.state.loans as loan}
            <div class="p-3 rounded-lg bg-dark-800 border border-dark-700">
              <div class="flex justify-between items-center mb-2">
                <span class="font-medium text-gray-200">Kredyt #{loan.id.slice(-4)}</span>
                <span class="badge-yellow">{loan.weeksRemaining} tyg.</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
                <div><span class="text-gray-500">Kwota:</span> <span class="text-gray-300">{loan.amount.toLocaleString('pl-PL')} PLN</span></div>
                <div><span class="text-gray-500">Oprocentowanie:</span> <span class="text-gray-300">8%</span></div>
                <div><span class="text-gray-500">Rata tyg.:</span> <span class="text-yellow-400">{Math.round(loan.weeklyPayment).toLocaleString('pl-PL')} PLN</span></div>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>

    <!-- Take Loan -->
    <div class="card">
      <h2 class="font-semibold text-gray-100 mb-3 md:mb-4 flex items-center gap-2">
        <PiggyBank size={18} class="text-green-400" />
        Weź Kredyt
      </h2>
      <div class="space-y-2 md:space-y-4">
        <div>
          <label class="text-sm text-gray-400 mb-1 block">Kwota kredytu</label>
          <input type="range" min="5000" max="200000" step="5000" bind:value={loanAmount} class="w-full accent-primary-500" />
          <div class="flex justify-between text-sm mt-1">
            <span class="text-gray-500">5 000 PLN</span>
            <span class="text-primary-400 font-bold">{loanAmount.toLocaleString('pl-PL')} PLN</span>
            <span class="text-gray-500">200 000 PLN</span>
          </div>
        </div>
        <div class="p-3 rounded-lg bg-dark-800 border border-dark-700 text-sm space-y-1">
          <div class="flex justify-between"><span class="text-gray-400">Oprocentowanie:</span> <span class="text-gray-200">8%</span></div>
          <div class="flex justify-between"><span class="text-gray-400">Okres spłaty:</span> <span class="text-gray-200">20 tygodni</span></div>
          <div class="flex justify-between"><span class="text-gray-400">Tygodniowa rata:</span> <span class="text-yellow-400">{weeklyPayment.toLocaleString('pl-PL')} PLN</span></div>
          <div class="flex justify-between border-t border-dark-700 pt-1 mt-1"><span class="text-gray-400">Do spłaty razem:</span> <span class="text-primary-400 font-medium">{totalRepay.toLocaleString('pl-PL')} PLN</span></div>
        </div>
        <button class="btn-primary w-full" onclick={() => gameStore.takeLoan(loanAmount)}>
          Weź kredyt
        </button>
        {#if gameStore.state.loans.length >= 3}
          <p class="text-xs text-yellow-400 flex items-center gap-1"><AlertTriangle size={12} /> Osiągnięto limit kredytów (max 3).</p>
        {/if}
      </div>
    </div>
  </div>

  <!-- Overall Stats -->
  <div class="grid grid-cols-1 md:grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
    <div class="stat-card">
      <span class="stat-label">Całkowity przychód</span>
      <span class="stat-value text-green-400">{gameStore.state.totalRevenue.toLocaleString('pl-PL')} PLN</span>
    </div>
    <div class="stat-card">
      <span class="stat-label">Całkowity zysk</span>
      <span class="stat-value {getProfitClass(gameStore.state.totalProfit)}">
        {gameStore.state.totalProfit >= 0 ? '+' : ''}{gameStore.state.totalProfit.toLocaleString('pl-PL')} PLN
      </span>
    </div>
    <div class="stat-card">
      <span class="stat-label">Średni tygodniowy zysk</span>
      <span class="stat-value {getProfitClass(avgWeeklyProfit)}">
        {avgWeeklyProfit >= 0 ? '+' : ''}{avgWeeklyProfit.toLocaleString('pl-PL')} PLN
      </span>
    </div>
    <div class="stat-card">
      <span class="stat-label">Liczba tygodni</span>
      <span class="stat-value">{gameStore.state.week}</span>
    </div>
  </div>
</div>
