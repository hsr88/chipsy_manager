import type { GameState, Employee, Flavor, ProductionLine, SalesChannel, GameEvent, JobCandidate, GamePage, Loan, WeeklyFinances, TrainingFocus } from '$lib/types';
import {
  STARTING_EMPLOYEES, STARTING_FLAVORS, STARTING_RAW_MATERIALS,
  STARTING_PRODUCTION_LINES, STARTING_SALES_CHANNELS, STARTING_CASH,
  WEEKLY_FIXED_COSTS, TAX_RATE, generateCandidates, EVENT_TEMPLATES
} from '$lib/data/initialData';
import { simulateWeek } from '$lib/systems/simulation';

// ============================================================
// CHIPSY TOP MANAGER — Game Store (Svelte 5 Runes)
// Reactive game state management with full simulation
// ============================================================

/** Generate a fresh game state */
function createInitialState(companyName: string = 'Chipsy TOP'): GameState {
  return {
    week: 1,
    companyName,
    foundedWeek: 1,
    cash: STARTING_CASH,
    totalRevenue: 0,
    totalProfit: 0,
    employees: STARTING_EMPLOYEES.map(e => ({ ...e })),
    flavors: STARTING_FLAVORS.map(f => ({ ...f })),
    rawMaterials: STARTING_RAW_MATERIALS.map(m => ({ ...m })),
    productionLines: STARTING_PRODUCTION_LINES.map(l => ({ ...l })),
    salesChannels: STARTING_SALES_CHANNELS.map(c => ({ ...c })),
    activeEvents: [],
    eventHistory: [],
    weeklyReports: [],
    currentWeekFinance: createEmptyFinance(1),
    loans: [],
    reputation: { overall: 45, quality: 50, brandAwareness: 30, customerLoyalty: 40 },
    paused: false,
    gameOver: false,
  };
}

function createEmptyFinance(week: number): WeeklyFinances {
  return {
    week, revenue: 0, materialCosts: 0, salaryCosts: 0,
    maintenanceCosts: 0, marketingCosts: 0, rndCosts: 0,
    otherCosts: 0, taxAmount: 0, netProfit: 0,
    eventCosts: 0, eventIncome: 0,
  };
}

// ---- Reactive State ----
let _state = $state<GameState>(createInitialState());
let _currentPage = $state<GamePage>('dashboard');
let _candidates = $state<JobCandidate[]>([]);
let _toasts = $state<Array<{ id: string; message: string; type: 'success' | 'error' | 'warning' | 'info' }>>([]);
let _eventLog = $state<string[]>(['Rozpoczynamy działalność! Powodzenia!']);

// ---- Derived State ----
const totalEmployees = $derived(_state.employees.filter(e => e.isHired).length);
const totalCapacity = $derived(_state.productionLines
  .filter(l => l.isActive)
  .reduce((sum, l) => sum + l.capacity * l.efficiency, 0));
const weeklySalaryCost = $derived(_state.employees
  .filter(e => e.isHired)
  .reduce((sum, e) => sum + e.salary, 0));
const unlockedFlavors = $derived(_state.flavors.filter(f => f.isUnlocked));
const lockedFlavors = $derived(_state.flavors.filter(f => !f.isUnlocked));
const activeContracts = $derived(_state.salesChannels.filter(c => c.currentContract));
const reputationPercent = $derived(Math.round(_state.reputation.overall));
const isGameOver = $derived(_state.cash < -50000 || _state.gameOver);
const avgMorale = $derived({
  value: Math.round(_state.employees.filter(e => e.isHired).reduce((s, e) => s + e.morale, 0) / Math.max(totalEmployees, 1)),
  count: totalEmployees,
});

// ---- Toast Helper ----
function addToast(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') {
  const id = crypto.randomUUID();
  _toasts = [..._toasts, { id, message, type }];
  setTimeout(() => {
    _toasts = _toasts.filter(t => t.id !== id);
  }, 4000);
}

// ---- Game Actions ----

