import { useState } from 'react';
import { ArrowLeft, Star, ShoppingCart, Heart, CheckCircle2, Send, Minus, Plus } from 'lucide-react';
import { useStore } from '../store';
import { mockProducts } from '../data/mockData';

interface ProductDetailPageProps {
  productId: string;
  onBack?: () => void;
}

export function ProductDetailPage({ productId, onBack }: ProductDetailPageProps) {
  const product = mockProducts.find((p) => p.id === productId);
  const { addToCart, cart } = useStore();
  const showToast = useStore((s) => s.showToast);

  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewText, setReviewText] = useState('');

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0b0f19] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">Product not found</p>
          <button onClick={onBack} className="text-indigo-400 hover:text-indigo-300">Go Back</button>
        </div>
      </div>
    );
  }

  const isInCart = cart.some((item) => item.id === product.id);
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  const handleAddToCart = () => {
    if (!isInCart) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.image,
        category: product.category,
      });
      showToast(`Added ${quantity} x ${product.name} to cart`, 'success');
    } else {
      showToast('Item already in cart', 'info');
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewTitle || !reviewText) {
      showToast('Please fill in title and review', 'error');
      return;
    }
    showToast('Review submitted successfully!', 'success');
    setReviewTitle('');
    setReviewText('');
    setReviewRating(5);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white pb-20">
      {/* Header / Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} /> Back to Catalog
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Left: Image */}
          <div className="bg-[#151b2b] rounded-3xl p-8 flex items-center justify-center aspect-square lg:aspect-auto lg:h-[500px]">
            <span className="text-[120px] sm:text-[160px] drop-shadow-2xl">{product.image}</span>
          </div>

          {/* Right: Details */}
          <div className="flex flex-col">
            {/* Tags */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-indigo-400 font-bold tracking-wider text-sm uppercase">{product.category}</span>
              {product.rating >= 4.8 && (
                <span className="px-3 py-1 rounded-full border border-indigo-500/50 text-indigo-300 text-xs font-semibold">
                  TOP RATED
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-[#FFBB00]">
                {'★'.repeat(Math.floor(product.rating))}
              </div>
              <span className="text-gray-400 text-sm">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-4xl font-bold text-indigo-400">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                  <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm font-bold border border-red-500/30">
                    -{discount}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Specifications */}
            {product.specs && product.specs.length > 0 && (
              <div className="bg-[#111625] border border-white/10 rounded-2xl p-6 mb-8">
                <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                  <span className="text-indigo-400">⚙</span> Specifications
                </h3>
                <p className="text-gray-400 text-sm">
                  {product.specs.join(' | ')}
                </p>
              </div>
            )}

            {/* Stock */}
            <div className="flex items-center gap-2 mb-6">
              <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
              <span className="text-gray-300 text-sm">{product.stock} in stock</span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center bg-[#151b2b] rounded-xl border border-white/10">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-gray-400 hover:text-white transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="p-3 text-gray-400 hover:text-white transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
              <span className="text-gray-500 text-sm">Max 10</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <button
                onClick={handleAddToCart}
                disabled={isInCart}
                className={`flex-1 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                  isInCart
                    ? 'bg-green-600 text-white cursor-default'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20'
                }`}
              >
                <ShoppingCart size={20} />
                {isInCart ? 'In Cart' : 'Add to Cart'}
              </button>
              <button
                onClick={() => {
                  setIsWishlisted(!isWishlisted);
                  showToast(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist', 'info');
                }}
                className={`px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 border transition-all ${
                  isWishlisted
                    ? 'bg-pink-500/20 border-pink-500 text-pink-400'
                    : 'bg-transparent border-white/20 text-white hover:bg-white/5'
                }`}
              >
                <Heart size={20} className={isWishlisted ? 'fill-current' : ''} />
                Wishlist
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="border-t border-white/10 pt-16">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
            <Star className="text-[#FFBB00] fill-current" size={24} /> Customer Reviews (1)
          </h2>

          {/* Existing Review */}
          <div className="bg-[#111625] border border-white/5 rounded-2xl p-6 mb-12">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-bold text-white text-lg">Priya L.</h4>
                <p className="text-white font-semibold mt-1">Sound quality is mind-blowing</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-[#FFBB00]">★★★★★</div>
                <span className="flex items-center gap-1 text-green-400 text-sm font-medium">
                  <CheckCircle2 size={14} /> Verified
                </span>
              </div>
            </div>
            <p className="text-gray-400">
              These earbuds have completely changed how I listen to music. The ANC is so effective I forget the world exists.
            </p>
          </div>

          {/* Write a Review */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Write a Review</h3>
            <form onSubmit={handleReviewSubmit} className="space-y-6 max-w-3xl">
              {/* Star Rating */}
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setReviewRating(star)}
                    className={`text-3xl transition-transform hover:scale-110 ${
                      star <= reviewRating ? 'text-[#FFBB00]' : 'text-gray-600'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>

              {/* Inputs */}
              <input
                type="text"
                placeholder="Review title"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                className="w-full bg-[#111625] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <textarea
                placeholder="Share your experience with this product..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={4}
                className="w-full bg-[#111625] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
              />

              {/* Submit */}
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/20"
              >
                <Send size={18} /> Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
