
import React, { useState, useMemo } from 'react';
import { InventoryItem } from '../../types';
import { inventoryItems } from '../../constants';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface Station1Props {
  onComplete: (item: InventoryItem) => void;
  onFail: () => void;
}

const TARGET_WORD = 'WANDEL';
const SHUFFLED_LETTERS = ['A', 'L', 'W', 'D', 'E', 'N'];

const Station1: React.FC<Station1Props> = ({ onComplete, onFail }) => {
  const [currentWord, setCurrentWord] = useState('');
  const [solved, setSolved] = useState(false);

  const handleLetterClick = (letter: string) => {
    if (solved) return;
    setCurrentWord(prev => prev + letter);
  };

  const handleBackspace = () => {
    setCurrentWord(prev => prev.slice(0, -1));
  };
  
  const handleSolve = () => {
      if (currentWord === TARGET_WORD) {
          setSolved(true);
          setTimeout(() => onComplete(inventoryItems.INSIGHT), 1500);
      } else {
          // Add a shake animation for wrong attempts
          const display = document.getElementById('word-display');
          if(display) {
              display.classList.add('animate-shake');
              setTimeout(() => {
                display.classList.remove('animate-shake');
                onFail();
              }, 500);
          } else {
            onFail();
          }
      }
  };

  const usedLetters = useMemo(() => {
    const counts: { [key: string]: number } = {};
    for (const char of currentWord) {
        counts[char] = (counts[char] || 0) + 1;
    }
    return counts;
  }, [currentWord]);

  return (
    <Card className="animate-fade-in">
      <p className="text-lg text-stone-300 mb-6 leading-relaxed italic">
        Vor dir steht eine schwere, uralte Tür. Sie ist verschlossen. In das Holz sind seltsame Symbole geritzt. Ein kalter Hauch des Zweifels umweht dich. Doch in der Mitte der Tür leuchtet ein Wortfeld und darunter sechs steinerne Buchstaben. Ordne sie, um den Weg zu öffnen.
      </p>
      
      <div id="word-display" className="h-16 w-full max-w-xs mx-auto bg-stone-800/50 border-2 border-stone-600 rounded-lg flex items-center justify-center text-4xl font-lato tracking-[0.5em] text-yellow-400 mb-6">
        {currentWord}
      </div>

      <div className="flex justify-center gap-3 mb-6">
        {SHUFFLED_LETTERS.map((letter, index) => {
            const letterCountInWord = usedLetters[letter] || 0;
            const letterCountInPuzzle = SHUFFLED_LETTERS.filter(l => l === letter).length;
            const isDisabled = letterCountInWord >= letterCountInPuzzle;

            return (
                <button
                    key={index}
                    onClick={() => handleLetterClick(letter)}
                    disabled={isDisabled || solved}
                    className="font-lato h-14 w-14 text-2xl font-bold bg-stone-600/70 text-stone-200 rounded-md hover:bg-stone-500/70 transition-colors disabled:bg-stone-800 disabled:text-stone-500 disabled:cursor-not-allowed"
                >
                    {letter}
                </button>
            )
        })}
      </div>
      
      <div className="flex justify-center gap-4">
        <Button onClick={handleBackspace} disabled={solved || currentWord.length === 0}>Löschen</Button>
        <Button onClick={handleSolve} disabled={solved || currentWord.length !== TARGET_WORD.length}>
          {solved ? 'Geöffnet...' : 'Öffnen'}
        </Button>
      </div>
      
      {solved && <p className="text-yellow-400 mt-4 animate-pulse">Die Tür knarrt und schwingt langsam auf...</p>}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.7s ease-out forwards; }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.5s ease-in-out; }
      `}</style>
    </Card>
  );
};

export default Station1;
