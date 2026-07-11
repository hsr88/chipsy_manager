<script lang="ts">
  import { gameStore } from '$lib/stores/gameStore.svelte';
  import { MATERIAL_LABELS } from '$lib/types';
  import {
    Factory,
    Wrench,
    ArrowUpCircle,
    Play,
    Square,
    ShoppingCart,
    Plus,
    Cpu,
    TrendingUp,
    AlertTriangle,
    Package
  } from 'lucide-svelte';

  // Local state for purchase inputs
  let purchaseAmounts = $state<Record<string, number>>({});

  // Derived values
  const totalCapacity = $derived(gameStore.totalCapacity);
  const productionLines = $derived(gameStore.state.productionLines);
  const rawMaterials = $derived(gameStore.state.rawMaterials);
  const unlockedFlavors = $derived(gameStore.unlockedFlavors);
  const cash = $derived(gameStore.state.cash);

  function getStockColor(stock: number, maxStock: number = 1000): string {
    const ratio = stock / maxStock;
    if (ratio > 0.5) return 'bg-green-500';
    if (ratio > 0.2) return 'bg-yellow-500';
    return 'bg-red-500';
  }

  function getEfficiencyColor(eff: number): string {
    if (eff >= 0.8) return 'text-green-400';
    if (eff >= 0.5) return 'text-yellow-400';
    return 'text-red-400';
  }

  function getMaintenanceColor(level: number): string {
    if (level >= 70) return 'bg-green-500';
    if (level >= 30) return 'bg-yellow-500';
    return 'bg-red-500';
  }

  function getMaintenanceText(level: number): string {
    if (level >= 70) return 'text-green-400';
    if (level >= 30) return 'text-yellow-400';
    return 'text-red-400';
  }

  function handleBuyMaterial(type: string) {
    const amount = purchaseAmounts[type] || 0;
    if (amount > 0) {
      gameStore.buyMaterial(type, amount);
      purchaseAmounts[type] = 0;
    }
  }

  function getRepairCost(line: typeof productionLines[0]): number {
    return Math.round((100 - line.maintenanceLevel) * 80);
  }

  function getUpgradeCost(line: typeof productionLines[0]): number {
    return line.upgradeLevel * 25000;
  }
</script>

