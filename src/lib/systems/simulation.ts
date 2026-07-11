import type { GameState, WeeklyFinances, GameEvent, WeekSummary } from '$lib/types';
import { EVENT_TEMPLATES, WEEKLY_FIXED_COSTS, TAX_RATE } from '$lib/data/initialData';

// ============================================================
// CHIPSY TOP MANAGER — Turn Simulation Engine
// Processes all game systems each week
// Pure functions for testability and extensibility
// ============================================================

/** Main simulation function — processes one game week */
export function simulateWeek(state: GameState): {
  week: number;
  finance: WeeklyFinances;
  producedUnits: number;
  soldUnits: number;
  newEvents: GameEvent[];
} {
  const week = state.week + 1;
  const finance = createEmptyFinance(week);
  
  // 1. Production Phase
  const production = runProduction(state, finance);
  
  // 2. Sales Phase
  const sales = runSales(state, finance, production.totalProduced);
  
  // 3. Salary & Fixed Costs
  finance.salaryCosts = state.employees
    .filter(e => e.isHired)
    .reduce((sum, e) => sum + e.salary, 0);
  finance.otherCosts += WEEKLY_FIXED_COSTS;
  
  // 4. Maintenance costs
  finance.maintenanceCosts = state.productionLines
    .filter(l => l.isActive)
    .reduce((sum, l) => sum + l.weeklyCost, 0);
  
  // 5. Tax calculation
  const grossProfit = finance.revenue - finance.materialCosts - finance.salaryCosts - finance.maintenanceCosts - finance.rndCosts - finance.otherCosts;
  finance.taxAmount = grossProfit > 0 ? Math.round(grossProfit * TAX_RATE) : 0;
  
  // 6. Net profit
  finance.netProfit = grossProfit - finance.taxAmount;
  
  // 7. Event generation
  const newEvents = generateRandomEvents(state, week);
  
  // 8. Apply event effects
  for (const ev of newEvents) {
    for (const effect of ev.effects) {
      applyEventEffect(state, finance, effect);
    }
  }
  
  // 9. Employee morale adjustments
  adjustEmployeeMorale(state, finance);
  
  // Recalculate net profit after events
  const finalGross = finance.revenue - finance.materialCosts - finance.salaryCosts - finance.maintenanceCosts - finance.rndCosts - finance.otherCosts - finance.eventCosts;
  finance.taxAmount = finalGross > 0 ? Math.round(finalGross * TAX_RATE) : 0;
  finance.netProfit = finalGross - finance.taxAmount + finance.eventIncome;
  
  return {
    week,
    finance,
    producedUnits: production.totalProduced,
    soldUnits: sales.totalSold,
    newEvents,
  };
}

/** Production system — calculates output from all active lines */
function runProduction(state: GameState, finance: WeeklyFinances): { totalProduced: number } {
  let totalProduced = 0;
  
  for (const line of state.productionLines) {
    if (!line.isActive || line.maintenanceLevel <= 0) continue;
    
    const flavor = state.flavors.find(f => f.id === line.assignedFlavor);
    if (!flavor || !flavor.isUnlocked) continue;
    
    // Check if we have enough materials
    const unitsToProduce = Math.round(line.capacity * line.efficiency * (line.maintenanceLevel / 100));
    
    // Material requirements per unit
    const potatoNeeded = unitsToProduce * 0.4;
    const oilNeeded = unitsToProduce * 0.15;
    const spiceNeeded = unitsToProduce * 0.05;
    const packagingNeeded = unitsToProduce * 1.0;
    
    // Check stock
    const potatoes = state.rawMaterials.find(m => m.type === 'potatoes');
    const oil = state.rawMaterials.find(m => m.type === 'oil');
    const spices = state.rawMaterials.find(m => m.type === 'spices');
    const packaging = state.rawMaterials.find(m => m.type === 'packaging');
    
    if (!potatoes || !oil || !spices || !packaging) continue;
    
    // Adjust production to available materials
    const maxByPotatoes = potatoes.stock / 0.4;
    const maxByOil = oil.stock / 0.15;
    const maxBySpices = spices.stock / 0.05;
    const maxByPackaging = packaging.stock / 1.0;
    
    const actualUnits = Math.floor(Math.min(unitsToProduce, maxByPotatoes, maxByOil, maxBySpices, maxByPackaging));
    
    if (actualUnits <= 0) continue;
    
    // Consume materials
    potatoes.stock -= actualUnits * 0.4;
    oil.stock -= actualUnits * 0.15;
    spices.stock -= actualUnits * 0.05;
    packaging.stock -= actualUnits * 1.0;
    
    // Material costs
    const matCost = (actualUnits * 0.4 * potatoes.currentPrice) +
                    (actualUnits * 0.15 * oil.currentPrice) +
                    (actualUnits * 0.05 * spices.currentPrice) +
                    (actualUnits * 1.0 * packaging.currentPrice);
    
    finance.materialCosts += matCost;
    
    // Quality multiplier from employee skills
    const productionDirector = state.employees.find(e => e.isHired && e.role === 'production_director');
    const qualityBonus = productionDirector ? (productionDirector.skills.efficiency / 100) * 0.15 : 0;
    const managementBonus = productionDirector ? (productionDirector.skills.management / 100) * 0.1 : 0;
    
    const finalUnits = Math.round(actualUnits * (1 + qualityBonus + managementBonus));
    
    totalProduced += finalUnits;
    line.producedThisWeek = finalUnits;
    
    // Flavor-specific production cost
    const flavorCost = actualUnits * flavor.productionCost * 0.3; // additional flavoring cost
    finance.materialCosts += flavorCost;
  }
  
  // Store produced units for sales phase
  (state as any)._producedThisWeek = totalProduced;
  
  return { totalProduced };
}

