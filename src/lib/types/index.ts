// ============================================================
// CHIPSY TOP MANAGER — Core Type Definitions
// All game entities, state shapes, and system contracts
// ============================================================

/** Employee role types available in the game */
export type EmployeeRole =
  | 'production_director'
  | 'rd_director'
  | 'marketing_director'
  | 'logistics_manager'
  | 'sales_negotiator'
  | 'assistant';

/** Human-readable Polish role names */
export const ROLE_LABELS: Record<EmployeeRole, string> = {
  production_director: 'Dyrektor Produkcji',
  rd_director: 'Szef Badań i Rozwoju',
  marketing_director: 'Dyrektor Marketingu',
  logistics_manager: 'Kierownik Logistyki i Zakupów',
  sales_negotiator: 'Specjalista ds. Sprzedaży',
  assistant: 'Asystent',
};

/** Skill attributes for employees (0-100 scale) */
export interface EmployeeSkills {
  efficiency: number;      // Efektywność — wpływa na produkcję
  creativity: number;      // Kreatywność — wpływa na jakość i R&D
  negotiation: number;     // Negocjacje — wpływa na marże i koszty
  management: number;      // Zarządzanie — wpływa na morale zespołu
  experience: number;      // Doświadczenie — rośnie z czasem
}

/** Training focus types */
export type TrainingFocus = keyof EmployeeSkills;

/** Single training session record */
export interface TrainingRecord {
  week: number;
  focus: TrainingFocus;
  cost: number;
  improvement: number;
}

/** Employee entity — the heart of the HR system */
export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  role: EmployeeRole;
  skills: EmployeeSkills;
  salary: number;           // weekly salary in PLN
  morale: number;           // 0-100
  isHired: boolean;
  hiredWeek: number;
  trainings: TrainingRecord[];
}

/** Product flavor with market dynamics */
export interface Flavor {
  id: string;
  name: string;
  description: string;
  popularity: number;       // 0-100
  marginPercent: number;    // profit margin
  productionCost: number;   // per unit
  trend: 'rising' | 'stable' | 'falling';
  tier: 'basic' | 'regional' | 'premium' | 'healthy';
  isUnlocked: boolean;
  unlockWeek: number;
  researchWeeksRequired: number;
  researchCost: number;
  qualityLevel: number;     // 1-5
}

/** Raw material types */
export type RawMaterialType = 'potatoes' | 'oil' | 'spices' | 'packaging';

export const MATERIAL_LABELS: Record<RawMaterialType, string> = {
  potatoes: 'Ziemniaki',
  oil: 'Olej',
  spices: 'Przyprawy',
  packaging: 'Opakowania',
};

/** Raw material market state */
export interface RawMaterial {
  type: RawMaterialType;
  name: string;
  basePrice: number;        // per unit
  currentPrice: number;
  priceTrend: number;       // multiplier factor
  seasonality: number;      // seasonal modifier (-0.3 to +0.3)
  quality: number;          // 0-100
  stock: number;            // current inventory
}

/** Production line with capacity and efficiency */
export interface ProductionLine {
  id: string;
  name: string;
  capacity: number;         // units per week
  efficiency: number;       // 0-1
  maintenanceLevel: number; // 0-100
  upgradeLevel: number;     // 1-5
  isActive: boolean;
  weeklyCost: number;       // fixed cost
  assignedFlavor: string | null; // flavor ID
  producedThisWeek: number;
}

/** Sales channel contract */
export interface SalesChannel {
  id: string;
  name: string;
  type: 'discount' | 'supermarket' | 'convenience' | 'export' | 'online';
  marginPercent: number;    // our margin
  volumeMultiplier: number; // demand multiplier
  stability: number;        // 0-100, risk of contract loss
  reputationRequired: number; // min company reputation
  isUnlocked: boolean;
  currentContract: Contract | null;
  weeklySales: number;
  totalSales: number;
}

export interface Contract {
  channelId: string;
  agreedMargin: number;
  weeklyVolume: number;
  durationWeeks: number;
  weeksRemaining: number;
  renegotiableIn: number;
}

