import { describe, expect, it } from 'vitest'
import { samplePlan } from './data'
import { changedCells, getLoad, initiativeImpact, setAllocation, setConstraint } from './logic'

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

  it('updates constraints without mutating the original plan', () => {
    const edited = setConstraint(samplePlan, 'maya', 'sep14', 'timeOff', 2)
    expect(edited.people[0].timeOff.sep14).toBe(2)
    expect(samplePlan.people[0].timeOff.sep14).toBe(0)
    expect(getLoad(edited.people[0], 'sep14', edited.allocations).available).toBe(2)
    expect(changedCells(samplePlan, edited)).toBe(1)
  })
})
