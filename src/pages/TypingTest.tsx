import React, { useEffect, useState } from 'react';
import { Command, Timer, Keyboard, Settings, Globe } from 'lucide-react';
import { TypingTest } from '../components/TypingTest';
import { Header } from '../components/Header';
import { Dropdown } from '../components/Dropdown';
import { Leaderboard } from '../components/Leaderboard';
import { useTimer } from '../hooks/useTimer';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { base_url, challenges } from '../constants/utils';
import { LanguageSelect } from '../components/LanguageSelect';
import { ArrowLeft } from 'lucide-react';
import { BlogHeader } from '../components/BlogHeader';
import { ShareSection } from '../components/ShareSection';
import { FAQSection } from '../components/FAQSection';
import { MonkeyTypeComparison } from '../components/MonkeyTypeComparison';
import { TypingResources } from '../components/TypingResources';
import { PracticeGuide } from '../components/PracticeGuide';
import { Helmet } from 'react-helmet';


const languages = ['english', 'french', 'german', 'spanish', 'italian'];
const times = ['15', '30', '60', '120'];

function TypingTestPage() {
  const [language, setLanguage] = useState('english');
  const [time, setTime] = useState('30');
  const [mode, setMode] = useState<'time' | 'words'>('time');
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const { profile } = useAuth(); 

  const handleTestComplete = (data) => {
    setIsActive(false);

      axios.post(`${base_url}/typing-test`, { userId:profile?.user?.id, time, ...data })
    
   
  };

  const { timeLeft, resetTimer } = useTimer(parseInt(time), isActive, setIsComplete);

  useEffect(() => {
    resetTimer();
  }, [time]);

  return (
    <div className="min-h-screen bg-[#323437] text-[#646669] flex flex-col">
      <Helmet>
            <link rel="canonical" href="https://monkeytype.live/" />
      </Helmet>
      <Header/>
      
      <main className="flex-1 flex flex-col items-center w-full px-6 mt-4">
        <div className="w-full max-w-[850px] flex flex-col items-center mb-12">
          {/* Top Settings Bar */}
          {!isComplete &&
            <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            <LanguageSelect
            options={challenges}
            value={language}
            onChange={setLanguage}
            icon={<Globe className="w-4 h-4" />}
            />
            <Dropdown
              options={times}
              value={time}
              onChange={setTime}
              icon={<Timer className="w-4 h-4" />}
            />
            {/* <button className="hover:text-[#d1d0c5] transition-colors flex items-center gap-2">
              <Keyboard className="w-4 h-4" />
              default
            </button>
            <button className="hover:text-[#d1d0c5] transition-colors">
              <Settings className="w-4 h-4" />
            </button> */}
          </div>
          }
          

          {showLeaderboard ? (
            <Leaderboard />
          ) : (
            <TypingTest 
              key={`${language}-${time}-${mode}`}
              mode={mode} 
              timeLimit={parseInt(time)} 
              language={language}
              timeLeft={timeLeft}
              setIsActive = {setIsActive}
              isActive = {isActive}
              isComplete = {isComplete}
              setIsComplete = {setIsComplete}
              resetTimer = {resetTimer}
              handleTestComplete = {handleTestComplete}
            />
          )}

          {/* blog */}
          <article className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Navigation */}
          <div className="mb-12">
            {/* <button className="text-[#646669] hover:text-[#d1d0c5] flex items-center gap-2 group mb-8">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to typing test
            </button> */}
          </div>

          <BlogHeader />

          {/* Featured Image */}
          <div className="mb-12">
            <img 
              src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200" 
              alt="Mechanical keyboard with RGB lighting" 
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-invert max-w-none">
            <p className="text-[#d1d0c5] text-lg leading-relaxed mb-6">
              The journey to becoming a proficient typist is more than just memorizing key positions and building muscle memory. It's a fascinating intersection of cognitive science, motor skills, and psychological factors that all play crucial roles in determining both speed and accuracy. With the rise of modern typing tools like MonkeyType, mastering the art of typing has become more accessible and engaging than ever before.
            </p>

            <h2 className="text-[#d1d0c5] text-2xl font-bold mt-12 mb-6">The Evolution of Typing Practice</h2>
            <p className="text-[#646669] leading-relaxed mb-6">
              From traditional typewriters to modern platforms like MonkeyType, the way we practice and improve our typing skills has undergone a remarkable transformation. Today's typing tools offer sophisticated analytics, customizable practice sessions, and real-time feedback that was unimaginable just a few decades ago.
            </p>

            <h2 className="text-[#d1d0c5] text-2xl font-bold mt-12 mb-6">Understanding Modern Typing Tests</h2>
            <p className="text-[#646669] leading-relaxed mb-6">
              Modern typing tests, particularly those offered by platforms like MonkeyType, have revolutionized how we measure and improve typing proficiency. These tests typically measure:
            </p>

            <ul className="list-disc list-inside text-[#646669] mb-6 space-y-2">
              <li>Words Per Minute (WPM)</li>
              <li>Characters Per Minute (CPM)</li>
              <li>Accuracy percentage</li>
              <li>Error rate and consistency</li>
              <li>Raw vs. adjusted typing speed</li>
            </ul>

            <h2 className="text-[#d1d0c5] text-2xl font-bold mt-12 mb-6">The Cognitive Process</h2>
            <p className="text-[#646669] leading-relaxed mb-6">
              When we type, our brain processes information through multiple channels simultaneously. The visual system recognizes words, the motor cortex coordinates finger movements, and procedural memory helps us maintain rhythm and flow. This complex orchestration of mental processes is what makes typing such a unique skill to develop.
            </p>

            <MonkeyTypeComparison />

            <h2 className="text-[#d1d0c5] text-2xl font-bold mt-12 mb-6">Building Speed and Accuracy</h2>
            <p className="text-[#646669] leading-relaxed mb-6">
              Research shows that the fastest typists aren't necessarily those who move their fingers the quickest, but rather those who have developed efficient typing patterns and can maintain a consistent rhythm. This rhythm, often called "flow state," is characterized by:
            </p>

            <ul className="list-disc list-inside text-[#646669] mb-6 space-y-2">
              <li>Reduced cognitive load through automation</li>
              <li>Improved error detection and correction</li>
              <li>Enhanced pattern recognition</li>
              <li>Optimized finger movement patterns</li>
            </ul>

            <blockquote className="border-l-4 border-[#d1d0c5] pl-6 my-8">
              <p className="text-[#d1d0c5] italic">
                "The key to typing faster isn't about moving faster—it's about moving smarter."
              </p>
            </blockquote>

            <PracticeGuide />

            <h2 className="text-[#d1d0c5] text-2xl font-bold mt-12 mb-6">Advanced Techniques</h2>
            <p className="text-[#646669] leading-relaxed mb-6">
              Beyond basic touch typing, advanced typists employ several sophisticated techniques to maintain high speeds:
            </p>

            <ul className="list-disc list-inside text-[#646669] mb-6 space-y-2">
              <li>Look-ahead reading to process upcoming text</li>
              <li>Burst typing for common word patterns</li>
              <li>Rhythmic typing to maintain consistent speed</li>
              <li>Error prevention through pattern recognition</li>
            </ul>

            <h2 className="text-[#d1d0c5] text-2xl font-bold mt-12 mb-6">The Psychology of Typing</h2>
            <p className="text-[#646669] leading-relaxed mb-6">
              The mental aspects of typing are often overlooked but play a crucial role in performance. Factors such as stress, motivation, and focus can significantly impact typing speed and accuracy. Understanding these psychological elements can help typists optimize their practice sessions and achieve better results.
            </p>

            <h2 className="text-[#d1d0c5] text-2xl font-bold mt-12 mb-6">The Impact of Equipment</h2>
            <p className="text-[#646669] leading-relaxed mb-6">
              While skill is paramount, the right equipment can enhance your typing experience. Mechanical keyboards, ergonomic layouts, and proper positioning all contribute to sustained performance and comfort during long typing sessions.
            </p>

            <TypingResources />

            <h2 className="text-[#d1d0c5] text-2xl font-bold mt-12 mb-6">Conclusion</h2>
            <p className="text-[#646669] leading-relaxed mb-6">
              Mastering typing is a journey that combines physical skill, cognitive development, and consistent practice. Modern tools like MonkeyType have made this journey more accessible and enjoyable than ever before. By understanding the science behind typing and implementing structured practice techniques, anyone can significantly improve their typing speed and accuracy. Remember that progress is personal, and the key is to focus on steady improvement rather than comparing yourself to others.
            </p>
          </div>

          <FAQSection />
          <ShareSection />
        </div>
      </article>
          {/* blog */}
        </div>
      </main>
    </div>
  );
}

export default TypingTestPage;