import { useState, useEffect } from 'react';

const wordLists = {
  english: `the be to of and a in that have i it for not on with he as you do at this but his by from they we say her she or an will my one all would there their what so up out if about who get which go me when make can like time no just him know take people into year your good some could them see other than then now look only come its over think also back after use two how our work first well way even new want because any these give day most us`,
  french: `le la les un une des de et à en dans qui que pour sur avec il elle je tu nous vous ils elles ce cette ces mais où quand comment pourquoi car donc alors si bien non oui plus moins peu très trop assez autre même tout tous toute toutes rien personne chose temps jour`,
  german: `der die das ein eine und in zu den mit das ich du er sie es wir ihr sie der die das nicht von bei auf dem zu aus nach mit seit bei wurde sein haben hat kann wird soll muss darf will mag könnte würde möchte wäre hätte sollte müsste dürfte wollte`,
  spanish: `el la los las un una unos unas y en de que a por con para mi tu su nos le lo me te se nos os les lo la los las esto esta estos estas ese esa esos esas aquel aquella aquellos aquellas qué cuál quién dónde cuándo cómo por qué`,
  italian: `il lo la i gli le un uno una dei degli delle e in di a che per con su mi ti ci vi si me te ce ve se ne qui qua lì là questo questa questi queste quello quella quelli quelle chi che cosa dove quando come perché`
};

export const useWords = (count: number, language: string = 'english') => {
  const [words, setWords] = useState<string[]>([]);

  useEffect(() => {
    const wordList = wordLists[language as keyof typeof wordLists].split(' ');
    const randomWords = Array.from({ length: count }, () => 
      wordList[Math.floor(Math.random() * wordList.length)]
    );
    setWords(randomWords);
  }, [count, language]);

  return words;
};