/** Sales system — distributes products through channels */
function runSales(state: GameState, finance: WeeklyFinances, availableUnits: number): { totalSold: number } {
  let totalSold = 0;
  let totalRevenue = 0;
  
  // Get sales effectiveness from employees
  const salesPerson = state.employees.find(e => e.isHired && e.role === 'sales_negotiator');
  const marketingPerson = state.employees.find(e => e.isHired && e.role === 'marketing_director');
  
  const salesBonus = salesPerson ? salesPerson.skills.negotiation / 100 : 0.2;
  const marketingBonus = marketingPerson ? marketingPerson.skills.creativity / 100 : 0.2;
  
  // Base price per unit
  const baseUnitPrice = 4.50; // PLN per 150g bag
  
  // Distribute to channels with contracts
  for (const channel of state.salesChannels) {
    if (!channel.currentContract) continue;
    
    const contract = channel.currentContract;
    
    // Calculate demand for this channel
    let demand = contract.weeklyVolume;
    
    // Apply bonuses
    demand = Math.round(demand * (1 + salesBonus * 0.2) * (1 + marketingBonus * 0.15));
    
    // Reputation factor
    const repFactor = 0.5 + (state.reputation.overall / 100) * 0.5;
    demand = Math.round(demand * repFactor);
    
    // Flavor popularity factor (average of unlocked flavors)
    const avgPopularity = state.flavors
      .filter(f => f.isUnlocked)
      .reduce((sum, f) => sum + f.popularity, 0) / Math.max(state.flavors.filter(f => f.isUnlocked).length, 1);
    const flavorFactor = 0.6 + (avgPopularity / 100) * 0.4;
    demand = Math.round(demand * flavorFactor);
    
    // Quality factor
    const avgQuality = state.flavors
      .filter(f => f.isUnlocked)
      .reduce((sum, f) => sum + f.qualityLevel, 0) / Math.max(state.flavors.filter(f => f.isUnlocked).length, 1);
    const qualityFactor = 0.8 + (avgQuality / 5) * 0.2;
    demand = Math.round(demand * qualityFactor);
    
    // Can't sell more than available
    const unitsToSell = Math.min(demand, Math.max(0, availableUnits - totalSold));
    
    if (unitsToSell <= 0) continue;
    
    // Calculate revenue
    const unitPrice = baseUnitPrice * (1 + (contract.agreedMargin / 100));
    const revenue = unitsToSell * unitPrice;
    
    totalSold += unitsToSell;
    totalRevenue += revenue;
    channel.weeklySales = unitsToSell;
    channel.totalSales += unitsToSell;
    
    // Decrement contract
    contract.weeksRemaining--;
    contract.renegotiableIn = Math.max(0, contract.renegotiableIn - 1);
  }
  
  // Expire finished contracts
  for (const channel of state.salesChannels) {
    if (channel.currentContract && channel.currentContract.weeksRemaining <= 0) {
      channel.currentContract = null;
    }
  }
  
  finance.revenue = Math.round(totalRevenue);
  
  return { totalSold };
}

