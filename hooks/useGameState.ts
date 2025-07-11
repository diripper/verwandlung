
import { useState, useEffect, useCallback } from 'react';
import { GameState, InventoryItem } from '../types';
import { GAME_STATE_KEY } from '../constants';

const getInitialState = (): GameState => {
  try {
    const savedState = window.localStorage.getItem(GAME_STATE_KEY);
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      // Basic validation
      if (typeof parsedState.currentStation === 'number' && Array.isArray(parsedState.inventory)) {
          return parsedState;
      }
    }
  } catch (error) {
    console.error('Fehler beim Laden des Spielstands:', error);
  }
  return {
    currentStation: 1,
    inventory: [],
  };
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(getInitialState);

  useEffect(() => {
    try {
      window.localStorage.setItem(GAME_STATE_KEY, JSON.stringify(gameState));
    } catch (error) {
      console.error('Fehler beim Speichern des Spielstands:', error);
    }
  }, [gameState]);

  const advanceStation = useCallback(() => {
    setGameState(prev => ({ ...prev, currentStation: prev.currentStation + 1 }));
  }, []);

  const addToInventory = useCallback((item: InventoryItem) => {
    setGameState(prev => {
        // Avoid duplicates
        if (prev.inventory.find(i => i.id === item.id)) {
            return prev;
        }
        return { ...prev, inventory: [...prev.inventory, item] }
    });
  }, []);

  const resetGame = useCallback(() => {
    const freshState = { currentStation: 1, inventory: [] };
    setGameState(freshState);
    try {
        window.localStorage.removeItem(GAME_STATE_KEY);
    } catch(error) {
        console.error('Fehler beim Zurücksetzen des Spielstands:', error);
    }
  }, []);

  return { gameState, advanceStation, addToInventory, resetGame };
};
