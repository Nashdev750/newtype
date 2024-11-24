import React from 'react';
import { Flame, Clock, Trophy, Star, Hash } from 'lucide-react';

interface FeedOption {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

export default function FeedsMenu() {
  const feeds: FeedOption[] = [
    { icon: <Flame size={20} />, label: 'Hot', active: true },
    { icon: <Clock size={20} />, label: 'Recent' },
    { icon: <Trophy size={20} />, label: 'Top' },
    { icon: <Star size={20} />, label: 'Following' },
  ];

  const popularTags = ['achievement', 'tips', 'practice', 'english1k', 'progress'];

  return (
    <div className="space-y-6">
      <div className="bg-[#2c2c2c] rounded-lg shadow-lg border border-[#404040] overflow-hidden">
        <div className="p-4 border-b border-[#404040]">
          <h2 className="text-lg font-semibold text-white">Feeds</h2>
        </div>
        <div className="divide-y divide-[#404040]">
          {feeds.map((feed) => (
            <button
              key={feed.label}
              className={`w-full flex items-center gap-3 p-4 text-left hover:bg-[#353535] transition-colors ${
                feed.active ? 'text-[#e2b714]' : 'text-[#888]'
              }`}
            >
              {feed.icon}
              <span>{feed.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#2c2c2c] rounded-lg shadow-lg border border-[#404040] overflow-hidden">
        <div className="p-4 border-b border-[#404040]">
          <h2 className="text-lg font-semibold text-white">Popular Tags</h2>
        </div>
        <div className="p-4">
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <button
                key={tag}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#353535] text-sm text-[#888] hover:text-[#e2b714] transition-colors"
              >
                <Hash size={14} />
                <span>{tag}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}