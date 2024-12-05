import React from 'react';

interface ScoreDisplayProps {
  score: number;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
  const getScoreCategory = () => {
    if (score >= 95) return "Pure as Snow";
    if (score >= 85) return "Quite Innocent";
    if (score >= 70) return "Mostly Pure";
    if (score >= 50) return "Average Experience";
    if (score >= 30) return "Quite Experienced";
    if (score >= 15) return "Very Experienced";
    return "Wild Child";
  };

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
    <div className="text-center p-8 bg-[#2c2e31] rounded-xl shadow-xl border border-[#444444]">
      <h2 className="text-2xl font-bold mb-4 text-[#d1d0c5]">Your Purity Score</h2>
      <div className={`text-8xl font-bold mb-4 ${getScoreColor()}`}>
        {score}
      </div>
      <p className="text-xl text-[#646669]">{getScoreCategory()}</p>
    </div>
  );
};