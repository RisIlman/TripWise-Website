import { it, expect } from 'vitest';
import reference from '../fixtures/pythonExpectedResults.json';
import { assignToDays, moveAttraction, attractionTotal, placeAttraction, normalizeArea } from '../../src/domain/itinerary.js';
import { sampleAttraction } from '../fixtures/sampleTrips.js';

it('normalizes area names like the Python input flow before grouping', () => {
  expect(normalizeArea('  OLD town ')).toBe('Old Town');
  expect(normalizeArea('old TOWN')).toBe('Old Town');
  expect(normalizeArea('   ')).toBe('Unspecified');
});

it('matches Python area sorting, slot fallbacks and a full schedule', () => {
  const items = reference.schedule.input.map((item, i) => sampleAttraction(i, { name: item.name, area: item.area, preferredSlot: item.slot, ticketPriceRMPerPerson: item.price }));
  const scheduled = assignToDays(items, 2);
  scheduled.forEach((item, index) => {
    const expected = reference.schedule.expected[index];
    expect(item.scheduledDay).toBe(expected.day);
    if (expected.day !== null) expect(item.scheduledSlot).toBe(expected.slot);
  });
  expect(scheduled.filter(item => item.scheduledDay === null)).toHaveLength(1);
  expect(attractionTotal(scheduled, 2, 2)).toBe(reference.schedule.groupTotal);
  expect(items.every(item => item.scheduledDay === null)).toBe(true);
});

it('rejects occupied and invalid targets without changing the schedule', () => {
  const items = assignToDays([sampleAttraction(1), sampleAttraction(2)], 2);
  const result = moveAttraction(items, items[0].id, items[1].scheduledDay, items[1].scheduledSlot, 2);
  expect(result.error).toContain('already taken'); expect(result.items).toBe(items);
  expect(moveAttraction(items, items[0].id, 3, 'Morning', 2).error).toBeTruthy();
  const moved = moveAttraction(items, items[0].id, 2, 'Evening', 2);
  expect(moved.error).toBe(''); expect(moved.items[0].scheduledDay).toBe(2);
});

it('prefers another slot in the same area before an empty day', () => {
  const items = [sampleAttraction(1, { scheduledDay: 2, scheduledSlot: 'Morning' })];
  const next = placeAttraction(items, sampleAttraction(2), 3);
  expect([next.scheduledDay, next.scheduledSlot]).toEqual([2, 'Afternoon']);
});
