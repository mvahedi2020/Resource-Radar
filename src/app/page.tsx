import CapacityPlanner from '@/components/CapacityPlanner';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] selection:bg-purple-500/30 text-white">
      <main className="max-w-5xl mx-auto px-6 py-20">
        <header className="mb-16">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium tracking-wide">
            Resource Radar 2.0
          </div>
          <h1 className="text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Team Bandwidth Overview
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Real-time capacity planning and resource allocation matrix. Monitor bandwidth and prevent team burnout with our dynamic heatmap.
          </p>
        </header>

        <CapacityPlanner />
      </main>
    </div>
  );
}