/** Event generation — weighted random selection */
function generateRandomEvents(state: GameState, week: number): GameEvent[] {
  const events: GameEvent[] = [];
  
  // Base probability: ~30% chance of at least one event per week
  const eventRoll = Math.random();
  if (eventRoll > 0.30) return events;
  
  // Calculate weights
  const totalWeight = EVENT_TEMPLATES.reduce((sum, t) => sum + t.weight, 0);
  let roll = Math.random() * totalWeight;
  
  let selected = null;
  for (const template of EVENT_TEMPLATES) {
    roll -= template.weight;
    if (roll <= 0) {
      selected = template;
      break;
    }
  }
  
  if (!selected) return events;
  
  // Don't repeat the same event type too often
  const recentSameType = state.eventHistory.filter(e => e.type === selected!.type && week - e.week < 4).length;
  if (recentSameType >= 2) return events;
  
  // Some events require minimum week
  if (selected.severity === 'high' && week < 5) return events;
  
  const event: GameEvent = {
    id: `evt-${week}-${crypto.randomUUID()}`,
    title: selected.title,
    description: selected.description,
    type: selected.type,
    week,
    effects: selected.effects.map(e => ({ ...e })),
    resolved: false,
    severity: selected.severity,
  };
  
  events.push(event);
  
  return events;
}

/** Apply an event effect to game state */
function applyEventEffect(state: GameState, finance: WeeklyFinances, effect: { target: string; value: number; operation: string }) {
  switch (effect.target) {
    case 'cash':
      if (effect.value < 0) {
        finance.eventCosts += Math.abs(effect.value);
      } else {
        finance.eventIncome += effect.value;
      }
      break;
    
    case 'rawMaterials.potatoes.priceTrend':
      state.rawMaterials[0].priceTrend = applyOp(state.rawMaterials[0].priceTrend, effect.value, effect.operation);
      break;
    
    case 'rawMaterials.oil.priceTrend':
      state.rawMaterials[1].priceTrend = applyOp(state.rawMaterials[1].priceTrend, effect.value, effect.operation);
      break;
    
    case 'rawMaterials.packaging.priceTrend':
      state.rawMaterials[3].priceTrend = applyOp(state.rawMaterials[3].priceTrend, effect.value, effect.operation);
      break;
    
    case 'reputation.overall':
      state.reputation.overall = Math.max(0, Math.min(100, applyOp(state.reputation.overall, effect.value, effect.operation)));
      break;
    
    case 'reputation.quality':
      state.reputation.quality = Math.max(0, Math.min(100, applyOp(state.reputation.quality, effect.value, effect.operation)));
      break;
    
    case 'reputation.brandAwareness':
      state.reputation.brandAwareness = Math.max(0, Math.min(100, applyOp(state.reputation.brandAwareness, effect.value, effect.operation)));
      break;
    
    case 'reputation.customerLoyalty':
      state.reputation.customerLoyalty = Math.max(0, Math.min(100, applyOp(state.reputation.customerLoyalty, effect.value, effect.operation)));
      break;
    
    case 'salesChannels':
      // Multiplier on all channel sales — applied via temporary boost
      for (const ch of state.salesChannels) {
        if (ch.currentContract) {
          ch.currentContract.weeklyVolume = Math.round(applyOp(ch.currentContract.weeklyVolume, effect.value, effect.operation));
        }
      }
      break;
    
    case 'productionLines.0.isActive':
      if (state.productionLines[0]) {
        state.productionLines[0].isActive = effect.value !== 0;
        state.productionLines[0].maintenanceLevel = Math.min(state.productionLines[0].maintenanceLevel, 20);
      }
      break;
  }
}

function applyOp(current: number, value: number, operation: string): number {
  switch (operation) {
    case 'add': return current + value;
    case 'multiply': return current * value;
    case 'set': return value;
    default: return current;
  }
}

/** Adjust employee morale based on company performance */
function adjustEmployeeMorale(state: GameState, finance: WeeklyFinances) {
  const profit = finance.netProfit;
  const moraleChange = profit > 5000 ? 2 : profit > 0 ? 1 : profit > -5000 ? -1 : -3;
  
  // Management bonus reduces morale loss
  const manager = state.employees.find(e => e.isHired && e.role === 'production_director');
  const managementBonus = manager ? manager.skills.management / 200 : 0; // 0-0.5 reduction in morale loss
  
  for (const emp of state.employees) {
    if (!emp.isHired) continue;
    
    const adjustedChange = moraleChange < 0 
      ? Math.round(moraleChange * (1 - managementBonus)) 
      : moraleChange;
    
    emp.morale = Math.max(0, Math.min(100, emp.morale + adjustedChange));
  }
}

function createEmptyFinance(week: number): WeeklyFinances {
  return {
    week,
    revenue: 0,
    materialCosts: 0,
    salaryCosts: 0,
    maintenanceCosts: 0,
    marketingCosts: 0,
    rndCosts: 0,
    otherCosts: 0,
    taxAmount: 0,
    netProfit: 0,
    eventCosts: 0,
    eventIncome: 0,
  };
}
