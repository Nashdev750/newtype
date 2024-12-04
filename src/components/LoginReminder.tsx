import React, { useState } from 'react';
import { LogIn, X } from 'lucide-react';

export function LoginReminder() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="w-full bg-zinc-800/95 text-zinc-200 border-b border-zinc-700/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-full flex-1 flex items-center justify-center">
            <span className="flex p-2">
            <a 
                href="/account" 
                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-800 focus:ring-emerald-500/50 transition-all duration-200"
                aria-label="Sign in"
              >
                <LogIn className="h-4 w-4" />
              </a>
            </span>
            <p className="ml-3 font-medium flex items-center gap-2">
              <span className="text-zinc-200">Sign in to save your typing progress and track your improvements!</span>
           
            </p>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="ml-4 flex-shrink-0 inline-flex p-2 rounded-full hover:bg-zinc-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-800 focus:ring-zinc-600 transition-all duration-200"
            aria-label="Dismiss"
          >
            <X className="h-5 w-5 text-zinc-400 hover:text-zinc-200" />
          </button>
        </div>
      </div>
    </div>
  );
}