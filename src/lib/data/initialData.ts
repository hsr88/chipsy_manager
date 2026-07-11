import type {
  Employee, Flavor, RawMaterial, ProductionLine, SalesChannel, GameEvent, Competitor, JobCandidate
} from '$lib/types';

// ============================================================
// CHIPSY TOP MANAGER — Initial Game Data
// Starting state for a new game
// ============================================================

/** Starting employees — a small but capable team */
export const STARTING_EMPLOYEES: Employee[] = [
  {
    id: 'emp-001',
    firstName: 'Marian',
    lastName: 'Kowalski',
    role: 'production_director',
    skills: { efficiency: 72, creativity: 45, negotiation: 38, management: 60, experience: 55 },
    salary: 4500,
    morale: 80,
    isHired: true,
    hiredWeek: 0,
    trainings: [],
  },
  {
    id: 'emp-002',
    firstName: 'Anna',
    lastName: 'Nowak',
    role: 'rd_director',
    skills: { efficiency: 55, creativity: 78, negotiation: 30, management: 50, experience: 40 },
    salary: 4200,
    morale: 85,
    isHired: true,
    hiredWeek: 0,
    trainings: [],
  },
  {
    id: 'emp-003',
    firstName: 'Piotr',
    lastName: 'Wiśniewski',
    role: 'sales_negotiator',
    skills: { efficiency: 50, creativity: 40, negotiation: 75, management: 45, experience: 48 },
    salary: 3800,
    morale: 78,
    isHired: true,
    hiredWeek: 0,
    trainings: [],
  },
  {
    id: 'emp-004',
    firstName: 'Katarzyna',
    lastName: 'Dąbrowska',
    role: 'logistics_manager',
    skills: { efficiency: 65, creativity: 35, negotiation: 55, management: 62, experience: 50 },
    salary: 3600,
    morale: 82,
    isHired: true,
    hiredWeek: 0,
    trainings: [],
  },
  {
    id: 'emp-005',
    firstName: 'Tomasz',
    lastName: 'Lewandowski',
    role: 'marketing_director',
    skills: { efficiency: 60, creativity: 70, negotiation: 45, management: 55, experience: 42 },
    salary: 4000,
    morale: 80,
    isHired: true,
    hiredWeek: 0,
    trainings: [],
  },
];

