<script lang="ts">
  import { gameStore } from '$lib/stores/gameStore.svelte';
  import { ROLE_LABELS } from '$lib/types';
  import type { Employee, JobCandidate, TrainingFocus, EmployeeRole } from '$lib/types';
  import { Users, GraduationCap, UserMinus, UserPlus, TrendingUp, Wallet } from 'lucide-svelte';

  // Local UI state
  let trainingOpenFor = $state<string | null>(null);
  let selectedSkill = $state<TrainingFocus>('efficiency');
  let fireConfirmFor = $state<string | null>(null);
  let salaryEditFor = $state<string | null>(null);
  let newSalary = $state<number>(0);

  const skillLabels: Record<TrainingFocus, string> = {
    efficiency: 'Efektywność',
    creativity: 'Kreatywność',
    negotiation: 'Negocjacje',
    management: 'Zarządzanie',
    experience: 'Doświadczenie',
  };

  const hiredEmployees = $derived(gameStore.state.employees.filter(e => e.isHired));
  const candidates = $derived(gameStore.candidates);

  function getSkillColor(value: number): string {
    if (value >= 80) return 'bg-green-500';
    if (value >= 60) return 'bg-primary-500';
    if (value >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  }

  function getMoraleColor(morale: number): string {
    if (morale >= 70) return 'badge-green';
    if (morale >= 40) return 'badge-yellow';
    return 'badge-red';
  }

  function getMoraleLabel(morale: number): string {
    if (morale >= 70) return 'Wysokie';
    if (morale >= 40) return 'Średnie';
    return 'Niskie';
  }

  function openTraining(emp: Employee) {
    trainingOpenFor = emp.id;
    selectedSkill = 'efficiency';
  }

  function confirmTraining(empId: string) {
    gameStore.trainEmployee(empId, selectedSkill);
    trainingOpenFor = null;
  }

  function getInitials(first: string, last: string): string {
    return `${first[0]}${last[0]}`.toUpperCase();
  }

  function getRoleColor(role: EmployeeRole): string {
    switch (role) {
      case 'production_director': return 'bg-blue-900/50 text-blue-400 border-blue-700';
      case 'rd_director': return 'bg-purple-900/50 text-purple-400 border-purple-700';
      case 'marketing_director': return 'bg-pink-900/50 text-pink-400 border-pink-700';
      case 'logistics_manager': return 'bg-orange-900/50 text-orange-400 border-orange-700';
      case 'sales_negotiator': return 'bg-green-900/50 text-green-400 border-green-700';
      default: return 'bg-gray-800 text-gray-400 border-gray-700';
    }
  }
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-3">
      <Users size={24} class="text-primary-400" />
      <div>
        <h1 class="section-title mb-0">Personel</h1>
        <p class="text-sm text-gray-500">Zarządzaj zespołem, szkol i rekrutuj</p>
      </div>
    </div>
    <div class="text-right">
      <p class="text-sm text-gray-400">Pensje tygodniowe:</p>
      <p class="text-lg font-bold text-primary-400">{gameStore.weeklySalaryCost.toLocaleString('pl-PL')} PLN</p>
    </div>
  </div>

  <!-- Current Employees -->
  <div class="card">
    <div class="flex items-center justify-between mb-4">
      <h2 class="font-semibold text-gray-100 flex items-center gap-2">
        <Users size={18} />
        Obecni Pracownicy ({hiredEmployees.length})
      </h2>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr>
            <th class="table-header">Pracownik</th>
            <th class="table-header">Stanowisko</th>
            <th class="table-header">Umiejętności</th>
            <th class="table-header">Morale</th>
            <th class="table-header">Pensja</th>
            <th class="table-header">Akcje</th>
          </tr>
        </thead>
        <tbody>
          {#each hiredEmployees as emp}
            <tr class="table-row">
              <!-- Name -->
              <td class="table-cell">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-full bg-primary-800 flex items-center justify-center text-sm font-bold text-primary-300">
                    {getInitials(emp.firstName, emp.lastName)}
                  </div>
                  <div>
                    <p class="font-medium text-gray-200">{emp.firstName} {emp.lastName}</p>
                    <p class="text-xs text-gray-500">Od tygodnia {emp.hiredWeek}</p>
                  </div>
                </div>
              </td>

              <!-- Role -->
              <td class="table-cell">
                <span class="badge {getRoleColor(emp.role)}">{ROLE_LABELS[emp.role]}</span>
              </td>

              <!-- Skills -->
              <td class="table-cell">
                <div class="space-y-1 w-48">
                  {#each Object.entries(emp.skills) as [skill, value]}
                    <div class="flex items-center gap-2">
                      <span class="text-[10px] text-gray-500 w-20 truncate">{skillLabels[skill as TrainingFocus]}</span>
                      <div class="flex-1 progress-bar h-1.5">
                        <div class="progress-fill {getSkillColor(value)} h-1.5" style="width: {value}%"></div>
                      </div>
                      <span class="text-[10px] text-gray-400 w-6 text-right">{value}</span>
                    </div>
                  {/each}
                </div>
              </td>

              <!-- Morale -->
              <td class="table-cell">
                <span class="{getMoraleColor(emp.morale)}">{getMoraleLabel(emp.morale)} ({emp.morale})</span>
                <div class="progress-bar h-1 mt-1 w-20">
                  <div class="progress-fill {emp.morale >= 70 ? 'bg-green-500' : emp.morale >= 40 ? 'bg-yellow-500' : 'bg-red-500'} h-1" style="width: {emp.morale}%"></div>
                </div>
              </td>

              <!-- Salary -->
              <td class="table-cell">
                {#if salaryEditFor === emp.id}
                  <div class="flex items-center gap-1">
                    <input type="number" class="input-field w-20 text-xs py-1" bind:value={newSalary} />
                    <button class="text-green-400 hover:text-green-300 text-xs" onclick={() => { gameStore.changeSalary(emp.id, newSalary); salaryEditFor = null; }}>OK</button>
                    <button class="text-gray-500 hover:text-gray-300 text-xs" onclick={() => salaryEditFor = null}>X</button>
                  </div>
                {:else}
                  <button class="text-gray-300 hover:text-primary-400 text-sm" onclick={() => { salaryEditFor = emp.id; newSalary = emp.salary; }}>
                    {emp.salary.toLocaleString('pl-PL')} PLN
                  </button>
                {/if}
              </td>

              <!-- Actions -->
              <td class="table-cell">
                <div class="flex items-center gap-1">
                  {#if trainingOpenFor === emp.id}
                    <div class="flex items-center gap-1 bg-dark-800 p-1 rounded">
                      <select class="input-field text-xs py-1 w-28" bind:value={selectedSkill}>
                        {#each Object.entries(skillLabels) as [key, label]}
                          <option value={key}>{label}</option>
                        {/each}
                      </select>
                      <button class="btn-success text-xs py-1 px-2" onclick={() => confirmTraining(emp.id)}>Szkol</button>
                      <button class="btn-secondary text-xs py-1 px-2" onclick={() => trainingOpenFor = null}>X</button>
                    </div>
                  {:else}
                    <button class="btn-secondary text-xs py-1 px-2 flex items-center gap-1" onclick={() => openTraining(emp)}>
                      <GraduationCap size={12} />
                      Szkol
                    </button>
                  {/if}

                  {#if fireConfirmFor === emp.id}
                    <div class="flex items-center gap-1">
                      <span class="text-xs text-red-400">Na pewno?</span>
                      <button class="btn-danger text-xs py-1 px-2" onclick={() => { gameStore.fireEmployee(emp.id); fireConfirmFor = null; }}>Tak</button>
                      <button class="btn-secondary text-xs py-1 px-2" onclick={() => fireConfirmFor = null}>Nie</button>
                    </div>
                  {:else}
                    <button class="btn-danger text-xs py-1 px-2 flex items-center gap-1" onclick={() => fireConfirmFor = emp.id}>
                      <UserMinus size={12} />
                    </button>
                  {/if}
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Job Candidates -->
  <div class="card">
    <div class="flex items-center justify-between mb-4">
      <h2 class="font-semibold text-gray-100 flex items-center gap-2">
        <UserPlus size={18} class="text-green-400" />
        Kandydaci do Zatrudnienia
      </h2>
      <button class="btn-secondary text-xs" onclick={() => gameStore.generateNewCandidates()}>
        Odśwież listę
      </button>
    </div>

    {#if candidates.length === 0}
      <p class="text-sm text-gray-500 text-center py-6">Brak dostępnych kandydatów. Kliknij "Odśwież listę".</p>
    {:else}
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr>
              <th class="table-header">Kandydat</th>
              <th class="table-header">Stanowisko</th>
              <th class="table-header">Umiejętności (śr.)</th>
              <th class="table-header">Oczekiwane wynagrodzenie</th>
              <th class="table-header">Dostępny do</th>
              <th class="table-header">Akcja</th>
            </tr>
          </thead>
          <tbody>
            {#each candidates as cand}
              {@const avgSkill = Math.round((cand.skills.efficiency + cand.skills.creativity + cand.skills.negotiation + cand.skills.management + cand.skills.experience) / 5)}
              {@const canAfford = gameStore.state.cash >= cand.salaryExpectation * 4}
              <tr class="table-row {canAfford ? '' : 'opacity-50'}">
                <td class="table-cell">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-dark-700 flex items-center justify-center text-xs font-bold text-gray-400">
                      {getInitials(cand.firstName, cand.lastName)}
                    </div>
                    <span class="font-medium text-gray-200">{cand.firstName} {cand.lastName}</span>
                  </div>
                </td>
                <td class="table-cell">
                  <span class="badge {getRoleColor(cand.role)}">{ROLE_LABELS[cand.role]}</span>
                </td>
                <td class="table-cell">
                  <div class="flex items-center gap-2">
                    <div class="progress-bar w-20 h-2">
                      <div class="progress-fill {getSkillColor(avgSkill)} h-2" style="width: {avgSkill}%"></div>
                    </div>
                    <span class="text-xs text-gray-400">{avgSkill}</span>
                  </div>
                </td>
                <td class="table-cell font-medium text-gray-200">
                  {cand.salaryExpectation.toLocaleString('pl-PL')} PLN
                </td>
                <td class="table-cell text-gray-400">
                  Tydzień {cand.availableUntil}
                </td>
                <td class="table-cell">
                  <button class="btn-success text-xs py-1 px-3" disabled={!canAfford} onclick={() => gameStore.hireCandidate(cand)}>
                    Zatrudnij
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      <p class="text-xs text-gray-500 mt-3">* Wymagane jest posiadanie 4-krotności tygodniowego wynagrodzenia w gotówce.</p>
    {/if}
  </div>
</div>
