import { expect, it } from 'vitest'
import { samplePlan } from './data'
import { getLoad, initiativeImpact, setAllocation } from './logic'

it('flags work assigned to a person with zero availability', () => {
  const person = { ...samplePlan.people[0], capacity: { w1: 0 }, timeOff: {}, commitments: {} }
  const initiative = samplePlan.initiatives[0]
  const plan = { ...samplePlan, people: [person], allocations: [{ personId: person.id, initiativeId: initiative.id, weekId: 'w1', days: 1 }] }

  expect(initiativeImpact(plan, initiative).atRisk).toBe(true)
})

it('does not turn time off into availability when the seeded allocation is removed', () => {
  const noah = samplePlan.people.find((person) => person.id === 'noah')!
  const signal = samplePlan.initiatives.find((initiative) => initiative.id === 'signal')!
  const edited = setAllocation(samplePlan, 'noah', 'signal', 'sep28', 0)

  expect(getLoad(noah, 'sep28', edited.allocations)).toMatchObject({ available: 0, allocated: 0, status: 'unavailable' })
  expect(initiativeImpact(edited, signal).atRisk).toBe(true)
})
