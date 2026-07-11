<script lang="ts">
  import { navigate } from './router';
  import { Gamepad2, ChevronDown } from 'lucide-svelte';

  let openIndex = $state<number | null>(0);

  const faqs = [
    {
      q: 'Czym jest Chipsy Top Manager?',
      a: 'Chipsy Top Manager to darmowa polska gra przeglądarkowa typu tycoon/biznes symulator, w której gracz zarządza wirtualną fabryką produkującą chipsy ziemniaczane. Gra łączy elementy strategii ekonomicznej, zarządzania zasobami ludzkimi i symulacji produkcji w lekkiej, humorystycznej formie.',
    },
    {
      q: 'Czy gra jest darmowa?',
      a: 'Tak, gra jest w 100% darmowa. Nie wymaga rejestracji, nie ma mikropłatności, subskrypcji ani reklam. Wystarczy przeglądarka internetowa.',
    },
    {
      q: 'Na czym polega rozgrywka?',
      a: 'Gra działa w turach — każdy tydzień to jedna tura. Zarządzasz fabryką: zatrudniasz pracowników, kupujesz surowce (ziemniaki, olej, przyprawy), produkujesz chipsy w różnych smakach, negocjujesz kontrakty ze sklepami i śledzisz finanse. Celem jest rozwój firmy i unikanie bankructwa.',
    },
    {
      q: 'Jak zacząć grać?',
      a: 'Kliknij przycisk "Zagraj teraz" na stronie głównej lub przejdź bezpośrednio do gry. Na start otrzymujesz małą fabrykę, 5 pracowników i budżet 120 000 PLN. Szczegółowy poradnik znajdziesz na stronie "Jak Grać".',
    },
    {
      q: 'Czy gra działa na telefonie?',
      a: 'Tak, gra jest responsywna i działa zarówno na komputerach, tabletach jak i smartfonach. Interfejs dostosowuje się do rozmiaru ekranu.',
    },
    {
      q: 'Czy mój postęp jest zapisywany?',
      a: 'Tak, gra automatycznie zapisuje stan w pamięci przeglądarki (localStorage). Możesz też ręcznie zapisać i wczytać grę za pomocą przycisków w panelu bocznym. Pamiętaj — wyczyszczenie danych przeglądarki usunie zapis!',
    },
    {
      q: 'Ile smaków chipsów jest w grze?',
      a: 'W grze dostępnych jest 10 smaków podzielonych na 4 kategorie: Podstawowe (Solone, Papryka, Ser i Cebulka), Regionalne (Kebab, Curry, Wasabi), Premium (Trufla, Sól morska i ocet) oraz Healthy (Jarmuż, Burak). Na start masz 3 odblokowane, resztę zdobywasz przez badania.',
    },
    {
      q: 'Jakie są systemy zarządzania w grze?',
      a: 'Gra zawiera 6 głównych systemów: Personel (zatrudnianie, szkolenia, morale), Produkcja (linie, surowce, utrzymanie), Badania i Rozwój (odblokowywanie smaków, jakość), Sprzedaż (kanały dystrybucji, kontrakty), Finanse (przychody, koszty, podatki, kredyty) oraz Wydarzenia Losowe (rynek, kryzysy, okazje).',
    },
    {
      q: 'Jak długo trwa jedna gra?',
      a: 'To zależy od Twojego stylu gry i umiejętności. Średnia sesja to 50-100 tygodni (tur). Jedna tura trwa kilka sekund — klikasz "Następny tydzień" i obserwujesz wyniki.',
    },
    {
      q: 'Co się dzieje gdy zbankrutuję?',
      a: 'Gra kończy się ekranem Game Over. Wyświetlane są statystyki (przetrwane tygodnie, łączny przychód). Możesz rozpocząć nową grę z czystym kontem.',
    },
    {
      q: 'Czy gra wymaga internetu?',
      a: 'Do uruchomienia gry potrzebujesz internetu, ale po załadowaniu działa offline — to aplikacja przeglądarkowa (SPA), która nie komunikuje się z serwerem podczas rozgrywki.',
    },
    {
      q: 'Jakie sieci handlowe są w grze?',
      a: 'W grie występują polskie i międzynarodowe sieci handlowe: dyskonty (Biedronka, Lidl), supermarkety (Carrefour, Auchan), sklepy convenience (Żabka, stacje benzynowe Orlen, Circle K), eksport oraz własny sklep internetowy.',
    },
    {
      q: 'Czy mogę grać w wielu zakładkach?',
      a: 'Tak, każda zakładka przeglądarki ma niezależny zapis. Możesz prowadzić kilka firm jednocześnie w różnych zakładkach.',
    },
    {
      q: 'Kto stworzył Chipsy Top Manager?',
      a: 'Gra została stworzona jako polski projekt indie. Jest rozwijana iteracyjnie — MVP zawiera podstawowe systemy, a kolejne aktualizacje dodają nowe funkcje, smaki, wydarzenia i mechaniki.',
    },
    {
      q: 'Czy gra ma elementy multiplayer?',
      a: 'Obecnie gra jest jednoosobowa (single player). W przyszłości planowane są tabele wyników i porównywanie statystyk z innymi graczami.',
    },
  ];