/** Advance to the next week — core game loop */
function nextWeek() {
  if (_state.paused || _state.gameOver) return;
  
  const summary = simulateWeek(_state);
  
  // Apply simulation results
  _state.week = summary.week;
  _state.currentWeekFinance = summary.finance;
  _state.weeklyReports = [..._state.weeklyReports, summary.finance];
  _state.cash += summary.finance.netProfit;
  _state.totalRevenue += summary.finance.revenue;
  _state.totalProfit += summary.finance.netProfit;
  
  // Update production tracking
  _state.productionLines = _state.productionLines.map(l => ({
    ...l,
    producedThisWeek: 0,
    maintenanceLevel: Math.max(0, l.maintenanceLevel - (l.isActive ? 2 : 0)),
  }));
  
  // Add events
  if (summary.newEvents.length > 0) {
    _state.activeEvents = [..._state.activeEvents, ...summary.newEvents];
    for (const ev of summary.newEvents) {
      _eventLog = [`Tydzień ${_state.week}: ${ev.title} — ${ev.description}`, ..._eventLog];
      addToast(ev.title, ev.type === 'crisis' || ev.type === 'production' ? 'error' : ev.type === 'opportunity' ? 'success' : 'warning');
    }
  }
  
  // Update salary costs in finance
  _state.currentWeekFinance.salaryCosts = weeklySalaryCost;
  
  // Process loans
  for (const loan of _state.loans) {
    if (loan.weeksRemaining > 0) {
      _state.cash -= loan.weeklyPayment;
      loan.weeksRemaining--;
      _state.currentWeekFinance.otherCosts += loan.weeklyPayment;
    }
  }
  _state.loans = _state.loans.filter(l => l.weeksRemaining > 0);
  
  // Refresh candidates
  _candidates = generateCandidates(_state.week);
  
  // Update material prices (seasonality)
  updateMaterialPrices();
  
  // Check game over
  if (_state.cash < -50000) {
    _state.gameOver = true;
    _state.gameOverReason = 'Bankructwo — brak środków na dalszą działalność';
    addToast('GAME OVER: Bankructwo!', 'error');
  }
  
  // Reputation decay/growth
  _state.reputation.overall = Math.max(0, Math.min(100, _state.reputation.overall + (summary.finance.netProfit > 0 ? 0.3 : -0.5)));
  
  _eventLog = [`Tydzień ${_state.week}: Koniec tygodnia. Zysk netto: ${summary.finance.netProfit.toLocaleString('pl-PL')} PLN`, ..._eventLog];
}

function updateMaterialPrices() {
  for (const mat of _state.rawMaterials) {
    // Seasonality oscillation
    const seasonalShift = Math.sin((_state.week / 52) * Math.PI * 2) * 0.15;
    mat.seasonality = seasonalShift;
    
    // Random fluctuation
    const randomShift = (Math.random() - 0.5) * 0.08;
    
    // Trend decay
    mat.priceTrend = mat.priceTrend * 0.95 + 1.0 * 0.05;
    
    // Final price
    const newPrice = mat.basePrice * (1 + seasonalShift + randomShift) * mat.priceTrend;
    mat.currentPrice = Math.max(mat.basePrice * 0.5, Math.round(newPrice * 100) / 100);
  }
}

/** Purchase raw materials */
function buyMaterial(type: string, amount: number) {
  const mat = _state.rawMaterials.find(m => m.type === type);
  if (!mat || amount <= 0) return false;
  
  const cost = mat.currentPrice * amount;
  if (_state.cash < cost) {
    addToast('Brak środków na zakup!', 'error');
    return false;
  }
  
  _state.cash -= cost;
  mat.stock += amount;
  _state.currentWeekFinance.materialCosts += cost;
  addToast(`Zakupiono ${amount} jednostek ${mat.name}`, 'success');
  return true;
}

/** Hire an employee */
function hireCandidate(candidate: JobCandidate) {
  if (_state.cash < candidate.salaryExpectation * 4) {
    addToast('Brak środków na zatrudnienie (wymagane 4x wynagrodzenie)', 'error');
    return false;
  }
  
  const newEmployee: Employee = {
    id: `emp-${crypto.randomUUID()}`,
    firstName: candidate.firstName,
    lastName: candidate.lastName,
    role: candidate.role,
    skills: { ...candidate.skills },
    salary: candidate.salaryExpectation,
    morale: 75,
    isHired: true,
    hiredWeek: _state.week,
    trainings: [],
  };
  
  _state.employees = [..._state.employees, newEmployee];
  _state.cash -= candidate.salaryExpectation * 2; // signing bonus / recruitment cost
  _candidates = _candidates.filter(c => c.id !== candidate.id);
  addToast(`Zatrudniono ${candidate.firstName} ${candidate.lastName}!`, 'success');
  return true;
}

