import { expect, test } from '@playwright/test'

test('preserves incompatible saved planning data until confirmed reset', async ({ page }) => {
  const original = JSON.stringify({ version: 2, baseline: { invalid: true } })
  await page.addInitScript((raw) => localStorage.setItem('northstar.resource-radar.plan.v1', raw), original)
  await page.goto('./')

  await expect(page.getByRole('alert')).toContainText('Reset sample data before applying changes')
  await page.getByLabel('Maya Chen, Atlas onboarding, Oct 5 person-days').fill('2')
  await page.getByRole('button', { name: 'Apply draft · 1' }).click()
  await expect(page.getByRole('alert')).toContainText('incompatible')
  expect(await page.evaluate(() => localStorage.getItem('northstar.resource-radar.plan.v1'))).toBe(original)

  await page.getByRole('button', { name: 'Reset sample' }).first().click()
  await page.getByRole('dialog').getByRole('button', { name: 'Reset sample data' }).click()
  await page.getByLabel('Maya Chen, Atlas onboarding, Oct 5 person-days').fill('2')
  await page.getByRole('button', { name: 'Apply draft · 1' }).click()
  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('northstar.resource-radar.plan.v1')!))
  expect(stored.version).toBe(1)
  expect(stored.baseline.allocations).toContainEqual({ personId: 'maya', initiativeId: 'atlas', weekId: 'oct05', days: 2 })
})
