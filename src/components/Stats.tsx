import React from 'react';
import { Trophy, Target, AlertCircle, RotateCcw } from 'lucide-react';

interface Props {
  stats: {
    wpm: number;
    accuracy: number;
    errors: number;
  },
  onRestart:any
}

const Stats: React.FC<Props> = ({ stats,onRestart }) => {
  return (
    <>
    
    <div className="w-full max-w-2xl">
      <h2 className="text-2xl font-bold text-center mb-8">Test Results</h2>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-zinc-800 p-6 rounded-lg text-center">
          <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <div className="text-3xl font-bold text-yellow-500">{stats.wpm}</div>
          <div className="text-zinc-400 text-sm">WPM</div>
        </div>
        <div className="bg-zinc-800 p-6 rounded-lg text-center">
          <Target className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
          <div className="text-3xl font-bold text-emerald-500">{stats.accuracy}%</div>
          <div className="text-zinc-400 text-sm">Accuracy</div>
        </div>
        <div className="bg-zinc-800 p-6 rounded-lg text-center">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <div className="text-3xl font-bold text-red-500">{stats.errors}</div>
          <div className="text-zinc-400 text-sm">Errors</div>
        </div>
      </div>
    </div>
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
    </>
  );
};

export default Stats;