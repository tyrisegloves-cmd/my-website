import { Product, Service, User } from '../store';

export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'user',
  avatar: '👨‍💼'
};

export const mockAdminUser: User = {
  id: '2',
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'admin',
  avatar: '👨‍💻'
};

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'AuraBuds Pro Max',
    price: 249.00,
    originalPrice: 299.00,
    category: 'Audio',
    image: '🎧',
    description: 'Immersive sound meets intelligent noise cancellation. AuraBuds Pro Max adapts to your environment for a perfect audio experience.',
    stock: 115,
    rating: 5.0,
    reviews: 892,
    specs: ['ANC', '30hr Battery', 'Hi-Res Audio', 'Wireless Charging', 'IPX5']
  },
  {
    id: '2',
    name: 'Ultra 4K Webcam',
    price: 199.99,
    category: 'Cameras',
    image: '📷',
    description: 'Crystal clear 4K webcam perfect for streaming and professional video calls.',
    stock: 32,
    rating: 4.6,
    reviews: 187
  },
  {
    id: '3',
    name: 'Mechanical Gaming Keyboard',
    price: 149.99,
    category: 'Keyboards',
    image: '⌨️',
    description: 'RGB mechanical keyboard with customizable switches and macro support.',
    stock: 58,
    rating: 4.7,
    reviews: 412
  },
  {
    id: '4',
    name: 'Smart Display 27"',
    price: 349.99,
    category: 'Monitors',
    image: '🖥️',
    description: 'LED-backlit 27-inch monitor with USB-C connectivity and built-in speakers.',
    stock: 24,
    rating: 4.5,
    reviews: 156
  },
  {
    id: '5',
    name: 'Portable SSD 2TB',
    price: 199.99,
    category: 'Storage',
    image: '💾',
    description: 'Ultra-fast portable SSD with 2TB capacity and IP67 rating for durability.',
    stock: 67,
    rating: 4.9,
    reviews: 521
  },
  {
    id: '6',
    name: 'USB-C Hub Pro',
    price: 79.99,
    category: 'Accessories',
    image: '🔌',
    description: '7-in-1 USB-C hub with HDMI, USB 3.0 ports, and SD card reader.',
    stock: 89,
    rating: 4.4,
    reviews: 234
  },
  {
    id: '7',
    name: 'Ergonomic Mouse',
    price: 59.99,
    category: 'Accessories',
    image: '🖱️',
    description: 'Wireless ergonomic mouse with precision tracking and 12-month battery life.',
    stock: 76,
    rating: 4.6,
    reviews: 298
  },
  {
    id: '8',
    name: 'Laptop Stand Pro',
    price: 89.99,
    category: 'Accessories',
    image: '📑',
    description: 'Adjustable aluminum laptop stand for better posture and airflow.',
    stock: 41,
    rating: 4.5,
    reviews: 189
  },
  {
    id: '9',
    name: 'Portable Charger 20K',
    price: 39.99,
    category: 'Power',
    image: '🔋',
    description: '20,000mAh portable charger with fast charging support for multiple devices.',
    stock: 134,
    rating: 4.7,
    reviews: 612
  },
  {
    id: '10',
    name: 'Wireless Charging Pad',
    price: 29.99,
    category: 'Power',
    image: '⚡',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
    stock: 102,
    rating: 4.4,
    reviews: 367
  },
  {
    id: '11',
    name: 'Gaming Mouse Pad',
    price: 34.99,
    category: 'Gaming',
    image: '🎮',
    description: 'Large RGB gaming mouse pad with smooth surface and non-slip base.',
    stock: 55,
    rating: 4.3,
    reviews: 201
  },
  {
    id: '12',
    name: 'Cable Organizer Kit',
    price: 24.99,
    category: 'Accessories',
    image: '🧵',
    description: 'Complete cable management kit with clips, sleeves, and labels.',
    stock: 198,
    rating: 4.2,
    reviews: 143
  }
];

export const mockServices: Service[] = [
  {
    id: 's1',
    name: 'Computer Repair & Maintenance',
    price: 89.99,
    category: 'Repair',
    image: '🔧',
    description: 'Professional computer repair, maintenance, and troubleshooting services.',
    duration: '1-2 hours',
    rating: 4.8,
    reviews: 256
  },
  {
    id: 's2',
    name: 'Network Setup & Installation',
    price: 149.99,
    category: 'Installation',
    image: '🌐',
    description: 'Professional WiFi network setup and optimization for your home or office.',
    duration: '2-3 hours',
    rating: 4.7,
    reviews: 128
  },
  {
    id: 's3',
    name: 'Data Recovery Service',
    price: 199.99,
    category: 'Recovery',
    image: '💿',
    description: 'Expert data recovery from damaged drives and storage devices.',
    duration: '3-7 days',
    rating: 4.9,
    reviews: 89
  },
  {
    id: 's4',
    name: 'Hardware Upgrade Installation',
    price: 79.99,
    category: 'Installation',
    image: '⚙️',
    description: 'Professional installation of RAM, SSDs, graphics cards, and other hardware.',
    duration: '1-2 hours',
    rating: 4.6,
    reviews: 167
  },
  {
    id: 's5',
    name: 'Malware & Virus Removal',
    price: 99.99,
    category: 'Security',
    image: '🛡️',
    description: 'Comprehensive malware scanning and removal with performance optimization.',
    duration: '1-2 hours',
    rating: 4.7,
    reviews: 203
  },
  {
    id: 's6',
    name: 'System Optimization',
    price: 79.99,
    category: 'Optimization',
    image: '⚡',
    description: 'Complete system cleanup, optimization, and performance tuning.',
    duration: '2 hours',
    rating: 4.5,
    reviews: 145
  },
  {
    id: 's7',
    name: 'Software Installation & Setup',
    price: 59.99,
    category: 'Installation',
    image: '💾',
    description: 'Professional software installation and configuration services.',
    duration: '1-2 hours',
    rating: 4.4,
    reviews: 98
  },
  {
    id: 's8',
    name: 'Device Screen Repair',
    price: 129.99,
    category: 'Repair',
    image: '📱',
    description: 'Screen replacement and repair for laptops, tablets, and monitors.',
    duration: '1-3 hours',
    rating: 4.6,
    reviews: 234
  }
];

export const productCategories = ['all', 'Audio', 'Cameras', 'Keyboards', 'Monitors', 'Storage', 'Accessories', 'Power', 'Gaming'];
export const serviceCategories = ['all', 'Repair', 'Installation', 'Recovery', 'Security', 'Optimization'];
