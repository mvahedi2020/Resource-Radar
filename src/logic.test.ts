import { describe, expect, it } from 'vitest'
import { samplePlan } from './data'
import { changedCells, getLoad, initiativeImpact, isPlan, planChangeSummary, setAllocation, setConstraint } from './logic'

describe('resource plan calculations', () => {
  it('subtracts time off and commitments before judging load', () => {
    const noah = samplePlan.people.find((person) => person.id === 'noah')!
    expect(getLoad(noah, 'sep28', samplePlan.allocations)).toEqual({ capacity: 5, unavailable: 5, available: 0, allocated: 1, balance: -1, status: 'unavailable' })
  })

  it('flags an initiative when one of its allocations overloads a person', () => {
    const signal = samplePlan.initiatives.find((initiative) => initiative.id === 'signal')!
    expect(initiativeImpact(samplePlan, signal).atRisk).toBe(true)
  })

  it('adds, clamps, and compares draft allocation edits', () => {
    const edited = setAllocation(samplePlan, 'maya', 'atlas', 'oct05', 12)
    expect(edited.allocations.find((a) => a.personId === 'maya' && a.initiativeId === 'atlas' && a.weekId === 'oct05')?.days).toBe(10)
    expect(changedCells(samplePlan, edited)).toBe(1)
  })

  it('normalizes planning inputs to the stated half-day unit', () => {
    const allocation = setAllocation(samplePlan, 'maya', 'atlas', 'oct05', 1.26)
    const constraint = setConstraint(samplePlan, 'maya', 'sep14', 'timeOff', 1.26)
    expect(allocation.allocations.find((item) => item.personId === 'maya' && item.initiativeId === 'atlas' && item.weekId === 'oct05')?.days).toBe(1.5)
    expect(constraint.people[0].timeOff.sep14).toBe(1.5)
    expect(setConstraint(samplePlan, 'maya', 'sep14', 'timeOff', Number.NaN).people[0].timeOff.sep14).toBe(0)
  })

  it('updates constraints without mutating the original plan', () => {
    const edited = setConstraint(samplePlan, 'maya', 'sep14', 'timeOff', 2)
    expect(edited.people[0].timeOff.sep14).toBe(2)
    expect(samplePlan.people[0].timeOff.sep14).toBe(0)
    expect(getLoad(edited.people[0], 'sep14', edited.allocations).available).toBe(2)
    expect(changedCells(samplePlan, edited)).toBe(1)
  })

  it('separates allocation edits from availability edits in a draft summary', () => {
    const withAllocation = setAllocation(samplePlan, 'maya', 'atlas', 'oct05', 2)
    const withAvailability = setConstraint(setConstraint(withAllocation, 'maya', 'sep14', 'timeOff', 2), 'maya', 'sep14', 'commitments', 2)
    expect(planChangeSummary(samplePlan, withAvailability)).toEqual({ allocationCells: 1, constraintCells: 1, total: 2 })
  })

  it('accepts a complete plan and rejects malformed saved planning data', () => {
    expect(isPlan(samplePlan)).toBe(true)
    expect(isPlan({ ...samplePlan, people: [{ id: 'maya' }] })).toBe(false)
    expect(isPlan({ ...samplePlan, allocations: [{ personId: 'unknown', initiativeId: 'atlas', weekId: 'sep14', days: 1 }] })).toBe(false)
    expect(isPlan({ ...samplePlan, allocations: [{ personId: 'maya', initiativeId: 'atlas', weekId: 'sep14', days: Number.NaN }] })).toBe(false)
    expect(isPlan({ ...samplePlan, people: [{ ...samplePlan.people[0], capacity: { sep14: 5 } }, ...samplePlan.people.slice(1)] })).toBe(false)
    expect(isPlan({ ...samplePlan, people: [{ ...samplePlan.people[0], capacity: { ...samplePlan.people[0].capacity, staleWeek: 0 } }, ...samplePlan.people.slice(1)] })).toBe(false)
    expect(isPlan({ ...samplePlan, allocations: [...samplePlan.allocations, samplePlan.allocations[0]] })).toBe(false)
    expect(isPlan({ ...samplePlan, allocations: [{ ...samplePlan.allocations[0], days: 1.25 }] })).toBe(false)
    expect(isPlan({ ...samplePlan, people: [{ ...samplePlan.people[0], timeOff: { ...samplePlan.people[0].timeOff, sep14: 1.25 } }, ...samplePlan.people.slice(1)] })).toBe(false)
    expect(isPlan({ ...samplePlan, people: [{ ...samplePlan.people[0], name: ' ' }, ...samplePlan.people.slice(1)] })).toBe(false)
    expect(isPlan({ ...samplePlan, people: [samplePlan.people[0], { ...samplePlan.people[1], id: ` ${samplePlan.people[0].id.toUpperCase()} ` }, ...samplePlan.people.slice(2)] })).toBe(false)
  })
})
