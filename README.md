# Chipsy Top Manager

> Darmowa polska gra przeglądarkowa typu tycoon / biznes menadżer o produkcji chipsow ziemniaczanych.
> Zbuduj imperium chrupkow od malej fabryki do ogolnokrajowego lidera rynku!

**Live demo:** [https://chipsy.top](https://chipsy.top)

## Stack technologiczny

| Technologia | Zastosowanie |
|-------------|-------------|
| [Vite](https://vitejs.dev/) | Bundler + dev server |
| [Svelte 5](https://svelte.dev/) | Framework UI (runes) |
| [TypeScript](https://www.typescriptlang.org/) | Typowanie statyczne |
| [Tailwind CSS v4](https://tailwindcss.com/) | Stylizacja |
| [Lucide Svelte](https://lucide.dev/) | Ikony |

## Lokalny development

```bash
# 1. Klonuj repo
git clone https://github.com/TWOJ-USERNAME/chipsy-top-manager.git
cd chipsy-top-manager

# 2. Instaluj zaleznosci
npm install

# 3. Dev server (hot reload)
npm run dev

# 4. Build produkcyjny
npm run build
```

## Struktura projektu

```
src/
├── App.svelte              # Router: landing page vs gra
├── GameApp.svelte          # Retro UI gry (sidebar + ekrany)
├── main.ts                 # Entry point
├── app.css                 # Global styles (retro pixel-art)
├── landing/                # Landing page (SEO-friendly)
│   ├── LandingLayout.svelte
│   ├── router.ts           # Hash-based router
│   ├── HomePage.svelte
│   ├── HowToPlay.svelte
│   ├── FAQ.svelte
│   └── About.svelte
├── pages/                  # Ekrany gry
│   ├── DashboardPage.svelte
│   ├── EmployeesPage.svelte
│   ├── ProductionPage.svelte
│   ├── ResearchPage.svelte
│   ├── SalesPage.svelte
│   ├── FinancesPage.svelte
│   └── EventsPage.svelte
├── lib/
│   ├── types/              # TypeScript interfaces
│   ├── data/               # Dane startowe
│   ├── stores/             # Svelte 5 game store
│   └── systems/            # Silnik symulacji
public/
└── hero-logo.png           # Pixel-art logo gry
```

## Deploy

### Netlify (zalecane)

1. Wypchnij kod na GitHub
2. Zaloguj sie do [Netlify](https://app.netlify.com/)
3. "Add new site" -> "Import an existing project"
4. Wybierz swoje repo z GitHuba
5. Build settings sa juz skonfigurowane w `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Kliknij "Deploy site"

Kazdy push na branch `main` automatycznie triggeruje nowy deploy!

### Vercel

Podobnie jak Netlify - importuj repo, build command: `npm run build`, output: `dist`.

### Kimi (obecnie)

```bash
npm run build
# Wdróż folder dist/ przez interfejs Kimi
```

## Systemy gry

| System | Opis |
|--------|------|
| **Personel** | 5 rol, 5 atrybutow (0-100), szkolenia, morale |
| **Produkcja** | Linie produkcyjne, surowce, utrzymanie |
| **R&D** | 10 smakow w 4 tierach, system jakosci |
| **Sprzedaz** | 5 kanalow dystrybucji, kontrakty, negocjacje |
| **Finanse** | Raporty tygodniowe, podatek 19%, kredyty |
| **Wydarzenia** | 18 typow losowych wydarzen w 6 kategoriach |

## Licencja

MIT - gra jest w 100% darmowa i open source.
