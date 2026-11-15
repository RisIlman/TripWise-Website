// Ported from the completed TripWise Python reference. All amounts are in RM.
export const PRICING_SOURCE = "https://github.com/RisIlman/TripWise-Budget-Tracker/blob/main/pricing.py";
export const BASE_ACCOMMODATION = 200;
export const BASE_PUBLIC_TRANSPORT = 50;
export const BASE_RETURN_TRANSPORT = 300;
export const REGIONAL_PRICING = {
  "North Europe": {
    "accommodation": 1.525,
    "public_transport": 1.28,
    "return_transport": 11.27
  },
  "West Europe": {
    "accommodation": 1.725,
    "public_transport": 1.14,
    "return_transport": 10.96
  },
  "East Europe": {
    "accommodation": 0.95,
    "public_transport": 0.36,
    "return_transport": 11.02
  },
  "South Europe": {
    "accommodation": 1.4,
    "public_transport": 0.64,
    "return_transport": 11.12
  },
  "North Asia": {
    "accommodation": 0.7,
    "public_transport": 0.3,
    "return_transport": 4.9
  },
  "Central Asia": {
    "accommodation": 0.5,
    "public_transport": 0.08,
    "return_transport": 10.67
  },
  "Middle East": {
    "accommodation": 0.95,
    "public_transport": 0.38,
    "return_transport": 8.68
  },
  "North America": {
    "accommodation": 1.75,
    "public_transport": 0.56,
    "return_transport": 16.13
  },
  "South America": {
    "accommodation": 0.725,
    "public_transport": 0.28,
    "return_transport": 26.23
  },
  "North Africa": {
    "accommodation": 0.85,
    "public_transport": 0.12,
    "return_transport": 12.19
  },
  "Oceania": {
    "accommodation": 1.55,
    "public_transport": 0.72,
    "return_transport": 9.2
  }
};
export const ASEAN_PRICING = {
  "Brunei": {
    "accommodation": 0.744,
    "public_transport": 0.636,
    "return_transport": 2.013
  },
  "Cambodia": {
    "accommodation": 0.248,
    "public_transport": 0.631,
    "return_transport": 2.953
  },
  "Indonesia": {
    "accommodation": 0.599,
    "public_transport": 1.485,
    "return_transport": 1.833
  },
  "Laos": {
    "accommodation": 0.166,
    "public_transport": 0.158,
    "return_transport": 2.967
  },
  "Myanmar": {
    "accommodation": 0.629,
    "public_transport": 0.195,
    "return_transport": 5.17
  },
  "Singapore": {
    "accommodation": 2.066,
    "public_transport": 0.89,
    "return_transport": 1.5
  },
  "Philippines": {
    "accommodation": 0.996,
    "public_transport": 1.051,
    "return_transport": 3.127
  },
  "Thailand": {
    "accommodation": 0.966,
    "public_transport": 0.507,
    "return_transport": 2.41
  },
  "Vietnam": {
    "accommodation": 0.998,
    "public_transport": 1.214,
    "return_transport": 2.093
  }
};
export const SEASON_MULTIPLIERS = {
  "Low": 0.85,
  "Normal": 1.0,
  "Peak": 1.4
};
export const EXPENSE_SUGGESTION = {
  "ASEAN": {
    "meals": 60,
    "miscellaneous": 30
  },
  "North Asia": {
    "meals": 100,
    "miscellaneous": 50
  },
  "Central Asia": {
    "meals": 50,
    "miscellaneous": 30
  },
  "Middle East": {
    "meals": 80,
    "miscellaneous": 40
  },
  "North Europe": {
    "meals": 150,
    "miscellaneous": 70
  },
  "West Europe": {
    "meals": 130,
    "miscellaneous": 60
  },
  "South Europe": {
    "meals": 100,
    "miscellaneous": 50
  },
  "East Europe": {
    "meals": 70,
    "miscellaneous": 35
  },
  "North Africa": {
    "meals": 50,
    "miscellaneous": 30
  },
  "North America": {
    "meals": 140,
    "miscellaneous": 70
  },
  "South America": {
    "meals": 70,
    "miscellaneous": 40
  },
  "Oceania": {
    "meals": 130,
    "miscellaneous": 60
  }
};
export const ASEAN_COUNTRIES = Object.keys(ASEAN_PRICING);
export const REGIONS = ["ASEAN", ...Object.keys(REGIONAL_PRICING)];
