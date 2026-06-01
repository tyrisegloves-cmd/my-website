import { useState } from 'react';
import {
  ArrowLeft,
  Briefcase,
  CalendarCheck,
  Camera,
  Download,
  Heart,
  Home,
  LogOut,
  Save,
  Settings,
  ShieldCheck,
  Star,
  Trash2,
  User,
} from 'lucide-react';
import { useStore } from '../store';

interface ProfilePageProps {
  onBack?: () => void;
  onNavigatePrivacy?: () => void;
  onNavigateTracking?: () => void;
  onNavigateReview?: () => void;
}

type ProfileSection = 'overview' | 'orders' | 'appointments' | 'wishlist' | 'reviews' | 'settings';

export function ProfilePage({ onBack, onNavigatePrivacy, onNavigateTracking, onNavigateReview }: ProfilePageProps) {
  const { currentUser, setCurrentUser, cart, bookings, updateCartItemQuantity, removeFromCart } = useStore();
  const showToast = useStore((s) => s.showToast);
  const [activeSection, setActiveSection] = useState<ProfileSection>('overview');
  const [displayName, setDisplayName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#121212] flex items-center justify-center p-6">
        <div className="bg-white dark:bg-[#1E1E1E] border border-blue-100 dark:border-[#2F2F2F] rounded-2xl p-8 text-center max-w-md">
          <User className="mx-auto mb-4 text-blue-600 dark:text-[#00FF85]" size={42} />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Profile locked</h1>
          <p className="text-gray-600 dark:text-white/70">Please sign in to manage your Igris account.</p>
        </div>
      </div>
    );
  }

  const initials = currentUser.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const navItems: Array<{ id: ProfileSection; label: string; icon: any }> = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'orders', label: 'My Orders', icon: Briefcase },
    { id: 'appointments', label: 'Appointments', icon: CalendarCheck },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'reviews', label: 'My Reviews', icon: Star },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const orders = [
    { id: 'ORD-001', item: 'Pro Wireless Headphones', status: 'Delivered', total: '$299.99' },
    { id: 'ORD-002', item: 'Portable SSD 2TB', status: 'In Transit', total: '$199.99' },
  ];

  const reviews = [
    { id: 'REV-1', item: 'Mechanical Gaming Keyboard', rating: 5, note: 'Excellent switch feel and strong build quality.' },
    { id: 'REV-2', item: 'Network Setup Service', rating: 4, note: 'Fast technician, great result.' },
  ];

  const cardClass = 'bg-white dark:bg-[#1E1E1E] border border-blue-100 dark:border-[#2F2F2F] rounded-2xl shadow-sm';
  const actionButton = 'px-4 py-2 rounded-xl bg-blue-600 dark:bg-[#00FF85] text-white dark:text-[#0b1e17] hover:bg-blue-700 dark:hover:bg-[#22ff97] transition-all font-semibold text-sm';
  const secondaryButton = 'px-4 py-2 rounded-xl border border-blue-200 dark:border-[#2F2F2F] text-gray-700 dark:text-white hover:bg-blue-50 dark:hover:bg-[#2F2F2F] transition-all font-semibold text-sm';

  const handleSaveProfile = () => {
    setCurrentUser({ ...currentUser, name: displayName, email });
    showToast('Profile details saved', 'success');
  };

  const signOut = () => {
    setCurrentUser(null);
    showToast('You have been signed out', 'success');
    setTimeout(() => onBack?.(), 350);
  };

  const printInvoice = (order: { id: string; item: string; status: string; total: string }) => {
    const invoiceHtml = `
      <!doctype html>
      <html>
        <head>
          <title>Igris Invoice - ${order.id}</title>
          <style>
            * { box-sizing: border-box; }
            body { font-family: Inter, Arial, sans-serif; margin: 0; padding: 40px; color: #1C2541; background: #fff; }
            .invoice { max-width: 760px; margin: 0 auto; border: 1px solid #E1E6EB; border-radius: 20px; padding: 36px; }
            .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid #E1E6EB; padding-bottom: 24px; margin-bottom: 28px; }
            .brand { font-size: 32px; font-weight: 800; letter-spacing: -0.04em; }
            .tag { color: #0066FF; font-size: 12px; letter-spacing: 0.22em; text-transform: uppercase; font-weight: 700; }
            .muted { color: #667085; font-size: 14px; }
            .title { font-size: 22px; font-weight: 800; margin: 0 0 10px; }
            table { width: 100%; border-collapse: collapse; margin: 28px 0; }
            th { text-align: left; color: #667085; font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em; padding: 12px 0; border-bottom: 1px solid #E1E6EB; }
            td { padding: 16px 0; border-bottom: 1px solid #F2F5F8; font-weight: 600; }
            .total { display: flex; justify-content: flex-end; gap: 40px; font-size: 20px; font-weight: 800; }
            .status { color: #0066FF; font-weight: 800; }
            .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #E1E6EB; font-size: 12px; color: #667085; }
            @media print { body { padding: 0; } .invoice { border: none; border-radius: 0; } }
          </style>
        </head>
        <body>
          <main class="invoice">
            <section class="header">
              <div>
                <div class="brand">Igris</div>
                <div class="tag">Tech Catalog</div>
              </div>
              <div style="text-align:right">
                <h1 class="title">Invoice</h1>
                <div class="muted">Invoice No: ${order.id}</div>
                <div class="muted">Date: ${new Date().toLocaleDateString()}</div>
              </div>
            </section>
            <section style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:28px;">
              <div>
                <div class="muted">Bill To</div>
                <strong>${currentUser.name}</strong><br />
                <span class="muted">${currentUser.email}</span>
              </div>
              <div>
                <div class="muted">Order Status</div>
                <span class="status">${order.status}</span>
              </div>
            </section>
            <table>
              <thead><tr><th>Item</th><th>Status</th><th style="text-align:right">Amount</th></tr></thead>
              <tbody>
                <tr><td>${order.item}</td><td>${order.status}</td><td style="text-align:right">${order.total}</td></tr>
              </tbody>
            </table>
            <section class="total"><span>Total</span><span>${order.total}</span></section>
            <p class="footer">Thank you for shopping with Igris. This invoice was generated from your customer profile and can be saved as PDF from your print dialog.</p>
          </main>
          <script>window.onload = () => { window.print(); setTimeout(() => window.close(), 500); };</script>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank', 'width=900,height=700');
    if (!printWindow) {
      showToast('Popup blocked. Allow popups to print invoice.', 'error');
      return;
    }
    printWindow.document.open();
    printWindow.document.write(invoiceHtml);
    printWindow.document.close();
    showToast(`Invoice prepared for ${order.id}`, 'success');
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Orders', value: '12', accent: 'text-blue-600 dark:text-[#00FF85]' },
                { label: 'Appointments', value: String(bookings.length), accent: 'text-[#FFBB00]' },
                { label: 'Cart Items', value: String(cart.length), accent: 'text-purple-600 dark:text-white' },
              ].map((stat) => (
                <div key={stat.label} className={`${cardClass} p-5`}>
                  <p className={`text-3xl font-bold ${stat.accent}`}>{stat.value}</p>
                  <p className="text-sm text-gray-600 dark:text-white/70 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className={`${cardClass} p-6`}>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Account Snapshot</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 dark:text-white/60">Display name</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{currentUser.name}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-white/60">Email</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{currentUser.email}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-white/60">Customer tier</p>
                  <p className="font-semibold text-[#00FF85]">
                    {currentUser.role === 'admin' ? 'Admin' : 'Verified Customer'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-white/60">Security</p>
                  <p className="font-semibold text-gray-900 dark:text-white">MFA ready</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className={`${cardClass} overflow-hidden`}>
            {orders.map((order, idx) => (
              <div key={order.id} className={`p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${idx ? 'border-t border-gray-200 dark:border-[#2F2F2F]' : ''}`}>
                <div>
                  <p className="text-sm text-gray-500 dark:text-white/60">{order.id}</p>
                  <h3 className="font-bold text-gray-900 dark:text-white">{order.item}</h3>
                  <p className="text-sm text-gray-600 dark:text-white/70">{order.status} · {order.total}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={onNavigateTracking} className={secondaryButton}>Track</button>
                  <button onClick={() => printInvoice(order)} className={actionButton}>
                    <Download size={14} className="inline mr-1" />Receipt
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      case 'appointments':
        return (
          <div className="space-y-4">
            {bookings.length === 0 ? (
              <div className={`${cardClass} p-8 text-center`}>
                <CalendarCheck className="mx-auto text-gray-400 dark:text-white/40 mb-3" size={42} />
                <p className="font-semibold text-gray-900 dark:text-white">No appointments yet</p>
                <button onClick={() => showToast('Open Services from the navigation bar to book an appointment', 'info')} className={`${actionButton} mt-4`}>Find Services</button>
              </div>
            ) : bookings.map((booking) => (
              <div key={booking.id} className={`${cardClass} p-5 flex items-center justify-between gap-4`}>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{booking.serviceName}</h3>
                  <p className="text-sm text-gray-600 dark:text-white/70">{booking.date} at {booking.time}</p>
                </div>
                <button onClick={() => showToast(`Reschedule flow started for ${booking.serviceName}`, 'info')} className={secondaryButton}>Reschedule</button>
              </div>
            ))}
          </div>
        );

      case 'wishlist':
        return (
          <div className="space-y-4">
            {cart.length === 0 ? (
              <div className={`${cardClass} p-8 text-center`}>
                <Heart className="mx-auto text-gray-400 dark:text-white/40 mb-3" size={42} />
                <p className="font-semibold text-gray-900 dark:text-white">Wishlist is empty</p>
                <p className="text-sm text-gray-600 dark:text-white/70 mt-1">Items you love will appear here.</p>
              </div>
            ) : cart.map((item) => (
              <div key={item.id} className={`${cardClass} p-5 flex items-center justify-between gap-4`}>
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{item.image}</div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{item.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-white/70">${item.price.toFixed(2)} · Qty {item.quantity}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)} className={actionButton}>Add One</button>
                  <button onClick={() => removeFromCart(item.id)} className="px-3 py-2 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        );

      case 'reviews':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold dark:text-white">Review History</h2>
              <button 
                onClick={onNavigateReview || (() => showToast('Review portal offline', 'error'))}
                className={actionButton}
              >
                + Add a review
              </button>
            </div>
            {reviews.map((review) => (
              <div key={review.id} className={`${cardClass} p-5`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{review.item}</h3>
                    <p className="text-sm text-gray-600 dark:text-white/70 mt-1">{review.note}</p>
                  </div>
                  <div className="text-[#FFBB00] whitespace-nowrap">{'★'.repeat(review.rating)}</div>
                </div>
                <button onClick={() => showToast(`Editing review for ${review.item}`, 'info')} className={`${secondaryButton} mt-4`}>Edit Review</button>
              </div>
            ))}
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <div className={`${cardClass} p-6`}>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Profile Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 dark:text-white/70 mb-2">Display Name</label>
                  <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-blue-200 dark:border-[#2F2F2F] bg-white dark:bg-[#121212] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00FF85]/40" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 dark:text-white/70 mb-2">Email</label>
                  <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-blue-200 dark:border-[#2F2F2F] bg-white dark:bg-[#121212] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00FF85]/40" />
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mt-5">
                <button onClick={handleSaveProfile} className={actionButton}><Save size={14} className="inline mr-1" />Save Changes</button>
                <button onClick={onNavigatePrivacy} className={secondaryButton}>Privacy Settings</button>
                <button onClick={() => showToast('Password reset link sent', 'info')} className={secondaryButton}>Change Password</button>
              </div>
            </div>

            <div className={`${cardClass} p-6`}>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Security</h2>
              <button onClick={() => showToast('Two-factor authentication setup started', 'info')} className={secondaryButton}>Enable Two-Factor Authentication</button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen relative text-white overflow-hidden">
      {/* Background with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat fixed"
        style={{ backgroundImage: 'url(/profile-bg.jpg)' }}
      />
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px] fixed" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          {onBack && (
            <button onClick={onBack} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all">
              <ArrowLeft size={18} /> Back
            </button>
          )}
          <button onClick={signOut} className="ml-auto inline-flex items-center gap-2 px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all shadow-lg shadow-red-500/20">
            <LogOut size={16} /> Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar Profile Menu */}
          <aside className="bg-[#0f1426] border border-white/10 rounded-3xl p-6 lg:sticky lg:top-24 h-fit">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="relative">
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-3xl font-bold text-white shadow-2xl shadow-blue-500/30">
                  {initials}
                </div>
                <button onClick={() => showToast('Profile photo upload coming soon', 'info')} className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-indigo-600 border-4 border-[#0f1426] flex items-center justify-center text-white hover:bg-indigo-500 transition-colors">
                  <Camera size={14} />
                </button>
              </div>
              <h1 className="text-lg font-bold mt-4">{currentUser.name}</h1>
              <p className="text-sm text-white/50">{currentUser.email}</p>
              <div className={`inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full border text-xs font-semibold ${
                currentUser.role === 'admin'
                  ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300'
                  : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              }`}>
                <ShieldCheck size={14} /> {currentUser.role === 'admin' ? 'Admin' : 'Verified Customer'}
              </div>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                      active
                        ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-400/30 shadow-lg shadow-indigo-900/20'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon size={18} className={active ? 'text-indigo-300' : 'text-slate-400'} />
                    <span className="font-semibold">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Content Panel */}
          <main>
            <div className="mb-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[#00FF85] font-mono">// Account Center</p>
              <h2 className="text-3xl font-bold mt-2" style={{ fontFamily: 'Space Grotesk' }}>
                {navItems.find((item) => item.id === activeSection)?.label}
              </h2>
            </div>
            {renderSection()}
          </main>
        </div>
      </div>
    </div>
  );
}