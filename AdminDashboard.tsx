import { useMemo, useState } from 'react';
import {
  Activity,
  ArrowLeft,
  BadgePercent,
  BarChart3,
  Bell,
  CalendarDays,
  Eye,
  KeyRound,
  LayoutTemplate,
  Lock,
  Package2,
  Pencil,
  Plus,
  Receipt,
  RefreshCcw,
  Search,
  Shield,
  Star,
  Tag,
  Trash2,
  Upload,
  UserCog,
  Users,
} from 'lucide-react';
import { mockProducts, productCategories } from '../data/mockData';
import { Product, useStore } from '../store';

interface AdminDashboardProps {
  adminTab?: string;
  onBack?: () => void;
}

type AdminSection =
  | 'analytics'
  | 'order-management'
  | 'catalog-control'
  | 'appointments'
  | 'customer-crm'
  | 'reviews'
  | 'discount-codes'
  | 'security-logs'
  | 'password-update';

interface AdminOrder {
  id: string;
  customer: string;
  email: string;
  total: string;
  status: 'Processing' | 'Packed' | 'Shipped' | 'Delivered' | 'Delayed' | 'Cancelled';
  items: string[];
  address: string;
}

const INITIAL_SECTION_MAP: Record<string, AdminSection> = {
  dashboard: 'analytics',
  analytics: 'analytics',
  customers: 'customer-crm',
};

const emptyProduct = { name: '', price: '', category: 'Accessories', stock: '', visuals: [] as string[] };

