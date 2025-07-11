
export interface InventoryItem {
  id: number;
  name: string;
  symbol: string;
  description: string;
}

export interface GameState {
  currentStation: number;
  inventory: InventoryItem[];
}
