import type { Allocation, Initiative, LoadCell, Person, Plan } from './types'

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value)
const isFiniteNumber = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value)
const hasText = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0
const isHalfDay = (value: number) => Number.isInteger(value * 2)
const hasWeekValues = (value: unknown, weekIds: Set<string>, maximum?: Record<string, number>): value is Record<string, number> => isRecord(value) && Object.keys(value).length === weekIds.size && Object.keys(value).every((weekId) => weekIds.has(weekId)) && [...weekIds].every((weekId) => {
  const days = value[weekId]
  return isFiniteNumber(days) && isHalfDay(days) && days >= 0 && (maximum === undefined || days <= maximum[weekId])
})
const halfDay = (days: number, maximum: number) => Number.isFinite(days) ? Math.min(maximum, Math.max(0, Math.round(days * 2) / 2)) : 0

export function isPlan(value: unknown): value is Plan {
  if (!isRecord(value) || !Array.isArray(value.weeks) || !Array.isArray(value.initiatives) || !Array.isArray(value.people) || !Array.isArray(value.allocations)) return false
  const weeks = value.weeks
  const initiatives = value.initiatives
  const people = value.people
  if (!weeks.every((week) => isRecord(week) && hasText(week.id) && hasText(week.label) && hasText(week.dates))) return false
  if (!initiatives.every((initiative) => isRecord(initiative) && hasText(initiative.id) && hasText(initiative.name) && hasText(initiative.code) && hasText(initiative.tone))) return false
  const weekIds = new Set(weeks.map((week) => week.id))
  const initiativeIds = new Set(initiatives.map((initiative) => initiative.id))
  if (!people.every((person) => isRecord(person) && hasText(person.id) && hasText(person.name) && hasText(person.role) && hasText(person.initials) && hasWeekValues(person.capacity, weekIds) && hasWeekValues(person.timeOff, weekIds, person.capacity) && hasWeekValues(person.commitments, weekIds, person.capacity))) return false
  const peopleById = new Map(people.map((person) => [person.id, person]))
  const normalizedWeekIds = new Set(weeks.map((week) => week.id.trim().toLowerCase()))
  const normalizedInitiativeIds = new Set(initiatives.map((initiative) => initiative.id.trim().toLowerCase()))
  const normalizedInitiativeCodes = new Set(initiatives.map((initiative) => initiative.code.trim().toLowerCase()))
  const normalizedPeopleIds = new Set(people.map((person) => person.id.trim().toLowerCase()))
  if (weekIds.size !== weeks.length || initiativeIds.size !== initiatives.length || peopleById.size !== people.length || normalizedWeekIds.size !== weeks.length || normalizedInitiativeIds.size !== initiatives.length || normalizedInitiativeCodes.size !== initiatives.length || normalizedPeopleIds.size !== people.length) return false

  const allocationKeys = new Set<string>()
  return value.allocations.every((allocation) => {
    if (!isRecord(allocation) || typeof allocation.personId !== 'string' || typeof allocation.initiativeId !== 'string' || typeof allocation.weekId !== 'string' || !isFiniteNumber(allocation.days)) return false
    const person = peopleById.get(allocation.personId)
    const key = `${allocation.personId}:${allocation.initiativeId}:${allocation.weekId}`
    if (allocationKeys.has(key)) return false
    allocationKeys.add(key)
    return Boolean(person) && initiativeIds.has(allocation.initiativeId) && weekIds.has(allocation.weekId) && isHalfDay(allocation.days) && allocation.days > 0 && allocation.days <= 10
  })
}

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
  const normalized = halfDay(days, 10)
  if (normalized > 0) allocations.push({ personId, initiativeId, weekId, days: normalized })
  return { ...plan, allocations }
}

export function setConstraint(plan: Plan, personId: string, weekId: string, field: 'timeOff' | 'commitments', days: number): Plan {
  return {
    ...plan,
    people: plan.people.map((person) => person.id === personId ? {
      ...person,
      [field]: { ...person[field], [weekId]: halfDay(days, person.capacity[weekId] ?? 0) },
    } : person),
  }
}

export function initiativeImpact(plan: Plan, initiative: Initiative) {
  const total = plan.allocations.filter((a) => a.initiativeId === initiative.id).reduce((sum, a) => sum + a.days, 0)
  const atRisk = plan.allocations.some((a) => a.initiativeId === initiative.id && getLoad(plan.people.find((p) => p.id === a.personId)!, a.weekId, plan.allocations).balance < 0)
  return { total, atRisk }
}

export function planChangeSummary(baseline: Plan, draft: Plan) {
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
  return { allocationCells: allocationChanges, constraintCells: constraintChanges, total: allocationChanges + constraintChanges }
}

export function changedCells(baseline: Plan, draft: Plan): number {
  return planChangeSummary(baseline, draft).total
}
