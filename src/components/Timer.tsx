import React from 'react';

interface Props {
  timeLeft: number;
}

export const Timer: React.FC<Props> = ({ timeLeft }) => {
  return (
    <div className="absolute -top-10 left-0 text-2xl font-mono text-[#d1d0c5]">
      {timeLeft}s
    </div>
  );
};