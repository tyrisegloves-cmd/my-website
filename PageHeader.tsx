import { ArrowLeft } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  gradient?: string;
  onBack?: () => void;
}

export function PageHeader({ title, subtitle, onBack }: PageHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 dark:from-[#121212] dark:via-[#1E1E1E] dark:to-[#121212] text-white py-10 border-b border-blue-400/20 dark:border-[#2F2F2F]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-start gap-4">
          {/* Back Button — always rendered inside each page header */}
          {onBack && (
            <button
              onClick={onBack}
              className="mt-1 flex items-center justify-center h-10 w-10 rounded-xl bg-white/15 dark:bg-[#2F2F2F] hover:bg-white/30 dark:hover:bg-[#3a3a3a] border border-white/25 dark:border-[#2F2F2F] text-white transition-all duration-300 hover:scale-105 active:scale-95 group flex-shrink-0"
              title="Go back"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
            </button>
          )}

          {/* Logo + Title */}
          <div className="flex items-center gap-4 flex-1">
            <img
              src="/logo.png"
              alt="Igris Logo"
              className="h-12 w-12 object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] dark:drop-shadow-[0_0_10px_rgba(0,255,133,0.3)] hidden sm:block flex-shrink-0"
            />
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>
                {title}
              </h1>
              {subtitle && (
                <p className="text-white/80 dark:text-white/70 mt-1 max-w-2xl text-sm sm:text-base">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
