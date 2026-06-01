import { useState, useMemo } from 'react';
import {
  Laptop,
  Smartphone,
  Headphones,
  Watch,
  Camera,
  Gamepad2,
  Home as HomeIcon,
  Plug,
  Search,
  Heart,
  ShoppingCart,
  SlidersHorizontal,
} from 'lucide-react';
import { useStore } from '../store';
import { mockProducts } from '../data/mockData';
import { RecommendationEngine } from './RecommendationEngine';

interface CatalogPageProps {
  onBack?: () => void;
  onNavigate?: (page: string, data?: any) => void;
}

type CategoryKey =
  | 'all'
  | 'laptops'
  | 'smartphones'
  | 'audio'
  | 'wearables'
  | 'cameras'
  | 'gaming'
  | 'smart-home'
  | 'accessories';

const CATEGORIES: Array<{
  id: CategoryKey;
  label: string;
  icon: any;
  description: string;
}> = [
  { id: 'laptops', label: 'Laptops', icon: Laptop, description: 'Powerful machines for work and play' },
  { id: 'smartphones', label: 'Smartphones', icon: Smartphone, description: 'Latest mobile technology' },
  { id: 'audio', label: 'Audio', icon: Headphones, description: 'Immersive sound experiences' },
  { id: 'wearables', label: 'Wearables', icon: Watch, description: 'Track your life in style' },
  { id: 'cameras', label: 'Cameras', icon: Camera, description: 'Capture every moment' },
  { id: 'gaming', label: 'Gaming', icon: Gamepad2, description: 'Next-level performance' },
  { id: 'smart-home', label: 'Smart Home', icon: HomeIcon, description: 'Automate your space' },
  { id: 'accessories', label: 'Accessories', icon: Plug, description: 'Essential add-ons' },
];

export function CatalogPage({ onBack, onNavigate }: CatalogPageProps) {
  const { addToCart, cart } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState(500);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  const isInCart = (id: string) => cart.some((item) => item.id === id);

  const filteredProducts = useMemo(() => {
    let items = mockProducts;

    // Map existing products to new categories or fallback to 'accessories'/'all'
    const categoryMap: Record<string, CategoryKey> = {
      Audio: 'audio',
      Cameras: 'cameras',
      Keyboards: 'gaming',
      Monitors: 'accessories',
      Storage: 'accessories',
      Accessories: 'accessories',
      Power: 'accessories',
      Gaming: 'gaming',
    };

    if (selectedCategory !== 'all') {
      items = items.filter(
        (p) => (categoryMap[p.category] || 'accessories') === selectedCategory
      );
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }

    items = items.filter((p) => p.price <= priceRange);

    const sorted = [...items];
    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        sorted.sort((a, b) => b.reviews - a.reviews);
        break;
    }

    return sorted;
  }, [selectedCategory, searchQuery, sortBy, priceRange]);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const activeCategory = CATEGORIES.find((c) => c.id === selectedCategory);

  return (
    <div className="min-h-screen bg-[#0a0f1a] dark:bg-[#0a0f1a] text-white">
      {/* Top Nav / Header Area */}
      <div className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0f1a]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {onBack && (
              <button
                onClick={onBack}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 transition-all"
              >
                ← Back
              </button>
            )}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                <input
                  type="text"
                  placeholder="Search gadgets, services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition-all"
                />
              </div>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
                showFilters
                  ? 'bg-blue-500/20 border-blue-400/40 text-blue-300'
                  : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
              }`}
            >
              <SlidersHorizontal size={18} /> Filters
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Browse By Badge + Title */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-semibold tracking-wider uppercase">
            Browse By
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Shop Categories
          </h1>
        </div>

        {/* Category Grid / Scroll */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-10">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`group relative flex flex-col items-center gap-3 p-5 rounded-2xl border transition-all duration-300 ${
                  active
                    ? 'bg-blue-500/10 border-blue-400/50 shadow-[0_0_30px_rgba(59,130,246,0.25)]'
                    : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20'
                }`}
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all ${
                    active ? 'bg-gradient-to-br from-blue-500 to-cyan-400 text-white' : 'bg-white/5 text-white/60 group-hover:text-white group-hover:bg-white/10'
                  }`}
                >
                  <Icon size={22} />
                </div>
                <span
                  className={`text-sm font-semibold ${
                    active ? 'text-white' : 'text-white/60 group-hover:text-white'
                  }`}
                >
                  {cat.label}
                </span>
                {active && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Category Header + Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {activeCategory?.label || 'All Products'}
            </h2>
            <p className="text-white/60 text-sm mt-1">
              {filteredProducts.length} items found · {activeCategory?.description || 'Everything we offer'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            {showFilters && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                <span className="text-xs text-white/60">Max Price: ${priceRange}</span>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-24 accent-blue-500"
                />
              </div>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white/[0.02] rounded-2xl border border-white/10">
            <Search className="mx-auto text-white/30 mb-4" size={48} />
            <p className="text-lg text-white/80 font-medium">No products match your filters</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setPriceRange(1000);
              }}
              className="mt-4 px-6 py-2 bg-blue-500/20 text-blue-300 rounded-xl hover:bg-blue-500/30 transition-all"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col"
              >
                <div
                  onClick={() => onNavigate?.('product', product.id)}
                  className="relative h-48 bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center cursor-pointer"
                >
                  <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                    {product.image}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 hover:bg-black/50 transition-all z-10"
                  >
                    <Heart
                      size={18}
                      className={wishlist.has(product.id) ? 'fill-red-500 text-red-500' : 'text-white/70'}
                    />
                  </button>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div
                    onClick={() => onNavigate?.('product', product.id)}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-1 mb-2">
                      <span className="text-[#FFBB00] text-sm">{'★'.repeat(Math.floor(product.rating))}</span>
                      <span className="text-xs text-white/50">({product.reviews})</span>
                    </div>
                    <h3 className="font-bold text-white text-lg mb-1 hover:text-blue-400 transition-colors">{product.name}</h3>
                    <p className="text-sm text-white/60 line-clamp-2 mb-4">{product.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                    <span className="text-xl font-bold text-blue-400">${product.price.toFixed(2)}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isInCart(product.id)) {
                          addToCart({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            quantity: 1,
                            image: product.image,
                            category: product.category,
                          });
                        }
                      }}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                        isInCart(product.id)
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/25'
                      }`}
                    >
                      <ShoppingCart size={16} />
                      {isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* AI Recommendations */}
        <div className="mt-16">
          <RecommendationEngine />
        </div>
      </div>
    </div>
  );
}
