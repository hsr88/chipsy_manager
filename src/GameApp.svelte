<script lang="ts">
  import { gameStore } from '$lib/stores/gameStore.svelte';
  import { PAGE_LABELS } from '$lib/types';
  import type { GamePage } from '$lib/types';
  import {
    LayoutDashboard, Users, Factory, FlaskConical, ShoppingCart,
    Wallet, Bell, ChevronRight, TrendingUp, TrendingDown,
    Save, Upload, RotateCcw, Zap, CalendarDays, PiggyBank
  } from 'lucide-svelte';
  import DashboardPage from './pages/DashboardPage.svelte';
  import EmployeesPage from './pages/EmployeesPage.svelte';
  import ProductionPage from './pages/ProductionPage.svelte';
  import ResearchPage from './pages/ResearchPage.svelte';
  import SalesPage from './pages/SalesPage.svelte';
  import FinancesPage from './pages/FinancesPage.svelte';
  import EventsPage from './pages/EventsPage.svelte';

  const navItems: { page: GamePage; icon: any }[] = [
    { page: 'dashboard', icon: LayoutDashboard },
    { page: 'employees', icon: Users },
    { page: 'production', icon: Factory },
    { page: 'research', icon: FlaskConical },
    { page: 'sales', icon: ShoppingCart },
    { page: 'finances', icon: Wallet },
    { page: 'events', icon: Bell },
  ];

  let showNewGameConfirm = $state(false);

  function handleNewGame() {
    showNewGameConfirm = false;
    gameStore.newGame();
  }
</script>

