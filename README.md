# Chipsy Top Manager

> Darmowa polska gra przeglądarkowa typu tycoon / biznes menadżer o produkcji chipsów ziemniaczanych.
> Zbuduj imperium chrupków od małej fabryki do ogólnokrajowego lidera rynku!

**Zagraj teraz:** [chipsy.top](https://chipsy.top)

---

## O grze

Chipsy Top Manager to nowoczesny odpowiednik klasycznych gier menadżerskich (Football Manager, Theme Hospital), przeniesiony w świat produkcji chipsów ziemniaczanych. Gra łączy głębokie systemy zarządzania, decyzje strategiczne i długoterminowe planowanie — wszystko w lekkiej, przeglądarkowej formie z polskim klimatem.

Rozpoczynasz jako właściciel małej fabryki z zespołem 5 pracowników i budżetem 120 000 PLN. Każdy tydzień to nowe decyzje: kogo zatrudnić, jaki smak badać, z kim podpisać kontrakt, czy wziąć kredyt. Losowe wydarzenia, konkurencja (Lay's, Crunchips) i zmieniający się rynek sprawiają, że każda rozgrywka jest inna.

### Funkcje

| System | Opis |
|--------|------|
| **Personel** | 5 ról, 5 atrybutów (0-100), system szkoleń, morale |
| **Produkcja** | Linie produkcyjne, surowce (ziemniaki, olej, przyprawy), utrzymanie |
| **Badania i Rozwój** | 10 smaków w 4 tierach (Podstawowe, Regionalne, Premium, Healthy) |
| **Sprzedaż** | 5 kanałów dystrybucji (dyskontery, supermarkety, Żabka, eksport, online) |
| **Finanse** | Szczegółowe raporty tygodniowe, podatek 19%, kredyty |
| **Wydarzenia** | 18 typów losowych wydarzeń w 6 kategoriach |
| **Zapis gry** | Automatyczny zapis w localStorage + ręczny save/load |

### 10 Smaków do odblokowania

Solone, Papryka, Ser i Cebulka (odblokowane od startu) + Kebab, Curry, Wasabi, Burak, Sól morska i ocet, Trufla, Jarmuż (do zbadania).

---

## Stack technologiczny

| Technologia | Wersja | Zastosowanie |
|-------------|--------|-------------|
| [Vite](https://vitejs.dev/) | ^6.x | Bundler + dev server |
| [Svelte 5](https://svelte.dev/) | ^5.x | Framework UI (runes) |
| [TypeScript](https://www.typescriptlang.org/) | ^5.x | Typowanie statyczne |
| [Tailwind CSS](https://tailwindcss.com/) | ^4.x | Stylizacja |
| [Lucide Svelte](https://lucide.dev/) | ^0.x | Ikony |

---

## Lokalny development

```bash
# 1. Klonuj repozytorium
git clone https://github.com/hsr88/chipsy_manager.git
cd chipsy_manager

# 2. Instaluj zależności
npm install

# 3. Uruchom dev server (hot reload na localhost:5173)
npm run dev

# 4. Build produkcyjny (wynik w folderze dist/)
npm run build
```

---

## Struktura projektu

```
src/
├── App.svelte              # Router: landing page vs gra
├── GameApp.svelte          # Retro UI gry
├── main.ts                 # Punkt wejścia
├── app.css                 # Globalne style (retro pixel-art)
├── landing/                # Landing page (SEO-friendly)
│   ├── LandingLayout.svelte    # Nawigacja + stopka
│   ├── router.ts               # Hash-based router
│   ├── HomePage.svelte         # Strona główna
│   ├── HowToPlay.svelte        # Poradnik "Jak grać"
│   ├── FAQ.svelte              # Najczęstsze pytania
│   └── About.svelte            # O grze + roadmapa
├── pages/                  # Ekrany gry (7 sekcji)
│   ├── DashboardPage.svelte
│   ├── EmployeesPage.svelte
│   ├── ProductionPage.svelte
│   ├── ResearchPage.svelte
│   ├── SalesPage.svelte
│   ├── FinancesPage.svelte
│   └── EventsPage.svelte
└── lib/
    ├── types/              # Definicje TypeScript
    ├── data/               # Dane startowe gry
    ├── stores/             # Główny store (Svelte 5 runes)
    └── systems/            # Silnik symulacji
```

---

## Jak mogę pomóc?

Projekt jest open source i chętnie przyjmę wkład od społeczności! Oto jak możesz pomóc:

### Pomysły na usprawnienia (mile widziane PR!)

- [ ] Nowe smaki chipsów (np. Śmietanka i Kiełbasa, Chilli, Czosnek)
- [ ] System marketingu i kampanii reklamowych
- [ ] Ulepszanie linii produkcyjnych (automatyzacja)
- [ ] Więcej wydarzeń losowych z decyzjami do podjęcia
- [ ] Tabela wyników online (localStorage -> backend)
- [ ] System osiągnięć i nagród
- [ ] Tryb sandbox (nielimitowane zasoby do testowania)
- [ ] Eksport do nowych regionów (Azja, Ameryka)
- [ ] Wiele fabryk (multi-site management)
- [ ] Lepszy system AI konkurencji (widoczne ruchy przeciwników)
- [ ] Animacje pixel-artowe dla wydarzeń
- [ ] Soundtrack 8-bit / chiptune
- [ ] Tłumaczenia na inne języki (angielski, niemiecki)

### Zgłaszanie błędów

Jeśli znajdziesz błąd, utwórz [Issue](https://github.com/hsr88/chipsy_manager/issues) z opisem:
1. Co się stało?
2. Jakie były kroki do reprodukcji?
3. Jaki był oczekiwany wynik?
4. Zrzut ekranu (jeśli dotyczy)

---

## Roadmapa

| Wersja | Planowane funkcje | Status |
|--------|-------------------|--------|
| **v1.0 (MVP)** | Dashboard, Personel, Produkcja, R&D, Sprzedaż, Finanse, Wydarzenia | Gotowe |
| **v1.1** | Marketing, więcej smaków sezonowych, osiągnięcia | W planach |
| **v1.2** | Giełda surowców, konkurencja AI, eksport do nowych regionów | W planach |
| **v2.0** | Multi-site, franchising, tabela wyników online, sandbox | W planach |

---

## Licencja

MIT — gra jest w 100% darmowa i open source.

---

**Twórca:** [hsr88](https://github.com/hsr88/) | **Repo:** [github.com/hsr88/chipsy_manager](https://github.com/hsr88/chipsy_manager)