/** Starting flavors — the classics */
export const STARTING_FLAVORS: Flavor[] = [
  {
    id: 'flv-salt',
    name: 'Solone',
    description: 'Klasyczne chipsy solone — ponadczasowy smak',
    popularity: 75,
    marginPercent: 22,
    productionCost: 2.80,
    trend: 'stable',
    tier: 'basic',
    isUnlocked: true,
    unlockWeek: 0,
    researchWeeksRequired: 0,
    researchCost: 0,
    qualityLevel: 3,
  },
  {
    id: 'flv-paprika',
    name: 'Papryka',
    description: 'Pikantne chipsy o smaku słodkiej papryki',
    popularity: 68,
    marginPercent: 24,
    productionCost: 3.10,
    trend: 'rising',
    tier: 'basic',
    isUnlocked: true,
    unlockWeek: 0,
    researchWeeksRequired: 0,
    researchCost: 0,
    qualityLevel: 3,
  },
  {
    id: 'flv-onion',
    name: 'Ser i Cebulka',
    description: 'Najpopularniejszy smak w Polsce',
    popularity: 82,
    marginPercent: 25,
    productionCost: 3.40,
    trend: 'stable',
    tier: 'basic',
    isUnlocked: true,
    unlockWeek: 0,
    researchWeeksRequired: 0,
    researchCost: 0,
    qualityLevel: 3,
  },
  {
    id: 'flv-kebab',
    name: 'Kebab',
    description: 'Smak inspirowany ulicznym kebabem',
    popularity: 0,
    marginPercent: 28,
    productionCost: 3.80,
    trend: 'rising',
    tier: 'regional',
    isUnlocked: false,
    unlockWeek: 0,
    researchWeeksRequired: 4,
    researchCost: 15000,
    qualityLevel: 1,
  },
  {
    id: 'flv-curry',
    name: 'Curry',
    description: 'Egipskie curry — egzotyczny wybór',
    popularity: 0,
    marginPercent: 26,
    productionCost: 3.60,
    trend: 'rising',
    tier: 'regional',
    isUnlocked: false,
    unlockWeek: 0,
    researchWeeksRequired: 6,
    researchCost: 20000,
    qualityLevel: 1,
  },
  {
    id: 'flv-truffle',
    name: 'Trufla',
    description: 'Premium chipsy z prawdziwym aromatem trufli',
    popularity: 0,
    marginPercent: 45,
    productionCost: 6.20,
    trend: 'rising',
    tier: 'premium',
    isUnlocked: false,
    unlockWeek: 0,
    researchWeeksRequired: 10,
    researchCost: 50000,
    qualityLevel: 1,
  },
  {
    id: 'flv-seasalt',
    name: 'Sól morska i ocet',
    description: 'Brytyjski klasyk — mocny charakter',
    popularity: 0,
    marginPercent: 30,
    productionCost: 3.50,
    trend: 'stable',
    tier: 'premium',
    isUnlocked: false,
    unlockWeek: 0,
    researchWeeksRequired: 8,
    researchCost: 35000,
    qualityLevel: 1,
  },
  {
    id: 'flv-kale',
    name: 'Jarmuż',
    description: 'Zdrowe chipsy z suszonego jarmużu',
    popularity: 0,
    marginPercent: 50,
    productionCost: 5.80,
    trend: 'rising',
    tier: 'healthy',
    isUnlocked: false,
    unlockWeek: 0,
    researchWeeksRequired: 12,
    researchCost: 45000,
    qualityLevel: 1,
  },
  {
    id: 'flv-beetroot',
    name: 'Burak',
    description: 'Chipsy z buraków — naturalna słodycz',
    popularity: 0,
    marginPercent: 35,
    productionCost: 4.50,
    trend: 'rising',
    tier: 'healthy',
    isUnlocked: false,
    unlockWeek: 0,
    researchWeeksRequired: 8,
    researchCost: 25000,
    qualityLevel: 1,
  },
  {
    id: 'flv-wasabi',
    name: 'Wasabi',
    description: 'Intensywny japoński smak',
    popularity: 0,
    marginPercent: 32,
    productionCost: 4.20,
    trend: 'stable',
    tier: 'regional',
    isUnlocked: false,
    unlockWeek: 0,
    researchWeeksRequired: 6,
    researchCost: 22000,
    qualityLevel: 1,
  },
];

/** Starting raw materials */
export const STARTING_RAW_MATERIALS: RawMaterial[] = [
  { type: 'potatoes', name: 'Ziemniaki', basePrice: 1.20, currentPrice: 1.20, priceTrend: 1.0, seasonality: 0, quality: 75, stock: 5000 },
  { type: 'oil', name: 'Olej słonecznikowy', basePrice: 3.50, currentPrice: 3.50, priceTrend: 1.0, seasonality: 0, quality: 80, stock: 2000 },
  { type: 'spices', name: 'Przyprawy', basePrice: 8.00, currentPrice: 8.00, priceTrend: 1.0, seasonality: 0, quality: 70, stock: 500 },
  { type: 'packaging', name: 'Opakowania foliowe', basePrice: 0.80, currentPrice: 0.80, priceTrend: 1.0, seasonality: 0, quality: 85, stock: 3000 },
];

/** Starting production lines */
export const STARTING_PRODUCTION_LINES: ProductionLine[] = [
  {
    id: 'line-001',
    name: 'Linia Produkcji #1',
    capacity: 2000,
    efficiency: 0.75,
    maintenanceLevel: 80,
    upgradeLevel: 1,
    isActive: true,
    weeklyCost: 3500,
    assignedFlavor: 'flv-onion',
    producedThisWeek: 0,
  },
];

