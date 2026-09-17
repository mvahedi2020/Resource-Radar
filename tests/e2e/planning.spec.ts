import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('./')
  await page.getByRole('button', { name: 'Reset sample' }).first().click()
  await page.getByRole('dialog').getByRole('button', { name: 'Reset sample data' }).click()
})

test('confirms a reset and restores both baseline and draft from its recovery snapshot', async ({ page }) => {
  const cell = page.getByLabel('Maya Chen, Atlas onboarding, Oct 5 person-days')
  await cell.fill('2')
  await page.getByRole('button', { name: 'Apply draft · 1' }).click()
  await cell.fill('3')
  await page.getByRole('link', { name: 'Scenarios' }).click()
  await page.getByRole('button', { name: 'Reset sample data' }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.getByRole('dialog').getByRole('button', { name: 'Reset sample data' }).click()
  await expect(page.getByRole('button', { name: 'Undo reset and restore the prior scenario' })).toBeVisible()
  await page.getByRole('button', { name: 'Undo reset and restore the prior scenario' }).click()
  await page.getByRole('link', { name: 'Plan', exact: true }).click()
  await expect(cell).toHaveValue('3')
  await page.reload()
  await expect(cell).toHaveValue('2')
})

test('keeps keyboard focus inside the reset confirmation', async ({ page }) => {
  await page.getByRole('button', { name: 'Reset sample' }).first().click()
  const dialog = page.getByRole('dialog')
  const cancel = dialog.getByRole('button', { name: 'Keep current plan' })
  const confirm = dialog.getByRole('button', { name: 'Reset sample data' })
  await expect(cancel).toBeFocused()
  await page.keyboard.press('Shift+Tab')
  await expect(confirm).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(cancel).toBeFocused()
})

test('edits, applies, and compares a resource scenario', async ({ page }) => {
  const cell = page.getByLabel('Maya Chen, Atlas onboarding, Oct 5 person-days')
  await cell.fill('2')
  await expect(page.getByRole('button', { name: 'Apply draft · 1' })).toBeEnabled()
  await page.getByRole('button', { name: 'Apply draft · 1' }).click()
  await expect(page.getByRole('button', { name: 'Applied' })).toBeVisible()

  await page.getByRole('link', { name: 'Scenarios' }).click()
  await expect(page).toHaveURL(/#scenarios$/)
  await expect(page.getByText('No uncommitted planning edits.')).toBeVisible()
})

test('keeps Noah unavailable when a zero-value draft allocation is cleared', async ({ page }) => {
  const signal = page.getByLabel('Noah Williams, Signal accounts, Sep 28 person-days')
  await expect(signal).toHaveValue('1')
  await signal.fill('')
  await expect(signal).toHaveValue('')
  await expect(page.getByLabel('Noah Williams, Sep 28: 0 assigned of 0 available days')).toBeVisible()
  await expect(page.getByText('Capacity risk').first()).toBeVisible()

  await page.reload()
  await expect(signal).toHaveValue('1')
})

test('keeps allocation edits on half-day planning increments', async ({ page }) => {
  const cell = page.getByLabel('Maya Chen, Atlas onboarding, Oct 5 person-days')
  await cell.fill('1.26')
  await expect(cell).toHaveValue('1.5')
})

test('reports a no-results search state and recovers', async ({ page }) => {
  await page.getByPlaceholder('Find a team member').fill('nobody matches')
  await expect(page.getByRole('heading', { name: 'No team members found' })).toBeVisible()
  await page.getByRole('button', { name: 'Clear search' }).click()
  await expect(page.getByText('Maya Chen')).toBeVisible()
})
