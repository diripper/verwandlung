
import React, { useState } from 'react';
import { InventoryItem } from '../../types';
import { inventoryItems } from '../../constants';
import Card from '../ui/Card';

interface Station5Props {
  onComplete: (item: InventoryItem) => void;
  onFail: () => void;
}

const choices = [
  { id: 1, text: '"Sie küsst ihn und reitet mit ihm in den Sonnenuntergang."', correct: false },
  { id: 2, text: '"Sie rettet daraufhin sein Leben."', correct: true },
  { id: 3, text: '"Sie fällt in einen Hundertjährigen Schlaf."', correct: false },
];

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};


const Station5: React.FC<Station5Props> = ({ onComplete, onFail }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  // Shuffle the choices once on component mount
  const [shuffledChoices] = useState(() => shuffleArray(choices));

  const handleSelect = (choice: typeof choices[0]) => {
    if (revealed) return;
    
    setSelectedId(choice.id);
    setRevealed(true);

    if (choice.correct) {
      setTimeout(() => onComplete(inventoryItems.MASK), 2000);
    } else {
      setTimeout(() => {
        onFail();
      }, 2000);
    }
  };

  return (
    <Card className="animate-fade-in">
      <p className="text-lg text-stone-300 mb-6 leading-relaxed italic">
        Ein großer Abend steht bevor. Ein Spiegel, umrahmt von Glühbirnen, zeigt das Gesicht eines Prinzen. Seine Stimme erklingt und flüstert: "Und was tut die Prinzessin dann, nachdem der Prinz ihr das Leben rettete?" Deine Antwort formt die Maske, die du tragen wirst.
      </p>

      <div className="space-y-4">
        {shuffledChoices.map(choice => (
          <button
            key={choice.id}
            onClick={() => handleSelect(choice)}
            disabled={revealed}
            className={`w-full text-left p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 font-lato text-stone-200
            ${selectedId === choice.id ? 'border-yellow-400/90 bg-yellow-500/10' : 'border-stone-600 hover:border-stone-500'}
            ${revealed && selectedId === choice.id && !choice.correct ? 'border-red-500/70' : ''}
            ${revealed && selectedId === choice.id && choice.correct ? 'border-green-500/70' : ''}
            disabled:cursor-not-allowed`}
          >
            {choice.text}
          </button>
        ))}
      </div>
      
      {revealed && selectedId !== null && shuffledChoices.find(s => s.id === selectedId)?.correct && (
        <p className="text-green-400 mt-4 animate-pulse">Eine wunderschöne Seidenmaske erscheint vor dir. Sie fühlt sich an wie eine zweite Haut.</p>
      )}
      {revealed && selectedId !== null && !shuffledChoices.find(s => s.id === selectedId)?.correct && (
        <p className="text-red-400 mt-4">Die Stimme seufzt. "Das ist nicht deine Wahrheit." Die Vision verblasst und du findest dich am Anfang wieder.</p>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.7s ease-out forwards; }
      `}</style>
    </Card>
  );
};

export default Station5;