{#if gameStore.isGameOver}
  <!-- Game Over Screen -->
  <div class="fixed inset-0 flex items-center justify-center z-50" style="background: #140C06;">
    <div class="card max-w-lg w-full text-center p-10" style="border: 4px solid #C44030; box-shadow: 8px 8px 0px #5C1A10, inset -2px -2px 0px #2C1C10, inset 2px 2px 0px #6B4A28;">
      <img src="/hero-logo.png" alt="Chipsy Top Manager" class="w-full max-w-xs mx-auto mb-6" style="image-rendering: pixelated;" />
      <div style="font-family: 'Press Start 2P', monospace; font-size: 1.2rem; color: #C44030; line-height: 1.6; margin-bottom: 1rem;">GAME OVER</div>
      <h1 style="font-family: 'Press Start 2P', monospace; color: #E87060; font-size: 0.7rem; line-height: 1.8; margin-bottom: 1rem;">BANKRUCTWO!</h1>
      <p style="color: #A89878;">{gameStore.state.gameOverReason}</p>
      <p style="color: #887858; font-size: 1rem; margin: 0.5rem 0;">Przetrwales {gameStore.state.week} tygodni</p>
      <p style="color: #887858; font-size: 1rem; margin-bottom: 1.5rem;">Laczny przychod: {gameStore.state.totalRevenue.toLocaleString('pl-PL')} PLN</p>
      <button class="btn-primary w-full" onclick={handleNewGame}>NOWA GRA</button>
    </div>
  </div>
{:else}
  <div class="flex h-screen" style="background: #140C06;">
    <!-- Sidebar -->
    <aside class="w-64 flex flex-col shrink-0" style="background: #1C1008; border-right: 4px solid #4A3018;">
      <!-- Logo -->
      <div class="p-3" style="border-bottom: 4px solid #4A3018;">
        <img src="/hero-logo.png" alt="Chipsy Top Manager" class="w-full" style="image-rendering: pixelated;" />
        <p style="font-family: 'VT323', monospace; color: #887858; font-size: 1.1rem; text-align: center;">{gameStore.state.companyName}</p>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 py-2 overflow-y-auto">
        {#each navItems as item}
          <button
            class="nav-item w-full text-left {gameStore.currentPage === item.page ? 'active' : ''}"
            onclick={() => gameStore.currentPage = item.page}
          >
            <item.icon size={20} />
            <span>{PAGE_LABELS[item.page]}</span>
            {#if item.page === 'events' && gameStore.state.activeEvents.length > 0}
              <span class="badge-red ml-auto">{gameStore.state.activeEvents.length}</span>
            {/if}
          </button>
        {/each}
      </nav>

      <!-- Game Actions -->
      <div class="p-3 space-y-2" style="border-top: 4px solid #4A3018;">
        <button class="btn-primary w-full flex items-center justify-center gap-2" onclick={() => gameStore.nextWeek()}>
          <Zap size={16} />
          NASTEPNY TYDZIEN
        </button>
        <div class="flex gap-2">
          <button class="btn-secondary flex-1 flex items-center justify-center gap-1 p-2" onclick={() => gameStore.saveGame()} title="Zapisz gre">
            <Save size={14} />
          </button>
          <button class="btn-secondary flex-1 flex items-center justify-center gap-1 p-2" onclick={() => gameStore.loadGame()} title="Wczytaj gre">
            <Upload size={14} />
          </button>
          <button class="btn-danger flex-1 flex items-center justify-center gap-1 p-2" onclick={() => showNewGameConfirm = true} title="Nowa gra">
            <RotateCcw size={14} />
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col overflow-hidden">
      <!-- Top Bar -->
      <header class="h-14 flex items-center justify-between px-6 shrink-0" style="background: #1C1008; border-bottom: 4px solid #4A3018;">
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-2" style="color: #A89878;">
            <CalendarDays size={18} />
            <span style="font-family: 'Press Start 2P', monospace; color: #E8D5A3; font-size: 0.55rem;">TYDZIEN {gameStore.state.week}</span>
          </div>
          <div class="flex items-center gap-2">
            <PiggyBank size={18} style="color: #E8A820;" />
            <span style="font-family: 'Press Start 2P', monospace; font-size: 0.65rem; color: {gameStore.state.cash >= 0 ? '#6BDD5A' : '#E87060'};">
              {gameStore.state.cash.toLocaleString('pl-PL')} PLN
            </span>
          </div>
        </div>
        <div class="flex items-center gap-5" style="font-size: 1.1rem;">
          <div class="flex items-center gap-2">
            <Users size={16} style="color: #A89878;" />
            <span style="color: #C8B898;">{gameStore.totalEmployees} prac.</span>
          </div>
          <div class="flex items-center gap-2">
            <TrendingUp size={16} style="color: #6BDD5A;" />
            <span style="color: #C8B898;">Kap. {Math.round(gameStore.totalCapacity)}</span>
          </div>
          <div class="flex items-center gap-1">
            <span style="color: #887858;">Reputacja:</span>
            <span style="font-family: 'Press Start 2P', monospace; font-size: 0.5rem; color: {gameStore.reputationPercent >= 60 ? '#6BDD5A' : gameStore.reputationPercent >= 30 ? '#E0B830' : '#E87060'};">
              {gameStore.reputationPercent}%
            </span>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <div class="flex-1 overflow-y-auto p-6">
        {#if gameStore.currentPage === 'dashboard'}
          <DashboardPage />
        {:else if gameStore.currentPage === 'employees'}
          <EmployeesPage />
        {:else if gameStore.currentPage === 'production'}
          <ProductionPage />
        {:else if gameStore.currentPage === 'research'}
          <ResearchPage />
        {:else if gameStore.currentPage === 'sales'}
          <SalesPage />
        {:else if gameStore.currentPage === 'finances'}
          <FinancesPage />
        {:else if gameStore.currentPage === 'events'}
          <EventsPage />
        {/if}
      </div>
    </main>

    <!-- Toasts (Retro) -->
    <div class="fixed bottom-4 right-4 z-50 space-y-2">
      {#each gameStore.toasts as toast (toast.id)}
        <div 
          class="px-4 py-3 max-w-sm"
          style="font-family: 'Press Start 2P', monospace; font-size: 0.5rem; line-height: 1.8; border: 3px solid {toast.type === 'success' ? '#4A9E3A' : toast.type === 'error' ? '#C44030' : toast.type === 'warning' ? '#E0B830' : '#3060C4'}; background: {toast.type === 'success' ? 'rgba(74, 158, 58, 0.2)' : toast.type === 'error' ? 'rgba(196, 64, 48, 0.2)' : toast.type === 'warning' ? 'rgba(224, 184, 48, 0.2)' : 'rgba(48, 96, 196, 0.2)'}; color: {toast.type === 'success' ? '#6BDD5A' : toast.type === 'error' ? '#E87060' : toast.type === 'warning' ? '#E0B830' : '#60A0F0'}; box-shadow: 4px 4px 0px rgba(0,0,0,0.5);"
        >
          {toast.message}
        </div>
      {/each}
    </div>

    <!-- New Game Confirmation -->
    {#if showNewGameConfirm}
      <div class="fixed inset-0 flex items-center justify-center z-50" style="background: rgba(20, 12, 6, 0.9);" onclick={() => showNewGameConfirm = false}>
        <div class="card max-w-sm w-full p-6" style="border: 4px solid #E8A820; box-shadow: 6px 6px 0px #4A3018;" onclick={(e) => e.stopPropagation()}>
          <h3 style="font-family: 'Press Start 2P', monospace; color: #F0C040; font-size: 0.65rem; line-height: 1.6; margin-bottom: 1rem;">Nowa gra?</h3>
          <p style="color: #A89878; font-size: 1.1rem; margin-bottom: 1.5rem;">Obecny postep zostanie utracony. Czy na pewno chcesz rozpoczac nowa gre?</p>
          <div class="flex gap-3">
            <button class="btn-secondary flex-1" onclick={() => showNewGameConfirm = false}>Anuluj</button>
            <button class="btn-danger flex-1" onclick={handleNewGame}>NOWA GRA</button>
          </div>
        </div>
      </div>
    {/if}
  </div>
{/if}
