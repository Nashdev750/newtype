import React from 'react';

export const FAQ: React.FC = () => {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold text-[#e2b714]">Frequently Asked Questions</h2>
      {faqItems.map((item, index) => (
        <div key={index} className="bg-[#2c2e31] p-6 rounded-lg border border-[#444444]">
          <h3 className="text-xl font-medium text-[#d1d0c5] mb-2">{item.question}</h3>
          <p className="text-[#646669]">{item.answer}</p>
        </div>
      ))}
    </section>
  );
};

const faqItems = [
  {
    question: "Is the Rice Purity Test anonymous?",
    answer: "Yes, the test is completely anonymous. Your responses are not stored or shared with anyone."
  },
  {
    question: "What's considered a 'normal' score?",
    answer: "There's no 'normal' score - everyone's life experiences are different. Most college students score between 35-65, but scores vary widely based on age, background, and personal choices."
  },
  {
    question: "Can I retake the test?",
    answer: "Absolutely! Many people retake the test periodically to track how their experiences change over time."
  },
  {
    question: "Should I be honest when taking the test?",
    answer: "Yes, being honest provides the most meaningful results. The test is for personal reflection, not judgment."
  },
  {
    question: "What do the different score ranges mean?",
    answer: "Scores range from 0-100, with 100 being 'pure' and lower scores indicating more life experiences. However, these numbers don't define your character or worth."
  }
];