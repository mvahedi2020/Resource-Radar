import type { Allocation, Initiative, LoadCell, Person, Plan } from './types'

export function getLoad(person: Person, weekId: string, allocations: Allocation[]): LoadCell {
  const capacity = person.capacity[weekId] ?? 0
  const unavailable = (person.timeOff[weekId] ?? 0) + (person.commitments[weekId] ?? 0)
  const available = Math.max(0, capacity - unavailable)
  const allocated = allocations.filter((a) => a.personId === person.id && a.weekId === weekId).reduce((sum, a) => sum + a.days, 0)
  const balance = available - allocated
  const status = available === 0 ? 'unavailable' : balance < 0 ? 'overloaded' : balance === 0 ? 'full' : 'open'
  return { capacity, unavailable, available, allocated, balance, status }
}

export function setAllocation(plan: Plan, personId: string, initiativeId: string, weekId: string, days: number): Plan {
  const allocations = plan.allocations.filter((a) => !(a.personId === personId && a.initiativeId === initiativeId && a.weekId === weekId))
  if (days > 0) allocations.push({ personId, initiativeId, weekId, days: Math.max(0, Math.min(10, days)) })
  return { ...plan, allocations }
}

export function setConstraint(plan: Plan, personId: string, weekId: string, field: 'timeOff' | 'commitments', days: number): Plan {
  return {
    ...plan,
    people: plan.people.map((person) => person.id === personId ? {
      ...person,
      [field]: { ...person[field], [weekId]: Math.max(0, Math.min(person.capacity[weekId] ?? 0, days)) },
    } : person),
  }
}

export function initiativeImpact(plan: Plan, initiative: Initiative) {
  const total = plan.allocations.filter((a) => a.initiativeId === initiative.id).reduce((sum, a) => sum + a.days, 0)
  const atRisk = plan.allocations.some((a) => a.initiativeId === initiative.id && getLoad(plan.people.find((p) => p.id === a.personId)!, a.weekId, plan.allocations).balance < 0)
  return { total, atRisk }
}

export function changedCells(baseline: Plan, draft: Plan): number {
  const value = (plan: Plan, key: string) => plan.allocations.find((a) => `${a.personId}:${a.initiativeId}:${a.weekId}` === key)?.days ?? 0
  const keys = new Set([...baseline.allocations, ...draft.allocations].map((a) => `${a.personId}:${a.initiativeId}:${a.weekId}`))
  const allocationChanges = [...keys].filter((key) => value(baseline, key) !== value(draft, key)).length
  const constraintChanges = draft.people.reduce((count, person) => {
    const original = baseline.people.find((item) => item.id === person.id)
    if (!original) return count + 1
    return count + draft.weeks.filter((week) =>
      person.timeOff[week.id] !== original.timeOff[week.id] || person.commitments[week.id] !== original.commitments[week.id],
    ).length
  }, 0)
  return allocationChanges + constraintChanges
}
