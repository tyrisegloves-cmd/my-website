import { HelpCircle } from 'lucide-react';

interface HelpButtonProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function HelpButton({ currentPage, onPageChange }: HelpButtonProps) {
  if (currentPage === 'login' || currentPage === 'help') return null;

  return (
    <button
      onClick={() => onPageChange('help')}
      className="fixed right-4 bottom-24 md:bottom-6 z-50 h-12 w-12 rounded-full bg-blue-600 dark:bg-[#00FF85] text-white dark:text-[#0b1e17] shadow-2xl shadow-blue-500/30 dark:shadow-[#00FF85]/30 hover:scale-110 active:scale-95 transition-all flex items-center justify-center border border-white/20"
      title="Help Center"
      aria-label="Open Help Center"
    >
      <HelpCircle size={22} />
    </button>
  );
}