/** Polish retail chains for flavor */
export const RETAIL_CHAINS = [
  'Biedronka', 'Lidl', 'Carrefour', 'Auchan', 'Żabka',
  'Orlen', 'Circle K', 'Shell', 'Stokrotka', 'Dino',
  'Kaufland', 'Aldi', 'Netto'
] as const;

/** Game event types */
export type GameEventType =
  | 'market'           // market changes
  | 'production'       // production issues
  | 'opportunity'      // positive opportunities
  | 'crisis'           // negative events
  | 'competition'      // competitive moves
  | 'regulatory';      // legal/sanepid

/** A game event that affects gameplay */
export interface GameEvent {
  id: string;
  title: string;
  description: string;
  type: GameEventType;
  week: number;
  effects: EventEffect[];
  choices?: EventChoice[];
  resolved: boolean;
  severity: 'low' | 'medium' | 'high';
}

export interface EventEffect {
  target: string;       // path in GameState
  value: number;
  operation: 'add' | 'multiply' | 'set';
  duration?: number;    // weeks, 0 = permanent
}

export interface EventChoice {
  label: string;
  cost?: number;
  effects: EventEffect[];
}

/** Financial record for a single week */
export interface WeeklyFinances {
  week: number;
  revenue: number;
  materialCosts: number;
  salaryCosts: number;
  maintenanceCosts: number;
  marketingCosts: number;
  rndCosts: number;
  otherCosts: number;
  taxAmount: number;
  netProfit: number;
  eventCosts: number;
  eventIncome: number;
}

/** Company reputation and market position */
export interface CompanyReputation {
  overall: number;        // 0-100
  quality: number;        // perceived quality
  brandAwareness: number; // 0-100
  customerLoyalty: number; // 0-100
}

/** Main game state — the single source of truth */
export interface GameState {
  // Meta
  week: number;
  companyName: string;
  foundedWeek: number;
  
  // Resources
  cash: number;
  totalRevenue: number;
  totalProfit: number;
  
  // Core systems
  employees: Employee[];
  flavors: Flavor[];
  rawMaterials: RawMaterial[];
  productionLines: ProductionLine[];
  salesChannels: SalesChannel[];
  activeEvents: GameEvent[];
  eventHistory: GameEvent[];
  
  // Finance
  weeklyReports: WeeklyFinances[];
  currentWeekFinance: WeeklyFinances;
  loans: Loan[];
  
  // Reputation
  reputation: CompanyReputation;
  
  // Settings
  paused: boolean;
  gameOver: boolean;
  gameOverReason?: string;
}

export interface Loan {
  id: string;
  amount: number;
  interestRate: number;
  weeklyPayment: number;
  weeksRemaining: number;
  totalToRepay: number;
}

/** AI competitor chip company */
export interface Competitor {
  name: string;
  marketShare: number;
  aggression: number;     // 0-1, how much they compete
  reputation: number;
}

/** Weekly simulation result summary */
export interface WeekSummary {
  week: number;
  producedUnits: number;
  soldUnits: number;
  revenue: number;
  costs: number;
  profit: number;
  newEvents: GameEvent[];
  resolvedEvents: GameEvent[];
  employeeChanges: string[];
}

/** Navigation page identifiers */
export type GamePage =
  | 'dashboard'
  | 'employees'
  | 'production'
  | 'research'
  | 'sales'
  | 'finances'
  | 'events';

export const PAGE_LABELS: Record<GamePage, string> = {
  dashboard: 'Dashboard',
  employees: 'Personel',
  production: 'Produkcja',
  research: 'Badania i Rozwój',
  sales: 'Sprzedaż',
  finances: 'Finanse',
  events: 'Wydarzenia',
};

/** Available job candidates (for hiring) */
export interface JobCandidate {
  id: string;
  firstName: string;
  lastName: string;
  role: EmployeeRole;
  skills: EmployeeSkills;
  salaryExpectation: number;
  availableUntil: number; // week number
}

/** Toast notification */
export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}