/** Fire an employee */
function fireEmployee(employeeId: string) {
  const emp = _state.employees.find(e => e.id === employeeId);
  if (!emp) return false;
  
  const severance = emp.salary * 2;
  _state.cash -= severance;
  _state.employees = _state.employees.map(e => e.id === employeeId ? { ...e, isHired: false, morale: 0 } : e);
  
  // Morale penalty for remaining employees
  _state.employees = _state.employees.map(e => e.isHired ? { ...e, morale: Math.max(0, e.morale - 10) } : e);
  
  addToast(`Zwolniono ${emp.firstName} ${emp.lastName} (odprawa: ${severance.toLocaleString('pl-PL')} PLN)`, 'warning');
  return true;
}

/** Train an employee */
function trainEmployee(employeeId: string, focus: TrainingFocus) {
  const emp = _state.employees.find(e => e.id === employeeId);
  if (!emp) return false;
  
  const cost = 2000 + (emp.skills[focus] * 30);
  if (_state.cash < cost) {
    addToast('Brak środków na szkolenie!', 'error');
    return false;
  }
  
  const improvement = Math.max(1, Math.floor((100 - emp.skills[focus]) * 0.08));
  const newSkills = { ...emp.skills, [focus]: Math.min(100, emp.skills[focus] + improvement) };
  
  _state.cash -= cost;
  _state.currentWeekFinance.rndCosts += cost;
  _state.employees = _state.employees.map(e => 
    e.id === employeeId 
      ? { ...e, skills: newSkills, trainings: [...e.trainings, { week: _state.week, focus, cost, improvement }] }
      : e
  );
  
  addToast(`${emp.firstName} ${emp.lastName} przeszkolony w ${focus}: +${improvement} pkt!`, 'success');
  return true;
}

/** Toggle production line */
function toggleLine(lineId: string) {
  _state.productionLines = _state.productionLines.map(l =>
    l.id === lineId ? { ...l, isActive: !l.isActive } : l
  );
}

/** Assign flavor to production line */
function assignFlavorToLine(lineId: string, flavorId: string) {
  const line = _state.productionLines.find(l => l.id === lineId);
  const flavor = _state.flavors.find(f => f.id === flavorId);
  if (!line || !flavor || !flavor.isUnlocked) return false;
  
  _state.productionLines = _state.productionLines.map(l =>
    l.id === lineId ? { ...l, assignedFlavor: flavorId } : l
  );
  addToast(`Przypisano smak ${flavor.name} do ${line.name}`, 'success');
  return true;
}

/** Buy a new production line */
function buyProductionLine() {
  const cost = 75000;
  if (_state.cash < cost) {
    addToast('Brak środków na nową linię (75 000 PLN)', 'error');
    return false;
  }
  
  const newLine: ProductionLine = {
    id: `line-${crypto.randomUUID()}`,
    name: `Linia Produkcji #${_state.productionLines.length + 1}`,
    capacity: 2000,
    efficiency: 0.70,
    maintenanceLevel: 100,
    upgradeLevel: 1,
    isActive: false,
    weeklyCost: 3500,
    assignedFlavor: null,
    producedThisWeek: 0,
  };
  
  _state.cash -= cost;
  _state.productionLines = [..._state.productionLines, newLine];
  addToast('Zakupiono nową linię produkcyjną!', 'success');
  return true;
}

/** Upgrade production line */
function upgradeLine(lineId: string) {
  const line = _state.productionLines.find(l => l.id === lineId);
  if (!line || line.upgradeLevel >= 5) return false;
  
  const cost = line.upgradeLevel * 25000;
  if (_state.cash < cost) {
    addToast(`Brak środków na ulepszenie (${cost.toLocaleString('pl-PL')} PLN)`, 'error');
    return false;
  }
  
  _state.cash -= cost;
  _state.productionLines = _state.productionLines.map(l =>
    l.id === lineId
      ? { ...l, upgradeLevel: l.upgradeLevel + 1, capacity: l.capacity + 500, efficiency: Math.min(0.98, l.efficiency + 0.05), weeklyCost: l.weeklyCost + 500 }
      : l
  );
  addToast(`Ulepszono ${line.name} do poziomu ${line.upgradeLevel + 1}!`, 'success');
  return true;
}

