import React, { useState, useEffect, useRef } from 'react';
import { useWords } from '../hooks/useWords';
import { useCaret } from '../hooks/useCaret';
import { useTypingStats } from '../hooks/useTypingStats';
import { Timer } from './Timer';
import Stats from './Stats';
import { Footer } from './Footer';
import axios from 'axios';
import { base_url } from '../constants/utils';
import { useAuth } from '../contexts/AuthContext';
import SpeedAnalysis from './SpeedAnalysis';
import { Header } from './Header';
import { calculateWPM } from '../helpers/utils';

interface Props {
  mode: 'time' | 'words';
  timeLimit: number;
  language: string;
  timeLeft: number;
  setIsActive: (isActive: boolean) => void;
  isActive: boolean;
  isComplete: boolean;
  setIsComplete: (isComplete: boolean) => void;
  resetTimer: () => void;
  handleTestComplete: (data: any) => void;
}

interface LetterState {
  char: string;
  state: 'untyped' | 'correct' | 'incorrect';
}

export const TypingTest = React.memo(function TypingTest({ mode, timeLimit, language, timeLeft, setIsActive, isActive, isComplete, setIsComplete, resetTimer,handleTestComplete }: Props) {

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [wordStates, setWordStates] = useState<LetterState[][]>([]);
  
  const [mistakes, setMistakes] = useState<Set<number>>(new Set());
  const [scrollOffset, setScrollOffset] = useState(0);
  const [keystrokes, setKeystrokes] = useState<any[]>([]);
  const [startTime, setStartTime] = useState<any>();
  const [shaffleWords,setShaffleWords] = useState(false)
  
  const caretRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const wordsContainerRef = useRef<HTMLDivElement>(null);
  let words = useWords(500, language,shaffleWords);
  const { profile } = useAuth();

  useEffect(() => {
    const initialStates = words.map(word => 
      word.split('').map(char => ({ char, state: 'untyped' as const }))
    );
    setWordStates(initialStates);
  }, [words]);

 

  
  const { caretStyle } = useCaret(caretRef, isActive, shaffleWords);
  const stats = useTypingStats(words, currentWordIndex, mistakes, timeLimit, timeLeft);
  

  const resetTest = () => {
    setIsActive(false);
    setCurrentWordIndex(0);
    setCurrentLetterIndex(0);
    setMistakes(new Set());
    setIsComplete(false);
    setScrollOffset(0);
    const initialStates = words.map(word => 
      word.split('').map(char => ({ char, state: 'untyped' as const }))
    );
    setWordStates(initialStates);
    setKeystrokes([]);
    resetTimer();
    setShaffleWords(!shaffleWords)
  };

  useEffect(() => {
    const handleClick = () => {
      if (!isComplete) inputRef.current?.focus();
    };
    if(isComplete){
      const {wpm,raw} = calculateWPM(keystrokes,timeLimit);
      handleTestComplete({ wpm, keystrokes, rawWpm:raw, accuracy:stats.accuracy, testType:language, timeSpent:timeLimit -  timeLeft,time:timeLimit });
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isComplete]);

  // Update scroll position when words go beyond the visible area
 

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isActive){
      setIsActive(true);
      setStartTime(Date.now());
      if(profile){
        axios.get(`${base_url}/test-started/${profile?.user?.id}`);
      }
    } 
    if (e.key.length === 1) {
      const currentWord = words[currentWordIndex];
      if (currentLetterIndex < currentWord.length) {
        const isCorrect = e.key === currentWord[currentLetterIndex];
        setKeystrokes(prev => [...prev, { timestamp: startTime ? Date.now() - startTime : Date.now(), correct: isCorrect }]);
      }
    }

    if (e.key === ' ') {
      e.preventDefault();
      if (currentLetterIndex === words[currentWordIndex].length) {
        if (wordsContainerRef.current && currentWordIndex < words.length - 1) {
          const words = wordsContainerRef.current.querySelectorAll('.word');
          const currentWord = words[currentWordIndex];
          const nextWord = words[currentWordIndex + 1];
          
          if (currentWord && nextWord) {
            const currentRect = currentWord.getBoundingClientRect();
            const nextRect = nextWord.getBoundingClientRect();
            if (nextRect.top > currentRect.top) {
              setScrollOffset(prev => prev + currentRect.height);
            }
          }
        }
        
        setCurrentWordIndex(prev => prev + 1);
        setCurrentLetterIndex(0);
      }
      return;
    }

    if (e.key === 'Backspace') {
      if (currentLetterIndex > 0) {
        // If we're in the middle of a word, just move back one letter
        const newWordStates = [...wordStates];
        newWordStates[currentWordIndex][currentLetterIndex - 1].state = 'untyped';
        setWordStates(newWordStates);
        setCurrentLetterIndex(prev => prev - 1);
      } else if (currentWordIndex > 0) {
        if (wordsContainerRef.current) {
          const words = wordsContainerRef.current.querySelectorAll('.word');
          const currentWord = words[currentWordIndex];
          const previousWord = words[currentWordIndex - 1];
          
          if (currentWord && previousWord) {
            const currentRect = currentWord.getBoundingClientRect();
            const previousRect = previousWord.getBoundingClientRect();
            if (previousRect.top < currentRect.top) {
              setScrollOffset(prev => prev - currentRect.height);
            }
          }
        }

        // Move to previous word
        const previousWordLength = words[currentWordIndex - 1].length;
        setCurrentWordIndex(prev => prev - 1);
        setCurrentLetterIndex(previousWordLength);
      }
      return;
    }

    if (e.key.length === 1) {
      const currentWord = words[currentWordIndex];
      if (currentLetterIndex < currentWord.length) {
        const newWordStates = [...wordStates];
        const isCorrect = e.key === currentWord[currentLetterIndex];
        
        newWordStates[currentWordIndex][currentLetterIndex].state = 
          isCorrect ? 'correct' : 'incorrect';
        
        if (!isCorrect && !mistakes.has(currentWordIndex)) {
          setMistakes(new Set(mistakes).add(currentWordIndex));
        }
        
        setWordStates(newWordStates);
        setCurrentLetterIndex(prev => prev + 1);
      }
    }
  };

  if (isComplete) {
    return<>
     <SpeedAnalysis keystrokes={keystrokes} time={timeLimit}/>
     <Footer onRestart={resetTest} />
     </>
  }

  return (
    <>
    
    <div className="w-full max-w-[850px] relative" onClick={(e:any) =>{
          // e.preventDefault(); 
          inputRef.current?.focus()
    }}>
      <Timer timeLeft={timeLeft} />
      
      <input
        ref={inputRef}
        type="text"
        className="absolute opacity-0 top-0 left-0"
        onKeyDown={handleKeyDown}
        autoFocus
      />
      
      <div className="relative h-[7.2rem] overflow-hidden">
        <div 
          ref={caretRef}
          className="absolute w-0.5 h-[2.4rem] bg-[#e2b714] transition-all duration-100 animate-pulse z-10"
          style={{
            ...caretStyle
          }}
        />
        
        <div 
          ref={wordsContainerRef}
          className="text-[1.5rem] leading-[2.4rem] font-mono tracking-wide flex flex-wrap gap-x-2 transition-transform duration-200"
          style={{
            transform: `translateY(-${scrollOffset}px)`,
          }}
        >
          {wordStates.map((word, wordIndex) => (
            <div
              key={wordIndex}
              className={`word flex ${wordIndex === currentWordIndex ? 'text-done' : 'text-[#646669]'}`}
            >
              {word.map((letter, letterIndex) => (
                <div
                  key={letterIndex}
                  className={`
                    ${letter.state === 'correct' ? 'text-[#d1d0c5]' : ''}
                    ${letter.state === 'incorrect' ? 'text-[#ca4754]' : ''}
                    ${letter.state === 'untyped' ? '' : ''}
                  `}
                >
                  {letter.char}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer onRestart={resetTest} />
    </>
  );
});