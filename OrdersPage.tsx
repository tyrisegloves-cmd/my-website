import { useState } from 'react';
import { Calendar, Package, MessageCircle } from 'lucide-react';
import { useStore } from '../store';
import { PageHeader } from './PageHeader';

// ReviewModal type is defined inline at useState

interface OrdersPageProps {
  isAdmin?: boolean;
  onBack?: () => void;
  onNavigateTracking?: () => void;
}

export function OrdersPage({ isAdmin = false, onBack, onNavigateTracking }: OrdersPageProps) {
  const { bookings, cancelBooking } = useStore();
  const showToast = useStore((s) => s.showToast);
  const [selectedTab, setSelectedTab] = useState('orders');
  const [cancelReason, setCancelReason] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [reviewModal, setReviewModal] = useState<{ serviceName: string; rating: number; comment: string } | null>(null);

  const mockOrders = [
    {
      id: 'ORD-001', date: '2024-01-15', status: 'delivered',
      items: [
        { name: 'Pro Wireless Headphones', qty: 1, price: 299.99 },
        { name: 'USB-C Hub Pro', qty: 2, price: 79.99 }
      ],
      total: 459.97, trackingNumber: 'TR-123456789'
    },
    {
      id: 'ORD-002', date: '2024-01-20', status: 'in-transit',
      items: [{ name: 'Portable SSD 2TB', qty: 1, price: 199.99 }],
      total: 199.99, trackingNumber: 'TR-987654321'
    }
  ];

  const upcomingBookings = bookings.filter(b => b.status === 'pending' || b.status === 'confirmed');
  const pastBookings = bookings.filter(b => b.status === 'completed');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered': case 'completed': case 'confirmed':
        return 'text-[#00FF85] bg-[#00FF85]/10 border border-[#00FF85]/30 dark:text-[#00FF85] dark:bg-[#00FF85]/10';
      case 'in-transit': case 'pending':
        return 'text-blue-600 bg-blue-50 dark:text-[#FFBB00] dark:bg-[#FFBB00]/10 dark:border dark:border-[#FFBB00]/30';
      case 'cancelled':
        return 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-400/10';
      default:
        return 'text-gray-600 bg-gray-50 dark:text-white dark:bg-[#2F2F2F]';
    }
  };

  const cardCls = 'bg-white dark:bg-[#1E1E1E] rounded-lg shadow-sm p-6 border border-blue-100 dark:border-[#2F2F2F]';
  const labelCls = 'text-sm text-gray-500 dark:text-white/60';
  const valueCls = 'font-semibold text-gray-900 dark:text-white';

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#121212]">
        <PageHeader
          title="Order Management"
          subtitle="Track live sales, update shipping statuses, and issue refunds."
          onBack={onBack}
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white dark:bg-[#1E1E1E] rounded-lg shadow-sm overflow-hidden border border-blue-100 dark:border-[#2F2F2F]">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-[#121212] border-b border-gray-200 dark:border-[#2F2F2F]">
                  <tr>
                    {['Order ID', 'Customer', 'Date', 'Total', 'Status', 'Actions'].map(h => (
                      <th key={h} className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-200 dark:border-[#2F2F2F] hover:bg-gray-50 dark:hover:bg-[#2F2F2F]">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{order.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-white">John Doe</td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-white">{order.date}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">${order.total.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm flex gap-3">
                        <button onClick={() => showToast('Order ' + order.id + ' details opening...', 'info')} className="text-blue-600 dark:text-[#00FF85] hover:underline">View</button>
                        <button onClick={() => showToast('Update shipping status for ' + order.id, 'info')} className="text-blue-600 dark:text-[#00FF85] hover:underline">Update</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#121212]">
      <PageHeader
        title="Orders & Appointments"
        subtitle="Track your gadget orders and manage service appointments."
        onBack={onBack}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setSelectedTab('orders')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
              selectedTab === 'orders'
                ? 'bg-blue-600 dark:bg-[#00FF85] text-white dark:text-[#0b1e17] shadow-lg shadow-blue-500/20 dark:shadow-[#00FF85]/20'
                : 'bg-white dark:bg-[#1E1E1E] text-gray-700 dark:text-white border border-gray-200 dark:border-[#2F2F2F] hover:bg-gray-50 dark:hover:bg-[#2F2F2F]'
            }`}
          >
            <Package size={18} />
            Orders
          </button>
          <button
            onClick={() => setSelectedTab('appointments')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
              selectedTab === 'appointments'
                ? 'bg-blue-600 dark:bg-[#00FF85] text-white dark:text-[#0b1e17] shadow-lg shadow-blue-500/20 dark:shadow-[#00FF85]/20'
                : 'bg-white dark:bg-[#1E1E1E] text-gray-700 dark:text-white border border-gray-200 dark:border-[#2F2F2F] hover:bg-gray-50 dark:hover:bg-[#2F2F2F]'
            }`}
          >
            <Calendar size={18} />
            Appointments ({upcomingBookings.length})
          </button>
        </div>

        {/* Orders Tab */}
        {selectedTab === 'orders' && (
          <div className="space-y-4">
            {mockOrders.length === 0 ? (
              <div className={`text-center py-12 ${cardCls}`}>
                <p className="dark:text-white text-gray-500 text-lg">No orders yet</p>
              </div>
            ) : mockOrders.map((order) => (
              <div key={order.id} className={cardCls}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {[
                    { label: 'Order ID', value: order.id },
                    { label: 'Date', value: order.date },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className={labelCls}>{label}</p>
                      <p className={valueCls}>{value}</p>
                    </div>
                  ))}
                  <div>
                    <p className={labelCls}>Status</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <div>
                    <p className={labelCls}>Total</p>
                    <p className="font-semibold text-lg text-gray-900 dark:text-white">${order.total.toFixed(2)}</p>
                  </div>
                </div>
                <div className="border-t border-gray-200 dark:border-[#2F2F2F] pt-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Items</h4>
                  <div className="space-y-1">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-gray-700 dark:text-white">{item.name} ×{item.qty}</span>
                        <span className="font-medium text-gray-900 dark:text-white">${(item.price * item.qty).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 p-4 bg-blue-50 dark:bg-[#121212] rounded-lg border border-blue-100 dark:border-[#2F2F2F] flex items-center justify-between gap-4">
                  <div>
                    <p className={labelCls}>Tracking Number</p>
                    <p className="font-mono font-semibold text-blue-600 dark:text-[#00FF85]">{order.trackingNumber}</p>
                  </div>
                  <button 
                    onClick={onNavigateTracking}
                    className="px-4 py-2 bg-blue-600 dark:bg-[#00FF85] text-white dark:text-[#0b1e17] rounded-xl font-bold text-sm shadow-lg hover:shadow-blue-500/20 dark:hover:shadow-[#00FF85]/20 transition-all"
                  >
                    Track Live
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Appointments Tab */}
        {selectedTab === 'appointments' && (
          <div className="space-y-4">
            {upcomingBookings.length === 0 && pastBookings.length === 0 ? (
              <div className={`text-center py-12 ${cardCls}`}>
                <Calendar size={48} className="mx-auto text-gray-400 dark:text-white/30 mb-4" />
                <p className="text-gray-500 dark:text-white text-lg">No appointments yet</p>
              </div>
            ) : (
              <>
                {upcomingBookings.length > 0 && (
                  <>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-4">Upcoming Appointments</h2>
                    {upcomingBookings.map((booking) => (
                      <div key={booking.id} className={cardCls}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div><p className={labelCls}>Service</p><p className={valueCls}>{booking.serviceName}</p></div>
                          <div><p className={labelCls}>Date & Time</p><p className={valueCls}>{booking.date} at {booking.time}</p></div>
                          <div>
                            <p className={labelCls}>Status</p>
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(booking.status)}`}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          </div>
                        </div>
                        <button onClick={() => setSelectedBooking(booking)} className="text-red-600 dark:text-red-400 hover:text-red-700 text-sm font-medium">
                          Cancel Appointment
                        </button>
                      </div>
                    ))}
                  </>
                )}
                {pastBookings.length > 0 && (
                  <>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">Completed Services</h2>
                    {pastBookings.map((booking) => (
                      <div key={booking.id} className={cardCls}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div><p className={labelCls}>Service</p><p className={valueCls}>{booking.serviceName}</p></div>
                          <div><p className={labelCls}>Completed</p><p className={valueCls}>{booking.date}</p></div>
                          <div>
                            <p className={labelCls}>Status</p>
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge('completed')}`}>Completed</span>
                          </div>
                        </div>
                        <button
                          onClick={() => setReviewModal({ serviceName: booking.serviceName, rating: 5, comment: '' })}
                          className="mt-4 text-blue-600 dark:text-[#00FF85] hover:underline text-sm font-medium flex items-center gap-2"
                        >
                          <MessageCircle size={16} />Leave a Review
                        </button>
                      </div>
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Cancel Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#1E1E1E] rounded-lg shadow-xl max-w-md w-full p-6 border dark:border-[#2F2F2F]">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Cancel Appointment?</h2>
            <p className="text-gray-600 dark:text-white mb-4">
              Are you sure you want to cancel your appointment for <strong className="dark:text-[#00FF85]">{selectedBooking.serviceName}</strong>?
            </p>
            <textarea
              placeholder="Reason for cancellation (optional)"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-[#2F2F2F] rounded-lg mb-4 bg-white dark:bg-[#121212] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              rows={3}
            />
            <div className="flex gap-3">
              <button
                onClick={() => { setSelectedBooking(null); setCancelReason(''); }}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-[#2F2F2F] rounded-lg text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-[#2F2F2F] transition-colors font-medium"
              >
                Keep Appointment
              </button>
              <button
                onClick={() => { cancelBooking(selectedBooking.id); setSelectedBooking(null); setCancelReason(''); }}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {reviewModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#1E1E1E] rounded-lg shadow-xl max-w-md w-full p-6 border dark:border-[#2F2F2F]">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Review: {reviewModal.serviceName}
            </h2>
            <p className="text-gray-500 dark:text-white/60 text-sm mb-4">
              How was your experience with this service?
            </p>

            <div className="flex justify-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setReviewModal({ ...reviewModal, rating: star })}
                  className={`text-3xl transition-all hover:scale-110 ${
                    star <= reviewModal.rating ? 'text-[#FFBB00]' : 'text-gray-300 dark:text-gray-600'
                  }`}
                >
                  ★
                </button>
              ))}
            </div>

            <textarea
              placeholder="Share your experience (optional)"
              value={reviewModal.comment}
              onChange={(e) => setReviewModal({ ...reviewModal, comment: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-[#2F2F2F] rounded-lg bg-white dark:bg-[#121212] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setReviewModal(null)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-[#2F2F2F] rounded-lg text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-[#2F2F2F] transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  showToast(`Review submitted: ${reviewModal.rating} stars for ${reviewModal.serviceName}`, 'success');
                  setReviewModal(null);
                }}
                className="flex-1 px-4 py-2 bg-blue-600 dark:bg-[#00FF85] text-white dark:text-[#0b1e17] rounded-lg hover:bg-blue-700 dark:hover:bg-[#22ff97] transition-colors font-medium"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
