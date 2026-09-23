import { expect, test } from '@playwright/test'

test('draft edits stay separate until applied and survive refresh after apply', async ({ page }) => {
  await page.goto('./')
  const allocation = page.getByLabel('Maya Chen, Atlas onboarding, Sep 14 person-days')
  await expect(allocation).toHaveValue('3')
  await allocation.fill('4')
  await expect(page.getByRole('button', { name: /Apply draft · 1/ })).toBeEnabled()
  await page.getByRole('link', { name: 'Scenarios' }).click()
  await expect(page.getByText('Draft edits: 1 allocation cell; 0 availability cells.')).toBeVisible()
  await page.getByRole('link', { name: 'Plan', exact: true }).click()
  await page.getByRole('button', { name: /Apply draft · 1/ }).click()
  await page.reload()
  await expect(page.getByLabel('Maya Chen, Atlas onboarding, Sep 14 person-days')).toHaveValue('4')
  await expect(page.getByRole('button', { name: 'Apply draft', exact: true })).toBeDisabled()
})

test('zero availability remains visible as a conflict and initiative risk', async ({ page }) => {
  await page.goto('./')
  await expect(page.getByLabel('Noah Williams, Sep 28: 1 assigned of 0 available days')).toBeVisible()
  await expect(page.getByText('Capacity risk').last()).toBeVisible()
})
