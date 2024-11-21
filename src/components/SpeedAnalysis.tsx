import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Trophy, Target, Clock, Keyboard, Zap, BarChart2, Percent } from 'lucide-react';
import { KeyStrokeData, calculateWPM } from '../helpers/utils';






const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="graph-tooltip">
        <p className="text-[#e2b714]">WPM: {payload[0].value}</p>
        <p className="text-[#646669]">Raw: {payload[1].value}</p>
        <p className="text-xs text-[#646669] mt-1">
          Raw = all keystrokes / 5 / time
        </p>
      </div>
    );
  }
  return null;
};

const StatCard = ({ icon: Icon, title, value, unit }: any) => (
  <div className="stat-card bg-zinc-900/50 p-4 rounded-lg">
    <div className="flex items-center gap-3 mb-2">
      <Icon className="w-5 h-5 text-[#e2b714]" />
      <h3 className="text-sm text-[#646669]">{title}</h3>
    </div>
    <p className="text-2xl font-mono">
      {value}
      <span className="text-sm text-[#646669] ml-1">{unit}</span>
    </p>
  </div>
);

export default function SpeedAnalysis({keystrokes, time}: any) {
  const finalStats = calculateWPM(keystrokes, time);
  const accuracy = (keystrokes.filter(k => k.correct).length / keystrokes.length * 100).toFixed(1);
  const totalChars = keystrokes.length.toLocaleString();
  const data = Array.from({ length: time }, (_, i) => {
    const relevantKeystrokes = keystrokes.filter(k => {
      const second = Math.floor(k.timestamp / 1000);
      return second === i;
    });
    const { wpm, raw } = calculateWPM(relevantKeystrokes, 1);
    return {
      time: i + 1,
      wpm,
      raw
    };
  });

  return (
    <div className="min-h-screen pt-4 w-full">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Speed Analysis</h1>
          <p className="text-[#646669]">Detailed breakdown of your typing performance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Trophy} title="Net Speed" value={finalStats.wpm} unit="wpm" />
          <StatCard icon={Target} title="Accuracy" value={accuracy} unit="%" />
          <StatCard icon={Clock} title="Test Duration" value={time} unit="sec" />
          <StatCard icon={Keyboard} title="Characters" value={totalChars} unit="chars" />
        </div>

        <div className="stat-card mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <BarChart2 className="w-5 h-5 text-[#e2b714]" />
              <h2 className="text-xl">Speed Graph</h2>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#e2b714]" />
                <span className="text-sm">Net WPM</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#646669]" />
                <span className="text-sm">Raw WPM</span>
              </div>
            </div>
          </div>
          
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2c2e31" />
                <XAxis 
                  dataKey="time" 
                  stroke="#646669"
                  label={{ value: 'Time (seconds)', position: 'insideBottom', offset: -5, fill: '#646669' }}
                />
                <YAxis 
                  stroke="#646669"
                  label={{ value: 'WPM', angle: -90, position: 'insideLeft', offset: 10, fill: '#646669' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="wpm" 
                  stroke="#e2b714" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 8 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="raw" 
                  stroke="#646669" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="stat-card bg-zinc-900/50 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-5 h-5 text-[#e2b714]" />
              <h3>Speed Breakdown</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#646669]">Raw WPM</span>
                  <span>{finalStats.raw} WPM</span>
                </div>
                <div className="h-2 bg-[#232427] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#e2b714] rounded-full" 
                    style={{ width: `${(finalStats.wpm / finalStats.raw) * 100}%` }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#646669]">Net WPM</span>
                  <span>{finalStats.wpm} WPM</span>
                </div>
                <div className="text-xs text-[#646669] mt-1">
                  Net = Raw WPM - (errors × 10) / time
                </div>
              </div>
            </div>
          </div>

          <div className="stat-card bg-zinc-900/50 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Percent className="w-5 h-5 text-[#e2b714]" />
              <h3>Error Analysis</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[#646669]">Total Keystrokes</span>
                <span>{totalChars}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#646669]">Error Rate</span>
                <span className="text-[#e2b714]">{(100 - parseFloat(accuracy)).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#646669]">Errors</span>
                <span>{keystrokes.filter(k => !k.correct).length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}