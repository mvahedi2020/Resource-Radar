"use client";
import React, { useState } from 'react';

const developers = [
  { id: 1, name: 'Elena Rodriguez' },
  { id: 2, name: 'Jamal Washington' },
  { id: 3, name: 'Sophia Chen' },
  { id: 4, name: 'Marcus Thorne' },
  { id: 5, name: 'Priya Patel' },
];

export default function CapacityPlanner() {
  const [points, setPoints] = useState<Record<number, number>>({
    1: 8,
    2: 18,
    3: 24,
    4: 12,
    5: 5,
  });

  const getStatusColor = (pts: number) => {
    if (pts < 10) return 'bg-green-500/20 text-green-400 border-green-500/50';
    if (pts < 20) return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
    return 'bg-red-500/20 text-red-400 border-red-500/50';
  };

  const handlePointChange = (id: number, value: number) => {
    setPoints(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg shadow-2xl">
      <h2 className="text-2xl font-semibold text-white mb-6 tracking-wide">Capacity Planner</h2>
      <div className="space-y-4">
        {developers.map(dev => {
          const devPoints = points[dev.id] || 0;
          return (
            <div key={dev.id} className="group relative flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium shadow-lg">
                  {dev.name[0]}
                </div>
                <span className="text-gray-200 font-medium">{dev.name}</span>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => handlePointChange(dev.id, Math.max(0, devPoints - 1))}
                    className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-gray-200 font-medium">{devPoints}</span>
                  <button 
                    onClick={() => handlePointChange(dev.id, devPoints + 1)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  >
                    +
                  </button>
                </div>
                <div className={`px-4 py-1.5 rounded-full border text-sm font-medium w-28 text-center transition-colors duration-300 ${getStatusColor(devPoints)}`}>
                  {devPoints < 10 ? 'Available' : devPoints < 20 ? 'At Capacity' : 'Overloaded'}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