/** Repair production line */
function repairLine(lineId: string) {
  const line = _state.productionLines.find(l => l.id === lineId);
  if (!line || line.maintenanceLevel >= 90) return false;
  
  const cost = Math.round((100 - line.maintenanceLevel) * 80);
  if (_state.cash < cost) {
    addToast('Brak środków na naprawę!', 'error');
    return false;
  }
  
  _state.cash -= cost;
  _state.productionLines = _state.productionLines.map(l =>
    l.id === lineId ? { ...l, maintenanceLevel: 100, isActive: true } : l
  );
  addToast('Naprawiono linię produkcyjną!', 'success');
  return true;
}

/** Start research on a new flavor */
function startResearch(flavorId: string) {
  const flavor = _state.flavors.find(f => f.id === flavorId);
  if (!flavor || flavor.isUnlocked) return false;
  
  if (_state.cash < flavor.researchCost) {
    addToast('Brak środków na badania!', 'error');
    return false;
  }
  
  _state.cash -= flavor.researchCost;
  _state.currentWeekFinance.rndCosts += flavor.researchCost;
  _state.flavors = _state.flavors.map(f =>
    f.id === flavorId ? { ...f, isUnlocked: true, unlockWeek: _state.week, qualityLevel: 1 } : f
  );
  
  addToast(`Odblokowano nowy smak: ${flavor.name}!`, 'success');
  return true;
}

/** Upgrade flavor quality */
function upgradeFlavorQuality(flavorId: string) {
  const flavor = _state.flavors.find(f => f.id === flavorId);
  if (!flavor || !flavor.isUnlocked || flavor.qualityLevel >= 5) return false;
  
  const cost = flavor.qualityLevel * 10000;
  if (_state.cash < cost) {
    addToast('Brak środków na ulepszenie jakości!', 'error');
    return false;
  }
  
  _state.cash -= cost;
  _state.currentWeekFinance.rndCosts += cost;
  _state.flavors = _state.flavors.map(f =>
    f.id === flavorId ? { ...f, qualityLevel: f.qualityLevel + 1, popularity: f.popularity + 5 } : f
  );
  
  addToast(`Podwyższono jakość ${flavor.name} do poziomu ${flavor.qualityLevel + 1}!`, 'success');
  return true;
}

/** Negotiate a contract with a sales channel */
function negotiateContract(channelId: string) {
  const channel = _state.salesChannels.find(c => c.id === channelId);
  if (!channel || !channel.isUnlocked) return false;
  
  // Find best negotiator
  const negotiators = _state.employees.filter(e => e.isHired && (e.role === 'sales_negotiator' || e.role === 'marketing_director'));
  const bestNegotiator = negotiators.sort((a, b) => b.skills.negotiation - a.skills.negotiation)[0];
  const negotiationBonus = bestNegotiator ? bestNegotiator.skills.negotiation / 100 : 0.3;
  
  // Calculate terms
  const baseMargin = channel.marginPercent;
  const negotiatedMargin = Math.min(55, Math.round(baseMargin * (1 + negotiationBonus * 0.2)));
  const volume = Math.round(500 * channel.volumeMultiplier * (1 + (bestNegotiator?.skills.efficiency || 0) / 200));
  
  channel.currentContract = {
    channelId,
    agreedMargin: negotiatedMargin,
    weeklyVolume: volume,
    durationWeeks: 12,
    weeksRemaining: 12,
    renegotiableIn: 10,
  };
  
  _state.salesChannels = _state.salesChannels.map(c => c.id === channelId ? { ...channel } : c);
  addToast(`Wynegocjowano kontrakt z ${channel.name} na marży ${negotiatedMargin}%!`, 'success');
  return true;
}

/** Take a loan */
function takeLoan(amount: number) {
  const interestRate = 0.08; // 8% weekly
  const weeks = 20;
  const totalRepay = amount * (1 + interestRate);
  const weeklyPayment = totalRepay / weeks;
  
  const loan: Loan = {
    id: `loan-${crypto.randomUUID()}`,
    amount,
    interestRate,
    weeklyPayment,
    weeksRemaining: weeks,
    totalToRepay: totalRepay,
  };
  
  _state.cash += amount;
  _state.loans = [..._state.loans, loan];
  addToast(`Wzięto kredyt: ${amount.toLocaleString('pl-PL')} PLN (do spłaty: ${totalRepay.toLocaleString('pl-PL')} PLN)`, 'warning');
  return true;
}

