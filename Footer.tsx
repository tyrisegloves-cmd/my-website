import { ArrowRight, Mail, MapPin, Phone, Send, Zap, Shield, Cpu } from 'lucide-react';
import { useStore } from '../store';

export function Footer() {
  const showToast = useStore((s) => s.showToast);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#05080f] text-white border-t border-[#2F2F2F] overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/3 to-[#00FF85]/3 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00FF85]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

        {/* Top: Brand + Distinguishing Tagline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-14">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/logo.png"
                alt="Igris Logo"
                className="h-12 w-12 object-contain drop-shadow-[0_0_12px_rgba(0,255,133,0.4)]"
              />
              <div className="leading-tight">
                <div className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'Space Grotesk' }}>
                  Igris
                </div>
                <div className="text-[10px] font-mono tracking-[0.3em] text-[#00FF85] uppercase">
                  Tech Catalog v2.0
                </div>
              </div>
            </div>

            <p className="text-base text-white/70 leading-relaxed mb-6 max-w-md">
              Igris isn't another tech storefront — it's an <span className="text-[#00FF85] font-semibold">intelligent, human-first</span> ecosystem where AI anticipates your needs before you search. We fuse expert-curated hardware, on-demand technicians, and a recommendation engine that learns your habits into one seamless experience. No noise, no clutter — just tech that works for you.
            </p>

            <div className="flex flex-wrap gap-4 text-xs font-mono tracking-widest text-white/50">
              <div className="flex items-center gap-2">
                <Cpu size={12} className="text-[#00FF85]" />
                <span>AI-POWERED</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={12} className="text-blue-400" />
                <span>SOC2 SECURE</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={12} className="text-yellow-400" />
                <span>24/7 LIVE</span>
              </div>
            </div>
          </div>

          {/* Right: Newsletter + Contact */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Newsletter */}
            <div>
              <h4 className="text-xs font-mono tracking-widest text-[#00FF85] uppercase mb-4">// STAY UPDATED</h4>
              <p className="text-sm text-white/60 mb-4 leading-relaxed">
                Get weekly drops on new gadgets, exclusive deals, and tech insights — straight to your inbox.
              </p>
              <form onSubmit={(e) => { e.preventDefault(); showToast('Subscribed to Igris newsletter!', 'success'); }} className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#00FF85]/40 focus:border-[#00FF85] transition-all"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#00FF85] text-[#0b1e17] rounded-lg hover:bg-[#22ff97] transition-all shadow-lg shadow-[#00FF85]/20 group"
                >
                  <Send size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </form>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xs font-mono tracking-widest text-[#00FF85] uppercase mb-4">// REACH US</h4>
              <ul className="space-y-3 text-sm text-white/60">
                <li className="flex items-center gap-3 hover:text-white transition-colors">
                  <Mail size={14} className="text-[#00FF85]" />
                  <span>hello@igris.tech</span>
                </li>
                <li className="flex items-center gap-3 hover:text-white transition-colors">
                  <Phone size={14} className="text-[#00FF85]" />
                  <span>+1 (800) IGRIS-00</span>
                </li>
                <li className="flex items-start gap-3 hover:text-white transition-colors">
                  <MapPin size={14} className="text-[#00FF85] mt-1" />
                  <span>350 Tech Avenue,<br />San Francisco, CA 94107</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />

        {/* Middle: Sub-links Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          {[
            { label: 'Igris Hub', active: true, msg: 'You are here — Igris Hub' },
            { label: 'Services', active: false, msg: 'Services page opening...' },
            { label: 'Projects', active: false, msg: 'Projects showcase coming soon' },
            { label: 'About Us', active: false, msg: 'About Igris — our mission & story' },
            { label: 'Customer Support', active: false, msg: 'Support hub: support@igris.tech' },
          ].map((link) => (
            <a
              key={link.label}
              href="#"
              onClick={(e) => { e.preventDefault(); showToast(link.msg, link.active ? 'success' : 'info'); }}
              className={`group relative inline-flex items-center gap-1.5 text-sm font-medium transition-all duration-300 ${
                link.active
                  ? 'text-[#00FF85]'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {link.active && (
                <span className="h-1.5 w-1.5 rounded-full bg-[#00FF85] shadow-[0_0_8px_rgba(0,255,133,0.8)]" />
              )}
              <span className="tracking-wide">{link.label}</span>
              <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />

              {link.active && (
                <span className="absolute -bottom-2 left-0 w-full h-px bg-[#00FF85] shadow-[0_0_8px_rgba(0,255,133,0.6)]" />
              )}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Bottom: Copyright + Socials + Legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40 font-mono tracking-wide">
            © {currentYear} Igris Technologies. All systems operational.
          </p>

          <div className="flex items-center gap-5">
            <a href="#" onClick={(e) => { e.preventDefault(); showToast('Opening Igris GitHub', 'info'); }} className="text-white/40 hover:text-[#00FF85] transition-colors" title="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); showToast('Follow @igris on X', 'info'); }} className="text-white/40 hover:text-[#00FF85] transition-colors" title="Twitter">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); showToast('Connect on LinkedIn', 'info'); }} className="text-white/40 hover:text-[#00FF85] transition-colors" title="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>

          <div className="flex items-center gap-5 text-xs text-white/40">
            <a href="#" onClick={(e) => { e.preventDefault(); showToast('Privacy Policy — protecting your data since day one', 'info'); }} className="hover:text-white transition-colors">Privacy</a>
            <a href="#" onClick={(e) => { e.preventDefault(); showToast('Terms of Service — fair and transparent', 'info'); }} className="hover:text-white transition-colors">Terms</a>
            <a href="#" onClick={(e) => { e.preventDefault(); showToast('Cookies — only the good kind 🍪', 'info'); }} className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>

      {/* Bottom scanline effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00FF85]/40 to-transparent" />
    </footer>
  );
}
