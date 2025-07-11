
import React, { useMemo } from 'react';
import { useGameState } from './hooks/useGameState';
import { TOTAL_STATIONS, stationData } from './constants';
import ProgressBar from './components/ui/ProgressBar';
import Inventory from './components/ui/Inventory';
import Station1 from './components/stations/Station1';
import Station2 from './components/stations/Station2';
import Station3 from './components/stations/Station3';
import Station4 from './components/stations/Station4';
import Station5 from './components/stations/Station5';
import Station6 from './components/stations/Station6';
import { InventoryItem } from './types';

export default function App(): React.ReactNode {
  const { gameState, advanceStation, addToInventory, resetGame } = useGameState();

  const handleCompletion = (item?: InventoryItem) => {
    if (item) {
      addToInventory(item);
    }
    advanceStation();
  };

  const currentStationData = stationData[gameState.currentStation - 1];

  const StationComponent = useMemo(() => {
    switch (gameState.currentStation) {
      case 1:
        return <Station1 onComplete={handleCompletion} onFail={resetGame} />;
      case 2:
        return <Station2 onComplete={handleCompletion} onFail={resetGame} />;
      case 3:
        return <Station3 onComplete={handleCompletion} onFail={resetGame} />;
      case 4:
        return <Station4 onComplete={handleCompletion} onFail={resetGame} />;
      case 5:
        return <Station5 onComplete={handleCompletion} onFail={resetGame} />;
      case 6:
        return <Station6 inventory={gameState.inventory} onReset={resetGame} />;
      default:
        return <div>Station nicht gefunden.</div>;
    }
  }, [gameState.currentStation, gameState.inventory, resetGame]);

  return (
    <div className="bg-stone-950 text-stone-200 min-h-screen w-full flex flex-col items-center justify-center p-4 selection:bg-yellow-400/20">
      <div className="w-full max-w-3xl mx-auto flex flex-col min-h-[90vh]">
        <header className="w-full py-4 text-center transition-opacity duration-1000">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-500/80 font-lato tracking-wider">
            Die Verwandlung
          </h1>
          {gameState.currentStation <= TOTAL_STATIONS && (
            <p className="text-stone-400 mt-2 text-lg italic">
              {currentStationData?.title}
            </p>
          )}
        </header>

        <main className="flex-grow flex flex-col items-center justify-center w-full">
            {StationComponent}
        </main>

        <footer className="w-full py-4 mt-auto">
          <Inventory items={gameState.inventory} />
          <ProgressBar current={gameState.currentStation} total={TOTAL_STATIONS + 1} />
        </footer>
      </div>
    </div>
  );
}