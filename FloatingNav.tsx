import { Home, LayoutGrid, Wrench, ShoppingCart, User, Shield } from 'lucide-react';
import { useStore } from '../store';

interface FloatingNavProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function FloatingNav({ currentPage, onPageChange }: FloatingNavProps) {
  const { currentUser, cart } = useStore();
  const cartTotal = cart.length;

  const isActive = (page: string) => currentPage === page;
  const isAdmin = currentUser?.role === 'admin';
  const isAdminPage = ['dashboard', 'orders', 'catalog', 'customers', 'analytics'].includes(currentPage);

  const hiddenPages = ['login', 'profile', 'privacy', 'dashboard', 'analytics', 'customers'];
  if (hiddenPages.includes(currentPage)) return null;

  const handleProfileClick = () => {
    if (!currentUser) {
      onPageChange('login');
    } else {
      onPageChange('profile');
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, onClick: () => onPageChange('home') },
    { id: 'catalog', label: 'Catalogue', icon: LayoutGrid, onClick: () => onPageChange('catalog') },
    { id: 'services', label: 'Services', icon: Wrench, onClick: () => onPageChange('services') },
    { id: 'cart', label: 'Cart', icon: ShoppingCart, badge: cartTotal, onClick: () => onPageChange('cart') },
    { id: 'profile', label: 'Profile', icon: User, onClick: handleProfileClick },
  ];

  return (
    <>
      {/* Desktop Floating Nav */}
      <nav className="hidden md:block fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div
          className="flex items-center gap-1 px-2.5 py-2.5 rounded-2xl border transition-all duration-300 bg-white dark:bg-[#121212] border-blue-200 dark:border-[#2F2F2F]"
          style={{ boxShadow: '0 25px 60px -12px rgba(0,0,0,0.12)' }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.id);
            return (
              <button
                key={item.id}
                onClick={item.onClick}
                className={`relative group flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  active
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 dark:from-[#00FF85] dark:to-[#00d873] text-white dark:text-[#0b1e17] shadow-lg shadow-blue-500/20 dark:shadow-[#00FF85]/30'
                    : 'text-blue-600 dark:text-[#F0F0F0] hover:text-blue-700 dark:hover:text-white hover:bg-blue-50 dark:hover:bg-[#1E1E1E]'
                }`}
                title={item.label}
              >
                <div className="relative">
                  <Icon size={18} strokeWidth={active ? 2.5 : 1.5} />
                  {item.badge && item.badge > 0 && (
                    <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] bg-red-500 dark:bg-[#FFBB00] text-white dark:text-[#1a1100] text-[10px] font-bold rounded-full flex items-center justify-center shadow-md animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="whitespace-nowrap transition-all duration-300 max-w-0 overflow-hidden opacity-0 group-hover:max-w-[100px] group-hover:opacity-100">
                  {item.label}
                </span>
                {active && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white dark:bg-[#0b1e17] rounded-full" />}
              </button>
            );
          })}

          <div className="w-px h-6 mx-1 bg-blue-200 dark:bg-[#2F2F2F]" />

          {isAdmin && (
            <button
              onClick={() => onPageChange('dashboard')}
              className={`relative group flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                isAdminPage
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 dark:from-[#FFBB00] dark:to-[#d49e00] text-white dark:text-[#1a1100] shadow-lg shadow-emerald-500/25 dark:shadow-[#FFBB00]/30'
                  : 'text-blue-600 dark:text-[#F0F0F0] hover:text-blue-700 dark:hover:text-white hover:bg-blue-50 dark:hover:bg-[#1E1E1E]'
              }`}
              title="Admin Dashboard"
            >
              <Shield size={18} strokeWidth={isAdminPage ? 2.5 : 1.5} />
              <span className="whitespace-nowrap transition-all duration-300 max-w-0 overflow-hidden opacity-0 group-hover:max-w-[100px] group-hover:opacity-100">
                Admin
              </span>
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div
          className="flex items-center justify-around px-1 py-2 border-t backdrop-blur-xl bg-white dark:bg-[#121212] border-blue-100 dark:border-[#2F2F2F]"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.id);
            return (
              <button
                key={item.id}
                onClick={item.onClick}
                className={`relative flex flex-col items-center gap-1 px-2 py-1.5 rounded-xl text-[10px] font-medium transition-all duration-300 min-w-[56px] ${
                  active ? 'text-blue-600 dark:text-[#00FF85]' : 'text-gray-400 dark:text-[#F0F0F0]/60'
                }`}
              >
                <div className="relative">
                  <Icon size={22} strokeWidth={active ? 2.5 : 1.5} />
                  {item.badge && item.badge > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 bg-red-500 dark:bg-[#FFBB00] text-white dark:text-[#1a1100] text-[9px] font-bold rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="truncate max-w-[56px]">{item.label}</span>
                {active && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-1 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-[#00FF85] dark:to-[#00d873] rounded-full" />
                )}
              </button>
            );
          })}
          {isAdmin && (
            <button
              onClick={() => onPageChange('dashboard')}
              className={`relative flex flex-col items-center gap-1 px-2 py-1.5 rounded-xl text-[10px] font-medium transition-all duration-300 min-w-[56px] ${
                isAdminPage ? 'text-emerald-500 dark:text-[#FFBB00]' : 'text-gray-400 dark:text-[#F0F0F0]/60'
              }`}
            >
              <Shield size={22} strokeWidth={isAdminPage ? 2.5 : 1.5} />
              <span className="truncate max-w-[56px]">Admin</span>
              {isAdminPage && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-1 bg-gradient-to-r from-emerald-500 to-teal-600 dark:from-[#FFBB00] dark:to-[#d49e00] rounded-full" />
              )}
            </button>
          )}
        </div>
      </nav>
    </>
  );
}
