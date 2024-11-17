import { useState, useEffect } from 'react';

export const useTimer = (initialTime: number, isActive: boolean, onComplete: (boolean) => void) => {
  
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isPaused, setIsPaused] = useState(true);
  
  useEffect(() => {
    if (!isPaused && timeLeft > 0) {
      const timer = setInterval(() => {

        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            onComplete(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isPaused, timeLeft, onComplete]);

  useEffect(() => {
    if (isActive && isPaused) {
      setIsPaused(false);
    }
  }, [isActive]);

  const resetTimer = () => {
    setTimeLeft(initialTime);
    setIsPaused(true);
  };

  return { timeLeft, resetTimer };
};