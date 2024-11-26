import React from 'react';

export function TypingResources() {
  return (
    <div className="my-12 bg-[#2c2e31] rounded-lg p-8">
      <h2 className="text-[#d1d0c5] text-xl font-bold mb-6">Essential Resources for Typing Mastery</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-[#d1d0c5] font-semibold mb-3">Online Platforms</h3>
          <ul className="list-disc list-inside text-[#646669]">
            <li>MonkeyType - Modern, customizable typing practice</li>
            <li>TypeRacer - Competitive typing races</li>
            <li>Keybr - Adaptive learning system</li>
            <li>10FastFingers - Traditional typing tests</li>
          </ul>
        </div>

        <div>
          <h3 className="text-[#d1d0c5] font-semibold mb-3">Learning Materials</h3>
          <ul className="list-disc list-inside text-[#646669]">
            <li>Touch typing courses</li>
            <li>Finger positioning guides</li>
            <li>Ergonomic typing tutorials</li>
            <li>Speed building exercises</li>
          </ul>
        </div>

        <div>
          <h3 className="text-[#d1d0c5] font-semibold mb-3">Equipment Recommendations</h3>
          <ul className="list-disc list-inside text-[#646669]">
            <li>Mechanical keyboards</li>
            <li>Ergonomic wrist rests</li>
            <li>Monitor stands</li>
            <li>Adjustable chairs</li>
          </ul>
        </div>
      </div>
    </div>
  );
}