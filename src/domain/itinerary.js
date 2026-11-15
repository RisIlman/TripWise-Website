export const SLOTS = ['Morning', 'Afternoon', 'Evening'];
export const SLOT_TIMES = { Morning: '9:00 AM', Afternoon: '2:00 PM', Evening: '5:00 PM' };

export function normalizeArea(area) {
  return area.trim().toLowerCase().replace(/\p{L}+/gu, word => word[0].toUpperCase() + word.slice(1)) || 'Unspecified';
}

export function isScheduled(item, days) {
  return Number.isInteger(item.scheduledDay) && item.scheduledDay >= 1 && item.scheduledDay <= Number(days) && SLOTS.includes(item.scheduledSlot);
}

export function slotIsFree(items, day, slot) {
  return !items.some(item => item.scheduledDay === day && item.scheduledSlot === slot);
}

export function placeAttraction(items, item, days) {
  const sameAreaDays = [...new Set(items.filter(other => other.scheduledDay !== null && other.area === item.area && item.area !== 'Unspecified').map(other => other.scheduledDay))].sort((a, b) => a - b).filter(day => day >= 1 && day <= days);
  const preferred = item.preferredSlot;
  const placement = (day, slot) => ({ ...item, scheduledDay: day, scheduledSlot: slot });
  for (const day of sameAreaDays) if (slotIsFree(items, day, preferred)) return placement(day, preferred);
  for (const day of sameAreaDays) for (const slot of SLOTS) if (slotIsFree(items, day, slot)) return placement(day, slot);
  for (let day = 1; day <= days; day++) if (slotIsFree(items, day, preferred)) return placement(day, preferred);
  for (let day = 1; day <= days; day++) for (const slot of SLOTS) if (slotIsFree(items, day, slot)) return placement(day, slot);
  return { ...item, scheduledDay: null, scheduledSlot: null };
}

export function assignToDays(items, days) {
  const result = items.map(item => ({ ...item, scheduledDay: null, scheduledSlot: null }));
  const sorted = [...result].sort((a, b) => (a.area < b.area ? -1 : a.area > b.area ? 1 : 0) || SLOTS.indexOf(a.preferredSlot) - SLOTS.indexOf(b.preferredSlot));
  for (const item of sorted) {
    const index = result.findIndex(entry => entry.id === item.id);
    result[index] = placeAttraction(result, item, Number(days));
  }
  return result;
}

export function moveAttraction(items, id, day, slot, days) {
  if (!Number.isInteger(day) || day < 1 || day > Number(days) || !SLOTS.includes(slot)) return { items, error: 'Choose a day and time within this trip.' };
  if (!items.some(item => item.id === id)) return { items, error: 'Attraction not found.' };
  if (!slotIsFree(items, day, slot)) return { items, error: 'That slot is already taken. Choose a free slot.' };
  return { items: items.map(item => item.id === id ? { ...item, scheduledDay: day, scheduledSlot: slot } : item), error: '' };
}

export function reconcileDays(items, days) {
  return items.map(item => isScheduled(item, days) ? item : { ...item, scheduledDay: null, scheduledSlot: null });
}

export function attractionTotal(items, travelers, days) {
  return items.filter(item => isScheduled(item, days)).reduce((total, item) => total + Number(item.ticketPriceRMPerPerson), 0) * Number(travelers);
}
