import { expect, test } from '@playwright/test'

test('retains apply and undo for restored allocation IDs containing delimiters', async ({ page }) => {
  const baseline = {
    weeks: [{ id: 'w', label: 'Week 1', dates: 'Oct 5' }],
    people: [
      { id: 'a:b', name: 'Person A', role: 'PM', initials: 'A', capacity: { w: 5 }, timeOff: { w: 0 }, commitments: { w: 0 } },
      { id: 'a', name: 'Person B', role: 'PM', initials: 'B', capacity: { w: 5 }, timeOff: { w: 0 }, commitments: { w: 0 } },
    ],
    initiatives: [{ id: 'c', name: 'Project C', code: 'C', tone: 'blue' }, { id: 'b:c', name: 'Project BC', code: 'BC', tone: 'green' }],
    allocations: [{ personId: 'a:b', initiativeId: 'c', weekId: 'w', days: 1 }],
  }
  await page.addInitScript((plan) => {
    if (!localStorage.getItem('northstar.resource-radar.plan.v1')) localStorage.setItem('northstar.resource-radar.plan.v1', JSON.stringify({ version: 1, baseline: plan }))
  }, baseline)
  await page.goto('./')
  const cell = page.getByLabel('Person B, Project BC, Week 1 person-days')
  await cell.fill('2')
  await expect(page.getByRole('button', { name: 'Apply draft · 1', exact: true })).toBeEnabled()
  await page.getByRole('button', { name: 'Undo draft', exact: true }).click()
  await expect(cell).toHaveValue('')
  await cell.fill('2')
  await page.getByRole('button', { name: 'Apply draft · 1', exact: true }).click()
  await page.reload()
  await expect(cell).toHaveValue('2')
  await expect(page.getByRole('alert')).toHaveCount(0)
  await expect(page.getByLabel('Person A, Project C, Week 1 person-days')).toHaveValue('1')
})

test('undoing an exported draft clears its old completion notice', async ({ page }) => {
  await page.goto('./')
  await page.getByLabel('Maya Chen, Atlas onboarding, Oct 5 person-days').fill('2')
  await page.getByRole('button', { name: 'Export draft', exact: true }).click()
  await expect(page.getByRole('status')).toContainText('1 draft change exported')
  await page.getByRole('button', { name: 'Undo draft', exact: true }).click()
  await expect(page.getByRole('status')).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Apply draft', exact: true })).toBeDisabled()
})
