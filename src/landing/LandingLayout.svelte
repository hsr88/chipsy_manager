<script lang="ts">
  import { navigate, currentPath } from './router';
  import { Gamepad2, HelpCircle, Info, MessageCircleQuestion, Home } from 'lucide-svelte';

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/jak-grac', label: 'Jak Grać', icon: HelpCircle },
    { path: '/faq', label: 'FAQ', icon: MessageCircleQuestion },
    { path: '/o-grze', label: 'O Grze', icon: Info },
  ];
</script>

<div class="min-h-screen flex flex-col" style="background: linear-gradient(135deg, #140C06 0%, #1C1008 40%, #2C1C10 100%); font-family: 'VT323', monospace;">
  <!-- Navbar -->
  <nav class="sticky top-0 z-50" style="background: rgba(20, 12, 6, 0.95); backdrop-filter: blur(10px); border-bottom: 2px solid #4A3018;">
    <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <!-- Logo -->
      <button class="flex items-center gap-3" onclick={() => navigate('/')}>
        <img src="/hero-logo.png" alt="Chipsy Top Manager" class="h-10 pixelated" style="image-rendering: pixelated;" />
      </button>

      <!-- Nav Links -->
      <div class="hidden md:flex items-center gap-1">
        {#each navLinks as link}
          <button
            class="flex items-center gap-2 px-4 py-2 transition-all"
            style="font-family: 'Press Start 2P', monospace; font-size: 0.5rem; text-transform: uppercase; color: {$currentPath === link.path ? '#E8A820' : '#A89878'}; border-left: 3px solid {$currentPath === link.path ? '#E8A820' : 'transparent'};"
            onclick={() => navigate(link.path)}
          >
            <link.icon size={14} />
            {link.label}
          </button>
        {/each}
      </div>

      <!-- CTA -->
      <button
        class="flex items-center gap-2 px-5 py-2.5"
        style="background: #E8A820; color: #140C06; font-family: 'Press Start 2P', monospace; font-size: 0.5rem; border: 3px solid #B07818; box-shadow: 3px 3px 0px #4A3018; text-transform: uppercase;"
        onclick={() => navigate('/game')}
      >
        <Gamepad2 size={14} />
        GRAJ
      </button>
    </div>
  </nav>

  <!-- Content -->
  <main class="flex-1">
    <slot />
  </main>

  <!-- Footer -->
  <footer style="background: #1C1008; border-top: 3px solid #4A3018;">
    <div class="max-w-6xl mx-auto px-6 py-10">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Brand -->
        <div class="md:col-span-2">
          <img src="/hero-logo.png" alt="Chipsy Top Manager" class="h-16 pixelated mb-4" style="image-rendering: pixelated;" />
          <p style="color: #A89878; font-size: 1.1rem; line-height: 1.5;">
            Polska gra przeglądarkowa typu tycoon, w której zarządzasz własną fabryką chipsów ziemniaczanych. 
            Zatrudniaj pracowników, rozwijaj smaki, negocjuj kontrakty i buduj imperium chrupków!
          </p>
        </div>

        <!-- Links -->
        <div>
          <h4 style="font-family: 'Press Start 2P', monospace; font-size: 0.5rem; color: #E8A820; margin-bottom: 1rem; text-transform: uppercase;">Nawigacja</h4>
          <div class="flex flex-col gap-2">
            {#each navLinks as link}
              <button class="text-left" style="color: #887858; font-size: 1.1rem;" onclick={() => navigate(link.path)}>{link.label}</button>
            {/each}
            <button class="text-left" style="color: #E8A820; font-size: 1.1rem;" onclick={() => navigate('/game')}>> Zagraj teraz</button>
          </div>
        </div>

        <!-- Info -->
        <div>
          <h4 style="font-family: 'Press Start 2P', monospace; font-size: 0.5rem; color: #E8A820; margin-bottom: 1rem; text-transform: uppercase;">Gra</h4>
          <div style="color: #887858; font-size: 1.1rem;" class="flex flex-col gap-2">
            <p>Darmowa gra przeglądarkowa</p>
            <p>Bez rejestracji</p>
            <p>Zapis w przeglądarce</p>
            <p>Polska produkcja</p>
          </div>
        </div>
      </div>

      <div class="mt-8 pt-6 text-center" style="border-top: 1px solid #4A3018;">
        <p style="color: #685838; font-size: 1rem;">
          &copy; 2026 Chipsy Top Manager. Darmowa polska gra przeglądarkowa typu tycoon o produkcji chipsów ziemniaczanych.
        </p>
      </div>
    </div>
  </footer>
</div>
