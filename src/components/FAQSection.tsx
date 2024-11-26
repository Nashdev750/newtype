import React from 'react';

export function FAQSection() {
  const faqs = [
    {
      question: "What makes MonkeyType different from other typing test websites?",
      answer: "MonkeyType stands out for its clean, modern interface, extensive customization options, and detailed analytics. It offers features like custom themes, multiple language support, and various test modes that cater to both beginners and advanced typists."
    },
    {
      question: "What's the average typing speed for professionals?",
      answer: "Professional typists typically achieve speeds of 65-75 WPM. However, the average office worker types at around 40 WPM. Data entry specialists and transcriptionists often reach speeds of 80+ WPM. On MonkeyType, many experienced users regularly achieve speeds over 100 WPM."
    },
    {
      question: "How can I track my progress on MonkeyType?",
      answer: "MonkeyType provides comprehensive progress tracking through personal accounts, including detailed statistics, historical data, and performance graphs. You can monitor improvements in speed, accuracy, and consistency over time."
    },
    {
      question: "How long does it take to improve typing speed?",
      answer: "With dedicated practice on platforms like MonkeyType, most people can see significant improvements within 2-4 weeks. However, reaching expert levels (100+ WPM) usually takes several months of consistent practice."
    },
    {
      question: "Should I look at the keyboard while typing?",
      answer: "For optimal typing speed and accuracy, it's recommended to develop touch typing skills without looking at the keyboard. This allows you to maintain focus on the text and reduces the cognitive load of switching attention."
    },
    {
      question: "Does keyboard type affect typing speed?",
      answer: "While keyboard type can affect comfort and efficiency, typing speed is more dependent on skill and practice. However, factors like key travel, actuation force, and layout can impact your typing experience and long-term comfort."
    }
  ];

  return (
    <section className="mt-16">
      <h2 className="text-[#d1d0c5] text-2xl font-bold mb-8">Frequently Asked Questions</h2>
      <div className="space-y-8">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-[#646669]/20 pb-6 last:border-none">
            <h3 className="text-[#d1d0c5] font-semibold mb-3">{faq.question}</h3>
            <p className="text-[#646669] leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}