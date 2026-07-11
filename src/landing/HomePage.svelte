<script lang="ts">
  import { navigate } from './router';
  import { 
    Gamepad2, Users, Factory, FlaskConical, ShoppingCart, 
    TrendingUp, Shield, Zap, Star, Award, Target, Clock
  } from 'lucide-svelte';
</script>

<svelte:head>
  <title>Chipsy Top Manager | Darmowa polska gra przeglądarkowa tycoon</title>
  <meta name="description" content="Chipsy Top Manager — darmowa polska gra przeglądarkowa typu tycoon. Zarządzaj fabryką chipsów ziemniaczanych, zatrudniaj pracowników, rozwijaj smaki, negocjuj kontrakty i buduj imperium chrupków. Zagraj teraz!" />
</svelte:head>

<div>
  <!-- Hero Section -->
  <section class="relative overflow-hidden" style="padding: 80px 0 60px;">
    <!-- Background pattern -->
    <div class="absolute inset-0 opacity-5" style="background-image: repeating-linear-gradient(45deg, #E8A820 0, #E8A820 2px, transparent 2px, transparent 20px);"></div>
    
    <div class="max-w-6xl mx-auto px-6 relative">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Left: Text -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <span style="font-family: 'Press Start 2P', monospace; font-size: 0.4rem; color: #E8A820; text-transform: uppercase; padding: 4px 8px; border: 2px solid #E8A820;">
              DARMOWA GRA
            </span>
            <span style="font-family: 'Press Start 2P', monospace; font-size: 0.4rem; color: #4A9E3A; text-transform: uppercase; padding: 4px 8px; border: 2px solid #4A9E3A;">
              POLSKA PRODUKCJA
            </span>
          </div>
          
          <h1 style="font-family: 'Press Start 2P', monospace; font-size: clamp(0.7rem, 2.5vw, 1rem); color: #F5E6C8; line-height: 1.6; margin-bottom: 1.5rem;">
            Zbuduj Imperium<br/>Chipsów Ziemniaczanych
          </h1>
          
          <p style="color: #A89878; font-size: 1.3rem; line-height: 1.6; margin-bottom: 2rem;">
            <strong style="color: #E8A820;">Chipsy Top Manager</strong> to polska gra przeglądarkowa typu tycoon, 
            w której przejmujesz kontrolę nad fabryką chipsów. Zatrudniaj pracowników, 
            rozwijaj nowe smaki, negocjuj z sieciami handlowymi i zostań królem chrupków!
          </p>

          <div class="flex flex-wrap gap-4 mb-8">
            <button
              class="flex items-center gap-3 px-8 py-4"
              style="background: #E8A820; color: #140C06; font-family: 'Press Start 2P', monospace; font-size: 0.6rem; border: 4px solid #B07818; box-shadow: 6px 6px 0px #4A3018; text-transform: uppercase;"
              onclick={() => navigate('/game')}
            >
              <Gamepad2 size={20} />
              ZAGRAJ TERAZ
            </button>
            <button
              class="flex items-center gap-3 px-6 py-4"
              style="background: transparent; color: #E8A820; font-family: 'Press Start 2P', monospace; font-size: 0.5rem; border: 4px solid #E8A820; box-shadow: 4px 4px 0px #4A3018; text-transform: uppercase;"
              onclick={() => navigate('/jak-grac')}
            >
              Jak grać?
            </button>
          </div>

          <div class="flex items-center gap-6" style="color: #887858; font-size: 1rem;">
            <span class="flex items-center gap-1"><Star size={14} style="color: #E8A820;" /> 5/5</span>
            <span class="flex items-center gap-1"><Users size={14} style="color: #887858;" /> Gra jednoosobowa</span>
            <span class="flex items-center gap-1"><Clock size={14} style="color: #887858;" /> Turówka</span>
          </div>
        </div>

        <!-- Right: Logo -->
        <div class="flex justify-center">
          <div class="relative">
            <img 
              src="/hero-logo.png" 
              alt="Chipsy Top Manager - polska gra tycoon o produkcji chipsów ziemniaczanych" 
              class="w-full max-w-md pixelated"
              style="image-rendering: pixelated; border: 4px solid #4A3018; box-shadow: 8px 8px 0px #2C1C10;"
            />
            <!-- Floating badges -->
            <div class="absolute -top-3 -right-3 px-3 py-1" style="background: #C44030; border: 2px solid #8B2A20; font-family: 'Press Start 2P', monospace; font-size: 0.35rem; color: white;">
              BETA
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section style="background: rgba(28, 16, 8, 0.6); padding: 60px 0;">
    <div class="max-w-6xl mx-auto px-6">
      <h2 class="text-center mb-2" style="font-family: 'Press Start 2P', monospace; font-size: 0.6rem; color: #E8A820; text-transform: uppercase;">
        Co Cię Czeka
      </h2>
      <p class="text-center mb-10" style="color: #887858; font-size: 1.1rem;">
        Głębokie systemy zarządzania inspirowane Football Managerem
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Feature 1 -->
        <div class="card" style="border: 3px solid #4A3018; background: #1C1008;">
          <div class="w-12 h-12 flex items-center justify-center mb-4" style="background: rgba(232, 168, 32, 0.15); border: 2px solid #E8A820;">
            <Users size={24} style="color: #E8A820;" />
          </div>
          <h3 style="font-family: 'Press Start 2P', monospace; font-size: 0.5rem; color: #F5E6C8; margin-bottom: 0.5rem; line-height: 1.6;">Zarządzaj Personelem</h3>
          <p style="color: #A89878; font-size: 1.1rem; line-height: 1.5;">
            Zatrudniaj, szkol i rozwijaj pracowników. Każdy ma 5 atrybutów: efektywność, 
            kreatywność, negocjacje, zarządzanie i doświadczenie.
          </p>
        </div>

        <!-- Feature 2 -->
        <div class="card" style="border: 3px solid #4A3018; background: #1C1008;">
          <div class="w-12 h-12 flex items-center justify-center mb-4" style="background: rgba(232, 168, 32, 0.15); border: 2px solid #E8A820;">
            <Factory size={24} style="color: #E8A820;" />
          </div>
          <h3 style="font-family: 'Press Start 2P', monospace; font-size: 0.5rem; color: #F5E6C8; margin-bottom: 0.5rem; line-height: 1.6;">Produkcja i Surowce</h3>
          <p style="color: #A89878; font-size: 1.1rem; line-height: 1.5;">
            Zarządzaj liniami produkcyjnymi, kupuj surowce (ziemniaki, olej, przyprawy), 
            utrzymuj maszyny i optymalizuj koszty.
          </p>
        </div>

        <!-- Feature 3 -->
        <div class="card" style="border: 3px solid #4A3018; background: #1C1008;">
          <div class="w-12 h-12 flex items-center justify-center mb-4" style="background: rgba(232, 168, 32, 0.15); border: 2px solid #E8A820;">
            <FlaskConical size={24} style="color: #E8A820;" />
          </div>
          <h3 style="font-family: 'Press Start 2P', monospace; font-size: 0.5rem; color: #F5E6C8; margin-bottom: 0.5rem; line-height: 1.6;">Badania i Rozwój</h3>
          <p style="color: #A89878; font-size: 1.1rem; line-height: 1.5;">
            Odblokowuj nowe smaki — od klasycznych solonych, przez kebab i curry, 
            aż po premium trufla i healthy jarmuż.
          </p>
        </div>

        <!-- Feature 4 -->
        <div class="card" style="border: 3px solid #4A3018; background: #1C1008;">
          <div class="w-12 h-12 flex items-center justify-center mb-4" style="background: rgba(232, 168, 32, 0.15); border: 2px solid #E8A820;">
            <ShoppingCart size={24} style="color: #E8A820;" />
          </div>
          <h3 style="font-family: 'Press Start 2P', monospace; font-size: 0.5rem; color: #F5E6C8; margin-bottom: 0.5rem; line-height: 1.6;">Dystrybucja</h3>
          <p style="color: #A89878; font-size: 1.1rem; line-height: 1.5;">
            Negocjuj kontrakty z dyskontami, supermarketami, stacjami i sklepem online. 
            Każdy kanał ma inną marżę i wolumen.
          </p>
        </div>

        <!-- Feature 5 -->
        <div class="card" style="border: 3px solid #4A3018; background: #1C1008;">
          <div class="w-12 h-12 flex items-center justify-center mb-4" style="background: rgba(232, 168, 32, 0.15); border: 2px solid #E8A820;">
            <TrendingUp size={24} style="color: #E8A820;" />
          </div>
          <h3 style="font-family: 'Press Start 2P', monospace; font-size: 0.5rem; color: #F5E6C8; margin-bottom: 0.5rem; line-height: 1.6;">Finanse i Ekonomia</h3>
          <p style="color: #A89878; font-size: 1.1rem; line-height: 1.5;">
            Śledź przychody, koszty, podatki i zyski. Bierz kredyty, inwestuj 
            w rozwój i unikaj bankructwa!
          </p>
        </div>

        <!-- Feature 6 -->
        <div class="card" style="border: 3px solid #4A3018; background: #1C1008;">
          <div class="w-12 h-12 flex items-center justify-center mb-4" style="background: rgba(232, 168, 32, 0.15); border: 2px solid #E8A820;">
            <Shield size={24} style="color: #E8A820;" />
          </div>
          <h3 style="font-family: 'Press Start 2P', monospace; font-size: 0.5rem; color: #F5E6C8; margin-bottom: 0.5rem; line-height: 1.6;">Wydarzenia Losowe</h3>
          <p style="color: #A89878; font-size: 1.1rem; line-height: 1.5;">
            Reaguj na susze, awarie, virale na TikToku, kontrole SANEPID-u 
            i działania konkurencji (Lay's, Crunchips).
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Smaki Section -->
  <section style="padding: 60px 0;">
    <div class="max-w-6xl mx-auto px-6">
      <h2 class="text-center mb-2" style="font-family: 'Press Start 2P', monospace; font-size: 0.6rem; color: #E8A820; text-transform: uppercase;">
        Dostępne Smaki
      </h2>
      <p class="text-center mb-8" style="color: #887858; font-size: 1.1rem;">
        Od klasycznych po premium — badaj i rozwijaj nowe receptury
      </p>

      <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
        {#each [
          { name: 'Solone', tier: 'Podstawowy', color: '#A89878' },
          { name: 'Papryka', tier: 'Podstawowy', color: '#A89878' },
          { name: 'Ser i Cebulka', tier: 'Podstawowy', color: '#A89878' },
          { name: 'Kebab', tier: 'Regionalny', color: '#E8A820' },
          { name: 'Curry', tier: 'Regionalny', color: '#E8A820' },
          { name: 'Trufla', tier: 'Premium', color: '#C4A064' },
          { name: 'Wasabi', tier: 'Regionalny', color: '#E8A820' },
          { name: 'Jarmuż', tier: 'Healthy', color: '#4A9E3A' },
          { name: 'Burak', tier: 'Healthy', color: '#4A9E3A' },
          { name: 'Sól morska', tier: 'Premium', color: '#C4A064' },
        ] as flavor}
          <div 
            class="text-center p-4"
            style="background: #1C1008; border: 3px solid #4A3018;"
          >
            <div class="text-2xl mb-2">🥔</div>
            <p style="font-family: 'Press Start 2P', monospace; font-size: 0.4rem; color: #F5E6C8; margin-bottom: 0.25rem;">{flavor.name}</p>
            <span style="font-size: 0.7rem; color: {flavor.color};">{flavor.tier}</span>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section style="padding: 60px 0; background: rgba(232, 168, 32, 0.08);">
    <div class="max-w-3xl mx-auto px-6 text-center">
      <h2 style="font-family: 'Press Start 2P', monospace; font-size: 0.8rem; color: #F5E6C8; line-height: 1.6; margin-bottom: 1.5rem;">
        Gotów na Wyzwanie?
      </h2>
      <p style="color: #A89878; font-size: 1.3rem; margin-bottom: 2rem;">
        Rozpocznij od małej fabryki z zespołem 5 pracowników i budżetem 120 000 PLN. 
        Czy uda Ci się stworzyć imperium chipsów?
      </p>
      <button
        class="inline-flex items-center gap-3 px-10 py-5"
        style="background: #E8A820; color: #140C06; font-family: 'Press Start 2P', monospace; font-size: 0.7rem; border: 4px solid #B07818; box-shadow: 6px 6px 0px #4A3018; text-transform: uppercase;"
        onclick={() => navigate('/game')}
      >
        <Zap size={24} />
        ROZPOCZNIJ GRĘ
      </button>
      <p style="color: #685838; font-size: 1rem; margin-top: 1rem;">
        Darmowa gra bez rejestracji · Zapis w przeglądarce · Po polsku
      </p>
    </div>
  </section>

  <!-- Why Play Section (SEO) -->
  <section style="padding: 60px 0;">
    <div class="max-w-6xl mx-auto px-6">
      <h2 class="text-center mb-8" style="font-family: 'Press Start 2P', monospace; font-size: 0.6rem; color: #E8A820; text-transform: uppercase;">
        Dlaczego Warto Zagrać
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="text-center p-6" style="border: 2px solid #4A3018; background: #1C1008;">
          <Award size={32} style="color: #E8A820; margin: 0 auto 1rem;" />
          <h3 style="font-family: 'Press Start 2P', monospace; font-size: 0.45rem; color: #F5E6C8; margin-bottom: 0.5rem;">100% Darmowa</h3>
          <p style="color: #887858;">Gra w przeglądarce bez mikropłatności, subskrypcji ani reklam. Po prostu graj!</p>
        </div>
        <div class="text-center p-6" style="border: 2px solid #4A3018; background: #1C1008;">
          <Target size={32} style="color: #E8A820; margin: 0 auto 1rem;" />
          <h3 style="font-family: 'Press Start 2P', monospace; font-size: 0.45rem; color: #F5E6C8; margin-bottom: 0.5rem;">Głęboka Mechanika</h3>
          <p style="color: #887858;">Systemy zarządzania inspirowane Football Managerem. Każda decyzja ma znaczenie.</p>
        </div>
        <div class="text-center p-6" style="border: 2px solid #4A3018; background: #1C1008;">
          <Star size={32} style="color: #E8A820; margin: 0 auto 1rem;" />
          <h3 style="font-family: 'Press Start 2P', monospace; font-size: 0.45rem; color: #F5E6C8; margin-bottom: 0.5rem;">Polski Klimat</h3>
          <p style="color: #887858;">Smaki, wydarzenia i sieci handlowe znane z polskich sklepów. Biedronka, Lidl, Żabka!</p>
        </div>
      </div>
    </div>
  </section>
</div>
