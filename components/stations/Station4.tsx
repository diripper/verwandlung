import React, { useState, useEffect, useCallback, useRef } from 'react';
import { InventoryItem } from '../../types';
import { inventoryItems } from '../../constants';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Soundfont, { Player } from 'soundfont-player';

interface Station4Props {
  onComplete: (item: InventoryItem) => void;
  onFail: () => void;
}

// New sequence: E3 E3 G#3 B3 D4 | E3 E3 G#3 B3 D4 | E3 E3 G#3 B3 D4 F#4 E4 D4 | (x4)
// Total 42 notes
const NOTE_NAMES = ['E3', 'G#3', 'B3', 'D4', 'F#4', 'E4'];
const MELODY_SEQUENCE = [
    0, 0, 1, 2, 3, // Phrase 1
    0, 0, 1, 2, 3, // Phrase 2
    0, 0, 1, 2, 3, 4, 5, 3, // Phrase 3
    0, 0, 1, 2, 3, 4, 5, 3, // Phrase 4
    0, 0, 1, 2, 3, 4, 5, 3, // Phrase 5
    0, 0, 1, 2, 3, 4, 5, 3, // Phrase 6
];
// Indices where a longer pause should occur (at the end of each phrase)
const PAUSE_INDICES = [4, 9, 17, 25, 33]; 

const colors = [
    'bg-red-500', 'bg-blue-500', 'bg-green-500', 
    'bg-yellow-500', 'bg-purple-500', 'bg-orange-500'
];

const Station4: React.FC<Station4Props> = ({ onComplete, onFail }) => {
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [gameState, setGameState] = useState<'IDLE' | 'LOADING' | 'WATCHING' | 'PLAYING' | 'CORRECT' | 'WRONG'>('IDLE');
  const [error, setError] = useState<string | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const instrumentRef = useRef<Player | null>(null);

  const playSound = useCallback((noteIndex: number) => {
    if (instrumentRef.current) {
      const noteName = NOTE_NAMES[noteIndex];
      instrumentRef.current.play(noteName, 0, { duration: 0.6 });
    }
  }, []);

  const handleStart = useCallback(async () => {
    setGameState('LOADING');
    setError(null);
    if (!audioCtxRef.current) {
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) {
          setError('Web Audio API wird von diesem Browser nicht unterstützt.');
          setGameState('IDLE');
          return;
        }
        audioCtxRef.current = new AudioContext();
        if (audioCtxRef.current.state === 'suspended') {
          await audioCtxRef.current.resume();
        }
      } catch (e) {
        console.error('Error creating AudioContext:', e);
        setError('Audio konnte nicht initialisiert werden.');
        setGameState('IDLE');
        return;
      }
    }

    if (!instrumentRef.current) {
      try {
        instrumentRef.current = await Soundfont.instrument(audioCtxRef.current, 'electric_piano_1');
      } catch (e) {
        console.error("Could not load soundfont instrument", e);
        setError('Instrument konnte nicht geladen werden. Bitte versuche es erneut.');
        setGameState('IDLE');
        return;
      }
    }
    setGameState('WATCHING');
  }, []);

  useEffect(() => {
    if (gameState !== 'WATCHING') return;

    setPlayerSequence([]);
    let i = 0;
    const interval = setInterval(() => {
      if (i < MELODY_SEQUENCE.length) {
        const noteIndex = MELODY_SEQUENCE[i];
        playSound(noteIndex);
        setActiveButton(noteIndex);
        const isPausePoint = PAUSE_INDICES.includes(i);
        const pauseDuration = isPausePoint ? 800 : 400;
        setTimeout(() => setActiveButton(null), pauseDuration - 50); // a bit shorter to avoid overlap
        i++;
      } else {
        clearInterval(interval);
        setGameState('PLAYING');
      }
    }, 900); // Increased interval for longer pauses

    return () => clearInterval(interval);
  }, [gameState, playSound]);

  useEffect(() => {
    if (gameState !== 'PLAYING' || playerSequence.length === 0) return;

    const currentNoteIndexInMelody = playerSequence.length - 1;
    if (playerSequence[currentNoteIndexInMelody] !== MELODY_SEQUENCE[currentNoteIndexInMelody]) {
      setGameState('WRONG');
      setTimeout(() => onFail(), 1500);
      return;
    }

    if (playerSequence.length === MELODY_SEQUENCE.length) {
      setGameState('CORRECT');
      setTimeout(() => onComplete(inventoryItems.PEARL), 1500);
    }
  }, [playerSequence, gameState, onComplete, onFail]);

  const handlePlayerInput = (index: number) => {
    if (gameState !== 'PLAYING') return;
    playSound(index);
    setPlayerSequence(prev => [...prev, index]);
  };

  const getMessage = () => {
    if (error) return error;
    switch (gameState) {
      case 'IDLE': return "Eine leise, bekannte Melodie liegt in der Luft. Lausche und wiederhole sie.";
      case 'LOADING': return "Instrument wird geladen...";
      case 'WATCHING': return "Lausche der Melodie und merke dir die Tonfolge...";
      case 'PLAYING': return `Deine Runde. Spiele die ${MELODY_SEQUENCE.length} Noten nach.`;
      case 'WRONG': return "Nicht ganz richtig. Die Reise beginnt von Neuem.";
      case 'CORRECT': return "Wunderschön! Die Melodie ist wieder vollständig.";
      default: return "";
    }
  };

  return (
    <Card className="animate-fade-in">
      <p className={`text-lg mb-4 leading-relaxed italic h-12 flex items-center justify-center ${error ? 'text-red-400' : 'text-stone-300'}`}>
        {getMessage()}
      </p>

      {(gameState === 'PLAYING' || gameState === 'WATCHING') && (
        <div className="w-full text-center mb-4">
          <p className="font-lato text-stone-400">Fortschritt: {gameState === 'WATCHING' ? '...' : playerSequence.length} / {MELODY_SEQUENCE.length}</p>
          <div className="w-full max-w-sm mx-auto bg-stone-700/50 rounded-full h-1.5 mt-2">
            <div
              className="bg-yellow-500/80 h-1.5 rounded-full transition-all duration-200 ease-linear"
              style={{ width: `${(playerSequence.length / MELODY_SEQUENCE.length) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
      
      {gameState === 'IDLE' || gameState === 'LOADING' ? (
        <Button onClick={handleStart} disabled={gameState === 'LOADING'}>
          {gameState === 'LOADING' ? 'Lade...' : 'Lauschen'}
        </Button>
      ) : (
        <div className="grid grid-cols-3 gap-4 w-80 h-52 mx-auto">
          {colors.map((color, index) => (
            <button
              key={index}
              onClick={() => handlePlayerInput(index)}
              disabled={gameState !== 'PLAYING'}
              className={`rounded-lg transition-all duration-200 ${color}
                ${activeButton === index ? 'opacity-100 scale-105 ring-4 ring-white' : 'opacity-50'}
                ${gameState === 'PLAYING' ? 'cursor-pointer hover:opacity-75 active:scale-95 active:opacity-100' : ''}
              `}
              aria-label={`Ton ${index + 1}`}
            />
          ))}
        </div>
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

export default Station4;