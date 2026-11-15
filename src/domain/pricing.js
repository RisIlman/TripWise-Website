import { ASEAN_PRICING, REGIONAL_PRICING, BASE_ACCOMMODATION, BASE_PUBLIC_TRANSPORT, BASE_RETURN_TRANSPORT } from '../data/pricing.js';

export function getPrices(region, country) {
  const rates = region === 'ASEAN' ? ASEAN_PRICING[country] : REGIONAL_PRICING[region];
  if (!rates) throw new Error('Choose a valid region and country.');
  return {
    accommodation: BASE_ACCOMMODATION * rates.accommodation,
    public_transport: BASE_PUBLIC_TRANSPORT * rates.public_transport,
    return_transport: BASE_RETURN_TRANSPORT * rates.return_transport,
  };
}