/** Sales channels */
export const STARTING_SALES_CHANNELS: SalesChannel[] = [
  {
    id: 'ch-discount',
    name: 'Dyskontery (Biedronka, Lidl)',
    type: 'discount',
    marginPercent: 12,
    volumeMultiplier: 3.5,
    stability: 85,
    reputationRequired: 0,
    isUnlocked: true,
    currentContract: {
      channelId: 'ch-discount',
      agreedMargin: 12,
      weeklyVolume: 1500,
      durationWeeks: 12,
      weeksRemaining: 10,
      renegotiableIn: 8,
    },
    weeklySales: 0,
    totalSales: 0,
  },
  {
    id: 'ch-supermarket',
    name: 'Supermarkety (Carrefour, Auchan)',
    type: 'supermarket',
    marginPercent: 18,
    volumeMultiplier: 2.0,
    stability: 75,
    reputationRequired: 10,
    isUnlocked: true,
    currentContract: {
      channelId: 'ch-supermarket',
      agreedMargin: 18,
      weeklyVolume: 800,
      durationWeeks: 10,
      weeksRemaining: 8,
      renegotiableIn: 6,
    },
    weeklySales: 0,
    totalSales: 0,
  },
  {
    id: 'ch-convenience',
    name: 'Żabka / Stacje benzynowe',
    type: 'convenience',
    marginPercent: 28,
    volumeMultiplier: 1.2,
    stability: 65,
    reputationRequired: 20,
    isUnlocked: true,
    currentContract: null,
    weeklySales: 0,
    totalSales: 0,
  },
  {
    id: 'ch-export',
    name: 'Eksport (Europa Wschodnia)',
    type: 'export',
    marginPercent: 22,
    volumeMultiplier: 1.5,
    stability: 55,
    reputationRequired: 35,
    isUnlocked: false,
    weeklySales: 0,
    totalSales: 0,
  },
  {
    id: 'ch-online',
    name: 'Sklep internetowy',
    type: 'online',
    marginPercent: 45,
    volumeMultiplier: 0.6,
    stability: 70,
    reputationRequired: 15,
    isUnlocked: true,
    currentContract: null,
    weeklySales: 0,
    totalSales: 0,
  },
];

