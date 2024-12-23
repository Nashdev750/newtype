import React, { useState, useRef } from 'react';
import { questions } from '../constants/questions';
import { QuestionItem } from '../components/QuestionItem';
import { ScoreDisplay } from '../components/ScoreDisplay';
import { BlogSection } from '../components/BlogSection';
import { Layout } from '../components/Layout';
import { FloatingScore } from '../components/FloatingScore';
import {Helmet} from 'react-helmet'

function RicePurityTest() {
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

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleLoad = () => {
    if (iframeRef.current) {
      iframeRef.current.style.height = `${iframeRef.current.contentWindow?.document.body.scrollHeight}px`;
    }
  };

  return (
    <Layout>
       <Helmet>

                <title>Rice Purity Test</title>
                <meta name="description" content="The rice purity test is a hundred question tests and it defines your purity and innocence, based on questions."/>
                <meta name="keywords" content="Purity, Purity Test, Rice Purity, Rice Purity Test,"/>
                <link rel="canonical" href="https://monkeytype.live/rice-purity-test" />
        </Helmet>
      
     
      <div className="grid gap-4 mb-16">
       <iframe  ref={iframeRef} height={400} width='100%' src='/rice-purity'/>
      </div>

      <BlogSection />

      {showResults && (
        <FloatingScore 
          score={calculateScore()} 
          onScrollToTop={scrollToTop}
        />
      )}
    </Layout>
  );
}

export default RicePurityTest;