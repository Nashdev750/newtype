import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface Props {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
}

export const Dropdown: React.FC<Props> = ({ options, value, onChange, icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hover:text-[#d1d0c5] transition-colors flex items-center gap-2"
      >
        {icon}
        <span>{value}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-[#2c2e31] rounded-lg shadow-lg py-1 z-50">
          {options.map((option) => (
            <button
              key={option}
              className="w-full text-left px-4 py-2 text-[#646669] hover:text-[#d1d0c5] hover:bg-[#363739] transition-colors"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};