
import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const progressPercentage = Math.min((current / total) * 100, 100);

  return (
    <div className="w-full max-w-sm mx-auto bg-stone-700/50 rounded-full h-1.5 mt-4">
      <div
        className="bg-yellow-500/80 h-1.5 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
