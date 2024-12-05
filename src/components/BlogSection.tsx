import React from 'react';
import { FAQ } from './FAQ';
import { HowItWorks } from './HowItWorks';
import { Statistics } from './Statistics';

export const BlogSection: React.FC = () => {
  return (
    <article className="prose prose-invert lg:prose-xl mx-auto mt-16 px-4 space-y-16">
      <h1 className="text-4xl font-bold mb-8 text-[#d1d0c5]">The Rice Purity Test: A Comprehensive Guide to Self-Discovery</h1>
      
      <div className="space-y-16">
        {sections.map((section, index) => (
          <section key={index} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#e2b714]">{section.title}</h2>
            <div className="text-[#646669] space-y-4">
              {section.content}
            </div>
          </section>
        ))}

        <HowItWorks />
        <Statistics />
        <FAQ />
      </div>
    </article>
  );
};

const sections = [
  {
    title: "What is the Rice Purity Test?",
    content: (
      <>
        <p>
          The Rice Purity Test, originally created at Rice University, has evolved into a fascinating cultural phenomenon that transcends its academic origins. This comprehensive assessment, featuring 100 carefully crafted questions, serves as a unique mirror reflecting life experiences across various domains - from innocent everyday moments to more adventurous endeavors.
        </p>
        <p>
          What sets this test apart is its ability to spark meaningful conversations about personal experiences, societal norms, and individual choices. It's not just a questionnaire; it's a journey of self-discovery that has captivated generations of participants.
        </p>
      </>
    )
  },
  {
    title: "The Science Behind the Scores",
    content: (
      <>
        <p>
          The scoring system operates on a deceptively simple principle: start at 100 and subtract a point for each "yes" answer. However, the true complexity lies in what these numbers represent. Research in social psychology suggests that such self-assessment tools can provide valuable insights into personal development and social dynamics.
        </p>
        <p>
          Understanding your score requires context - it's not about judgment but rather about reflection and self-awareness. Each number tells a unique story, shaped by individual circumstances, cultural background, and life choices.
        </p>
      </>
    )
  },
  {
    title: "Impact on Modern Culture",
    content: (
      <>
        <p>
          In today's digital age, the Rice Purity Test has gained renewed relevance. Social media has transformed it from a campus curiosity into a global conversation starter. Its questions reflect evolving societal norms while maintaining its core purpose: fostering open discussions about life experiences.
        </p>
        <p>
          The test's enduring popularity speaks to our fundamental need to understand ourselves and connect with others through shared experiences. It provides a structured way to explore and discuss topics that might otherwise remain unaddressed.
        </p>
      </>
    )
  },
  {
    title: "Personal Growth and Self-Discovery",
    content: (
      <>
        <p>
          Beyond its entertainment value, the Rice Purity Test serves as a powerful tool for personal growth. It encourages honest self-reflection and helps individuals understand their own boundaries and values. The process of taking the test can lead to valuable insights about one's life choices and future aspirations.
        </p>
        <p>
          Many participants report that the test helped them better understand their own experiences and make more conscious decisions about their future. It's not just about the final score - it's about the journey of self-discovery it initiates.
        </p>
      </>
    )
  },
  {
    title: "Looking to the Future",
    content: (
      <>
        <p>
          As we move forward, the Rice Purity Test continues to evolve while maintaining its essential character. New generations bring fresh perspectives, and the test adapts to reflect changing social norms and values. Its fundamental purpose - promoting self-reflection and meaningful discussion - remains as relevant as ever.
        </p>
        <p>
          Whether used for personal insight, social bonding, or cultural commentary, the test continues to provide valuable perspectives on human experience. In an increasingly complex world, such tools for self-understanding become ever more valuable.
        </p>
      </>
    )
  }
];