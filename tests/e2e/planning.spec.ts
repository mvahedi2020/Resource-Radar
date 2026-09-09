import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('./')
  await page.getByRole('button', { name: 'Reset sample' }).first().click()
})

test('edits, applies, and compares a resource scenario', async ({ page }) => {
  const cell = page.getByLabel('Maya Chen, Atlas onboarding, Oct 5 person-days')
  await cell.fill('2')
  await expect(page.getByRole('button', { name: 'Apply draft · 1' })).toBeEnabled()
  await page.getByRole('button', { name: 'Apply draft · 1' }).click()
  await expect(page.getByRole('button', { name: 'Applied' })).toBeVisible()

  await page.getByRole('link', { name: 'Scenarios' }).click()
  await expect(page).toHaveURL(/#scenarios$/)
  await expect(page.getByText('No uncommitted allocation edits.')).toBeVisible()
})

test('reports a no-results search state and recovers', async ({ page }) => {
  await page.getByPlaceholder('Find a team member').fill('nobody matches')
  await expect(page.getByRole('heading', { name: 'No team members found' })).toBeVisible()
  await page.getByRole('button', { name: 'Clear search' }).click()
  await expect(page.getByText('Maya Chen')).toBeVisible()
})
