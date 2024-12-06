import React, { useState, useRef } from 'react';
import { questions } from '../constants/questions';
import { QuestionItem } from '../components/QuestionItem';
import { ScoreDisplay } from '../components/ScoreDisplay';
import { BlogSection } from '../components/BlogSection';
import { FloatingScore } from '../components/FloatingScore';
import {Helmet} from 'react-helmet'

function RicePuritySub() {
  const [checkedQuestions, setCheckedQuestions] = useState<boolean[]>(new Array(questions.length).fill(false));
  const [showResults, setShowResults] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const handleQuestionChange = (index: number) => {
    const newCheckedQuestions = [...checkedQuestions];
    newCheckedQuestions[index] = !newCheckedQuestions[index];
    setCheckedQuestions(newCheckedQuestions);
    
    if (!showResults) {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    const checkedCount = checkedQuestions.filter(Boolean).length;
    return 100 - checkedCount;
  };

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
       <Helmet>

                <title>Rice Purity Test</title>
                <meta name="description" content="The rice purity test is a hundred question tests and it defines your purity and innocence, based on questions."/>
                <meta name="keywords" content="Purity, Purity Test, Rice Purity, Rice Purity Test,"/>
        </Helmet>
      <div ref={topRef}>
        {showResults && (
          <div className="mb-12">
            <ScoreDisplay score={calculateScore()} />
          </div>
        )}
      </div>
     
      <div className="grid gap-4 mb-16">
        {questions.map((question, index) => (
          <QuestionItem
            key={index}
            question={question}
            index={index}
            isChecked={checkedQuestions[index]}
            onChange={handleQuestionChange}
          />
        ))}
      </div>


      {showResults && (
        <FloatingScore 
          score={calculateScore()} 
          onScrollToTop={scrollToTop}
        />
      )}
    </>
  );
}

export default RicePuritySub;