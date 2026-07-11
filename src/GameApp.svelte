<script lang="ts">
  import { gameStore } from '$lib/stores/gameStore.svelte';
  import { PAGE_LABELS } from '$lib/types';
  import type { GamePage } from '$lib/types';
  import {
    LayoutDashboard, Users, Factory, FlaskConical, ShoppingCart,
    Wallet, Bell, Save, Upload, RotateCcw, Zap, CalendarDays, PiggyBank,
    Menu, X
  } from 'lucide-svelte';
  import DashboardPage from './pages/DashboardPage.svelte';
  import EmployeesPage from './pages/EmployeesPage.svelte';
  import ProductionPage from './pages/ProductionPage.svelte';
  import ResearchPage from './pages/ResearchPage.svelte';
  import SalesPage from './pages/SalesPage.svelte';
  import FinancesPage from './pages/FinancesPage.svelte';
  import EventsPage from './pages/EventsPage.svelte';

  const navItems: { page: GamePage; icon: any; label: string }[] = [
    { page: 'dashboard', icon: LayoutDashboard, label: 'Panel' },
    { page: 'employees', icon: Users, label: 'Zespol' },
    { page: 'production', icon: Factory, label: 'Produkcja' },
    { page: 'research', icon: FlaskConical, label: 'R&D' },
    { page: 'sales', icon: ShoppingCart, label: 'Sprzedaz' },
    { page: 'finances', icon: Wallet, label: 'Finanse' },
    { page: 'events', icon: Bell, label: 'Eventy' },
  ];

  let showNewGameConfirm = $state(false);
  let mobileMenuOpen = $state(false);

  function handleNewGame() {
    showNewGameConfirm = false;
    gameStore.newGame();
  }

  function switchPage(page: GamePage) {
    gameStore.currentPage = page;
    mobileMenuOpen = false;
  }
</script>

