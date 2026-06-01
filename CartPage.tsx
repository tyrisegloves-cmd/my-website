import { useState } from 'react';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useStore } from '../store';
import { PageHeader } from './PageHeader';

interface CartPageProps {
  onBack?: () => void;
}

export function CartPage({ onBack }: CartPageProps) {
  const { cart, removeFromCart, updateCartItemQuantity, clearCart } = useStore();
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'payment' | 'confirmation'>('cart');
  const [shippingInfo, setShippingInfo] = useState({ fullName: '', email: '', address: '', city: '', zipCode: '', country: '' });
  const [cardInfo, setCardInfo] = useState({ cardNumber: '', expiryDate: '', cvv: '' });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const handleQuantityChange = (id: string, delta: number) => {
    const item = cart.find(c => c.id === id);
    if (item) updateCartItemQuantity(id, item.quantity + delta);
  };

  const handleCheckout = () => {
    if (Object.values(shippingInfo).some(v => !v)) { alert('Please fill in all shipping information'); return; }
    setCheckoutStep('payment');
  };

  const handlePayment = () => {
    if (!cardInfo.cardNumber || !cardInfo.expiryDate || !cardInfo.cvv) { alert('Please fill in all card information'); return; }
    setCheckoutStep('confirmation');
    setTimeout(() => {
      clearCart();
      setCheckoutStep('cart');
      setShippingInfo({ fullName: '', email: '', address: '', city: '', zipCode: '', country: '' });
      setCardInfo({ cardNumber: '', expiryDate: '', cvv: '' });
    }, 3000);
  };

  const inputCls = 'w-full px-4 py-2 border border-blue-200 dark:border-[#2F2F2F] rounded-lg bg-white dark:bg-[#121212] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#00FF85]';
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-white mb-2';
  const cardCls = 'bg-white dark:bg-[#1E1E1E] rounded-lg shadow-sm p-8 border border-blue-100 dark:border-[#2F2F2F]';
  const btnSecondary = 'flex-1 px-4 py-3 border border-gray-300 dark:border-[#2F2F2F] rounded-lg text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-[#2F2F2F] transition-colors font-medium';
  const btnPrimary = 'flex-1 px-4 py-3 bg-blue-600 dark:bg-[#00FF85] text-white dark:text-[#0b1e17] rounded-lg hover:bg-blue-700 dark:hover:bg-[#22ff97] transition-colors font-semibold';

  if (checkoutStep === 'confirmation') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#121212] flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-[#00FF85]/10">
            <span className="text-5xl">✓</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2" style={{ fontFamily: 'Space Grotesk' }}>
            Order Confirmed!
          </h1>
          <p className="text-gray-600 dark:text-white mb-8">
            Thank you for your purchase. You will receive a confirmation email shortly.
          </p>
          <div className="bg-white dark:bg-[#1E1E1E] rounded-lg shadow-sm p-4 mb-6 border dark:border-[#2F2F2F]">
            <p className="text-sm text-gray-500 dark:text-white/60">Order Total</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-[#00FF85]">${total.toFixed(2)}</p>
          </div>
          <p className="text-sm text-gray-400 dark:text-white/60">
            Order confirmation and tracking information has been sent to your email.
          </p>
        </div>
      </div>
    );
  }

  if (checkoutStep === 'payment') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#121212] py-12">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className={cardCls}>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8" style={{ fontFamily: 'Space Grotesk' }}>
              Payment Details
            </h1>
            <div className="space-y-6">
              <div>
                <label className={labelCls}>Card Number</label>
                <input type="text" placeholder="1234 5678 9012 3456" value={cardInfo.cardNumber}
                  onChange={(e) => setCardInfo({ ...cardInfo, cardNumber: e.target.value.replace(/\s/g, '').slice(0, 16) })}
                  className={inputCls} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Expiry Date</label>
                  <input type="text" placeholder="MM/YY" value={cardInfo.expiryDate}
                    onChange={(e) => setCardInfo({ ...cardInfo, expiryDate: e.target.value })}
                    className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>CVV</label>
                  <input type="text" placeholder="123" value={cardInfo.cvv}
                    onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value.slice(0, 3) })}
                    className={inputCls} />
                </div>
              </div>
              <div className="bg-blue-50 dark:bg-[#121212] border border-blue-100 dark:border-[#2F2F2F] p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-white font-medium">Total Amount:</span>
                  <span className="text-2xl font-bold text-blue-600 dark:text-[#00FF85]">${total.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setCheckoutStep('shipping')} className={btnSecondary}>Back</button>
                <button onClick={handlePayment} className={btnPrimary}>Complete Payment</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (checkoutStep === 'shipping') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#121212] py-12">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className={cardCls}>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8" style={{ fontFamily: 'Space Grotesk' }}>
              Shipping Address
            </h1>
            <div className="space-y-4 mb-8">
              <input type="text" placeholder="Full Name" value={shippingInfo.fullName}
                onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })} className={inputCls} />
              <input type="email" placeholder="Email" value={shippingInfo.email}
                onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })} className={inputCls} />
              <input type="text" placeholder="Street Address" value={shippingInfo.address}
                onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })} className={inputCls} />
              <div className="grid grid-cols-3 gap-4">
                <input type="text" placeholder="City" value={shippingInfo.city}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                  className={inputCls} />
                <input type="text" placeholder="ZIP Code" value={shippingInfo.zipCode}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                  className={inputCls} />
                <input type="text" placeholder="Country" value={shippingInfo.country}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                  className={inputCls} />
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setCheckoutStep('cart')} className={btnSecondary}>Back to Cart</button>
              <button onClick={handleCheckout} className={btnPrimary}>Continue to Payment</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#121212]">
      <PageHeader title="Shopping Cart" subtitle="Review your items and proceed to checkout." onBack={onBack} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {cart.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag size={48} className="mx-auto text-gray-400 dark:text-white/30 mb-4" />
            <p className="text-gray-500 dark:text-white text-lg mb-2">Your cart is empty</p>
            <p className="text-gray-400 dark:text-white/60">Start shopping to add items to your cart</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-[#1E1E1E] rounded-lg shadow-sm overflow-hidden border border-blue-100 dark:border-[#2F2F2F]">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-6 border-b border-gray-200 dark:border-[#2F2F2F] last:border-b-0">
                    <div className="text-5xl">{item.image}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-white/60">{item.category}</p>
                      <p className="text-lg font-bold text-blue-600 dark:text-[#00FF85] mt-1">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-[#121212] rounded-lg p-2">
                      <button onClick={() => handleQuantityChange(item.id, -1)}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-[#2F2F2F] rounded transition-colors text-gray-700 dark:text-white">
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-medium text-gray-900 dark:text-white">{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.id, 1)}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-[#2F2F2F] rounded transition-colors text-gray-700 dark:text-white">
                        <Plus size={16} />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-[#1E1E1E] rounded-lg shadow-sm p-6 sticky top-24 border border-blue-100 dark:border-[#2F2F2F]">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4" style={{ fontFamily: 'Space Grotesk' }}>
                  Order Summary
                </h2>
                <div className="space-y-3 mb-6">
                  {[
                    { label: 'Subtotal', value: `$${subtotal.toFixed(2)}` },
                    { label: 'Shipping', value: shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}` },
                    { label: 'Tax (10%)', value: `$${tax.toFixed(2)}` },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-white/60">{label}</span>
                      <span className="font-medium text-gray-900 dark:text-white">{value}</span>
                    </div>
                  ))}
                  <div className="border-t border-gray-200 dark:border-[#2F2F2F] pt-3 flex justify-between">
                    <span className="font-semibold text-gray-900 dark:text-white">Total</span>
                    <span className="text-lg font-bold text-blue-600 dark:text-[#00FF85]">${total.toFixed(2)}</span>
                  </div>
                </div>
                {subtotal > 100 && (
                  <div className="bg-green-50 dark:bg-[#00FF85]/10 border border-green-200 dark:border-[#00FF85]/30 p-3 rounded-lg mb-6 text-sm text-green-700 dark:text-[#00FF85]">
                    ✓ Free shipping on orders over $100!
                  </div>
                )}
                <button
                  onClick={() => setCheckoutStep('shipping')}
                  className="w-full px-4 py-3 bg-blue-600 dark:bg-[#00FF85] text-white dark:text-[#0b1e17] rounded-lg hover:bg-blue-700 dark:hover:bg-[#22ff97] transition-colors font-semibold mb-3"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={clearCart}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-[#2F2F2F] text-gray-700 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-[#2F2F2F] transition-colors font-medium"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
