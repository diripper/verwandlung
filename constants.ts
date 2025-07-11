
import { InventoryItem } from './types';

export const TOTAL_STATIONS = 6;
export const GAME_STATE_KEY = 'dieVerwandlungGameState';

export const stationData = [
  { id: 1, title: 'Die Tür der Zweifel' },
  { id: 2, title: 'Der Spiegel der Möglichkeiten' },
  { id: 3, title: 'Der Koffer ohne Namen' },
  { id: 4, title: 'Die vergessene Melodie' },
  { id: 5, title: 'Die Maske des Abends' },
  { id: 6, title: 'Der rote Teppich' },
];

export const inventoryItems: { [key: string]: InventoryItem } = {
  INSIGHT: {
    id: 1,
    name: 'Wort der Klarheit',
    symbol: '📜',
    description: 'Das Wort "WANDEL", das die Zweifel durchbricht.',
  },
  CRYSTAL: {
    id: 2,
    name: 'Kristallsplitter',
    symbol: '💎',
    description: 'Ein Splitter, der das Licht auf unzählige Weisen bricht.',
  },
  KEY: {
    id: 3,
    name: 'Goldener Schlüssel',
    symbol: '🔑',
    description: 'Ein Schlüssel, nicht für eine Tür, sondern für einen Anfang.',
  },
  PEARL: {
    id: 4,
    name: 'Klangperle',
    symbol: '🎶',
    description: 'Eine Perle, die eine wiederentdeckte Melodie in sich trägt.',
  },
  MASK: {
    id: 5,
    name: 'Seidenmaske',
    symbol: '🎭',
    description: 'Eine Maske, die nicht verbirgt, sondern die wahre Essenz enthüllt.',
  },
};
