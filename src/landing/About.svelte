<script lang="ts">
  import { navigate } from './router';
  import { Gamepad2, Heart, Code, Star, TrendingUp, Clock, Shield, Zap, Check, Circle } from 'lucide-svelte';
</script>

<svelte:head>
  <title>O Grze — Chipsy Top Manager | Polska gra tycoon</title>
  <meta name="description" content="Chipsy Top Manager to darmowa polska gra przeglądarkowa typu tycoon o produkcji chipsów ziemniaczanych. Poznaj funkcje, systemy gry i planowane aktualizacje. Zagraj teraz!" />
</svelte:head>

<div class="max-w-4xl mx-auto px-6 py-12">
  <button class="mb-4 flex items-center gap-2" style="color: #887858; font-size: 1rem;" onclick={() => navigate('/')}>
    &larr; Powrót do strony głównej
  </button>

  <h1 style="font-family: 'Press Start 2P', monospace; font-size: 0.8rem; color: #E8A820; line-height: 1.6; margin-bottom: 1rem;">
    O Grze
  </h1>

  <!-- Hero Description -->
  <div class="mb-10 p-6" style="background: #1C1008; border: 3px solid #4A3018;">
    <p style="color: #C8B898; font-size: 1.2rem; line-height: 1.7;" class="space-y-4">
      <strong style="color: #F5E6C8;">Chipsy Top Manager</strong> to nowoczesny odpowiednik klasycznych 
      gier menadżerskich (Football Manager, Theme Hospital), przeniesiony w świat produkcji 
      chipsów ziemniaczanych. Gra powstała z miłości do głębokich systemów zarządzania 
      i polskiego klimatu — znajdziesz tu smaki, sieci handlowe i wydarzenia znane 
      z rodzimych realiów.
    </p>
    <p style="color: #A89878; font-size: 1.1rem; line-height: 1.6; margin-top: 1rem;">
      Zaczynasz jako właściciel małej fabryki z zespołem 5 pracowników. 
      Każdy tydzień to nowe decyzje: kogo zatrudnić, jaki smak badać, 
      z kim podpisać kontrakt, czy wziąć kredyt. Świat gry reaguje na Twoje wybory 
      — losowe wydarzenia, konkurencja (Lay's, Crunchips) i zmieniający się rynek 
      sprawiają, że każda rozgrywka jest inna.
    </p>
  </div>

  <!-- Stats -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
    {#each [
      { icon: Clock, label: 'System tur', value: 'Tydzień po tygodniu' },
      { icon: Star, label: 'Smaków', value: '10 do odblokowania' },
      { icon: Shield, label: 'Systemów', value: '6 głównych' },
      { icon: TrendingUp, label: 'Kanałów', value: '5 dystrybucyjnych' },
    ] as stat}
      <div class="text-center p-4" style="background: #1C1008; border: 2px solid #4A3018;">
        <stat.icon size={24} style="color: #E8A820; margin: 0 auto 0.5rem;" />
        <p style="font-family: 'Press Start 2P', monospace; font-size: 0.5rem; color: #F5E6C8; margin-bottom: 0.25rem;">{stat.label}</p>
        <p style="color: #887858; font-size: 0.9rem;">{stat.value}</p>
      </div>
    {/each}
  </div>

  <!-- Tech Stack -->
  <section class="mb-10">
    <h2 style="font-family: 'Press Start 2P', monospace; font-size: 0.6rem; color: #E8A820; line-height: 1.6; margin-bottom: 1rem;">
      Technologia
    </h2>
    <p style="color: #C8B898; font-size: 1.1rem; margin-bottom: 1rem;">
      Gra została zbudowana z nowoczesnymi technologiami webowymi:
    </p>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      {#each [
        { name: 'Vite', desc: 'Bundler i dev server' },
        { name: 'Svelte 5', desc: 'Framework UI z runes' },
        { name: 'TypeScript', desc: 'Typowanie statyczne' },
        { name: 'Tailwind CSS', desc: 'Stylizacja utility-first' },
      ] as tech}
        <div class="p-3 text-center" style="background: #1C1008; border: 2px solid #4A3018;">
          <strong style="color: #E8A820; font-family: 'Press Start 2P', monospace; font-size: 0.4rem;">{tech.name}</strong>
          <p style="color: #887858; font-size: 0.9rem;">{tech.desc}</p>
        </div>
      {/each}
    </div>
    <p style="color: #887858; font-size: 1rem; margin-top: 1rem;">
      Dlaczego Svelte 5? <strong style="color: #A89878;">Runes</strong> zapewniają reaktywność bez narzutu runtime'owego, 
      co przekłada się na płynne działanie gry. Cały stan gry mieści się w jednym reaktywnym store 
      z czystą funkcją symulacji <code style="background: #2C1C10; padding: 0.1rem 0.4rem; color: #E8A820;">simulateWeek()</code>.
    </p>
  </section>

  <!-- Game Systems Detail -->
  <section class="mb-10">
    <h2 style="font-family: 'Press Start 2P', monospace; font-size: 0.6rem; color: #E8A820; line-height: 1.6; margin-bottom: 1rem;">
      Systemy Gry
    </h2>
    <div class="space-y-4">
      {#each [
        { 
          name: 'Personel', 
          desc: '5 ról: Dyrektor Produkcji, Szef R&D, Dyrektor Marketingu, Kierownik Logistyki, Specjalista ds. Sprzedaży. 5 atrybutów (0-100), system szkoleń, morale, zatrudnianie i zwalnianie.',
          status: 'done'
        },
        { 
          name: 'Produkcja', 
          desc: 'Linie produkcyjne z pojemnością, efektywnością i stanem technicznym. Surowce: ziemniaki, olej, przyprawy, opakowania. Sezonowość cen i jakość wpływają na output.',
          status: 'done'
        },
        { 
          name: 'Badania i Rozwój', 
          desc: '10 smaków w 4 tierach (Podstawowe, Regionalne, Premium, Healthy). System jakości 1-5, trendy rynkowe, koszty badań i czas odblokowania.',
          status: 'done'
        },
        { 
          name: 'Sprzedaż i Dystrybucja', 
          desc: '5 kanałów: dyskonty, supermarkety, convenience, eksport, sklep online. System kontraktów z negocjacjami marży, wolumenem i czasem trwania.',
          status: 'done'
        },
        { 
          name: 'Finanse', 
          desc: 'Szczegółowy raport tygodniowy: przychody, koszty materiałów, pensje, utrzymanie, R&D, podatek CIT 19%, zysk netto. System kredytów (8%, 20 tygodni).',
          status: 'done'
        },
        { 
          name: 'Wydarzenia', 
          desc: '18 typów wydarzeń w 6 kategoriach: rynek, produkcja, okazje, kryzysy, konkurencja, prawo. Wagi prawdopodobieństwa i wpływ na gameplay.',
          status: 'done'
        },
      ] as sys}
        <div class="p-4" style="background: #1C1008; border-left: 4px solid {sys.status === 'done' ? '#4A9E3A' : '#E8A820'};">
          <div class="flex items-center gap-2 mb-1">
            {#if sys.status === 'done'}
              <Check size={16} style="color: #4A9E3A;" />
            {:else}
              <Circle size={16} style="color: #E8A820;" />
            {/if}
            <strong style="color: #F5E6C8; font-family: 'Press Start 2P', monospace; font-size: 0.45rem;">{sys.name}</strong>
            <span style="font-size: 0.6rem; padding: 2px 6px; margin-left: auto; {sys.status === 'done' ? 'background: rgba(74, 158, 58, 0.3); color: #4A9E3A; border: 1px solid #4A9E3A;' : 'background: rgba(232, 168, 32, 0.2); color: #E8A820; border: 1px solid #E8A820;'}">
              {sys.status === 'done' ? 'GOTOWE' : 'W TRAKCIE'}
            </span>
          </div>
          <p style="color: #A89878; font-size: 1.05rem;">{sys.desc}</p>
        </div>
      {/each}
    </div>
  </section>

  <!-- Roadmap -->
  <section class="mb-10">
    <h2 style="font-family: 'Press Start 2P', monospace; font-size: 0.6rem; color: #E8A820; line-height: 1.6; margin-bottom: 1rem;">
      Plan Rozwoju
    </h2>
    <div class="space-y-3">
      {#each [
        { phase: 'MVP (obecnie)', items: ['Dashboard', 'Personel', 'Produkcja', 'R&D Smaki', 'Sprzedaż', 'Finanse', 'Wydarzenia', 'Zapis/Wczytaj'] },
        { phase: 'v1.1', items: ['Marketing i kampanie reklamowe', 'Więcej smaków (sezonowe)', 'Ulepszanie linii produkcyjnych', 'System osiągnięć'] },
        { phase: 'v1.2', items: ['Rynek wtórny (giełda surowców)', 'Konkurencja AI z widocznymi ruchami', 'Więcej wydarzeń z decyzjami', 'Eksport do nowych regionów'] },
        { phase: 'v2.0', items: ['Wiele fabryk (multi-site)', 'Franchising', 'Tabela wyników online', 'Tryb sandbox'] },
      ] as roadmap}
        <div class="p-4" style="background: #1C1008; border: 2px solid #4A3018;">
          <h3 style="font-family: 'Press Start 2P', monospace; font-size: 0.5rem; color: {roadmap.phase.includes('MVP') ? '#4A9E3A' : '#E8A820'}; margin-bottom: 0.75rem;">
            {roadmap.phase}
          </h3>
          <div class="flex flex-wrap gap-2">
            {#each roadmap.items as item}
              <span style="background: {roadmap.phase.includes('MVP') ? 'rgba(74, 158, 58, 0.15)' : 'rgba(232, 168, 32, 0.1)'}; color: {roadmap.phase.includes('MVP') ? '#4A9E3A' : '#A89878'}; padding: 4px 10px; border: 1px solid {roadmap.phase.includes('MVP') ? '#4A9E3A' : '#4A3018'}; font-size: 0.9rem;">
                {item}
              </span>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- Keywords (hidden SEO) -->
  <section class="mb-10">
    <h2 style="font-family: 'Press Start 2P', monospace; font-size: 0.6rem; color: #E8A820; line-height: 1.6; margin-bottom: 1rem;">
      Słowa Kluczowe
    </h2>
    <p style="color: #887858; font-size: 1rem; line-height: 1.8;">
      gra tycoon, gra ekonomiczna, symulator biznesu, gra przeglądarkowa, darmowa gra online, 
      polska gra indie, chipsy ziemniaczane, football manager alternatywa, gra menadżerska, 
      symulator produkcji, zarządzanie fabryką, gra po polsku, browser game, business simulation, 
      factory management game, potato chip tycoon, polskie gry indie, turn-based strategy, 
      gra turówka, jednoosobowa gra, single player browser game
    </p>
  </section>

  <!-- CTA -->
  <div class="text-center py-10" style="border-top: 3px solid #4A3018;">
    <button
      class="inline-flex items-center gap-3 px-10 py-5"
      style="background: #E8A820; color: #140C06; font-family: 'Press Start 2P', monospace; font-size: 0.6rem; border: 4px solid #B07818; box-shadow: 6px 6px 0px #4A3018; text-transform: uppercase;"
      onclick={() => navigate('/game')}
    >
      <Gamepad2 size={24} />
      ZAGRAJ TERAZ
    </button>
  </div>
</div>