export function AdminDashboard({ adminTab = 'dashboard', onBack }: AdminDashboardProps) {
  const showToast = useStore((s: { showToast: any; }) => s.showToast);
  const bookings = useStore((s) => s.bookings);
  const products = useStore((s) => s.products);
  const setProducts = useStore((s) => s.setProducts);
  const currentUser = useStore((s) => s.currentUser);

  const [section, setSection] = useState<AdminSection>(INITIAL_SECTION_MAP[adminTab] || 'analytics');
  const [discountCode, setDiscountCode] = useState('IGRIS10');
  const [discountValue, setDiscountValue] = useState('10');
  const [customers, setCustomers] = useState([
    { name: 'Alex M.', email: 'alex@example.com', spend: '$4,298', orders: 12 },
    { name: 'Sarah K.', email: 'sarah@example.com', spend: '$2,180', orders: 8 },
    { name: 'James T.', email: 'james@example.com', spend: '$1,790', orders: 6 },
  ]);
  const [orders, setOrders] = useState<AdminOrder[]>([
    { id: 'ORD-2031', customer: 'Tina Warren', email: 'tina@shop.com', total: '$899.00', status: 'Processing', items: ['AuraBuds Pro Max', 'USB-C Hub Pro'], address: '12 Market Street, Accra' },
    { id: 'ORD-2032', customer: 'Michael Cruz', email: 'michael@shop.com', total: '$219.99', status: 'Packed', items: ['Portable SSD 2TB'], address: '45 Oxford Road, Kumasi' },
    { id: 'ORD-2033', customer: 'Nina Brooks', email: 'nina@shop.com', total: '$1,299.00', status: 'Shipped', items: ['Smart Display 27"'], address: '7 Ridge Avenue, Takoradi' },
  ]);
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isRefundOpen, setIsRefundOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState(emptyProduct);
  const [refundId, setRefundId] = useState('');
  const [refundReason, setRefundReason] = useState('');
  const [passwordForm, setPasswordForm] = useState({ current: '', next: '', confirm: '' });

  const activeProducts = products.length > 0 ? products : mockProducts;
  const lowStockCount = useMemo(() => activeProducts.filter((p) => p.stock < 40).length, [activeProducts]);
  const revenue = 48592;
  const pendingOrders = orders.filter((o) => !['Delivered', 'Cancelled'].includes(o.status)).length;

  const navGroups: Array<{ title: string; items: Array<{ id: AdminSection; label: string; icon: any; badge?: string | number }> }> = [
    { title: 'Dashboard', items: [{ id: 'analytics', label: 'Analytics', icon: BarChart3 }] },
    {
      title: 'Commerce', items: [
        { id: 'order-management', label: 'Order Management', icon: Package2, badge: pendingOrders },
        { id: 'catalog-control', label: 'Catalog Control', icon: LayoutTemplate },
        { id: 'appointments', label: 'Appointments', icon: CalendarDays, badge: bookings.length },
      ]
    },
    {
      title: 'Customers', items: [
        { id: 'customer-crm', label: 'Customer CRM', icon: Users },
        { id: 'reviews', label: 'Reviews', icon: Star },
      ]
    },
    { title: 'Marketing', items: [{ id: 'discount-codes', label: 'Discount Codes', icon: Tag }] },
    { title: 'System', items: [{ id: 'security-logs', label: 'Security & Logs', icon: Shield }] },
  ];

  const panelClass = 'bg-white/95 dark:bg-[#111625]/95 border border-blue-100 dark:border-[#2F2F2F] rounded-2xl shadow-sm backdrop-blur-xl';
  const buttonPrimary = 'inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 dark:bg-[#00FF85] text-white dark:text-[#0b1e17] hover:bg-blue-700 dark:hover:bg-[#22ff97] transition-all font-semibold text-sm';
  const buttonSecondary = 'inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-blue-200 dark:border-[#2F2F2F] text-gray-700 dark:text-white hover:bg-blue-50 dark:hover:bg-[#1E1E1E] transition-all font-semibold text-sm';
  const inputClass = 'w-full px-4 py-3 bg-gray-50 dark:bg-[#0b1020] border border-gray-200 dark:border-[#2F2F2F] rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00FF85]';

  const handleAddProductSubmit = () => {
    if (!newProduct.name || !newProduct.price) {
      showToast('Please enter product name and price', 'error');
      return;
    }
    const product: Product = {
      id: `prod-${Date.now()}`,
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      category: newProduct.category,
      image: newProduct.visuals[0] || '📦',
      description: 'Newly added via Admin Portal',
      stock: parseInt(newProduct.stock) || 0,
      rating: 0,
      reviews: 0,
      visuals: newProduct.visuals,
    };
    setProducts([...activeProducts, product]);
    setIsAddProductOpen(false);
    setNewProduct(emptyProduct);
    showToast(`Product "${product.name}" added successfully!`, 'success');
  };

  const handleProductUpdate = () => {
    if (!editingProduct) return;
    setProducts(activeProducts.map((p) => (p.id === editingProduct.id ? editingProduct : p)));
    setEditingProduct(null);
    showToast(`${editingProduct.name} updated`, 'success');
  };

  const handleDeleteProduct = (product: Product) => {
    setProducts(activeProducts.filter((p) => p.id !== product.id));
    showToast(`${product.name} deleted`, 'success');
  };

  const handleRefundSubmit = () => {
    if (!refundId) {
      showToast('Please enter an Order ID', 'error');
      return;
    }
    const orderExists = orders.some((o) => o.id === refundId);
    if (!orderExists) {
      showToast(`Order ${refundId} not found`, 'error');
      return;
    }
    setOrders(orders.map((order) => (order.id === refundId ? { ...order, status: 'Cancelled' } : order)));
    if (selectedOrder && selectedOrder.id === refundId) {
      setSelectedOrder({ ...selectedOrder, status: 'Cancelled' });
    }
    setIsRefundOpen(false);
    setRefundId('');
    setRefundReason('');
    showToast(`Refund for Order ${refundId} processed successfully!`, 'success');
  };

  const updateOrderStatus = (id: string, status: AdminOrder['status']) => {
    setOrders(orders.map((order) => (order.id === id ? { ...order, status } : order)));
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder({ ...selectedOrder, status });
    }
    showToast(`${id} marked ${status}`, 'success');
  };

  const clearAccounts = () => {
    setCustomers([]);
    showToast('All customer CRM accounts cleared', 'success');
  };

  const renderContent = () => {
    switch (section) {
      case 'analytics':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {[
                { label: 'Revenue', value: `$${revenue.toLocaleString()}`, icon: Activity, accent: 'text-blue-600 dark:text-[#00FF85]' },
                { label: 'Pending Orders', value: String(pendingOrders), icon: Package2, accent: 'text-indigo-600 dark:text-[#FFBB00]' },
                { label: 'Customers', value: customers.length.toLocaleString(), icon: Users, accent: 'text-purple-600 dark:text-white' },
                { label: 'Low Stock Alerts', value: String(lowStockCount), icon: Bell, accent: 'text-red-500' },
              ].map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.label} className={`${panelClass} p-5`}>
                    <div className="flex items-center justify-between mb-3"><Icon size={18} className={card.accent} /><span className="text-xs font-mono tracking-widest text-gray-500 dark:text-white/50 uppercase">Live</span></div>
                    <p className={`text-3xl font-bold ${card.accent}`}>{card.value}</p>
                    <p className="text-sm text-gray-600 dark:text-white/70 mt-1">{card.label}</p>
                  </div>
                );
              })}
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div className={`${panelClass} p-6`}>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Revenue Trend</h3>
                <div className="h-56 flex items-end gap-2">{[55, 64, 71, 69, 82, 91, 88, 96].map((v, i) => (<div key={i} className="flex-1 flex flex-col items-center justify-end gap-2"><div className="w-full rounded-t-lg bg-gradient-to-t from-blue-600 to-cyan-400 dark:from-[#00FF85] dark:to-[#7CFFB7]" style={{ height: `${v}%` }} /><span className="text-[10px] text-gray-500 dark:text-white/50 font-mono">M{i + 1}</span></div>))}</div>
              </div>
              <div className={`${panelClass} p-6`}>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button onClick={() => showToast('Exporting monthly report...', 'success')} className={buttonPrimary}><Receipt size={16} />Export Report</button>
                  <button onClick={() => showToast('Refreshing analytics feed...', 'info')} className={buttonSecondary}><RefreshCcw size={16} />Refresh Feed</button>
                  <button onClick={() => setSection('catalog-control')} className={buttonSecondary}><LayoutTemplate size={16} />Open Catalog</button>
                  <button onClick={() => setSection('security-logs')} className={buttonSecondary}><Shield size={16} />Review Security</button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'order-management':
        return (
          <div className={`${panelClass} overflow-hidden`}>
            <div className="p-6 border-b border-gray-200 dark:border-[#2F2F2F] flex flex-wrap items-center justify-between gap-3">
              <div><h3 className="text-lg font-bold text-gray-900 dark:text-white">Order Operations</h3><p className="text-sm text-gray-600 dark:text-white/70">Track live sales, shipping, refunds, and packing slips.</p></div>
              <div className="flex gap-2"><button onClick={() => showToast('Packing slips generated', 'success')} className={buttonSecondary}><Receipt size={16} />Packing Slips</button><button onClick={() => setIsRefundOpen(true)} className={buttonPrimary}><RefreshCcw size={16} />Issue Refund</button></div>
            </div>
            {orders.map((order, idx) => (
              <div key={order.id} className={`p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 ${idx ? 'border-t border-gray-200 dark:border-[#2F2F2F]' : ''}`}>
                <div><p className="text-xs font-mono tracking-widest text-gray-500 dark:text-white/50 uppercase">{order.id}</p><h4 className="font-bold text-gray-900 dark:text-white">{order.customer}</h4><p className="text-sm text-gray-600 dark:text-white/70">{order.total} · {order.status}</p></div>
                <div className="flex flex-wrap gap-2 items-center">
                  <button onClick={() => setSelectedOrder(order)} className={buttonSecondary}><Eye size={16} />View</button>
                  <select value={order.status} onChange={(e) => updateOrderStatus(order.id, e.target.value as AdminOrder['status'])} className="px-4 py-2.5 rounded-xl border border-blue-200 dark:border-[#2F2F2F] bg-white dark:bg-[#0b1020] text-gray-700 dark:text-white text-sm font-semibold">
                    <option>Delivered</option><option>Delayed</option><option>Cancelled</option><option>Processing</option><option>Packed</option><option>Shipped</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        );

      case 'catalog-control':
        return (
          <div className="space-y-6">
            <div className={`${panelClass} p-6 flex flex-wrap items-center justify-between gap-3`}>
              <div><h3 className="text-lg font-bold text-gray-900 dark:text-white">Catalog Control</h3><p className="text-sm text-gray-600 dark:text-white/70">Manage products, pricing, stock levels, photos, and variants.</p></div>
              <div className="flex gap-2"><button onClick={() => setIsAddProductOpen(true)} className={buttonPrimary}><Plus size={16} />Add Product</button><button onClick={() => showToast('Low stock alerts configured', 'success')} className={buttonSecondary}><Bell size={16} />Low Stock Alerts</button></div>
            </div>
            <div className={`${panelClass} overflow-hidden`}>
              {activeProducts.slice(0, 8).map((product, idx) => (
                <div key={product.id} className={`p-5 flex items-center justify-between gap-4 ${idx ? 'border-t border-gray-200 dark:border-[#2F2F2F]' : ''}`}>
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-xl bg-gray-100 dark:bg-[#0b1020] overflow-hidden flex items-center justify-center text-2xl">{product.visuals?.[0] ? <img src={product.visuals[0]} className="h-full w-full object-cover" /> : product.image}</div>
                    <div><h4 className="font-bold text-gray-900 dark:text-white">{product.name}</h4><p className="text-sm text-gray-600 dark:text-white/70">{product.category} · ${product.price.toFixed(2)} · Stock {product.stock}</p></div>
                  </div>
                  <div className="flex gap-2"><button onClick={() => setEditingProduct(product)} className={buttonSecondary}><Pencil size={16} />Edit</button><button onClick={() => handleDeleteProduct(product)} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 dark:border-red-900/40 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all font-semibold text-sm"><Trash2 size={16} />Delete</button></div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'appointments':
        return <div className={`${panelClass} p-6`}><div className="flex items-center justify-between mb-5"><div><h3 className="text-lg font-bold text-gray-900 dark:text-white">Service Appointments</h3><p className="text-sm text-gray-600 dark:text-white/70">Review upcoming bookings and technician availability.</p></div><button onClick={() => showToast('Technician calendar synced', 'success')} className={buttonPrimary}><CalendarDays size={16} />Sync Calendar</button></div><div className="space-y-3">{bookings.length === 0 ? <div className="p-8 rounded-xl border border-dashed border-gray-300 dark:border-[#2F2F2F] text-center text-gray-600 dark:text-white/70">No live appointments yet.</div> : bookings.map((booking) => <div key={booking.id} className="p-4 rounded-xl bg-gray-50 dark:bg-[#0f1422] border border-gray-200 dark:border-[#2F2F2F] flex flex-col md:flex-row md:items-center justify-between gap-4"><div><h4 className="font-bold text-gray-900 dark:text-white">{booking.serviceName}</h4><p className="text-sm text-gray-600 dark:text-white/70">{booking.date} at {booking.time}</p></div><button onClick={() => showToast(`Assigned technician to ${booking.serviceName}`, 'success')} className={buttonSecondary}>Assign Technician</button></div>)}</div></div>;

      case 'customer-crm':
        return (
          <div className="space-y-6">
            <div className={`${panelClass} p-6 flex flex-wrap items-center justify-between gap-3`}>
              <div><h3 className="text-lg font-bold text-gray-900 dark:text-white">Customer CRM</h3><p className="text-sm text-gray-600 dark:text-white/70">View histories, reset accounts, and track lifetime value.</p></div>
              <div className="flex flex-wrap gap-2"><button onClick={clearAccounts} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-all font-semibold text-sm"><Trash2 size={16} />Clear all Accounts</button><button onClick={() => showToast('CRM search launched', 'info')} className={buttonSecondary}><Search size={16} />Search Customer</button></div>
            </div>
            {customers.length === 0 ? <div className={`${panelClass} p-12 text-center text-gray-600 dark:text-white/70`}>No customer accounts remain.</div> : <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{customers.map((customer) => <div key={customer.email} className={`${panelClass} p-5`}><h4 className="font-bold text-gray-900 dark:text-white">{customer.name}</h4><p className="text-sm text-gray-600 dark:text-white/70">{customer.email}</p><p className="text-sm text-gray-600 dark:text-white/70 mt-2">Lifetime value: {customer.spend}</p><p className="text-sm text-gray-600 dark:text-white/70">Orders: {customer.orders}</p><div className="flex gap-2 mt-4"><button onClick={() => showToast(`Viewing ${customer.name}'s account`, 'info')} className={buttonSecondary}><UserCog size={16} />Account</button><button onClick={() => showToast(`Reset link sent to ${customer.email}`, 'success')} className={buttonSecondary}><KeyRound size={16} />Reset</button></div></div>)}</div>}
          </div>
        );

      case 'reviews':
        return <div className={`${panelClass} p-6`}><div className="flex items-center justify-between mb-5"><div><h3 className="text-lg font-bold text-gray-900 dark:text-white">Customer Reviews</h3><p className="text-sm text-gray-600 dark:text-white/70">Monitor satisfaction and moderate feedback.</p></div><button onClick={() => showToast('Review moderation queue opened', 'info')} className={buttonPrimary}><Star size={16} />Moderate</button></div><div className="space-y-4">{[{ title: 'Pro Wireless Headphones', author: 'Alex M.', rating: 5 }, { title: 'Smart Home Setup', author: 'James T.', rating: 5 }, { title: 'Portable SSD 2TB', author: 'Sarah K.', rating: 4 }].map((review) => <div key={review.title} className="p-4 rounded-xl bg-gray-50 dark:bg-[#0f1422] border border-gray-200 dark:border-[#2F2F2F]"><div className="flex items-center justify-between gap-3"><div><h4 className="font-bold text-gray-900 dark:text-white">{review.title}</h4><p className="text-sm text-gray-600 dark:text-white/70">by {review.author}</p></div><div className="text-[#FFBB00]">{'★'.repeat(review.rating)}</div></div></div>)}</div></div>;

      case 'discount-codes':
        return <div className={`${panelClass} p-6`}><h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Create Discount Code</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"><input value={discountCode} onChange={(e) => setDiscountCode(e.target.value.toUpperCase())} className={inputClass} placeholder="Code" /><input value={discountValue} onChange={(e) => setDiscountValue(e.target.value)} className={inputClass} placeholder="Discount %" /></div><div className="flex gap-3"><button onClick={() => showToast(`Discount code ${discountCode} for ${discountValue}% created`, 'success')} className={buttonPrimary}><BadgePercent size={16} />Generate Code</button><button onClick={() => showToast('Upsell rules updated', 'info')} className={buttonSecondary}>Configure Upsells</button></div></div>;

      case 'security-logs':
        return <div className="space-y-6"><div className={`${panelClass} p-6`}><h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Personal Account Info</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"><div><p className="text-xs text-gray-500 dark:text-white/50 uppercase tracking-widest">Admin</p><p className="font-bold text-gray-900 dark:text-white">{currentUser?.name || 'Admin User'}</p></div><div><p className="text-xs text-gray-500 dark:text-white/50 uppercase tracking-widest">Email</p><p className="font-bold text-gray-900 dark:text-white">{currentUser?.email}</p></div></div><div className="flex gap-3"><button onClick={() => setSection('password-update')} className={buttonPrimary}><Lock size={16} />Update Password</button><button onClick={() => showToast('Admin profile edit panel opened', 'info')} className={buttonSecondary}><Pencil size={16} />Edit Info</button></div></div><div className={`${panelClass} p-6`}><h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Security & Logs</h3><div className="space-y-3">{['Staff login from San Francisco · 10:42 AM', 'MFA challenge passed for Admin Portal · 09:18 AM', 'Refund approval event logged · 08:35 AM'].map((event) => <div key={event} className="p-4 rounded-xl bg-gray-50 dark:bg-[#0f1422] border border-gray-200 dark:border-[#2F2F2F] text-sm text-gray-700 dark:text-white/80">{event}</div>)}</div><div className="flex gap-3 mt-5"><button onClick={() => showToast('Security logs exported', 'success')} className={buttonPrimary}><Shield size={16} />Export Logs</button><button onClick={() => showToast('MFA policy reviewed', 'info')} className={buttonSecondary}>Review MFA</button></div></div></div>;

      case 'password-update':
        return <div className={`${panelClass} p-6 max-w-xl`}><h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Update Password</h3><div className="space-y-4"><input type="password" value={passwordForm.current} onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })} className={inputClass} placeholder="Current password" /><input type="password" value={passwordForm.next} onChange={(e) => setPasswordForm({ ...passwordForm, next: e.target.value })} className={inputClass} placeholder="New password" /><input type="password" value={passwordForm.confirm} onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })} className={inputClass} placeholder="Re-confirm password" /></div><div className="flex gap-3 mt-6"><button onClick={() => setSection('security-logs')} className={buttonSecondary}>Cancel</button><button onClick={() => { if (!passwordForm.current || !passwordForm.next || passwordForm.next !== passwordForm.confirm) { showToast('Check password fields and confirmation', 'error'); return; } setPasswordForm({ current: '', next: '', confirm: '' }); setSection('security-logs'); showToast('Password updated successfully', 'success'); }} className={buttonPrimary}>Update Password</button></div></div>;
    }
  };

  return (
    <div className="min-h-screen relative text-white overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat fixed" style={{ backgroundImage: 'url(/admin-bg.jpg)' }} />
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px] fixed" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
          <aside className="bg-[#111625]/95 border border-white/10 rounded-3xl p-5 h-fit lg:sticky lg:top-24 backdrop-blur-xl">
            {navGroups.map((group) => <div key={group.title} className="mb-8 last:mb-0"><p className="text-xs uppercase tracking-[0.28em] text-slate-500 font-mono mb-3">{group.title}</p><div className="space-y-2">{group.items.map((item) => { const Icon = item.icon; const active = section === item.id; return <button key={item.id} onClick={() => setSection(item.id)} className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-2xl text-left transition-all duration-300 ${active ? 'bg-indigo-500/15 border border-indigo-400/20 text-indigo-300 shadow-lg shadow-indigo-900/20' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}><span className="flex items-center gap-3"><Icon size={18} className={active ? 'text-indigo-300' : 'text-slate-400'} /><span className="font-semibold">{item.label}</span></span>{item.badge !== undefined && <span className={`min-w-5 h-5 px-1 rounded-full text-[11px] font-bold flex items-center justify-center ${active ? 'bg-indigo-300 text-[#111625]' : 'bg-indigo-500/20 text-indigo-200'}`}>{item.badge}</span>}</button>; })}</div></div>)}
            <button onClick={onBack} className="w-full mt-8 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border border-white/10 text-white hover:bg-white/5 transition-all font-semibold"><ArrowLeft size={16} /> Back to Store</button>
          </aside>
          <main>
            <div className="mb-6"><p className="text-xs uppercase tracking-[0.3em] text-[#00FF85] font-mono">// Admin Portal</p><h1 className="text-3xl sm:text-4xl font-bold mt-2" style={{ fontFamily: 'Space Grotesk' }}>{navGroups.flatMap((g) => g.items).find((item) => item.id === section)?.label || 'Update Password'}</h1></div>
            {renderContent()}
          </main>
        </div>
      </div>

      {isAddProductOpen && <ProductModal title="Add New Product" product={newProduct} setProduct={setNewProduct} onVisuals={(urls: string[]) => setNewProduct({ ...newProduct, visuals: urls })} onCancel={() => setIsAddProductOpen(false)} onSubmit={handleAddProductSubmit} inputClass={inputClass} />}
      {editingProduct && <EditProductModal product={editingProduct} setProduct={setEditingProduct} onVisuals={(urls: string[]) => setEditingProduct({ ...editingProduct, visuals: urls, image: urls[0] || editingProduct.image })} onCancel={() => setEditingProduct(null)} onSubmit={handleProductUpdate} inputClass={inputClass} />}
      {isRefundOpen && <RefundModal refundId={refundId} refundReason={refundReason} setRefundId={setRefundId} setRefundReason={setRefundReason} onCancel={() => setIsRefundOpen(false)} onSubmit={handleRefundSubmit} inputClass={inputClass} />}
      {selectedOrder && <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} onStatus={(status) => updateOrderStatus(selectedOrder.id, status)} />}
    </div>
  );
}

