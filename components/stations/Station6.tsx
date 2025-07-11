import React, { useState } from 'react';
import { InventoryItem } from '../../types';
import Button from '../ui/Button';

interface Station6Props {
  inventory: InventoryItem[];
  onReset: () => void;
}

const Station6: React.FC<Station6Props> = ({ inventory, onReset }) => {
  const [revealed, setRevealed] = useState(false);

  const handleReveal = () => {
    setRevealed(true);
  };

  return (
    <div className="text-center w-full max-w-2xl animate-fade-in">
      {!revealed ? (
        <>
          <p className="text-lg text-stone-300 mb-6 leading-relaxed italic">
            Der Weg hat dich hierher geführt. Ein roter Teppich rollt sich vor dir aus, nicht aus Stoff, sondern aus Licht. Jeder deiner Schritte hat dich geformt. Jeder Gegenstand in deiner Hand ist ein Zeugnis deiner Reise. Du bist bereit.
          </p>
          <div className="flex justify-center items-center gap-6 my-8">
            {inventory.map(item => (
              <span key={item.id} title={item.name} className="text-4xl animate-pulse">
                {item.symbol}
              </span>
            ))}
          </div>
          <Button onClick={handleReveal}>Das Geschenk enthüllen</Button>
        </>
      ) : (
        <div className="flex flex-col items-center">
            <p className="text-lg text-stone-300 mb-6 leading-relaxed italic">
                Deine Verwandlung ist vollendet. Dies ist kein Ende, sondern ein neuer, glanzvoller Anfang. Ein unvergesslicher Abend erwartet dich.
            </p>
            <div className="w-[350px] h-[200px] [perspective:1000px] my-4">
                <div className={`relative w-full h-full card-flip ${revealed ? 'is-flipped' : ''}`}>
                    {/* Card Front */}
                    <div className="absolute w-full h-full card-face bg-gradient-to-br from-yellow-400 to-amber-600 rounded-xl shadow-2xl flex flex-col items-center justify-center text-stone-900 p-4">
                        <h3 className="text-2xl font-bold font-lato">Eine Einladung</h3>
                        <div className="w-20 h-0.5 bg-stone-900/30 my-2"></div>
                        <p className="text-sm">Für einen Abend voller Magie</p>
                    </div>
                    {/* Card Back */}
                    <div className="absolute w-full h-full card-face card-back bg-stone-800 border border-yellow-500/50 rounded-xl shadow-2xl flex flex-col items-center justify-center p-4 text-center">
                        <h3 className="text-xl font-bold font-lato text-yellow-400">Das Geschenk</h3>
                        <p className="text-stone-200 mt-2 text-lg">2 Tickets für</p>
                        <p className="text-white font-bold text-2xl mt-1">Pretty Woman - Das Musical</p>
                        <div className="w-24 h-px bg-yellow-500/50 my-3"></div>
                        <p className="text-stone-300 font-lato">31. Oktober 2025</p>
                        <p className="text-stone-400 font-lato mt-1">Metronom Theater, Oberhausen</p>
                    </div>
                </div>
            </div>
            <Button onClick={onReset} className="mt-8">
              Nochmal spielen
            </Button>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.7s ease-out forwards; }

        /* Card flip animation */
        .card-flip {
          transition: transform 0.8s;
          transform-style: preserve-3d;
        }
        .is-flipped {
          transform: rotateY(180deg);
        }
        .card-face {
          -webkit-backface-visibility: hidden; /* Safari */
          backface-visibility: hidden;
        }
        .card-back {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default Station6;