</script>

<svelte:head>
  <title>FAQ — Chipsy Top Manager | Najczęstsze pytania</title>
  <meta name="description" content="Najczęstsze pytania o Chipsy Top Manager. Dowiedz się jak grać, czy gra jest darmowa, jak działa zapis, ile jest smaków i wiele więcej. Darmowa polska gra tycoon o produkcji chipsów." />
</svelte:head>

<div class="max-w-4xl mx-auto px-6 py-12">
  <button class="mb-4 flex items-center gap-2" style="color: #887858; font-size: 1rem;" onclick={() => navigate('/')}>
    &larr; Powrót do strony głównej
  </button>

  <h1 style="font-family: 'Press Start 2P', monospace; font-size: 0.8rem; color: #E8A820; line-height: 1.6; margin-bottom: 1rem;">
    FAQ
  </h1>
  <p style="color: #A89878; font-size: 1.2rem; margin-bottom: 2rem;">
    Najczęstsze pytania o Chipsy Top Manager
  </p>

  <div class="space-y-3">
    {#each faqs as faq, i}
      <div style="background: #1C1008; border: 2px solid #4A3018;">
        <button
          class="w-full flex items-center justify-between p-4 text-left"
          onclick={() => openIndex = openIndex === i ? null : i}
        >
          <span style="font-family: 'Press Start 2P', monospace; font-size: 0.45rem; color: #F5E6C8; line-height: 1.6;">{faq.q}</span>
          <ChevronDown 
            size={20} 
            style="color: #E8A820; flex-shrink: 0; margin-left: 1rem; transition: transform 0.2s; transform: {openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)'};" 
          />
        </button>
        {#if openIndex === i}
          <div class="px-4 pb-4" style="border-top: 1px solid #2C1C10;">
            <p style="color: #C8B898; font-size: 1.1rem; line-height: 1.6; padding-top: 0.75rem;">{faq.a}</p>
          </div>
        {/if}
      </div>
    {/each}
  </div>

  <div class="text-center py-10 mt-10" style="border-top: 3px solid #4A3018;">
    <h2 style="font-family: 'Press Start 2P', monospace; font-size: 0.6rem; color: #F5E6C8; line-height: 1.6; margin-bottom: 1.5rem;">
      Nie Znalazłeś Odpowiedzi?
    </h2>
    <p style="color: #A89878; margin-bottom: 1.5rem;">Sprawdź szczegółowy poradnik na stronie "Jak Grać"</p>
    <div class="flex flex-wrap justify-center gap-4">
      <button
        class="inline-flex items-center gap-3 px-8 py-4"
        style="background: #E8A820; color: #140C06; font-family: 'Press Start 2P', monospace; font-size: 0.5rem; border: 3px solid #B07818; box-shadow: 4px 4px 0px #4A3018; text-transform: uppercase;"
        onclick={() => navigate('/jak-grac')}
      >
        Jak Grać
      </button>
      <button
        class="inline-flex items-center gap-3 px-8 py-4"
        style="background: #E8A820; color: #140C06; font-family: 'Press Start 2P', monospace; font-size: 0.5rem; border: 3px solid #B07818; box-shadow: 4px 4px 0px #4A3018; text-transform: uppercase;"
        onclick={() => navigate('/game')}
      >
        <Gamepad2 size={18} />
        ZAGRAJ
      </button>
    </div>
  </div>
</div>
