import React from 'react';
import { Share2, Github, Twitter } from 'lucide-react';

export function ShareSection() {
  return (
    <div className="mt-12 pt-8 border-t border-[#646669]/20">
      <div className="flex items-center justify-between">
        <span className="text-[#d1d0c5]">Share this article</span>
        <div className="flex gap-4">
          <button className="text-[#646669] hover:text-[#d1d0c5] transition-colors">
            <Twitter className="w-5 h-5" />
          </button>
          <button className="text-[#646669] hover:text-[#d1d0c5] transition-colors">
            <Github className="w-5 h-5" />
          </button>
          <button className="text-[#646669] hover:text-[#d1d0c5] transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}