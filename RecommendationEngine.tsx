import { useMemo } from 'react';
import { ShoppingBag, Wrench, Clock } from 'lucide-react';
import { useStore, CartItem, Product, Service } from '../store';

interface RecommendationEngineProps {
  userId?: string;
  onProductClick?: (productId: string) => void;
}

interface UserPreferences {
  categories: Record<string, number>;
  priceRanges: { low: number; medium: number; high: number };
  brands: Record<string, number>;
}

export function RecommendationEngine({ userId = 'current', onProductClick }: RecommendationEngineProps) {
  const { products, services, cart, currentUser } = useStore();

  // Generate recommendations based on user behavior
  const recommendations = useMemo(() => {
    const userCart: CartItem[] = cart;
    const userPreferences = getUserPreferences(userCart);
    const recommendedProducts = getRecommendedProducts(userCart, userPreferences);
    const recommendedServices = getRecommendedServices(userPreferences);

    return {
      products: recommendedProducts,
      services: recommendedServices
    };
  }, [products, services, cart, userId]);

  // Analyze user preferences from cart and browsing
  function getUserPreferences(userCart: CartItem[]): UserPreferences {
    const preferences: UserPreferences = {
      categories: {},
      priceRanges: { low: 0, medium: 0, high: 0 },
      brands: {}
    };

    // Analyze cart items
    userCart.forEach(item => {
      const product = products.find(p => p.id === item.id);
      if (product) {
        preferences.categories[product.category] = (preferences.categories[product.category] || 0) + 1;
        
        if (product.price < 50) preferences.priceRanges.low += 1;
        else if (product.price < 150) preferences.priceRanges.medium += 1;
        else preferences.priceRanges.high += 1;
      }
    });

    // Analyze existing products/services for demo
    if (userId === 'current') {
      // Simulate user behavior for demo
      const demoCategories = ['Audio', 'Storage', 'Accessories'];
      demoCategories.forEach(cat => {
        preferences.categories[cat] = (preferences.categories[cat] || 0) + 2;
      });
      preferences.priceRanges.medium = 3;
    }

    return preferences;
  }

  function getRecommendedProducts(cartItems: CartItem[], preferences: UserPreferences) {
    const cartIds = new Set(cartItems.map(item => item.id));
    const scores: Record<string, number> = {};

    // Score products based on multiple factors
    products.forEach(product => {
      if (cartIds.has(product.id)) return; // Already in cart

      let score = 0;

      // Category match (highest weight)
      if (preferences.categories[product.category]) {
        score += preferences.categories[product.category] * 10;
      }

      // Price range match
      const priceRangeScore = product.price < 50 ? preferences.priceRanges.low :
                              product.price < 150 ? preferences.priceRanges.medium :
                              preferences.priceRanges.high;
      score += priceRangeScore * 3;

      // Rating boost (higher rated products get bonus)
      score += product.rating * 2;

      // Review count boost (more reviewed = more trusted)
      score += Math.min(product.reviews / 100, 5);

      // Random factor for diversity
      score += Math.random() * 2;

      scores[product.id] = score;
    });

    // Sort by score and return top 6
    return Object.entries(scores)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 6)
      .map(([id]) => products.find(p => p.id === id))
      .filter(Boolean) as Product[];
  }

  function getRecommendedServices(preferences: UserPreferences) {
    const scores: Record<string, number> = {};

    services.forEach(service => {
      let score = 0;

      // Category match
      const categoryMatch = preferences.categories[service.category];
      if (categoryMatch) {
        score += categoryMatch * 8;
      }

      // Rating boost
      score += service.rating * 3;

      // Review count boost
      score += Math.min(service.reviews / 50, 4);

      // Random factor for diversity
      score += Math.random() * 2;

      scores[service.id] = score;
    });

    // Sort by score and return top 4
    return Object.entries(scores)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 4)
      .map(([id]) => services.find(s => s.id === id))
      .filter(Boolean) as Service[];
  }

  if (!currentUser) {
    return null;
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
            <span className="text-white text-xl">🤖</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Space Grotesk' }}>
              AI-Powered Recommendations
            </h2>
            <p className="text-gray-600 text-sm">
              Personalized suggestions based on your browsing and preferences
            </p>
          </div>
        </div>

        {/* Products */}
        {recommendations.products.length > 0 && (
          <div className="mb-10">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <ShoppingBag size={18} />
              Recommended for You
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.products.map((product: Product) => (
                <div
                  key={product.id}
                  onClick={() => onProductClick?.(product.id)}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <span className="text-5xl">{product.image}</span>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex text-yellow-400">
                        {'★'.repeat(Math.floor(product.rating))}
                      </div>
                      <span className="text-xs text-gray-600">{product.rating}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-blue-600">${product.price.toFixed(2)}</span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          const productInCart = cart.some(item => item.id === product.id);
                          if (!productInCart) {
                            useStore.getState().addToCart({
                              id: product.id,
                              name: product.name,
                              price: product.price,
                              quantity: 1,
                              image: product.image,
                              category: product.category
                            });
                          }
                        }}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                          cart.some(item => item.id === product.id)
                            ? 'bg-green-600 dark:bg-[#00FF85] text-white dark:text-[#0b1e17]'
                            : 'bg-blue-600 dark:bg-[#121212] border dark:border-[#00FF85] text-white dark:text-[#00FF85] hover:bg-blue-700 dark:hover:bg-[#00FF85] dark:hover:text-[#0b1e17]'
                        }`}
                      >
                        {cart.some(item => item.id === product.id) ? 'In Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Services */}
        {recommendations.services.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Wrench size={18} />
              Recommended Services
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendations.services.map((service: Service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="h-32 bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                    <span className="text-4xl">{service.image}</span>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {service.name}
                    </h4>
                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex text-yellow-400">
                        {'★'.repeat(Math.floor(service.rating))}
                      </div>
                      <span className="text-xs text-gray-600">{service.rating}</span>
                    </div>
                    <div className="text-xs text-gray-600 mb-3">
                      <Clock size={12} className="inline mr-1" />
                      {service.duration}
                    </div>
                    <button className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}