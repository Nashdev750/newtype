import React from 'react';

interface QuestionItemProps {
  question: string;
  index: number;
  isChecked: boolean;
  onChange: (index: number) => void;
}

export const QuestionItem: React.FC<QuestionItemProps> = ({
  question,
  index,
  isChecked,
  onChange,
}) => {
  return (
    <div className="flex items-center space-x-3 p-4 bg-[#2c2e31] rounded-lg shadow-md hover:bg-[#2a2b2e] transition-colors border border-[#444444]">
      <input
        type="checkbox"
        id={`question-${index}`}
        checked={isChecked}
        onChange={() => onChange(index)}
        className="w-5 h-5 text-[#e2b714] bg-[#323437] border-[#646669] rounded focus:ring-[#e2b714] focus:ring-offset-[#2c2e31]"
      />
      <label
        htmlFor={`question-${index}`}
        className="flex-1 text-[#d1d0c5] cursor-pointer text-base py-1"
      >
        {index + 1}. {question}
      </label>
    </div>
  );
};