{#if gameStore.isGameOver}
  <!-- Game Over Screen -->
  <div class="fixed inset-0 flex items-center justify-center z-50" style="background: #140C06;">
    <div class="game-over-card max-w-lg w-full text-center p-6 md:p-10 mx-4" style="border: 4px solid #C44030; box-shadow: 8px 8px 0px #5C1A10, inset -2px -2px 0px #2C1C10, inset 2px 2px 0px #6B4A28;">
      <img src="/hero-logo.png" alt="Chipsy Top Manager" class="w-full max-w-[200px] md:max-w-xs mx-auto mb-4 md:mb-6" style="image-rendering: pixelated;" />
      <div class="text-xl md:text-3xl mb-4" style="font-family: 'Press Start 2P', monospace; color: #C44030; line-height: 1.6;">GAME OVER</div>
      <h1 class="text-base md:text-xl mb-4" style="font-family: 'Press Start 2P', monospace; color: #E87060; font-size: clamp(0.5rem, 3vw, 0.7rem); line-height: 1.8;">BANKRUCTWO!</h1>
      <p class="mb-4" style="color: #A89878;">{gameStore.state.gameOverReason}</p>
      <p class="mb-2" style="color: #887858; font-size: 1rem;">Przetrwales {gameStore.state.week} tygodni</p>
      <p class="mb-6" style="color: #887858; font-size: 1rem;">Laczny przychod: {gameStore.state.totalRevenue.toLocaleString('pl-PL')} PLN</p>
      <button class="btn-primary w-full" onclick={handleNewGame}>NOWA GRA</button>
    </div>
  </div>
{:else}
  <div class="game-container" style="background: #140C06;">
    <!-- ====== SIDEBAR (desktop only) ====== -->
    <aside class="hidden lg:flex lg:w-64 flex-col shrink-0" style="background: #1C1008; border-right: 4px solid #4A3018;">
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
            onclick={() => switchPage(item.page)}
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

      <!-- Author Footer -->
      <div class="p-3 text-center" style="border-top: 2px solid #4A3018;">
        <p style="font-family: 'Press Start 2P', monospace; font-size: 0.35rem; color: #887858; line-height: 1.8;">
          by <a href="https://github.com/hsr88/" target="_blank" rel="noopener" style="color: #E8A820; text-decoration: none;">hsr88</a>
        </p>
        <p style="font-family: 'Press Start 2P', monospace; font-size: 0.3rem; color: #685838; line-height: 1.8;">
          <a href="https://hsr.gg/" target="_blank" rel="noopener" style="color: #887858; text-decoration: none;">hsr.gg</a>
          |
          <a href="https://github.com/hsr88/chipsy_manager" target="_blank" rel="noopener" style="color: #887858; text-decoration: none;">github</a>
        </p>
      </div>
    </aside>

    <!-- ====== MAIN CONTENT ====== -->
    <main class="flex-1 flex flex-col overflow-hidden min-w-0">
      <!-- Top Bar (desktop) -->
      <header class="hidden lg:flex h-14 items-center justify-between px-6 shrink-0" style="background: #1C1008; border-bottom: 4px solid #4A3018;">
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
            <Zap size={16} style="color: #6BDD5A;" />
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

      <!-- Mobile Top Bar -->
      <header class="lg:hidden flex h-12 items-center justify-between px-3 shrink-0" style="background: #1C1008; border-bottom: 3px solid #4A3018;">
        <div class="flex items-center gap-2">
          <img src="/hero-logo.png" alt="" class="h-8 pixelated" style="image-rendering: pixelated;" />
          <span style="font-family: 'Press Start 2P', monospace; font-size: 0.4rem; color: #E8D5A3;">T{gameStore.state.week}</span>
        </div>
        <div class="flex items-center gap-3">
          <span style="font-family: 'Press Start 2P', monospace; font-size: 0.4rem; color: {gameStore.state.cash >= 0 ? '#6BDD5A' : '#E87060'};">
            {gameStore.state.cash >= 1000 ? (gameStore.state.cash/1000).toFixed(1)+'k' : gameStore.state.cash} PLN
          </span>
          <button class="p-1" style="color: #E8A820; background: none; border: 2px solid #4A3018;" onclick={() => mobileMenuOpen = !mobileMenuOpen}>
            {#if mobileMenuOpen}
              <X size={20} />
            {:else}
              <Menu size={20} />
            {/if}
          </button>
        </div>
      </header>

      <!-- Mobile Menu Drawer -->
      {#if mobileMenuOpen}
        <div class="lg:hidden fixed inset-0 z-40" style="background: rgba(20, 12, 6, 0.8);" onclick={() => mobileMenuOpen = false}>
          <div class="w-64 h-full overflow-y-auto" style="background: #1C1008; border-right: 4px solid #4A3018;" onclick={(e) => e.stopPropagation()}>
            <div class="p-3 flex items-center justify-between" style="border-bottom: 4px solid #4A3018;">
              <img src="/hero-logo.png" alt="Chipsy Top Manager" class="h-10 pixelated" style="image-rendering: pixelated;" />
              <button onclick={() => mobileMenuOpen = false} style="color: #E8A820; background: none; border: none;">
                <X size={24} />
              </button>
            </div>
            <nav class="py-2">
              {#each navItems as item}
                <button
                  class="nav-item w-full text-left {gameStore.currentPage === item.page ? 'active' : ''}"
                  onclick={() => switchPage(item.page)}
                >
                  <item.icon size={20} />
                  <span>{PAGE_LABELS[item.page]}</span>
                  {#if item.page === 'events' && gameStore.state.activeEvents.length > 0}
                    <span class="badge-red ml-auto">{gameStore.state.activeEvents.length}</span>
                  {/if}
                </button>
              {/each}
            </nav>
            <div class="p-3 space-y-2" style="border-top: 4px solid #4A3018;">
              <button class="btn-primary w-full flex items-center justify-center gap-2" onclick={() => { gameStore.nextWeek(); mobileMenuOpen = false; }}>
                <Zap size={16} />
                NASTEPNY TYDZIEN
              </button>
              <div class="flex gap-2">
                <button class="btn-secondary flex-1 flex items-center justify-center gap-1 p-2" onclick={() => gameStore.saveGame()}>
                  <Save size={14} />
                </button>
                <button class="btn-secondary flex-1 flex items-center justify-center gap-1 p-2" onclick={() => gameStore.loadGame()}>
                  <Upload size={14} />
                </button>
                <button class="btn-danger flex-1 flex items-center justify-center gap-1 p-2" onclick={() => showNewGameConfirm = true}>
                  <RotateCcw size={14} />
                </button>
              </div>
            </div>
            <div class="p-3 text-center" style="border-top: 2px solid #4A3018;">
              <p style="font-family: 'Press Start 2P', monospace; font-size: 0.3rem; color: #887858; line-height: 1.8;">
                by <a href="https://github.com/hsr88/" target="_blank" rel="noopener" style="color: #E8A820;">hsr88</a> | <a href="https://hsr.gg/" target="_blank" rel="noopener" style="color: #887858;">hsr.gg</a>
              </p>
            </div>
          </div>
        </div>
      {/if}

      <!-- Page Content -->
      <div class="flex-1 overflow-y-auto p-3 md:p-6">
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

      <!-- Mobile Bottom Nav -->
      <nav class="lg:hidden flex shrink-0 overflow-x-auto" style="background: #1C1008; border-top: 3px solid #4A3018;">
        {#each navItems as item}
          <button
            class="flex flex-col items-center gap-0.5 py-2 px-2 flex-1 min-w-0"
            style="color: {gameStore.currentPage === item.page ? '#E8A820' : '#887858'}; background: {gameStore.currentPage === item.page ? 'rgba(232, 168, 32, 0.1)' : 'transparent'}; border: none; border-top: 3px solid {gameStore.currentPage === item.page ? '#E8A820' : 'transparent'}; font-family: 'Press Start 2P', monospace; font-size: 0.3rem;"
            onclick={() => switchPage(item.page)}
          >
            <item.icon size={18} />
            <span class="truncate">{item.label}</span>
            {#if item.page === 'events' && gameStore.state.activeEvents.length > 0}
              <span class="absolute top-1 right-1 w-2 h-2 rounded-full" style="background: #C44030;"></span>
            {/if}
          </button>
        {/each}
      </nav>
    </main>

    <!-- Toasts -->
    <div class="fixed bottom-16 lg:bottom-4 right-4 z-50 space-y-2">
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
      <div class="fixed inset-0 flex items-center justify-center z-50 p-4" style="background: rgba(20, 12, 6, 0.9);" onclick={() => showNewGameConfirm = false}>
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

<style>
  .game-container {
    display: flex;
    height: 100dvh;
    height: 100vh;
  }
  @media (max-width: 1023px) {
    .game-container {
      flex-direction: column;
    }
  }
  .pixelated {
    image-rendering: pixelated;
    image-rendering: crisp-edges;
  }
</style>
