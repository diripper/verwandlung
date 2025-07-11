
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`bg-stone-900/50 backdrop-blur-sm border border-stone-700/50 rounded-xl shadow-2xl p-6 md:p-8 text-center w-full ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
