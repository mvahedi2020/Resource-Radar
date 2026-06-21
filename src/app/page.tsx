"use client";

import { useState } from "react";

interface Developer {
  id: number;
  name: string;
  role: string;
  ptoDays: number;
}

const initialDevs: Developer[] = [
  { id: 1, name: "Alice Chen", role: "Frontend Eng", ptoDays: 0 },
  { id: 2, name: "Bob Smith", role: "Backend Eng", ptoDays: 2 },
  { id: 3, name: "Charlie Davis", role: "Fullstack Eng", ptoDays: 5 },
];

export default function Home() {
  const [devs, setDevs] = useState<Developer[]>(initialDevs);

  const addPTO = (id: number) => {
    setDevs(devs.map(dev => {
      if (dev.id === id) {
        return { ...dev, ptoDays: Math.min(dev.ptoDays + 1, 10) }; // Max 10 days for demo
      }
      return dev;
    }));
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-zinc-950 text-zinc-50">
      <div className="w-full max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Resource Radar</h1>
          <p className="mt-2 text-zinc-400">Program Capacity & Allocation Forecaster</p>
        </div>

        <div className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800">
          <table className="w-full text-left">
            <thead className="bg-zinc-800/50">
              <tr>
                <th className="p-4 font-semibold">Team Member</th>
                <th className="p-4 font-semibold">Planned PTO</th>
                <th className="p-4 font-semibold w-1/3">Available Capacity (Sprint)</th>
                <th className="p-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {devs.map(dev => {
                const totalSprintDays = 10;
                const availableDays = totalSprintDays - dev.ptoDays;
                const capacityPercentage = (availableDays / totalSprintDays) * 100;
                
                return (
                  <tr key={dev.id} className="hover:bg-zinc-800/20 transition-colors">
                    <td className="p-4">
                      <div className="font-medium">{dev.name}</div>
                      <div className="text-sm text-zinc-500">{dev.role}</div>
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-zinc-800 rounded-full text-sm font-mono">
                        {dev.ptoDays} days
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-3 bg-zinc-800 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-500 ease-out ${
                              capacityPercentage > 70 ? 'bg-emerald-500' :
                              capacityPercentage > 40 ? 'bg-amber-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${capacityPercentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-mono text-zinc-400 w-12 text-right">
                          {Math.round(capacityPercentage)}%
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => addPTO(dev.id)}
                        disabled={dev.ptoDays >= 10}
                        className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-sm font-semibold rounded-lg transition-colors"
                      >
                        + Add PTO
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
