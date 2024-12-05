import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FloatingScoreProps {
  score: number;
  onScrollToTop: () => void;
}

export const FloatingScore: React.FC<FloatingScoreProps> = ({ score, onScrollToTop }) => {
  const getScoreColor = () => {
    if (score >= 95) return "text-blue-400";
    if (score >= 85) return "text-green-400";
    if (score >= 70) return "text-teal-400";
    if (score >= 50) return "text-yellow-400";
    if (score >= 30) return "text-orange-400";
    if (score >= 15) return "text-red-400";
    return "text-purple-400";
  };

  return (
    <div className="fixed bottom-6 right-6 flex items-center gap-4">
      <button
        onClick={onScrollToTop}
        className="bg-[#2c2e31] p-3 rounded-full shadow-lg border border-[#444444] hover:bg-[#252729] transition-colors"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-6 w-6 text-[#e2b714]" />
      </button>
      <div className="bg-[#2c2e31] px-6 py-4 rounded-full shadow-lg border border-[#444444] flex items-center gap-3">
        <span className="text-[#d1d0c5] font-medium">Score:</span>
        <span className={`text-2xl font-bold ${getScoreColor()}`}>{score}</span>
      </div>
    </div>
  );
};