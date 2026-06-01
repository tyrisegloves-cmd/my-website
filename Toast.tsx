import { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { useStore } from '../store';

export function Toast() {
  const toast = useStore((s) => s.toast);
  const clearToast = useStore((s) => s.clearToast);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(clearToast, 2800);
    return () => window.clearTimeout(t);
  }, [toast, clearToast]);

  if (!toast) return null;

  const styles = {
    success: 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300',
    error: 'bg-red-500/10 border-red-500/40 text-red-300',
    info: 'bg-blue-500/10 border-blue-500/40 text-blue-300',
  }[toast.type];

  const Icon = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
  }[toast.type];

  return (
    <div className="fixed top-20 right-4 z-[200] animate-[slideIn_0.3s_ease-out]">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl shadow-2xl ${styles}`}>
        <Icon size={18} className="flex-shrink-0" />
        <span className="text-sm font-medium">{toast.message}</span>
        <button onClick={clearToast} className="ml-2 opacity-60 hover:opacity-100">
          <X size={14} />
        </button>
      </div>
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
