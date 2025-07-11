
import React from 'react';
import { InventoryItem } from '../../types';

interface InventoryProps {
  items: InventoryItem[];
}

const Inventory: React.FC<InventoryProps> = ({ items }) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="flex justify-center items-center gap-4 my-4">
      <p className="font-lato text-stone-400">Deine Reise:</p>
      <div className="flex gap-3">
        {items.map((item) => (
          <div key={item.id} className="group relative">
            <span className="text-2xl cursor-default transition-transform duration-300 group-hover:scale-125">
              {item.symbol}
            </span>
            <div className="absolute bottom-full mb-2 w-48 left-1/2 -translate-x-1/2 bg-stone-800 text-stone-200 text-xs rounded-md py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg z-10">
              <p className="font-bold font-lato">{item.name}</p>
              <p className="font-sans italic text-stone-400">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
