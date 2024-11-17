import { useState, useEffect } from 'react';

interface TypingStats {
  wpm: number;
  accuracy: number;
  errors: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
}

export const useTypingStats = (
  words: string[],
  currentIndex: number,
  mistakes: Set<number>,
  timeLimit: number,
  timeLeft: number
) => {
  const [stats, setStats] = useState<TypingStats>({
    wpm: 0,
    accuracy: 100,
    errors: 0,
    correctChars: 0,
    incorrectChars: 0,
    totalChars: 0,
  });

  useEffect(() => {
    const elapsedTime = (timeLimit - timeLeft) / 60; // in minutes
    if (elapsedTime <= 0) return;

    const typedWords = words.slice(0, currentIndex);
    const totalChars = typedWords.reduce((acc, word) => acc + word.length, 0);
    const incorrectChars = Array.from(mistakes).reduce((acc, index) => {
      return acc + words[index].length;
    }, 0);
    const correctChars = totalChars - incorrectChars;

    const wpm = Math.round((correctChars / 5) / elapsedTime);
    const accuracy = Math.round((correctChars / totalChars) * 100) || 100;

    setStats({
      wpm,
      accuracy,
      errors: mistakes.size,
      correctChars,
      incorrectChars,
      totalChars,
    });
  }, [words, currentIndex, mistakes, timeLimit, timeLeft]);

  return stats;
};