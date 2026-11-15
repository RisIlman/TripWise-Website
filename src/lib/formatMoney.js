const formatter = new Intl.NumberFormat('en-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export function formatMoney(value) {
  return Number.isFinite(value) ? `RM ${formatter.format(value)}` : '—';
}
