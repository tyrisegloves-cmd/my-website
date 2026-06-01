import { LogIn } from 'lucide-react';

interface TechLoginButtonProps {
  onClick?: () => void;
}

export function TechLoginButton({ onClick }: TechLoginButtonProps) {
  return (
    <button
      onClick={onClick}
      className="group relative px-5 py-2 overflow-hidden rounded-xl bg-transparent border border-[#0066FF] dark:border-[#66FCF1] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,102,255,0.4)] dark:hover:shadow-[0_0_20px_rgba(102,252,241,0.4)]"
    >
      {/* Scanline effect */}
      <span className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#0066FF] dark:via-[#66FCF1] to-transparent animate-[scanline_2s_linear_infinite]" />

      {/* Corner accents */}
      <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#0066FF] dark:border-[#66FCF1]" />
      <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#0066FF] dark:border-[#66FCF1]" />
      <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#0066FF] dark:border-[#66FCF1]" />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#0066FF] dark:border-[#66FCF1]" />

      <div className="relative flex items-center gap-2">
        <LogIn size={16} className="text-[#0066FF] dark:text-[#66FCF1]" />
        <span className="text-sm font-bold tracking-widest text-[#0066FF] dark:text-[#66FCF1] uppercase" style={{ fontFamily: 'Space Grotesk' }}>
          Sign_In
        </span>
        <span className="text-[10px] text-[#0066FF]/70 dark:text-[#66FCF1]/60 font-mono">//v2.0</span>
      </div>
    </button>
  );
}
