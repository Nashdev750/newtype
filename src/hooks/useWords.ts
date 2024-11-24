import axios from 'axios';
import { useState, useEffect } from 'react';
import { base_url } from '../constants/utils';


export const useWords = (count: number, language: string = 'english') => {
  const [words, setWords] = useState<string[]>([]);

  useEffect(() => {
    axios.get(base_url+"/challenge/"+language)
    .then(res=>{
      const wordList = res.data.words
      const randomWords = Array.from({ length: 350 }, () => 
        wordList[Math.floor(Math.random() * wordList.length)]
      );
      setWords(randomWords);
    })
    
  }, [count, language]);

  return words;
};