function ProductModal({ title, product, setProduct, onVisuals, onCancel, onSubmit, inputClass }: any) {
  return <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm"><div className="bg-white dark:bg-[#111625] border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl"><h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{title}</h2><ProductFields product={product} setProduct={setProduct} onVisuals={onVisuals} inputClass={inputClass} /><div className="flex gap-3 mt-8"><button onClick={onCancel} className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-[#2F2F2F] text-gray-700 dark:text-white font-semibold hover:bg-gray-50 dark:hover:bg-[#1E1E1E] transition-all">Cancel</button><button onClick={onSubmit} className="flex-1 py-3 rounded-xl bg-blue-600 dark:bg-[#00FF85] text-white dark:text-[#0b1e17] font-bold hover:bg-blue-700 dark:hover:bg-[#22ff97] transition-all shadow-lg shadow-blue-600/20 dark:shadow-[#00FF85]/20">Save</button></div></div></div>;
}

function EditProductModal({ product, setProduct, onVisuals, onCancel, onSubmit, inputClass }: any) {
  const productState = { name: product.name, price: String(product.price), category: product.category, stock: String(product.stock), visuals: product.visuals || [] };
  const setMerged = (next: any) => setProduct({ ...product, name: next.name, price: parseFloat(next.price) || 0, category: next.category, stock: parseInt(next.stock) || 0, visuals: next.visuals });
  return <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm"><div className="bg-white dark:bg-[#111625] border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl"><h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Edit Product</h2><ProductFields product={productState} setProduct={setMerged} onVisuals={onVisuals} inputClass={inputClass} /><div className="flex gap-3 mt-8"><button onClick={onCancel} className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-[#2F2F2F] text-gray-700 dark:text-white font-semibold hover:bg-gray-50 dark:hover:bg-[#1E1E1E] transition-all">Cancel</button><button onClick={onSubmit} className="flex-1 py-3 rounded-xl bg-blue-600 dark:bg-[#00FF85] text-white dark:text-[#0b1e17] font-bold hover:bg-blue-700 dark:hover:bg-[#22ff97] transition-all shadow-lg shadow-blue-600/20 dark:shadow-[#00FF85]/20">Update</button></div></div></div>;
}

function ProductFields({ product, setProduct, onVisuals, inputClass }: any) {
  const readFiles = (files: FileList | null) => { if (!files) return; const selected = Array.from(files).slice(0, 3); Promise.all(selected.map((file) => new Promise<string>((resolve) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result)); reader.readAsDataURL(file); }))).then(onVisuals); };
  return <div className="space-y-4"><input value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} className={inputClass} placeholder="Product name" /><div className="grid grid-cols-2 gap-4"><input type="number" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} className={inputClass} placeholder="Price" /><input type="number" value={product.stock} onChange={(e) => setProduct({ ...product, stock: e.target.value })} className={inputClass} placeholder="Stock" /></div><select value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })} className={inputClass}>{productCategories.filter(cat => cat !== 'all').map(cat => <option key={cat} value={cat}>{cat}</option>)}</select><label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white cursor-pointer hover:bg-indigo-700 transition-all font-semibold"><Upload size={16} /> Add Visual<input type="file" accept="image/*" multiple className="hidden" onChange={(e) => readFiles(e.target.files)} /></label><div className="grid grid-cols-3 gap-3">{(product.visuals || []).slice(0, 3).map((src: string, i: number) => <img key={i} src={src} className="h-20 rounded-xl object-cover border border-gray-200 dark:border-[#2F2F2F]" />)}</div></div>;
}

function RefundModal({ refundId, refundReason, setRefundId, setRefundReason, onCancel, onSubmit, inputClass }: any) {
  return <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm"><div className="bg-white dark:bg-[#111625] border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl"><h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Issue Refund</h2><div className="space-y-4"><input value={refundId} onChange={(e) => setRefundId(e.target.value.toUpperCase())} className={inputClass} placeholder="Order ID" /><textarea value={refundReason} onChange={(e) => setRefundReason(e.target.value)} rows={3} className={inputClass} placeholder="Reason for refund" /></div><div className="flex gap-3 mt-8"><button onClick={onCancel} className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-[#2F2F2F] text-gray-700 dark:text-white font-semibold hover:bg-gray-50 dark:hover:bg-[#1E1E1E] transition-all">Cancel</button><button onClick={onSubmit} className="flex-1 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-600/20">Process Refund</button></div></div></div>;
}

function OrderDetailModal({ order, onClose, onStatus }: { order: AdminOrder; onClose: () => void; onStatus: (s: AdminOrder['status']) => void }) {
  return <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm"><div className="bg-white dark:bg-[#111625] border border-white/10 rounded-3xl p-8 max-w-lg w-full shadow-2xl"><div className="flex justify-between gap-4 mb-6"><div><p className="text-xs uppercase tracking-widest text-gray-500 dark:text-white/50">{order.id}</p><h2 className="text-2xl font-bold text-gray-900 dark:text-white">{order.customer}</h2><p className="text-gray-600 dark:text-white/70">{order.email}</p></div><button onClick={onClose} className="text-gray-500 hover:text-white">✕</button></div><div className="space-y-4"><div className="p-4 rounded-xl bg-gray-50 dark:bg-[#0b1020] border border-gray-200 dark:border-[#2F2F2F]"><p className="text-sm text-gray-500 dark:text-white/50">Shipping Address</p><p className="font-semibold text-gray-900 dark:text-white">{order.address}</p></div><div className="p-4 rounded-xl bg-gray-50 dark:bg-[#0b1020] border border-gray-200 dark:border-[#2F2F2F]"><p className="text-sm text-gray-500 dark:text-white/50">Items</p>{order.items.map((item) => <p key={item} className="font-semibold text-gray-900 dark:text-white">• {item}</p>)}</div><div className="grid grid-cols-2 gap-4"><div className="p-4 rounded-xl bg-gray-50 dark:bg-[#0b1020] border border-gray-200 dark:border-[#2F2F2F]"><p className="text-sm text-gray-500 dark:text-white/50">Total</p><p className="font-bold text-gray-900 dark:text-[#00FF85]">{order.total}</p></div><div className="p-4 rounded-xl bg-gray-50 dark:bg-[#0b1020] border border-gray-200 dark:border-[#2F2F2F]"><p className="text-sm text-gray-500 dark:text-white/50">Status</p><select value={order.status} onChange={(e) => onStatus(e.target.value as AdminOrder['status'])} className="mt-1 w-full bg-transparent font-bold text-gray-900 dark:text-white"><option>Delivered</option><option>Delayed</option><option>Cancelled</option><option>Processing</option><option>Packed</option><option>Shipped</option></select></div></div></div></div></div>;
}