<div class="space-y-3 md:space-y-6 p-3 md:p-6">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-3">
      <Factory class="h-7 w-7 text-primary-400" />
      <h1 class="section-title">Produkcja</h1>
    </div>
    <div class="flex items-center gap-2 md:gap-4 text-sm text-gray-400">
      <div class="flex items-center gap-2">
        <Cpu class="h-4 w-4 text-primary-400" />
        <span>Całkowita pojemność: <strong class="text-gray-100">{totalCapacity.toLocaleString('pl-PL')}</strong> kg/tyg.</span>
      </div>
      <div class="flex items-center gap-2">
        <Package class="h-4 w-4 text-primary-400" />
        <span>Aktywne linie: <strong class="text-gray-100">{productionLines.filter(l => l.isActive).length}/{productionLines.length}</strong></span>
      </div>
    </div>
  </div>

  <!-- Section 1: Surowce -->
  <section>
    <h2 class="mb-3 md:mb-4 flex items-center gap-2 text-lg font-semibold text-gray-100">
      <Package class="h-5 w-5 text-primary-400" />
      Surowce
    </h2>
    <div class="grid grid-cols-1 gap-2 md:gap-4 md:grid-cols-1 md:grid-cols-2 lg:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {#each rawMaterials as material (material.type)}
        <div class="card card-hover">
          <div class="flex items-start justify-between">
            <div>
              <h3 class="font-medium text-gray-100">{MATERIAL_LABELS[material.type] || material.name}</h3>
              <p class="mt-1 text-sm text-gray-400">{material.name}</p>
            </div>
            <span class="badge-blue">{material.quality}/10</span>
          </div>

          <div class="mt-3 space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-400">Cena:</span>
              <span class="font-medium text-gray-100">{material.currentPrice.toLocaleString('pl-PL')} PLN/kg</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-400">Stan magazynu:</span>
              <span class="font-medium text-gray-100">{material.stock.toLocaleString('pl-PL')} kg</span>
            </div>
            <div class="progress-bar">
              <div
                class="progress-fill h-full rounded-full transition-all duration-300 {getStockColor(material.stock)}"
                style="width: {Math.min((material.stock / 1000) * 100, 100)}%"
              ></div>
            </div>
          </div>

          <div class="mt-4 flex items-center gap-2">
            <input
              type="number"
              min="0"
              class="input-field w-24 text-sm"
              placeholder="Ilość"
              bind:value={purchaseAmounts[material.type]}
            />
            <button
              class="btn-primary flex items-center gap-1 text-sm"
              onclick={() => handleBuyMaterial(material.type)}
              disabled={(purchaseAmounts[material.type] || 0) <= 0}
            >
              <ShoppingCart class="h-3.5 w-3.5" />
              Zakup
            </button>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- Section 2: Linie Produkcji -->
  <section>
    <h2 class="mb-3 md:mb-4 flex items-center gap-2 text-lg font-semibold text-gray-100">
      <Factory class="h-5 w-5 text-primary-400" />
      Linie Produkcji
    </h2>
    <div class="overflow-x-auto">
      <div class="table-scroll"><table class="w-full">
        <thead>
          <tr class="table-header">
            <th class="text-left">Nazwa</th>
            <th class="text-center">Status</th>
            <th class="text-right">Pojemność</th>
            <th class="text-right">Efektywność</th>
            <th class="text-center">Stan techniczny</th>
            <th class="text-center">Poziom</th>
            <th class="text-right">Koszt tyg.</th>
            <th class="text-left">Przypisany smak</th>
            <th class="text-center">Akcje</th>
          </tr>
        </thead>
        <tbody>
          {#each productionLines as line (line.id)}
            <tr class="table-row">
              <td class="table-cell font-medium text-gray-100">{line.name}</td>
              <td class="table-cell text-center">
                <button
                  class={line.isActive ? 'btn-success text-xs' : 'btn-danger text-xs'}
                  onclick={() => gameStore.toggleLine(line.id)}
                >
                  {#if line.isActive}
                    <Square class="mr-1 inline h-3 w-3" />
                    Wyłącz
                  {:else}
                    <Play class="mr-1 inline h-3 w-3" />
                    Włącz
                  {/if}
                </button>
              </td>
              <td class="table-cell text-right text-gray-300">{line.capacity.toLocaleString('pl-PL')} kg</td>
              <td class="table-cell text-right {getEfficiencyColor(line.efficiency)}">
                {Math.round(line.efficiency * 100)}%
              </td>
              <td class="table-cell">
                <div class="mx-auto w-24">
                  <div class="progress-bar">
                    <div
                      class="progress-fill h-full rounded-full transition-all duration-300 {getMaintenanceColor(line.maintenanceLevel)}"
                      style="width: {line.maintenanceLevel}%"
                    ></div>
                  </div>
                  <span class="mt-1 block text-center text-xs {getMaintenanceText(line.maintenanceLevel)}">
                    {Math.round(line.maintenanceLevel)}%
                  </span>
                </div>
              </td>
              <td class="table-cell text-center">
                <span class="badge-blue">{line.upgradeLevel}/5</span>
              </td>
              <td class="table-cell text-right text-gray-300">
                {line.weeklyCost.toLocaleString('pl-PL')} PLN
              </td>
              <td class="table-cell">
                {#if line.assignedFlavor}
                  <span class="rounded-full bg-primary-900 px-2 py-0.5 text-xs text-primary-300">
                    {line.assignedFlavor}
                  </span>
                {:else}
                  <span class="text-xs text-gray-500">—</span>
                {/if}
              </td>
              <td class="table-cell">
                <div class="flex flex-col gap-1">
                  {#if line.maintenanceLevel < 90}
                    <button
                      class="btn-secondary flex items-center justify-center gap-1 px-2 py-1 text-xs"
                      onclick={() => gameStore.repairLine(line.id)}
                      disabled={cash < getRepairCost(line)}
                      title="Koszt naprawy: {getRepairCost(line).toLocaleString('pl-PL')} PLN"
                    >
                      <Wrench class="h-3 w-3" />
                      Napraw ({getRepairCost(line).toLocaleString('pl-PL')} PLN)
                    </button>
                  {/if}
                  {#if line.upgradeLevel < 5}
                    <button
                      class="btn-primary flex items-center justify-center gap-1 px-2 py-1 text-xs"
                      onclick={() => gameStore.upgradeLine(line.id)}
                      disabled={cash < getUpgradeCost(line)}
                      title="Koszt ulepszenia: {getUpgradeCost(line).toLocaleString('pl-PL')} PLN"
                    >
                      <ArrowUpCircle class="h-3 w-3" />
                      Ulepsz ({getUpgradeCost(line).toLocaleString('pl-PL')} PLN)
                    </button>
                  {/if}
                  <select
                    class="input-field mt-1 py-1 text-xs"
                    onchange={(e) => {
                      const val = (e.target as HTMLSelectElement).value;
                      if (val) gameStore.assignFlavorToLine(line.id, val);
                    }}
                  >
                    <option value="">Wybierz smak...</option>
                    {#each unlockedFlavors as flavor (flavor.id)}
                      <option value={flavor.id}>{flavor.name}</option>
                    {/each}
                  </select>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table></div>
    </div>
  </section>

  <!-- Section 3: Nowa Linia -->
  <section>
    <div class="card flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-900">
          <Plus class="h-5 w-5 text-primary-400" />
        </div>
        <div>
          <h3 class="font-medium text-gray-100">Nowa Linia Produkcyjna</h3>
          <p class="text-sm text-gray-400">Zwiększ swoją zdolność produkcyjną</p>
        </div>
      </div>
      <button
        class="btn-primary flex items-center gap-2"
        onclick={() => gameStore.buyProductionLine()}
        disabled={cash < 75000}
      >
        <Plus class="h-4 w-4" />
        Kup ({(75000).toLocaleString('pl-PL')} PLN)
      </button>
    </div>
    {#if cash < 75000}
      <p class="mt-2 flex items-center gap-1 text-xs text-red-400">
        <AlertTriangle class="h-3 w-3" />
        Niewystarczające środki (potrzebne: 75 000 PLN)
      </p>
    {/if}
  </section>
</div>
