import React from 'react';

export function PracticeGuide() {
  return (
    <div className="my-12">
      <h2 className="text-[#d1d0c5] text-2xl font-bold mb-6">Structured Practice Guide</h2>
      
      <div className="space-y-8">
        <div>
          <h3 className="text-[#d1d0c5] font-semibold mb-3">1. Daily Warm-up Routine</h3>
          <p className="text-[#646669] leading-relaxed">
            Start each practice session with a 5-10 minute warm-up using MonkeyType's custom word lists. Focus on accuracy over speed during this phase to establish proper finger positioning and movement patterns.
          </p>
        </div>

        <div>
          <h3 className="text-[#d1d0c5] font-semibold mb-3">2. Progressive Challenge System</h3>
          <p className="text-[#646669] leading-relaxed">
            Gradually increase difficulty through:
          </p>
          <ul className="list-disc list-inside text-[#646669] mt-2">
            <li>Starting with common words</li>
            <li>Progressing to advanced vocabulary</li>
            <li>Incorporating punctuation and numbers</li>
            <li>Practicing with code snippets</li>
          </ul>
        </div>

        <div>
          <h3 className="text-[#d1d0c5] font-semibold mb-3">3. Error Analysis</h3>
          <p className="text-[#646669] leading-relaxed">
            Use MonkeyType's analytics to identify and focus on problematic keys or combinations. Create custom practice sets targeting these specific weaknesses.
          </p>
        </div>

        <div>
          <h3 className="text-[#d1d0c5] font-semibold mb-3">4. Speed Building</h3>
          <p className="text-[#646669] leading-relaxed">
            Once accuracy is consistently above 95%, focus on speed through:
          </p>
          <ul className="list-disc list-inside text-[#646669] mt-2">
            <li>Timed challenges</li>
            <li>Word bursts</li>
            <li>Quote practice</li>
            <li>Competition modes</li>
          </ul>
        </div>
      </div>
    </div>
  );
}