/** Change employee salary (affects morale) */
function changeSalary(employeeId: string, newSalary: number) {
  const emp = _state.employees.find(e => e.id === employeeId);
  if (!emp) return false;
  
  const diff = newSalary - emp.salary;
  const moraleChange = diff > 0 ? Math.round(diff / 100) : Math.round(diff / 50);
  
  _state.employees = _state.employees.map(e =>
    e.id === employeeId ? { ...e, salary: newSalary, morale: Math.max(0, Math.min(100, e.morale + moraleChange)) } : e
  );
  
  addToast(`Zmieniono wynagrodzenie ${emp.firstName} ${emp.lastName} na ${newSalary.toLocaleString('pl-PL')} PLN`, 'info');
  return true;
}

/** Save game to localStorage */
function saveGame(): boolean {
  try {
    const saveData = {
      state: _state,
      savedAt: new Date().toISOString(),
      version: '1.0',
    };
    localStorage.setItem('chipsy_top_manager_save', JSON.stringify(saveData));
    addToast('Gra zapisana!', 'success');
    return true;
  } catch {
    addToast('Błąd zapisu gry!', 'error');
    return false;
  }
}

/** Load game from localStorage */
function loadGame(): boolean {
  try {
    const raw = localStorage.getItem('chipsy_top_manager_save');
    if (!raw) {
      addToast('Brak zapisanego stanu gry', 'warning');
      return false;
    }
    const saveData = JSON.parse(raw);
    if (saveData.state) {
      _state = saveData.state as GameState;
      _eventLog = [`Wczytano zapis z ${new Date(saveData.savedAt).toLocaleString('pl-PL')}`, ..._eventLog];
      addToast('Gra wczytana!', 'success');
      return true;
    }
    return false;
  } catch {
    addToast('Błąd wczytywania gry!', 'error');
    return false;
  }
}

/** Start a new game */
function newGame(companyName?: string) {
  _state = createInitialState(companyName);
  _candidates = generateCandidates(1);
  _eventLog = ['Rozpoczęto nową grę! Powodzenia!'];
  _currentPage = 'dashboard';
  addToast('Nowa gra rozpoczęta!', 'success');
}

/** Dismiss an active event */
function dismissEvent(eventId: string) {
  const ev = _state.activeEvents.find(e => e.id === eventId);
  if (ev) {
    _state.activeEvents = _state.activeEvents.filter(e => e.id !== eventId);
    _state.eventHistory = [ev, ..._state.eventHistory];
  }
}

/** Unlock a sales channel */
function unlockChannel(channelId: string) {
  const channel = _state.salesChannels.find(c => c.id === channelId);
  if (!channel || channel.isUnlocked) return false;
  
  if (_state.reputation.overall < channel.reputationRequired) {
    addToast(`Wymagana reputacja: ${channel.reputationRequired}%`, 'error');
    return false;
  }
  
  const cost = channel.reputationRequired * 500;
  if (_state.cash < cost) {
    addToast(`Brak środków na odblokowanie (${cost.toLocaleString('pl-PL')} PLN)`, 'error');
    return false;
  }
  
  _state.cash -= cost;
  _state.salesChannels = _state.salesChannels.map(c =>
    c.id === channelId ? { ...c, isUnlocked: true } : c
  );
  addToast(`Odblokowano kanał: ${channel.name}!`, 'success');
  return true;
}

// ---- Export Store API ----
export const gameStore = {
  // State access
  get state() { return _state; },
  get currentPage() { return _currentPage; },
  set currentPage(page: GamePage) { _currentPage = page; },
  get candidates() { return _candidates; },
  get toasts() { return _toasts; },
  get eventLog() { return _eventLog; },
  
  // Derived
  get totalEmployees() { return totalEmployees; },
  get totalCapacity() { return totalCapacity; },
  get weeklySalaryCost() { return weeklySalaryCost; },
  get unlockedFlavors() { return unlockedFlavors; },
  get lockedFlavors() { return lockedFlavors; },
  get activeContracts() { return activeContracts; },
  get reputationPercent() { return reputationPercent; },
  get isGameOver() { return isGameOver; },
  get avgMorale() { return avgMorale; },
  
  // Actions
  nextWeek,
  buyMaterial,
  hireCandidate,
  fireEmployee,
  trainEmployee,
  toggleLine,
  assignFlavorToLine,
  buyProductionLine,
  upgradeLine,
  repairLine,
  startResearch,
  upgradeFlavorQuality,
  negotiateContract,
  takeLoan,
  changeSalary,
  saveGame,
  loadGame,
  newGame,
  dismissEvent,
  unlockChannel,
  addToast,
  generateNewCandidates: () => { _candidates = generateCandidates(_state.week); },
};
