import React from 'react';

export const Statistics: React.FC = () => {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold text-[#e2b714]">Historical Statistics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-[#2c2e31] p-6 rounded-lg border border-[#444444]">
            <h3 className="text-xl font-medium text-[#d1d0c5] mb-2">{stat.category}</h3>
            <div className="text-3xl font-bold text-[#e2b714] mb-2">{stat.average}</div>
            <p className="text-[#646669] text-sm">{stat.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#2c2e31] p-6 rounded-lg border border-[#444444] mt-8">
        <h3 className="text-xl font-medium text-[#d1d0c5] mb-4">Score Distribution</h3>
        <div className="space-y-4">
          {distribution.map((range, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-[#646669]">
                <span>{range.label}</span>
                <span>{range.percentage}%</span>
              </div>
              <div className="w-full bg-[#444444] rounded-full h-2">
                <div
                  className="bg-[#e2b714] h-2 rounded-full"
                  style={{ width: `${range.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const stats = [
  {
    category: "Average College Freshman",
    average: "62",
    description: "Based on data from first-year university students"
  },
  {
    category: "Average College Senior",
    average: "39",
    description: "Typical score for graduating students"
  },
  {
    category: "Most Common Score",
    average: "45-55",
    description: "The range where most test-takers fall"
  },
  {
    category: "High School Average",
    average: "83",
    description: "Typical score for high school students"
  },
  {
    category: "Adult Average (25+)",
    average: "35",
    description: "Average score for adults over 25"
  },
  {
    category: "Global Average",
    average: "47",
    description: "Based on millions of test submissions"
  }
];

const distribution = [
  { label: "90-100", percentage: 15 },
  { label: "70-89", percentage: 25 },
  { label: "50-69", percentage: 30 },
  { label: "30-49", percentage: 20 },
  { label: "0-29", percentage: 10 }
];