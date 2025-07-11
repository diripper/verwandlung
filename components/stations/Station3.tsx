
import React, { useState } from 'react';
import { InventoryItem } from '../../types';
import { inventoryItems } from '../../constants';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface Station3Props {
  onComplete: (item: InventoryItem) => void;
  onFail: () => void;
}

const suitcases = [
  { id: 1, name: "Schwerer Koffer", description: "Gefüllt mit Steinen der Erinnerung, jeder eine Last.", correct: false },
  { id: 2, name: "Leichter Koffer", description: "Gepackt für eine Zukunft, deren Skript noch ungeschrieben ist.", correct: true },
  { id: 3, name: "Offener Koffer", description: "Leer und wartend, von anderen gefüllt zu werden.", correct: false }
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

const Station3: React.FC<Station3Props> = ({ onComplete, onFail }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  // Shuffle the suitcases once on component mount
  const [shuffledSuitcases] = useState(() => shuffleArray(suitcases));

  const handleSelect = (id: number) => {
    if (revealed) return;
    setSelectedId(id);
  };
  
  const handleConfirm = () => {
    if (selectedId === null) return;
    setRevealed(true);
    const isCorrect = shuffledSuitcases.find(s => s.id === selectedId)?.correct;
    if (isCorrect) {
        setTimeout(() => onComplete(inventoryItems.KEY), 2000);
    } else {
        setTimeout(() => {
            onFail();
        }, 2000);
    }
  };

  return (
    <Card className="animate-fade-in">
      <p className="text-lg text-stone-300 mb-6 leading-relaxed italic">
        Ein verlassener Bahnsteig. Drei Koffer stehen im fahlen Licht. Jeder ohne Namen, jeder birgt ein Schicksal. Du kannst nur einen mitnehmen. Welchen wählst du für deine Weiterreise?
      </p>

      <div className="space-y-4 mb-6">
        {shuffledSuitcases.map(suitcase => (
          <div
            key={suitcase.id}
            onClick={() => handleSelect(suitcase.id)}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
              selectedId === suitcase.id ? 'border-yellow-400/90 bg-yellow-500/10' : 'border-stone-600 hover:border-stone-500'
            }
            ${revealed && selectedId === suitcase.id && !suitcase.correct ? 'border-red-500/70' : ''}
            ${revealed && selectedId === suitcase.id && suitcase.correct ? 'border-green-500/70' : ''}
            `}
          >
            <h3 className="font-bold text-lg font-lato text-stone-100">{suitcase.name}</h3>
            <p className="text-stone-400 italic">{suitcase.description}</p>
          </div>
        ))}
      </div>
      
      <Button onClick={handleConfirm} disabled={selectedId === null || revealed}>
        Bestätigen
      </Button>
      
      {revealed && selectedId !== null && shuffledSuitcases.find(s => s.id === selectedId)?.correct && (
        <p className="text-green-400 mt-4 animate-pulse">Der Koffer ist federleicht. In ihm findest du einen einzigen goldenen Schlüssel.</p>
      )}
      {revealed && selectedId !== null && !shuffledSuitcases.find(s => s.id === selectedId)?.correct && (
        <p className="text-red-400 mt-4">Dieser Koffer ist zu schwer. Er hält dich fest. Das Spiel beginnt von Neuem.</p>
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

export default Station3;
