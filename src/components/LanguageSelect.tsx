import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';

interface Props {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
}

export const LanguageSelect: React.FC<Props> = ({ options, value, onChange, icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };
    console.log('mount')
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={(e:any) =>{
          setIsOpen(!isOpen)
          e.stopPropagation()
        } 
      }
        className="hover:text-[#d1d0c5] transition-colors flex items-center gap-2 
                 text-[#646669] font-medium"
      >
        {icon}
        <span>{value}</span>
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-200 
                   ${isOpen ? 'transform rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-[#2c2e31] 
                     rounded-lg shadow-lg overflow-hidden z-50 border border-[#363739]">
          <div className="p-2 border-b border-[#363739]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 
                             text-[#646669] w-4 h-4" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full pl-9 pr-4 py-2 bg-[#232427] text-[#d1d0c5] 
                         rounded-md placeholder-[#646669] focus:outline-none
                         focus:ring-2 focus:ring-[#e2b714] focus:ring-opacity-50"
              />
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto scrollbar-none">
            {filteredOptions.map((option) => (
              <button
                key={option}
                className="w-full text-left px-4 py-2 text-[#646669] 
                         hover:text-[#d1d0c5] hover:bg-[#363739] 
                         transition-colors flex items-center justify-between"
                onClick={(e:any) => {
                  onChange(option);
                  setIsOpen(false);
                  setSearchQuery('');
                  e.stopPropagation()
                }}
              >
                <span>{option}</span>
                {option === value && (
                  <div className="w-2 h-2 rounded-full bg-[#e2b714]" />
                )}
              </button>
            ))}
            
            {filteredOptions.length === 0 && (
              <div className="px-4 py-3 text-[#646669] text-center">
                No matches found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};