/** Predefined event templates (weighted random selection) */
export const EVENT_TEMPLATES = [
  // MARKET EVENTS
  {
    type: 'market' as const,
    title: 'Wzrost cen ziemniaków',
    description: 'Susza w głównych regionach upraw ziemniaka spowodowała wzrost cen surowca o 25%.',
    severity: 'medium' as const,
    weight: 8,
    effects: [{ target: 'rawMaterials.potatoes.priceTrend', value: 1.25, operation: 'multiply' as const }],
  },
  {
    type: 'market' as const,
    title: 'Obniżka cen oleju',
    description: 'Globalna nadwyżka produkcji oleju słonecznikowego obniżyła ceny.',
    severity: 'low' as const,
    weight: 6,
    effects: [{ target: 'rawMaterials.oil.priceTrend', value: 0.85, operation: 'multiply' as const }],
  },
  {
    type: 'market' as const,
    title: 'Sezon zbiorów — tanie ziemniaki',
    description: 'Rozpoczął się sezon zbiorów. Ceny ziemniaków spadają.',
    severity: 'low' as const,
    weight: 7,
    effects: [{ target: 'rawMaterials.potatoes.priceTrend', value: 0.80, operation: 'multiply' as const }],
  },
  {
    type: 'market' as const,
    title: 'Kryzys opakowaniowy',
    description: 'Problemy z dostawami folii aluminiowej — opakowania drożeją.',
    severity: 'medium' as const,
    weight: 5,
    effects: [{ target: 'rawMaterials.packaging.priceTrend', value: 1.30, operation: 'multiply' as const }],
  },
  // PRODUCTION EVENTS
  {
    type: 'production' as const,
    title: 'Awaria linii produkcyjnej',
    description: 'Jedna z linii produkcyjnych wymaga natychmiastowej naprawy.',
    severity: 'high' as const,
    weight: 6,
    effects: [
      { target: 'productionLines.0.isActive', value: 0, operation: 'set' as const },
      { target: 'cash', value: -8000, operation: 'add' as const },
    ],
  },
  {
    type: 'production' as const,
    title: 'Problem z jakością partii',
    description: 'Kontrola jakości wykryła defekt w jednej z partii. Konieczne wycofanie produktu.',
    severity: 'high' as const,
    weight: 5,
    effects: [
      { target: 'cash', value: -12000, operation: 'add' as const },
      { target: 'reputation.quality', value: -8, operation: 'add' as const },
    ],
  },
  {
    type: 'production' as const,
    title: 'Modernizacja zakładu konkurencji',
    description: 'Lay\'s otworzył nowoczesną linię produkcyjną. Presja konkurencyjna rośnie.',
    severity: 'medium' as const,
    weight: 6,
    effects: [{ target: 'reputation.overall', value: -3, operation: 'add' as const }],
  },
  // OPPORTUNITIES
  {
    type: 'opportunity' as const,
    title: 'Viral na TikToku!',
    description: 'Influencer pokazał Wasze chipsy w popularnym filmie. Zainteresowanie rośnie!',
    severity: 'low' as const,
    weight: 4,
    effects: [
      { target: 'reputation.brandAwareness', value: 15, operation: 'add' as const },
      { target: 'salesChannels', value: 1.2, operation: 'multiply' as const },
    ],
  },
  {
    type: 'opportunity' as const,
    title: 'Okazja przejęcia małej marki',
    description: 'Lokalna firma chipsów ma kłopoty finansowe. Można ją kupić za 40 000 PLN.',
    severity: 'medium' as const,
    weight: 3,
    effects: [{ target: 'cash', value: -40000, operation: 'add' as const }],
  },
  {
    type: 'opportunity' as const,
    title: 'Nagroda jakości',
    description: 'Wasze chipsy otrzymały wyróżnienie na targach spożywczych!',
    severity: 'low' as const,
    weight: 4,
    effects: [
      { target: 'reputation.overall', value: 10, operation: 'add' as const },
      { target: 'reputation.quality', value: 12, operation: 'add' as const },
    ],
  },
  {
    type: 'opportunity' as const,
    title: 'Trend na polskie smaki',
    description: 'Konsumenci szukają lokalnych, autentycznych smaków.',
    severity: 'low' as const,
    weight: 5,
    effects: [{ target: 'reputation.customerLoyalty', value: 8, operation: 'add' as const }],
  },
  // CRISIS EVENTS
  {
    type: 'crisis' as const,
    title: 'Strajk kierowców ciężarówek',
    description: 'Problemy z transportem opóźniają dostawy do sklepów.',
    severity: 'medium' as const,
    weight: 5,
    effects: [
      { target: 'salesChannels', value: 0.7, operation: 'multiply' as const },
      { target: 'reputation.overall', value: -5, operation: 'add' as const },
    ],
  },
  {
    type: 'crisis' as const,
    title: 'Kontrola SANEPID-u',
    description: 'Sanitarna inspekcja przeprowadza nagłą kontrolę w zakładzie.',
    severity: 'high' as const,
    weight: 4,
    effects: [{ target: 'cash', value: -5000, operation: 'add' as const }],
  },
  {
    type: 'crisis' as const,
    title: 'Płonie magazyn konkurencji',
    description: 'Pożar w zakładzie Crunchips — część rynku do przejęcia.',
    severity: 'medium' as const,
    weight: 2,
    effects: [
      { target: 'salesChannels', value: 1.4, operation: 'multiply' as const },
      { target: 'reputation.overall', value: 5, operation: 'add' as const },
    ],
  },
  // COMPETITION EVENTS
  {
    type: 'competition' as const,
    title: 'Lay\'s obniża ceny',
    description: 'Główny konkurent rozpoczął wojnę cenową.',
    severity: 'medium' as const,
    weight: 7,
    effects: [
      { target: 'salesChannels', value: 0.85, operation: 'multiply' as const },
      { target: 'reputation.overall', value: -2, operation: 'add' as const },
    ],
  },
  {
    type: 'competition' as const,
    title: 'Nowy gracz na rynku',
    description: 'Zagraniczna firma wchodzi na polski rynek chipsów premium.',
    severity: 'low' as const,
    weight: 5,
    effects: [{ target: 'reputation.overall', value: -4, operation: 'add' as const }],
  },
  {
    type: 'competition' as const,
    title: 'Crunchips wycofuje smak',
    description: 'Wasz konkurent rezygnuje z jednego ze smaków — szansa dla Was!',
    severity: 'low' as const,
    weight: 4,
    effects: [{ target: 'reputation.brandAwareness', value: 6, operation: 'add' as const }],
  },
  // REGULATORY
  {
    type: 'regulatory' as const,
    title: 'Nowe przepisy etykietowania',
    description: 'UE wprowadza nowe wymagania dotyczące oznakowania produktów.',
    severity: 'medium' as const,
    weight: 4,
    effects: [
      { target: 'cash', value: -6000, operation: 'add' as const },
      { target: 'reputation.overall', value: 2, operation: 'add' as const },
    ],
  },
  {
    type: 'regulatory' as const,
    title: 'Dotacja na rozwój przemysłu',
    description: 'Rząd oferuje wsparcie dla małych i średnich producentów spożywczych.',
    severity: 'low' as const,
    weight: 3,
    effects: [{ target: 'cash', value: 15000, operation: 'add' as const }],
  },
];

