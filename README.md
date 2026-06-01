# Igris - Tech Gadgets & Professional Services Catalog

A comprehensive web application for browsing and purchasing tech gadgets, booking professional services, and managing orders and appointments.

## Features

### 🛍️ Product & Service Catalog
- **Browse Products**: Comprehensive catalog of 500+ tech gadgets including headphones, monitors, keyboards, storage devices, and accessories
- **Search & Filter**: Advanced search with category filters and price range sliders
- **Sorting Options**: Sort by featured, price, rating, or reviews
- **Detailed Listings**: High-resolution images, descriptions, pricing, and real-time stock availability
- **Professional Services**: 50+ tech services including repair, installation, data recovery, and optimization

### 🛒 Shopping Experience
- **Shopping Cart**: Add products to cart with quantity management
- **Wishlist**: Save favorite products for later
- **Secure Checkout**: Multi-step checkout process with shipping and payment details
- **Multiple Payment Options**: Support for card payments with secure processing
- **Order Tracking**: Monitor order status and view tracking information

### 📅 Service Booking
- **Easy Scheduling**: Book services with preferred date and time slots
- **Service Details**: Duration, pricing, and comprehensive descriptions
- **Appointment Management**: View upcoming appointments and cancel if needed
- **Service History**: Track completed services and leave reviews

### 👤 User Management
- **Personalized Profiles**: Manage personal information and preferences
- **Purchase History**: View all past orders with order details
- **Service Engagements**: Track service bookings and completion status
- **Security Features**: Password management and two-factor authentication options

### 🏢 Administrator Dashboard
- **Order Management**: Live sales tracking, shipping status updates, packing slips, and refund processing
- **Catalog Control**: Add/edit products, manage variants, track stock levels, and set low-stock alerts
- **Customer CRM**: View customer purchase histories, calculate lifetime value, manage accounts
- **Marketing Tools**: Generate discount codes, set expiration dates, configure product up-sells
- **Analytics & Security**: Revenue tracking, cart abandonment monitoring, MFA support, staff tracking logs

### 🤖 AI-Powered Features
- **Recommendation Engine**: Personalized suggestions based on browsing history and preferences
- **Smart Analytics**: Cart abandonment tracking and behavioral insights

### ⭐ Community Features
- **Product & Service Ratings**: Users can rate products and services
- **Customer Reviews**: Leave detailed feedback for products and completed services
- **Community Ratings**: See average ratings and review counts

## Technology Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4 with responsive design
- **State Management**: Zustand
- **UI Components**: Lucide React Icons
- **Fonts**: Space Grotesk (headlines) and Inter (body text)

## Project Structure

```
src/
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── HomePage.tsx        # Landing page
│   ├── CatalogPage.tsx     # Product catalog
│   ├── ServicesPage.tsx    # Services listing
│   ├── CartPage.tsx        # Shopping cart & checkout
│   ├── OrdersPage.tsx      # Orders & appointments
│   ├── ProfilePage.tsx     # User profile management
│   ├── AdminDashboard.tsx  # Admin panel
│   ├── LoginPage.tsx       # Authentication
│   └── index.ts            # Component exports
├── data/
│   └── mockData.ts         # Sample products, services, and users
├── App.tsx                 # Main application component
├── store.ts                # Zustand state management
└── index.css               # Global styles
```

## Key Features Implementation

### 1. Product Catalog
- Search by product name and description
- Filter by category (Audio, Cameras, Keyboards, Monitors, Storage, Accessories, Power, Gaming)
- Sort by price (low-high, high-low), rating, and reviews
- Real-time stock availability indicator
- Wishlist functionality

### 2. Service Booking
- View all available services with descriptions and pricing
- Book services by selecting preferred date and time
- Multiple service categories (Repair, Installation, Recovery, Security, Optimization)
- Appointment confirmation and tracking

### 3. Secure Checkout
- Multi-step checkout process
- Shipping information collection
- Payment details processing
- Order confirmation with summary
- Free shipping on orders over $100

### 4. Order Management
- View all past orders with order ID, date, status, and items
- Track order status in real-time
- Cancel appointments with reason entry
- View completed services and leave reviews

### 5. Admin Dashboard
- View key metrics (revenue, orders, active users, conversion rate)
- Manage product catalog with add/edit/delete functionality
- Track inventory levels with visual indicators
- View customer order history
- Analytics dashboard with revenue trends and category performance

## User Roles

### Customer
- Full access to product catalog and services
- Shopping cart and checkout functionality
- Order and appointment management
- Profile and settings management

### Administrator
- Complete dashboard access
- Order and inventory management
- Customer relationship management
- Marketing and analytics tools
- Secure multi-factor authentication

## Authentication

The application includes a login system with:
- Separate customer and admin login paths
- Demo credentials (any email/password combination works for demo)
- Session management using Zustand store
- Role-based access control

## Design System

### Typography
- **Headlines**: Space Grotesk (modern, tech-inspired proportional sans-serif)
- **Body**: Inter (neutral, highly readable sans-serif)

### Color Palette
- Primary: Blue (#0066FF) to Purple (#7C3AED) gradient
- Accent: Green for services, Pink for premium features
- Neutral: Grays for backgrounds and text

### Components
- Clean, modular card-based layout
- Responsive design for mobile, tablet, and desktop
- Smooth transitions and hover effects
- Minimal outline icons for navigation

## Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

## Mock Data

The application includes comprehensive mock data:
- 12 sample products across 9 categories
- 8 professional services across 6 categories
- 2 user profiles (customer and admin)
- Mock order history and booking data

## Performance Optimizations

- Single-file build for fast loading
- Code splitting and lazy loading
- Optimized CSS with Tailwind
- Responsive images and icons
- Smooth animations with GPU acceleration

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Integration with real payment gateways (Stripe, PayPal)
- Email notifications for orders and appointments
- Push notifications for status updates
- Advanced recommendation algorithm
- User reviews with image attachments
- Video tutorials and product demos
- Live chat support
- Wishlist sharing
- Referral program
- Subscription-based services

## License

This project is part of the Igris platform.

---

**Igris** - Your ultimate destination for premium tech gadgets and professional services.
