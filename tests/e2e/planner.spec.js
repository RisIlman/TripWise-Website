import { test, expect } from '@playwright/test';
import { sampleTrip, sampleAttraction } from '../fixtures/sampleTrips.js';
import { calculateSummary } from '../../src/domain/summary.js';
import { formatMoney } from '../../src/lib/formatMoney.js';

async function typeWithKeyboard(page, locator, text) {
  await locator.focus(); await page.keyboard.press('ControlOrMeta+A'); await page.keyboard.type(text); await page.keyboard.press('Tab');
}
async function seed(page, trip) {
  await page.addInitScript(value => localStorage.setItem('tripwise:draft:v1', JSON.stringify(value)), trip);
}

test('complete welcome-to-summary path by keyboard, preserving earlier answers', async ({ page }, testInfo) => {
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Welcome to/ })).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath('welcome.png'), fullPage: true });
  await page.getByRole('button', { name: 'Select ASEAN', exact: true }).focus(); await page.keyboard.press('Enter');
  await expect(page.getByRole('combobox', { name: 'Destination region', exact: true })).toHaveValue('ASEAN');
  await page.getByRole('link', { name: /Start planning/ }).press('Enter');
  await page.getByLabel('Destination country').focus();
  for (let index = 0; index < 8; index++) await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Tab');
  await expect(page.getByLabel('Destination country')).toHaveValue('Thailand');
  await page.getByRole('radio', { name: /City-focused/ }).press('Space');
  await expect(page.getByText(/haven’t researched/)).toBeVisible();
  await page.getByRole('button', { name: /Continue/ }).press('Enter');
  await typeWithKeyboard(page, page.getByLabel('Travel days'), '3');
  await typeWithKeyboard(page, page.getByLabel('Total group budget'), '3000');
  await page.getByRole('button', { name: /Continue/ }).press('Enter');
  await page.getByRole('button', { name: /See my estimate/ }).press('Enter');
  await expect(page.getByRole('heading', { name: 'Your trip, in numbers.' })).toBeVisible();
  await page.getByRole('link', { name: /Build my itinerary/ }).press('Enter');
  await typeWithKeyboard(page, page.getByLabel('Attraction name'), 'Evening market');
  await typeWithKeyboard(page, page.getByLabel('Ticket price per person'), '20');
  await page.getByRole('button', { name: /Add attraction/ }).press('Enter');
  await page.getByRole('button', { name: /Build my schedule/ }).press('Enter');
  await expect(page.getByRole('heading', { name: 'Evening market' })).toBeVisible();
  await page.getByRole('link', { name: /See final summary/ }).press('Enter');
  await expect(page.getByRole('heading', { name: 'Thailand, here you come.' })).toBeVisible();
  const expectedTrip = sampleTrip({ days: 3, travelers: 1, budgetRM: 3000, attractions: [sampleAttraction(1, { ticketPriceRMPerPerson: 20, scheduledDay: 1, scheduledSlot: 'Morning' })] });
  await expect(page.locator('.estimate-hero > p')).toHaveText(formatMoney(calculateSummary(expectedTrip).total));
  await page.screenshot({ path: testInfo.outputPath('summary.png'), fullPage: true });
  await page.getByRole('link', { name: 'Edit trip details', exact: true }).press('Enter');
  await expect(page.getByLabel('Travel days')).toHaveValue('3');
  await typeWithKeyboard(page, page.getByLabel('Travellers'), '2');
  await page.getByRole('link', { name: /06\s*Summary/ }).press('Enter');
  await expect(page.locator('.estimate-hero > p')).toHaveText(formatMoney(calculateSummary({ ...expectedTrip, travelers: 2 }).total));
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Thailand, here you come.' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Evening market' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

