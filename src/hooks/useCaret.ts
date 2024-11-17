import { useEffect, useState, RefObject } from 'react';

export const useCaret = (
  caretRef: RefObject<HTMLDivElement>,
  isActive: boolean
) => {
  const [caretStyle, setCaretStyle] = useState({
    left: '0px',
    opacity: '0',
  });

  useEffect(() => {
    if (!caretRef.current) return;

    const updateCaret = () => {
      const wordElements = document.querySelectorAll('.word.text-done');
      const currentWord = wordElements[0];
      
      if (currentWord) {
        const letters = currentWord.querySelectorAll('div');
        const currentLetterIndex = Array.from(letters).findIndex(letter => 
          !letter.classList.contains('text-[#d1d0c5]') && 
          !letter.classList.contains('text-[#ca4754]')
        );
        
        const targetLetter = currentLetterIndex === -1 
          ? letters[letters.length - 1] 
          : letters[currentLetterIndex];
          
        const rect = targetLetter.getBoundingClientRect();
        const parentRect = caretRef.current?.parentElement?.getBoundingClientRect();
        
        if (parentRect) {
          setCaretStyle({
            left: `${rect.left - parentRect.left + (currentLetterIndex === -1 ? rect.width : 0)}px`,
            opacity: isActive ? '1' : '0',
          });
        }
      }
    };

    updateCaret();
    window.addEventListener('resize', updateCaret);
    
    // Update caret position more frequently
    const interval = setInterval(updateCaret, 16);
    
    return () => {
      window.removeEventListener('resize', updateCaret);
      clearInterval(interval);
    };
  }, [isActive]);

  return { caretStyle };
};