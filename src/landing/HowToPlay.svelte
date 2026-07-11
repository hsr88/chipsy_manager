<script lang="ts">
  import { navigate } from './router';
  import { Gamepad2, Users, Factory, FlaskConical, ShoppingCart, Wallet, Bell, ArrowRight, MousePointer, Keyboard } from 'lucide-svelte';
</script>

<svelte:head>
  <title>Jak Grać w Chipsy Top Manager | Poradnik</title>
  <meta name="description" content="Dowiedz się jak grać w Chipsy Top Manager. Poradnik dla początkujących: zarządzanie fabryką, personel, produkcja, smaki, sprzedaż i finanse. Zacznij od małej fabryki i zostań imperium chipsów!" />
</svelte:head>

<div class="max-w-4xl mx-auto px-6 py-12">
  <!-- Header -->
  <div class="mb-10">
    <button class="mb-4 flex items-center gap-2" style="color: #887858; font-size: 1rem;" onclick={() => navigate('/')}>
      &larr; Powrót do strony głównej
    </button>
    <h1 style="font-family: 'Press Start 2P', monospace; font-size: 0.8rem; color: #E8A820; line-height: 1.6; margin-bottom: 1rem;">
      Jak Grać
    </h1>
      <p style="color: #A89878; font-size: 1.2rem; line-height: 1.6;">
      Kompletny poradnik dla nowych menedżerów fabryk chipsów. 
      Naucz się podstaw zarządzania i zbuduj swoje imperium.
    </p>
  </div>

  <!-- Table of Contents -->
  <div class="mb-10 p-6" style="background: #1C1008; border: 3px solid #4A3018;">
    <h2 style="font-family: 'Press Start 2P', monospace; font-size: 0.5rem; color: #F5E6C8; margin-bottom: 1rem;">Spis Treści</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-2" style="font-size: 1.1rem;">
      <a href="#podstawy" style="color: #E8A820;">1. Podstawy gry</a>
      <a href="#personel" style="color: #E8A820;">2. Personel i zatrudnianie</a>
      <a href="#produkcja" style="color: #E8A820;">3. Produkcja i surowce</a>
      <a href="#smaki" style="color: #E8A820;">4. Badania i smaki</a>
      <a href="#sprzedaz" style="color: #E8A820;">5. Sprzedaż i dystrybucja</a>
      <a href="#finanse" style="color: #E8A820;">6. Finanse i kredyty</a>
      <a href="#wydarzenia" style="color: #E8A820;">7. Wydarzenia losowe</a>
      <a href="#porady" style="color: #E8A820;">8. Porady dla początkujących</a>
    </div>
  </div>

  <!-- Section 1: Basics -->
  <section id="podstawy" class="mb-10">
    <h2 style="font-family: 'Press Start 2P', monospace; font-size: 0.6rem; color: #E8A820; line-height: 1.6; margin-bottom: 1rem;">
      1. Podstawy Gry
    </h2>
    <div style="color: #C8B898; font-size: 1.15rem; line-height: 1.7;" class="space-y-4">
      <p>
        <strong style="color: #F5E6C8;">Chipsy Top Manager</strong> to gra turówka (tydzień po tygodniu) 
        polegająca na zarządzaniu fabryką chipsów ziemniaczanych. Rozpoczynasz z małym zakładem, 
        zespołem 5 pracowników i budżetem <strong style="color: #E8A820;">120 000 PLN</strong>.
      </p>
      <p>
        Główny przycisk <strong style="color: #E8A820;">"NASTĘPNY TYDZIEŃ"</strong> przesuwa symulację do przodu. 
        W każdej turze obliczana jest produkcja, sprzedaż, koszty i przychody. 
        Twoim celem jest utrzymanie pozytywnego cashflowu i rozwój firmy.
      </p>
      <div class="p-4 my-4" style="background: rgba(232, 168, 32, 0.08); border-left: 4px solid #E8A820;">
        <p style="color: #E8A820; margin-bottom: 0.5rem;"><strong>Przydatne skróty:</strong></p>
        <ul style="color: #A89878;" class="space-y-1">
          <li>Gra działa w przeglądarce — nie wymaga instalacji</li>
          <li>Stan gry zapisywany jest automatycznie w localStorage</li>
          <li>Użyj przycisków Zapisz/Wczytaj do ręcznego zarządzania zapisami</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- Section 2: Personnel -->
  <section id="personel" class="mb-10">
    <h2 style="font-family: 'Press Start 2P', monospace; font-size: 0.6rem; color: #E8A820; line-height: 1.6; margin-bottom: 1rem;">
      2. Personel i Zatrudnianie
    </h2>
    <div style="color: #C8B898; font-size: 1.15rem; line-height: 1.7;" class="space-y-4">
      <p>
        Pracownicy to serce Twojej fabryki. Każdy ma 5 atrybutów (skal 0-100):
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
        {#each [
          { name: 'Efektywność', desc: 'Wpływa na wydajność produkcji' },
          { name: 'Kreatywność', desc: 'Przyspiesza badania nowych smaków' },
          { name: 'Negocjacje', desc: 'Lepsze marże w kontraktach sprzedaży' },
          { name: 'Zarządzanie', desc: 'Podnosi morale całego zespołu' },
          { name: 'Doświadczenie', desc: 'Rosnące z czasem, bonus ogólny' },
        ] as skill}
          <div class="p-3" style="background: #1C1008; border: 2px solid #4A3018;">
            <strong style="color: #F5E6C8;">{skill.name}</strong>
            <p style="color: #887858; font-size: 1rem;">{skill.desc}</p>
          </div>
        {/each}
      </div>
      <p>
        <strong style="color: #E8A820;">Zatrudnianie:</strong> W panelu "Personel" znajdziesz listę kandydatów. 
        Aby zatrudnić, potrzebujesz <strong style="color: #F5E6C8;">4x miesięcznego wynagrodzenia</strong> w gotówce.
        Korzystni kandydenci pojawiają się losowo — odświeżaj listę regularnie!
      </p>
      <p>
        <strong style="color: #E8A820;">Szkolenia:</strong> Inwestuj w pracowników — szkolenie kosztuje 2000+ PLN 
        i podnosi wybrany atrybut o kilka punktów. Efekt jest większy gdy atrybut jest niski.
      </p>
    </div>
  </section>

  <!-- Section 3: Production -->
  <section id="produkcja" class="mb-10">
    <h2 style="font-family: 'Press Start 2P', monospace; font-size: 0.6rem; color: #E8A820; line-height: 1.6; margin-bottom: 1rem;">
      3. Produkcja i Surowce
    </h2>
    <div style="color: #C8B898; font-size: 1.15rem; line-height: 1.7;" class="space-y-4">
      <p>
        Produkcja odbywa się na liniach produkcyjnych. Każda linia potrzebuje:
      </p>
      <ul style="color: #A89878;" class="space-y-2 ml-4">
        <li><strong style="color: #F5E6C8;">Ziemniaki</strong> — podstawowy składnik, cena zmienia się sezonowo</li>
        <li><strong style="color: #F5E6C8;">Olej</strong> — słonecznikowy, potrzebny do smażenia</li>
        <li><strong style="color: #F5E6C8;">Przyprawy</strong> — zależne od produkowanego smaku</li>
        <li><strong style="color: #F5E6C8;">Opakowania</strong> — foliowe worki na gotowe chipsy</li>
      </ul>
      <p>
        <strong style="color: #E8A820;">Wskazówka:</strong> Kupuj surowce gdy są tanie (sezon zbiorów obniża ceny ziemniaków). 
        Utrzymuj zapas, bo linia bez surowców nie produkuje!
      </p>
      <p>
        <strong style="color: #E8A820;">Utrzymanie:</strong> Linie zużywają się (poziom techniczny spada). 
        Naprawiaj je zanim się zepsują — koszt naprawy zależy od zużycia.
      </p>
    </div>
  </section>

  <!-- Section 4: Research -->
  <section id="smaki" class="mb-10">
    <h2 style="font-family: 'Press Start 2P', monospace; font-size: 0.6rem; color: #E8A820; line-height: 1.6; margin-bottom: 1rem;">
      4. Badania i Smaki
    </h2>
    <div style="color: #C8B898; font-size: 1.15rem; line-height: 1.7;" class="space-y-4">
      <p>
        Na start masz 3 smaki: <strong style="color: #F5E6C8;">Solone, Papryka, Ser i Cebulka</strong>. 
        W zakładce "Badania i Rozwój" możesz odblokować nowe:
      </p>
      <div class="overflow-x-auto my-4">
        <table class="w-full" style="font-size: 1rem;">
          <thead>
            <tr style="border-bottom: 2px solid #4A3018;">
              <th class="text-left p-2" style="color: #E8A820; font-family: 'Press Start 2P', monospace; font-size: 0.4rem;">Smak</th>
              <th class="text-left p-2" style="color: #E8A820; font-family: 'Press Start 2P', monospace; font-size: 0.4rem;">Kategoria</th>
              <th class="text-left p-2" style="color: #E8A820; font-family: 'Press Start 2P', monospace; font-size: 0.4rem;">Koszt badań</th>
              <th class="text-left p-2" style="color: #E8A820; font-family: 'Press Start 2P', monospace; font-size: 0.4rem;">Potencjał</th>
            </tr>
          </thead>
          <tbody>
            {#each [
              { name: 'Kebab', tier: 'Regionalny', cost: '15 000', margin: '28%' },
              { name: 'Curry', tier: 'Regionalny', cost: '20 000', margin: '26%' },
              { name: 'Wasabi', tier: 'Regionalny', cost: '22 000', margin: '32%' },
              { name: 'Burak', tier: 'Healthy', cost: '25 000', margin: '35%' },
              { name: 'Sól morska', tier: 'Premium', cost: '35 000', margin: '30%' },
              { name: 'Trufla', tier: 'Premium', cost: '50 000', margin: '45%' },
              { name: 'Jarmuż', tier: 'Healthy', cost: '45 000', margin: '50%' },
            ] as f}
              <tr style="border-bottom: 1px solid #2C1C10;">
                <td class="p-2" style="color: #F5E6C8;">{f.name}</td>
                <td class="p-2" style="color: #A89878;">{f.tier}</td>
                <td class="p-2" style="color: #E8A820;">{f.cost} PLN</td>
                <td class="p-2" style="color: #4A9E3A;">{f.margin}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      <p>
        Premium i Healthy mają wyższe marże ale niższą popularność na starcie. 
        Ulepszaj jakość odblokowanych smaków, by zwiększyć ich popularność.
      </p>
    </div>
  </section>

  <!-- Section 5: Sales -->
  <section id="sprzedaz" class="mb-10">
    <h2 style="font-family: 'Press Start 2P', monospace; font-size: 0.6rem; color: #E8A820; line-height: 1.6; margin-bottom: 1rem;">
      5. Sprzedaż i Dystrybucja
    </h2>
    <div style="color: #C8B898; font-size: 1.15rem; line-height: 1.7;" class="space-y-4">
      <p>Twoje chipsy sprzedają się przez 5 kanałów dystrybucji:</p>
      <div class="space-y-2">
        {#each [
          { name: 'Dyskontery (Biedronka, Lidl)', type: 'Wysoki wolumen, niska marża', tip: 'Podstawowy kanał - duże ilości, mało zarabiasz na sztuce' },
          { name: 'Supermarkety (Carrefour, Auchan)', type: 'Średni wolumen, średnia marża', tip: 'Balans między ilością a zyskiem' },
          { name: 'Żabka / Stacje benzynowe', type: 'Niski wolumen, wysoka marża', tip: 'Mało sprzedasz, ale dużo zarabiasz' },
          { name: 'Eksport', type: 'Wymaga reputacji', tip: 'Odblokuj gdy zbudujesz markę' },
          { name: 'Sklep internetowy', type: 'Niski wolumen, najwyższa marża', tip: '45% marży - najbardziej opłacalny' },
        ] as ch}
          <div class="p-3" style="background: #1C1008; border-left: 4px solid #E8A820;">
            <strong style="color: #F5E6C8;">{ch.name}</strong>
            <p style="color: #887858; font-size: 1rem;">{ch.type}</p>
            <p style="color: #A89878; font-size: 0.95rem;">💡 {ch.tip}</p>
          </div>
        {/each}
      </div>
      <p>
        <strong style="color: #E8A820;">Kontrakty:</strong> Negocjuj nowe kontrakty regularnie. 
        Wysoki atrybut Negocjacje u pracownika = lepsze marże. Kontrakty wygasają po kilku tygodniach.
      </p>
    </div>
  </section>

  <!-- Section 6: Finance -->
  <section id="finanse" class="mb-10">
    <h2 style="font-family: 'Press Start 2P', monospace; font-size: 0.6rem; color: #E8A820; line-height: 1.6; margin-bottom: 1rem;">
      6. Finanse i Kredyty
    </h2>
    <div style="color: #C8B898; font-size: 1.15rem; line-height: 1.7;" class="space-y-4">
      <p>
        Każdy tydzień generuje raport finansowy: przychody, koszty materiałów, 
        pensje, utrzymanie, R&D, podatek <strong style="color: #F5E6C8;">19% CIT</strong> i zysk netto.
      </p>
      <div class="p-4 my-4" style="background: rgba(196, 64, 48, 0.1); border: 2px solid #C44030;">
        <p style="color: #E87060;"><strong>UWAGA:</strong> Jeśli gotówka spadnie poniżej -50 000 PLN, firma bankrutuje i gra się kończy!</p>
      </div>
      <p>
        <strong style="color: #E8A820;">Kredyty:</strong> Gdy potrzebujesz szybkiej gotówki, weź kredyt. 
        Oprocentowanie to <strong style="color: #F5E6C8;">8%</strong>, spłata rozłożona na <strong style="color: #F5E6C8;">20 tygodni</strong>. 
        Możesz mieć max 3 kredyty jednocześnie. Używaj mądrze — rata tygodniowa obciąża budżet!
      </p>
    </div>
  </section>

  <!-- Section 7: Events -->
  <section id="wydarzenia" class="mb-10">
    <h2 style="font-family: 'Press Start 2P', monospace; font-size: 0.6rem; color: #E8A820; line-height: 1.6; margin-bottom: 1rem;">
      7. Wydarzenia Losowe
    </h2>
    <div style="color: #C8B898; font-size: 1.15rem; line-height: 1.7;" class="space-y-4">
      <p>
        W każdym tygodniu może wydarzyć się coś nieoczekiwanego. Wydarzenia dzielą się na kategorie:
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        {#each [
          { type: 'Rynek', desc: 'Zmiany cen surowców (susza, sezon zbiorów)', color: '#60A0F0' },
          { type: 'Produkcja', desc: 'Awarie linii, problemy z jakością', color: '#E8A820' },
          { type: 'Okazja', desc: 'Virale, nagrody, tanie przejęcia', color: '#4A9E3A' },
          { type: 'Kryzys', desc: 'Strajki, kontrole SANEPID', color: '#C44030' },
          { type: 'Konkurencja', desc: 'Działania Lay\'s i Crunchips', color: '#A89878' },
          { type: 'Prawo', desc: 'Nowe przepisy, dotacje', color: '#E0B830' },
        ] as ev}
          <div class="p-3" style="background: #1C1008; border: 2px solid #4A3018;">
            <strong style="color: {ev.color};">{ev.type}</strong>
            <p style="color: #887858; font-size: 1rem;">{ev.desc}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Section 8: Tips -->
  <section id="porady" class="mb-10">
    <h2 style="font-family: 'Press Start 2P', monospace; font-size: 0.6rem; color: #E8A820; line-height: 1.6; margin-bottom: 1rem;">
      8. Porady dla Początkujących
    </h2>
    <div class="space-y-3">
      {#each [
        'Zacznij od pilnowania surowców — bez ziemniaków nie ma produkcji',
        'Szybko odblokuj kanał "Sklep internetowy" — najwyższa marża (45%)',
        'Szkolenia są tanie na początku — inwestuj w efektywność pracowników',
        'Nie bierz kredytu na start — naucz się grać na plusie',
        'Naprawiaj linie zanim się zepsują — koszt naprawy rośnie dramatycznie',
        'Premium smaki (Trufla) mają niską sprzedaż ale gigantyczną marżę',
        'Zapisuj grę regularnie — F5 może uratować godziny progresu',
        'Obserwuj trendy smaków — inwestuj w rosnące, porzucaj spadające',
        'Zatrudnij dobrego negocjatora — lepsze kontrakty = więcej zysku',
        'Utrzymuj morale zespołu powyżej 40 — niskie morale = niższa efektywność',
      ] as tip, i}
        <div class="flex gap-3 items-start p-3" style="background: #1C1008; border: 2px solid #4A3018;">
          <span style="font-family: 'Press Start 2P', monospace; font-size: 0.5rem; color: #E8A820; min-width: 28px;">{i + 1}.</span>
          <p style="color: #C8B898; font-size: 1.1rem;">{tip}</p>
        </div>
      {/each}
    </div>
  </section>

  <!-- CTA -->
  <div class="text-center py-10 mt-10" style="border-top: 3px solid #4A3018;">
    <h2 style="font-family: 'Press Start 2P', monospace; font-size: 0.7rem; color: #F5E6C8; line-height: 1.6; margin-bottom: 1.5rem;">
      Gotów na Pierwszy Tydzień?
    </h2>
    <button
      class="inline-flex items-center gap-3 px-10 py-5"
      style="background: #E8A820; color: #140C06; font-family: 'Press Start 2P', monospace; font-size: 0.6rem; border: 4px solid #B07818; box-shadow: 6px 6px 0px #4A3018; text-transform: uppercase;"
      onclick={() => navigate('/game')}
    >
      <Gamepad2 size={24} />
      ROZPOCZNIJ GRĘ
    </button>
  </div>
</div>
