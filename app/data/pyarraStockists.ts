export interface StockistBranch {
  id: string;
  name: string;
  mapUrl: string;
}

export interface MappedBranch extends StockistBranch {
  /** Exact destination pin, latitude then longitude; never a map viewport center. */
  coordinates: [number, number];
  /** Resolved source used to verify the pin on 2026-09-20. */
  coordinateSource: string;
}

interface StockistDetails {
  id: string;
  name: string;
  outletType: 'Bakery' | 'Gym' | 'Market' | 'Juice shop';
  cardColor: `#${string}`;
}

export interface ChainStockist extends StockistDetails {
  kind: 'chain';
  branches: MappedBranch[];
}

export interface SingleStockist extends StockistDetails {
  kind: 'single';
  branches: [StockistBranch];
}

export type PyarraStockist = ChainStockist | SingleStockist;

// Keep retailer and branch order aligned with the supplied stockist list.
// Original sharing URLs are preserved for visitors' preferred map applications.
export const pyarraStockists: PyarraStockist[] = [
  {
    id: 'village-windmill', name: 'Village Windmill', outletType: 'Bakery', cardColor: '#f7e5ac', kind: 'single',
    branches: [{ id: 'village-windmill', name: 'Village Windmill', mapUrl: 'https://maps.app.goo.gl/phto2vgLKEwqWJXG6?g_st=aw' }],
  },
  {
    id: 'fox', name: 'Fox Gym', outletType: 'Gym', cardColor: '#e6cff5', kind: 'single',
    branches: [{ id: 'fox', name: 'Fox Gym', mapUrl: 'https://maps.app.goo.gl/BkCcvJPMMtirRB9D9?g_st=ic' }],
  },
  {
    id: 'infinity', name: 'Infinity Gym', outletType: 'Gym', cardColor: '#cce3f8', kind: 'single',
    branches: [{ id: 'infinity', name: 'Infinity Gym', mapUrl: 'https://maps.apple/p/0.rPeJvLUEtpth' }],
  },
  {
    id: 'zaynab-iron-house', name: 'Zaynab / Iron House Fitness', outletType: 'Gym', cardColor: '#f5cdd8', kind: 'single',
    branches: [{ id: 'zaynab-iron-house', name: 'Zaynab / Iron House Fitness', mapUrl: 'https://maps.google.com/?q=36.217216,43.986904' }],
  },
  {
    id: 'ashti', name: 'Ashti Market', outletType: 'Market', cardColor: '#f8d8bb', kind: 'single',
    branches: [{ id: 'ashti', name: 'Ashti Market', mapUrl: 'https://maps.apple/p/guXo~bhvc8Encb' }],
  },
  {
    id: 'berlin', name: 'Berlin Market', outletType: 'Market', cardColor: '#e5d8c8', kind: 'chain',
    branches: [
      { id: 'berlin-hawlere-nwe', name: 'Hawlere Nwe', mapUrl: 'https://maps.app.goo.gl/aYQ9cvfGBPpR9YAT7?g_st=ic', coordinates: [36.2111385, 44.0748967], coordinateSource: 'https://www.google.com/maps?q=36.2111385,44.0748967' },
      { id: 'berlin-naz-naz', name: 'Naz Naz', mapUrl: 'https://maps.app.goo.gl/QEhsyyzLt22q5bMa8?g_st=ic', coordinates: [36.2129682, 43.9898090], coordinateSource: 'https://www.google.com/maps?q=36.2129682,43.9898090' },
    ],
  },
  {
    id: 'daily-basket', name: 'Daily Basket', outletType: 'Market', cardColor: '#d7d6fa', kind: 'single',
    branches: [{ id: 'daily-basket', name: 'Daily Basket', mapUrl: 'https://maps.google.com/?q=36.202431,43.985039' }],
  },
  {
    id: 'darin-2', name: 'Darin 2 Market', outletType: 'Market', cardColor: '#e9efbc', kind: 'single',
    branches: [{ id: 'darin-2', name: 'Darin 2 Market', mapUrl: 'https://maps.app.goo.gl/tJ1YjGdYGX93Vqqr6?g_st=ic' }],
  },
  {
    id: 'karwan-saray', name: 'Karwan Saray Market', outletType: 'Market', cardColor: '#bfe8dc', kind: 'single',
    branches: [{ id: 'karwan-saray', name: 'Karwan Saray Market', mapUrl: 'https://maps.app.goo.gl/dDzRU5rmKWd2Q36e6?g_st=ic' }],
  },
  {
    id: 'max', name: 'Max Market', outletType: 'Market', cardColor: '#dce0e6', kind: 'single',
    branches: [{ id: 'max', name: 'Max Market', mapUrl: 'https://maps.app.goo.gl/kZKCFRaWMnwXZ2kH8?g_st=ic' }],
  },
  {
    id: 'mevan', name: 'Mevan Market', outletType: 'Market', cardColor: '#f0cdec', kind: 'single',
    branches: [{ id: 'mevan', name: 'Mevan Market', mapUrl: 'https://maps.app.goo.gl/UkJ9y7ywb7SFFELt9?g_st=ic' }],
  },
  {
    id: 'view', name: 'View Market', outletType: 'Market', cardColor: '#c5ecf1', kind: 'chain',
    branches: [
      { id: 'view-aram', name: 'Aram Village', mapUrl: 'https://maps.apple/p/mJww.4LSmRFp06', coordinates: [36.245094, 44.041142], coordinateSource: 'https://maps.apple.com/place?coordinate=36.245094,44.041142' },
      { id: 'view-mass', name: 'Mass Village', mapUrl: 'https://maps.apple/p/Z_N0DSXBYJ5ICM', coordinates: [36.237003, 44.063663], coordinateSource: 'https://maps.apple.com/place?coordinate=36.237003,44.063663' },
      { id: 'view-nice', name: 'Nice Village', mapUrl: 'https://maps.apple/p/MuvgvsjyZas4Ee', coordinates: [36.240543, 44.058689], coordinateSource: 'https://maps.apple.com/place?coordinate=36.240543,44.058689' },
      { id: 'view-park', name: 'Park View', mapUrl: 'https://maps.app.goo.gl/BNyYZgLvisFLREbB8?g_st=ic', coordinates: [36.2093060, 43.9819176], coordinateSource: 'https://www.google.com/maps?q=36.2093060,43.9819176' },
      { id: 'view-peshang', name: 'Peshang Towers', mapUrl: 'https://maps.apple/p/G5L71rBg6aZYRN', coordinates: [36.281303, 44.084250], coordinateSource: 'https://maps.apple.com/place?coordinate=36.281303,44.084250' },
      { id: 'view-spanish', name: 'Spanish Village', mapUrl: 'https://maps.apple/p/iekmzZYyQtociw', coordinates: [36.281769, 44.064754], coordinateSource: 'https://maps.apple.com/place?coordinate=36.281769,44.064754' },
    ],
  },
  {
    id: 'zanay-baqal', name: 'Zanay Baqal Market', outletType: 'Market', cardColor: '#f6cfc2', kind: 'single',
    branches: [{ id: 'zanay-baqal', name: 'Zanay Baqal Market', mapUrl: 'https://maps.app.goo.gl/j96NnDKdz82ZkxoM6?g_st=ic' }],
  },
  {
    id: 'smoothie-season', name: 'Smoothie Season', outletType: 'Juice shop', cardColor: '#cfe9c5', kind: 'chain',
    branches: [
      { id: 'smoothie-32-park', name: '32 Park', mapUrl: 'https://share.google/hNpGSTVyHRbYWWsi8', coordinates: [36.1955116, 43.9631331], coordinateSource: 'https://www.google.com/maps/place/Smoothie+Season+-+32+Park/data=!4m6!3m5!1s0x400723033e95c3ff:0x801e31604a4a1386!8m2!3d36.1955116!4d43.9631331!16s%2Fg%2F11h3wxzktq' },
      { id: 'smoothie-60-road', name: '60 Road', mapUrl: 'https://share.google/vvYNHiBYzDET8YqGx', coordinates: [36.2024685, 44.0161614], coordinateSource: 'https://www.google.com/maps/place/Smoothie+Season+-+60m+Street/data=!4m6!3m5!1s0x400723007d506c97:0xb6ae2bda76723627!8m2!3d36.2024685!4d44.0161614!16s%2Fg%2F11yffsyjbl' },
      { id: 'smoothie-baharka-road', name: 'Baharka Road', mapUrl: 'https://share.google/ZiBzZCOP47cmSZrHx', coordinates: [36.2600019, 44.0144256], coordinateSource: 'https://www.google.com/maps/place/Smoothie+Season+-+Bahrka+Rd/data=!4m6!3m5!1s0x40071fbbaaabf6db:0xdfc4beb97a2436ba!8m2!3d36.2600019!4d44.0144256!16s%2Fg%2F11lp15dkqz' },
      { id: 'smoothie-baxtyari', name: 'Baxtyari', mapUrl: 'https://share.google/CUYljLQk27crjhzvg', coordinates: [36.2070045, 43.9991558], coordinateSource: 'https://www.google.com/maps/place/Smoothie+Season+-+Baxtyari/data=!4m6!3m5!1s0x4007230071ae5687:0x195a9bd012c4757d!8m2!3d36.2070045!4d43.9991558!16s%2Fg%2F11lmdq20jh' },
      { id: 'smoothie-erbil-avenue', name: 'Erbil Avenue', mapUrl: 'https://share.google/28LY1XRJCq9xWWrOI', coordinates: [36.2324109, 44.0107514], coordinateSource: 'https://www.google.com/maps/place/Smoothie+Season+-+Erbil+Avenue/data=!4m6!3m5!1s0x40071f001d89d353:0x4b1c5fe606b40cad!8m2!3d36.2324109!4d44.0107514!16s%2Fg%2F11mscmd_v7' },
      { id: 'smoothie-mass-city', name: 'Mass City', mapUrl: 'https://share.google/cEU7AcEsa04IlVaGv', coordinates: [36.2368334, 44.0637475], coordinateSource: 'https://www.google.com/maps/place/Smoothie+Season+-+Mass+City/data=!4m6!3m5!1s0x400721f01848ba4b:0x5c061e9e4e3dbb84!8m2!3d36.2368334!4d44.0637475!16s%2Fg%2F11wxgyqwty' },
      { id: 'smoothie-ronaki', name: 'Ronaki', mapUrl: 'https://share.google/qauwWLsXHoBvRVO6d', coordinates: [36.1701676, 44.0236608], coordinateSource: 'https://www.google.com/maps/place/Smoothie+Season+-+Runaki/data=!4m6!3m5!1s0x400723cea452f035:0x414552fc38ca6cde!8m2!3d36.1701676!4d44.0236608!16s%2Fg%2F11pcd4rfbq' },
    ],
  },
];
