import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

export interface ServiceBooking {
  id: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  stock: number;
  rating: number;
  reviews: number;
  originalPrice?: number;
  specs?: string[];
  visuals?: string[];
}

export interface Service {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  duration: string;
  rating: number;
  reviews: number;
}

export interface UserReview {
  id: string;
  name: string;
  initials: string;
  stars: number;
  quote: string;
  purchased: string;
  date: string;
}

interface AppState {
  // Auth
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateCartItemQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  
  // Service Bookings
  bookings: ServiceBooking[];
  addBooking: (booking: ServiceBooking) => void;
  cancelBooking: (id: string) => void;
  
  // Products & Services
  products: Product[];
  services: Service[];
  userReviews: UserReview[];
  setProducts: (products: Product[]) => void;
  setServices: (services: Service[]) => void;
  addUserReview: (review: UserReview) => void;
  
  // UI
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;

  // Dark mode
  darkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (value: boolean) => void;

  // Toast notifications
  toast: { id: number; message: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  clearToast: () => void;
}

export const useStore = create<AppState>((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
  
  cart: [],
  addToCart: (item) => set((state) => {
    const existing = state.cart.find(c => c.id === item.id);
    if (existing) {
      return {
        cart: state.cart.map(c =>
          c.id === item.id ? { ...c, quantity: c.quantity + item.quantity } : c
        ),
      };
    }
    return { cart: [...state.cart, item] };
  }),
  removeFromCart: (id) => set((state) => ({
    cart: state.cart.filter(item => item.id !== id),
  })),
  updateCartItemQuantity: (id, quantity) => set((state) => ({
    cart: state.cart.map(item =>
      item.id === id ? { ...item, quantity } : item
    ).filter(item => item.quantity > 0),
  })),
  clearCart: () => set({ cart: [] }),
  
  bookings: [],
  addBooking: (booking) => set((state) => ({
    bookings: [...state.bookings, booking],
  })),
  cancelBooking: (id) => set((state) => ({
    bookings: state.bookings.map(b =>
      b.id === id ? { ...b, status: 'cancelled' } : b
    ),
  })),
  
  products: [],
  services: [],
  userReviews: [
    {
      id: '1',
      stars: 5,
      quote: "I've been shopping at Igris for over a year. The product quality is unmatched and their service team fixed my laptop in just 2 hours. Absolutely stellar experience!",
      name: 'Alex M.',
      initials: 'A',
      purchased: 'ProBook X15',
      date: '1 month ago'
    },
    {
      id: '2',
      stars: 5,
      quote: "The AI recommendation feature is genuinely impressive. It suggested the AuraBuds based on my previous purchases and it's been the best gadget I've bought in years.",
      name: 'Sarah K.',
      initials: 'S',
      purchased: 'AuraBuds Pro Max',
      date: '2 weeks ago'
    },
    {
      id: '3',
      stars: 5,
      quote: "Booked a Smart Home Setup service and the technician arrived on time, configured everything perfectly, and even explained how to use all the features. 10/10!",
      name: 'James T.',
      initials: 'J',
      purchased: 'Smart Home Setup',
      date: '3 days ago'
    }
  ],
  setProducts: (products) => set({ products }),
  setServices: (services) => set({ services }),
  addUserReview: (review) => set((state) => ({ userReviews: [review, ...state.userReviews] })),
  
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  selectedCategory: 'all',
  setSelectedCategory: (category) => set({ selectedCategory: category }),

  darkMode: typeof window !== 'undefined' ? localStorage.getItem('igris-dark-mode') === 'true' : false,
  toggleDarkMode: () => set((state) => {
    const newMode = !state.darkMode;
    if (typeof window !== 'undefined') {
      localStorage.setItem('igris-dark-mode', String(newMode));
    }
    return { darkMode: newMode };
  }),
  setDarkMode: (value) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('igris-dark-mode', String(value));
    }
    set({ darkMode: value });
  },

  toast: null,
  showToast: (message, type = 'info') => {
    const id = Date.now();
    set({ toast: { id, message, type } });
    if (typeof window !== 'undefined') {
      window.setTimeout(() => {
        set((state) => (state.toast?.id === id ? { toast: null } : {}));
      }, 2800);
    }
  },
  clearToast: () => set({ toast: null }),
}));