test('occupied move, shortened trip, rescheduling and removal', async ({ page }) => {
  const trip = sampleTrip({ days: 4, itineraryInitialized: true, attractions: [
    sampleAttraction(1, { name: 'Museum', scheduledDay: 1, scheduledSlot: 'Morning' }),
    sampleAttraction(2, { name: 'Garden', scheduledDay: 1, scheduledSlot: 'Afternoon' }),
    sampleAttraction(3, { name: 'Tower', scheduledDay: 4, scheduledSlot: 'Evening' }),
  ] });
  await seed(page, trip); await page.goto('/plan/itinerary');
  await page.getByRole('button', { name: 'Move Museum', exact: true }).click();
  await page.getByLabel('Move to time').selectOption('Afternoon');
  await page.getByRole('button', { name: 'Save move' }).click();
  await expect(page.getByRole('alert')).toContainText('already taken');
  await page.getByRole('button', { name: 'Cancel', exact: true }).click();
  await page.getByRole('link', { name: /02\s*Trip details/ }).click();
  await page.getByLabel('Travel days').fill('2');
  await page.getByRole('link', { name: /05\s*Itinerary/ }).click();
  await expect(page.locator('.unscheduled-list')).toContainText('Tower');
  await expect(page.locator('.ticket-total strong')).toHaveText('RM 80.00');
  await page.getByRole('button', { name: 'Move Tower', exact: true }).click();
  await page.getByLabel('Move to day').fill('2');
  await page.getByRole('button', { name: 'Save move' }).click();
  await expect(page.locator('.unscheduled-list')).toHaveCount(0);
  await expect(page.locator('.ticket-total strong')).toHaveText('RM 120.00');
  await page.getByRole('button', { name: 'Remove Tower', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Tower', exact: true })).toHaveCount(0);
});

test('non-ASEAN country input, pricing guide return and validation', async ({ page }) => {
  await page.goto('/plan/destination');
  await page.getByLabel('Destination region').selectOption('West Europe');
  await page.getByLabel('Destination country').fill('Malaysia');
  await page.getByRole('radio', { name: /Nature-focused/ }).check();
  await page.getByRole('button', { name: /Continue/ }).click();
  await expect(page.getByText(/Choose a country outside Malaysia/)).toBeVisible();
  await page.getByLabel('Destination country').fill('France');
  await page.getByRole('radio', { name: /Nature-focused/ }).check();
  await page.getByRole('link', { name: /Pricing guide/ }).click();
  await expect(page.getByRole('cell', { name: 'RM 413.20', exact: true })).toBeVisible();
  await page.getByRole('link', { name: /Back to my plan/ }).click();
  await expect(page.getByLabel('Destination country')).toHaveValue('France');
  await page.getByRole('button', { name: /Continue/ }).click();
  await page.getByLabel('Travel days').fill('1');
  await page.getByRole('button', { name: /Continue/ }).click();
  await expect(page.getByText('Enter at least 2 whole travel days.')).toBeVisible();
});

test('deep links recover to missing inputs and corrupt drafts are ignored', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('tripwise:draft:v1', '{broken'));
  await page.goto('/plan/summary');
  await expect(page).toHaveURL(/\/plan\/destination$/);
  await expect(page.getByRole('heading', { name: 'Where are we going?' })).toBeVisible();
});

test('zero custom spending, percentage limits and budget states', async ({ page }) => {
  await seed(page, sampleTrip({ budgetRM: 1 })); await page.goto('/plan/spending');
  await page.getByLabel('Meals budget approach').selectOption('custom');
  await page.getByLabel('Meals daily amount').fill('0');
  await page.getByLabel('Miscellaneous budget approach').selectOption('decrease');
  await page.getByLabel('Miscellaneous decrease').fill('101');
  await page.getByRole('button', { name: /See my estimate/ }).click();
  await expect(page.getByText('A decrease cannot exceed 100%.')).toBeVisible();
  await page.getByLabel('Miscellaneous decrease').fill('100');
  await page.getByRole('button', { name: /See my estimate/ }).click();
  await expect(page.locator('.status-pill')).toContainText('Exceeding budget');
  await expect(page.locator('.budget-tip')).toContainText('biggest expense');
});

test('storage failure leaves the planner usable and explains persistence', async ({ page }) => {
  await page.addInitScript(() => { Storage.prototype.setItem = () => { throw new Error('Storage blocked'); }; });
  await page.goto('/');
  await expect(page.getByRole('status')).toContainText('Browser saving is unavailable');
  await page.getByRole('link', { name: /Start planning/ }).click();
  await expect(page.getByRole('heading', { name: 'Where are we going?' })).toBeVisible();
});
