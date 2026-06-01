import { Sparkles, ShoppingBag, Wrench, TrendingUp, Shield, Zap, ArrowRight, Cpu, Zap as Lightning } from 'lucide-react';
import { useStore } from '../store';

interface HomePageProps {
  onNavigate?: (page: string) => void;
}

export function HomePage({ onNavigate = () => {} }: HomePageProps = {}) {
  const userReviews = useStore((s) => s.userReviews);
  const features = [
    { icon: ShoppingBag, title: 'Curated Catalog', description: 'Explore a hand-picked collection of premium tech gadgets, with refined filters and intelligent search' },
    { icon: Wrench, title: 'Professional Services', description: 'Book expert technicians for repair, installation, and performance optimization' },
    { icon: TrendingUp, title: 'AI Recommendations', description: 'Get personalized suggestions shaped by your browsing and purchase history' },
    { icon: Shield, title: 'Secure Checkout', description: 'Complete transactions safely for both product purchases and service bookings' },
    { icon: Zap, title: 'Order Management', description: 'Track orders and manage service appointments from one unified dashboard' },
    { icon: Sparkles, title: 'Verified Reviews', description: 'Read authentic ratings from the community for products and services' }
  ];

  const stats = [
    { label: 'Products', value: '500+' },
    { label: 'Services', value: '50+' },
    { label: 'Happy Customers', value: '10K+' },
    { label: 'Technicians', value: '200+' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#121212] text-balance transition-colors duration-300">

      {/* HERO with full background image */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/home-bg.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/65 to-white/95 dark:from-[#0a0e1a]/80 dark:via-[#0a0e1a]/75 dark:to-[#0a0e1a]/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-purple-500/10 dark:from-[#00FF85]/5 dark:to-purple-500/5" />

        <div className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left content - intro text */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100/80 dark:bg-[#00FF85]/10 border border-blue-200 dark:border-[#00FF85]/30 rounded-full mb-6 backdrop-blur-md">
                  <Cpu size={14} className="text-blue-600 dark:text-[#00FF85]" />
                  <span className="text-xs font-semibold tracking-widest uppercase text-blue-700 dark:text-[#00FF85]">Next-Gen Tech Marketplace</span>
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-[1.05] tracking-tight" style={{ fontFamily: 'Space Grotesk', letterSpacing: '-0.03em' }}>
                  Tech Excellence,
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-[#00FF85] dark:to-[#00d873] bg-clip-text text-transparent">
                    Delivered.
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-gray-700 dark:text-white/80 mb-10 max-w-2xl leading-relaxed">
                  Your one-stop destination for premium tech gadgets and professional services. Shop, book, and track all your tech needs in one beautifully crafted platform.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                  <button
                    onClick={() => onNavigate?.('catalog')}
                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 dark:bg-[#00FF85] text-white dark:text-[#0b1e17] rounded-xl hover:bg-blue-700 dark:hover:bg-[#22ff97] transition-all font-semibold tracking-wide shadow-lg shadow-blue-500/30 dark:shadow-[#00FF85]/30 hover:shadow-xl hover:shadow-blue-500/40 dark:hover:shadow-[#00FF85]/50 transform hover:-translate-y-0.5"
                  >
                    <span>Browse Catalog</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => onNavigate?.('services')}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-blue-300 dark:border-[#00FF85] text-blue-700 dark:text-[#00FF85] rounded-xl hover:bg-blue-50 dark:hover:bg-[#00FF85]/10 transition-all font-semibold tracking-wide backdrop-blur-sm"
                  >
                    <Wrench size={18} />
                    <span>Book a Service</span>
                  </button>
                </div>

                {/* Inline trust indicators */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-600 dark:text-white/70">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    <span>Live support 24/7</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    <span>Free shipping over $100</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                    <span>30-day returns</span>
                  </div>
                </div>
              </div>

              {/* Right content - visual callout */}
              <div className="lg:col-span-5 hidden lg:block">
                <div className="relative">
                  <div className="absolute -top-8 -left-8 w-24 h-24 bg-blue-400 dark:bg-[#00FF85] rounded-full opacity-30 blur-3xl" />
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-purple-400 rounded-full opacity-30 blur-3xl" />

                  <div className="relative bg-black/30 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00FF85]/20 border border-[#00FF85]/30 rounded-full">
                        <span className="h-2 w-2 rounded-full bg-[#00FF85] animate-pulse" />
                        <span className="text-xs font-mono tracking-widest text-[#00FF85] uppercase">System Online</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {[
                        { label: 'CATALOG', value: '500+', color: 'text-blue-300' },
                        { label: 'SERVICES', value: '50+', color: 'text-emerald-300' },
                        { label: 'USERS', value: '10K+', color: 'text-purple-300' },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl">
                          <span className="text-xs font-mono tracking-widest text-white/50 uppercase">{item.label}</span>
                          <span className={`text-2xl font-bold ${item.color}`} style={{ fontFamily: 'Space Grotesk' }}>{item.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/40">
                      <span>UPTIME_99.9%</span>
                      <span>v2.0.1</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white/80 dark:bg-[#1E1E1E]/60 backdrop-blur-md py-14 px-4 sm:px-6 lg:px-8 border-y border-blue-100 dark:border-[#2F2F2F]">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl sm:text-5xl font-bold text-blue-600 dark:text-[#00FF85] mb-2 tracking-tight" style={{ fontFamily: 'Space Grotesk' }}>{stat.value}</p>
                <p className="text-sm font-medium text-gray-600 dark:text-white/70 tracking-widest uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 dark:bg-[#00FF85]/10 border border-blue-200 dark:border-[#00FF85]/30 rounded-full mb-4">
              <span className="text-xs font-mono tracking-widest uppercase text-blue-700 dark:text-[#00FF85]">// FEATURES</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight" style={{ fontFamily: 'Space Grotesk', letterSpacing: '-0.02em' }}>
              Why Choose Igris?
            </h2>
            <p className="text-lg text-gray-600 dark:text-white/70 max-w-2xl mx-auto leading-relaxed">
              Everything you need for your tech journey, from purchasing cutting-edge gadgets to booking professional services.
            </p>
          </div>

          {/* Horizontal Sliding Tabs for Features */}
          <div className="relative">
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="group flex-none w-[85vw] sm:w-[400px] snap-center relative bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-[#00FF85]/10 transition-all duration-500 p-8 border border-blue-100 dark:border-[#2F2F2F] overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/0 to-blue-500/5 dark:from-[#00FF85]/0 dark:to-[#00FF85]/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500" />
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-[#00FF85] dark:to-[#00d873] rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md shadow-blue-500/20 dark:shadow-[#00FF85]/20">
                        <Icon className="text-white dark:text-[#0b1e17]" size={22} />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 tracking-tight" style={{ fontFamily: 'Space Grotesk' }}>
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-white/70 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Fade out edges to indicate scrollability */}
            <div className="absolute top-0 right-0 bottom-8 w-24 bg-gradient-to-l from-slate-50 dark:from-[#121212] to-transparent pointer-events-none hidden sm:block" />
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="bg-[#0a0f1a] dark:bg-[#0a0f1a] py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-semibold tracking-wider uppercase">
              Customer Reviews
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight" style={{ fontFamily: 'Space Grotesk' }}>
              What Our Users Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {userReviews.map((review) => (
              <div
                key={review.id}
                className="bg-[#111827] hover:bg-[#151c2e] border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all duration-300 flex flex-col"
              >
                <div className="flex gap-1 mb-4 text-[#FFBB00]">
                  {'★'.repeat(review.stars).split('').map((star, i) => (
                    <span key={i}>{star}</span>
                  ))}
                </div>
                <p className="text-white/80 text-sm leading-relaxed mb-6 italic flex-1">
                  "{review.quote}"
                </p>
                <div className="flex items-center gap-3 mt-auto mb-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-sm font-bold text-white shadow-lg flex-shrink-0">
                    {review.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{review.name}</p>
                    <p className="text-xs text-white/50 line-clamp-1">Purchased: {review.purchased}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span className="text-xs font-medium text-emerald-400">Verified Purchase</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate?.('catalog')}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-sm transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
                >
                  Shop {review.purchased} <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 dark:from-[#121212] dark:via-[#1E1E1E] dark:to-[#121212] text-white py-20 px-4 sm:px-6 lg:px-8 border-y border-blue-400/30 dark:border-[#2F2F2F]">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 dark:bg-[#00FF85]/20 border border-white/30 dark:border-[#00FF85]/30 rounded-full mb-6">
            <Lightning size={14} className="text-white dark:text-[#00FF85]" />
            <span className="text-xs font-mono tracking-widest uppercase text-white dark:text-[#00FF85]">Ready when you are</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight" style={{ fontFamily: 'Space Grotesk', letterSpacing: '-0.02em' }}>
            Ready to Upgrade Your Tech?
          </h2>
          <p className="text-lg sm:text-xl text-blue-50 dark:text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            Discover thousands of premium tech products and professional services, all curated for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate?.('catalog')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 dark:bg-[#00FF85] dark:text-[#0b1e17] rounded-xl hover:bg-blue-50 dark:hover:bg-[#22ff97] transition-all font-semibold tracking-wide shadow-xl"
            >
              <ShoppingBag size={18} />
              <span>Start Shopping</span>
            </button>
            <button
              onClick={() => onNavigate?.('services')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/15 dark:bg-[#1E1E1E] text-white dark:text-[#00FF85] border-2 border-white/40 dark:border-[#00FF85]/40 rounded-xl hover:bg-white/25 dark:hover:bg-[#2F2F2F] transition-all font-semibold tracking-wide"
            >
              <Wrench size={18} />
              <span>Explore Services</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
