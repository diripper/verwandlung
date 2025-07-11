
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="font-lato bg-yellow-500/80 text-stone-900 font-bold py-2 px-6 rounded-full shadow-lg hover:bg-yellow-400/90 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 transition-all duration-300 disabled:bg-stone-500 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
};

export default Button;
