import { useState } from 'react';
import { Search, Truck, MapPin, CheckCircle2, Clock } from 'lucide-react';
import { PageHeader } from './PageHeader';

interface TrackingPageProps {
  onBack?: () => void;
}

export function TrackingPage({ onBack }: TrackingPageProps) {
  const [trackId, setTrackId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackId.trim()) return;

    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setResult({
        id: trackId.toUpperCase(),
        status: 'In Transit',
        lastLocation: 'Distribution Center, San Francisco',
        estimatedDelivery: 'Tomorrow, Oct 24',
        steps: [
          { time: '09:42 AM', status: 'Arrived at local facility', location: 'San Francisco, CA', done: true },
          { time: '02:15 AM', status: 'Departed from sort center', location: 'Oakland, CA', done: true },
          { time: 'Yesterday', status: 'Picked up', location: 'Igris Warehouse', done: true },
          { time: 'Scheduled', status: 'Out for delivery', location: 'Destination', done: false },
        ]
      });
      setIsSearching(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#121212] text-white">
      <PageHeader 
        title="Track Your Order" 
        subtitle="Enter your Product Name or Order ID to see real-time status."
        onBack={onBack}
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Box */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl border border-blue-100 dark:border-[#2F2F2F] p-8 shadow-xl mb-8">
          <form onSubmit={handleTrack} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-white/70 mb-3 tracking-widest uppercase">
                Order Identity
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="e.g. ORD-001 or AuraBuds"
                  value={trackId}
                  onChange={(e) => setTrackId(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-[#2F2F2F] rounded-2xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00FF85] transition-all"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="w-full py-4 bg-blue-600 dark:bg-[#00FF85] text-white dark:text-[#0b1e17] rounded-2xl font-bold text-lg shadow-lg hover:shadow-blue-500/30 dark:hover:shadow-[#00FF85]/30 transition-all flex items-center justify-center gap-2"
            >
              {isSearching ? <span className="animate-spin mr-2">◌</span> : <Truck size={22} />}
              Track Shipment
            </button>
          </form>
        </div>

        {/* Results */}
        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl border border-blue-100 dark:border-[#2F2F2F] overflow-hidden shadow-xl">
              <div className="bg-blue-600 dark:bg-[#00FF85] px-8 py-6 text-white dark:text-[#0b1e17]">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs uppercase tracking-widest opacity-80">Tracking ID</p>
                    <h3 className="text-2xl font-bold">{result.id}</h3>
                  </div>
                  <div className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-md">
                    <span className="font-bold">{result.status}</span>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-2 gap-8 mb-10">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-white/40 mb-1">Estimated Arrival</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <Clock size={18} className="text-blue-500 dark:text-[#00FF85]" />
                      {result.estimatedDelivery}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-white/40 mb-1">Current Location</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <MapPin size={18} className="text-blue-500 dark:text-[#00FF85]" />
                      {result.lastLocation}
                    </p>
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-8">
                  {result.steps.map((step: any, idx: number) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`h-6 w-6 rounded-full flex items-center justify-center ${step.done ? 'bg-blue-600 dark:bg-[#00FF85] text-white dark:text-[#0b1e17]' : 'bg-gray-200 dark:bg-[#2F2F2F] text-gray-400'}`}>
                          {step.done ? <CheckCircle2 size={14} /> : <div className="h-2 w-2 rounded-full bg-gray-400" />}
                        </div>
                        {idx !== result.steps.length - 1 && <div className={`w-0.5 h-12 ${step.done ? 'bg-blue-600 dark:bg-[#00FF85]' : 'bg-gray-200 dark:bg-[#2F2F2F]'}`} />}
                      </div>
                      <div>
                        <p className={`font-bold ${step.done ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>{step.status}</p>
                        <p className="text-sm text-gray-500 dark:text-white/50">{step.location} · {step.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
