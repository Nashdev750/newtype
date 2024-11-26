import React from 'react';

export function MonkeyTypeComparison() {
  return (
    <div className="my-12 bg-[#2c2e31] rounded-lg p-8">
      <h3 className="text-[#d1d0c5] text-xl font-bold mb-6">Why MonkeyType Stands Out</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-[#d1d0c5] font-semibold mb-2">Customization Options</h4>
          <p className="text-[#646669]">
            MonkeyType offers unparalleled customization options, allowing users to tailor their typing experience through:
          </p>
          <ul className="list-disc list-inside text-[#646669] mt-2">
            <li>Custom word lists and text content</li>
            <li>Adjustable time limits and word counts</li>
            <li>Theme customization</li>
            <li>Language selection</li>
          </ul>
        </div>

        <div>
          <h4 className="text-[#d1d0c5] font-semibold mb-2">Advanced Analytics</h4>
          <p className="text-[#646669]">
            The platform provides detailed performance metrics including:
          </p>
          <ul className="list-disc list-inside text-[#646669] mt-2">
            <li>Detailed accuracy breakdowns</li>
            <li>Speed consistency graphs</li>
            <li>Historical performance tracking</li>
            <li>Error pattern analysis</li>
          </ul>
        </div>

        <div>
          <h4 className="text-[#d1d0c5] font-semibold mb-2">Community Features</h4>
          <p className="text-[#646669]">
            MonkeyType fosters a competitive and supportive community through:
          </p>
          <ul className="list-disc list-inside text-[#646669] mt-2">
            <li>Global leaderboards</li>
            <li>Typing challenges</li>
            <li>Progress sharing</li>
            <li>Community competitions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}