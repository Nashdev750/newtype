import React from 'react';
import { CheckCircle, List, Calculator, LineChart } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-semibold text-[#e2b714]">How the Test Works</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map((step, index) => (
          <div key={index} className="bg-[#2c2e31] p-6 rounded-lg border border-[#444444] flex items-start space-x-4">
            <div className="flex-shrink-0">
              {step.icon}
            </div>
            <div>
              <h3 className="text-xl font-medium text-[#d1d0c5] mb-2">{step.title}</h3>
              <p className="text-[#646669]">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const steps = [
  {
    icon: <List className="w-6 h-6 text-[#e2b714]" />,
    title: "Answer 100 Questions",
    description: "Respond to carefully curated questions about various life experiences and activities."
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-[#e2b714]" />,
    title: "Mark Your Experiences",
    description: "Check boxes for experiences you've had, leaving others unchecked."
  },
  {
    icon: <Calculator className="w-6 h-6 text-[#e2b714]" />,
    title: "Get Your Score",
    description: "Your score is calculated by subtracting checked items from 100."
  },
  {
    icon: <LineChart className="w-6 h-6 text-[#e2b714]" />,
    title: "Compare & Reflect",
    description: "See how your experiences compare to historical averages and reflect on your journey."
  }
];