import React from 'react';
import { Trophy, Medal, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LeaderboardEntry {
  rank: number;
  username: string;
  wpm: number;
  accuracy: number;
}

const dummyData: LeaderboardEntry[] = [
  { rank: 1, username: "speedster", wpm: 156, accuracy: 98.5 },
  { rank: 2, username: "typemaster", wpm: 145, accuracy: 97.8 },
  { rank: 3, username: "swiftkeys", wpm: 142, accuracy: 96.9 },
  { rank: 4, username: "rapidtyper", wpm: 138, accuracy: 96.2 },
  { rank: 5, username: "keywarrior", wpm: 135, accuracy: 95.8 },
  { rank: 6, username: "typingpro", wpm: 132, accuracy: 95.5 },
  { rank: 7, username: "keyhero", wpm: 130, accuracy: 95.2 },
  { rank: 8, username: "fastfingers", wpm: 128, accuracy: 94.8 },
  { rank: 9, username: "keymaster", wpm: 126, accuracy: 94.5 },
  { rank: 10, username: "speedtyper", wpm: 124, accuracy: 94.2 }
];

const RankIcon: React.FC<{ rank: number }> = ({ rank }) => {
  switch (rank) {
    case 1:
      return <Trophy className="w-5 h-5 text-yellow-500" />;
    case 2:
      return <Medal className="w-5 h-5 text-gray-300" />;
    case 3:
      return <Award className="w-5 h-5 text-amber-700" />;
    default:
      return <span className="w-5 text-center">{rank}</span>;
  }
};

export const Leaderboard: React.FC<any> = ({leaders}:any) => {
  return (
    <div className="w-full bg-[#2c2e31] rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#d1d0c5]">Global Leaderboard</h2>
        <div className="flex gap-4 text-sm">
          <button className="text-[#e2b714]">all time</button>
        </div>
      </div>
      
      <div className="space-y-2">
        {leaders.map((entry) => (
          <Link
            to={`/profile/${entry.publicId}`}
            target='_blank'
            key={entry.rank}
            className="flex items-center justify-between p-3 bg-[#363739] rounded-lg hover:bg-[#404244] transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-8">
                <RankIcon rank={entry.rank} />
              </div>
              <span className="text-[#d1d0c5]">{entry.username}...</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-[#d1d0c5]">
                <span className="font-mono">{entry.wpm}</span>
                <span className="text-[#646669] ml-1">wpm</span>
              </div>
              <div className="text-[#d1d0c5] w-20 text-right">
                <span className="font-mono">{entry.accuracy}</span>
                <span className="text-[#646669] ml-1">%</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};