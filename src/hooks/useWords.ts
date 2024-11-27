import axios from 'axios';
import { useState, useEffect } from 'react';
import { base_url } from '../constants/utils';


export const useWords = (count: number, language: string = 'english',shaffleWords:boolean) => {
  const [words, setWords] = useState<string[]>([]);
  const [wordList, setWordList] = useState<any>()

  useEffect(() => {
    axios.get(base_url+"/challenge/"+language)
    .then(res=>{
      setWordList(res.data.words)
    })
    
  }, [language]);
  useEffect(() => {
      if(!wordList) return;
      const randomWords = Array.from({ length: 350 }, () => 
        wordList[Math.floor(Math.random() * wordList.length)]
      );
      setWords(randomWords);
  }, [count, shaffleWords, wordList]);

  return words;
};