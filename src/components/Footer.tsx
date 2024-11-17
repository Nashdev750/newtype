import React from 'react';
import { RotateCcw } from 'lucide-react';

interface Props {
  onRestart: () => void;
}

export const Footer: React.FC<Props> = ({ onRestart }) => {
  
  return (
    <footer className="w-full p-4 mt-auto">
      <div className="max-w-[850px] mx-auto flex justify-center">
        <button 
          onClick={onRestart}
          className="hover:text-[#d1d0c5] transition-colors flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>restart test</span>
        </button>
      </div>
    </footer>
  );
};