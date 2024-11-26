import React from 'react';
import { Clock, Calendar, User } from 'lucide-react';

export function BlogHeader() {
  return (
    <header className="mb-12">
      <h1 className="text-[#d1d0c5] text-4xl font-bold mb-6">
      MonkeyType: Understanding Speed and Accuracy
      </h1>
      
      <div className="flex flex-wrap items-center gap-6 text-[#646669] text-sm">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4" />
          <span>By MonkeyType</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>November 30, 2024</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>8 min read</span>
        </div>
      </div>
    </header>
  );
}