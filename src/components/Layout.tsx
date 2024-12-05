import React from 'react';
import { ScrollText } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#323437]">
      <header className="bg-[#2c2e31] shadow-lg border-b border-[#2c2e31]">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ScrollText className="h-8 w-8 text-[#e2b714]" />
              <h1 className="text-3xl font-bold text-[#d1d0c5]">Rice Purity Test</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>

      <footer className="bg-[#2c2e31] border-t border-[#2c2e31]">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-[#646669]">
            © {new Date().getFullYear()} Rice Purity Test. For entertainment purposes only.
          </p>
        </div>
      </footer>
    </div>
  );
};