/** Competitor data for display and market simulation */
export const COMPETITORS: Competitor[] = [
  { name: 'Lay\'s (PepsiCo)', marketShare: 42, aggression: 0.8, reputation: 85 },
  { name: 'Crunchips (Intersnack)', marketShare: 28, aggression: 0.6, reputation: 78 },
  { name: 'Chio (Intersnack)', marketShare: 12, aggression: 0.4, reputation: 72 },
  { name: 'Wiejskie Ziemniaczki', marketShare: 8, aggression: 0.3, reputation: 68 },
  { name: 'Lorenz', marketShare: 5, aggression: 0.5, reputation: 70 },
  { name: 'Lokalni producenci', marketShare: 5, aggression: 0.2, reputation: 55 },
];

/** Pool of random job candidates */
export function generateCandidates(week: number): JobCandidate[] {
  const firstNames = ['Jan', 'Andrzej', 'Krzysztof', 'Marek', 'Grzegorz', 'Jakub', 'Adam', 'Michał', 'Wojciech', 'Szymon', 'Aleksandra', 'Zuzanna', 'Magdalena', 'Natalia', 'Karolina', 'Wiktoria', 'Maja', 'Laura', 'Julia', 'Kinga'];
  const lastNames = ['Jankowski', 'Mazur', 'Krawczyk', 'Piotrowski', 'Kopeć', 'Nowicki', 'Dudek', 'Lis', 'Sadowski', 'Borkowski', 'Wilk', 'Włodarczyk', 'Zielińska', 'Szymańska', 'Czerwińska', 'Bąk', 'Woźniak', 'Kubiak', 'Maciejewski', 'Ciesielski'];
  
  const candidates: JobCandidate[] = [];
  const roles: import('$lib/types').EmployeeRole[] = ['assistant', 'assistant', 'sales_negotiator', 'logistics_manager', 'marketing_director'];
  
  for (let i = 0; i < 4; i++) {
    const fn = firstNames[Math.floor(Math.random() * firstNames.length)];
    const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
    const role = roles[i];
    const exp = 20 + Math.floor(Math.random() * 40);
    
    candidates.push({
      id: `cand-${week}-${i}`,
      firstName: fn,
      lastName: ln,
      role,
      skills: {
        efficiency: 30 + Math.floor(Math.random() * 40),
        creativity: 30 + Math.floor(Math.random() * 40),
        negotiation: 30 + Math.floor(Math.random() * 40),
        management: 30 + Math.floor(Math.random() * 40),
        experience: exp,
      },
      salaryExpectation: 2500 + Math.floor(Math.random() * 2500) + (exp * 20),
      availableUntil: week + 4 + Math.floor(Math.random() * 4),
    });
  }
  
  return candidates;
}

/** Starting cash for a new game */
export const STARTING_CASH = 120000;

/** Weekly fixed costs (rent, utilities, insurance) */
export const WEEKLY_FIXED_COSTS = 8500;

/** Tax rate for company profit */
export const TAX_RATE = 0.19;
