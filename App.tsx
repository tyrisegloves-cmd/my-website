import { useState, useEffect, useRef, useCallback } from 'react';
import { useStore } from './store';
import { Header } from './components/Header';
import { FloatingNav } from './components/FloatingNav';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { PrivacySettingsPage } from './components/PrivacySettingsPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { HomePage } from './components/HomePage';
import { CatalogPage } from './components/CatalogPage';
import { ServicesPage } from './components/ServicesPage';
import { CartPage } from './components/CartPage';
import { OrdersPage } from './components/OrdersPage';
import { ProfilePage } from './components/ProfilePage';
import { AdminDashboard } from './components/AdminDashboard';
import { LoginPage } from './components/LoginPage';
import { TrackingPage } from './components/TrackingPage';
import { ReviewSubmissionPage } from './components/ReviewSubmissionPage';
import { HelpButton } from './components/HelpButton';
import { HelpPage } from './components/HelpPage';
import { mockProducts, mockServices } from './data/mockData';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const pageHistory = useRef<string[]>(['home']);
  const { currentUser, setProducts, setServices, darkMode } = useStore();

  // Initialize mock data
  useEffect(() => {
    setProducts(mockProducts);
    setServices(mockServices);
  }, [setProducts, setServices]);

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handlePageChange = (page: string, data?: any) => {
    let target = page;
    if (page !== 'home' && page !== 'login' && page !== 'product' && page !== 'help' && !currentUser) {
      target = 'login';
    }
    if (page === 'product' && data) {
      setSelectedProductId(data);
    }
    // Only push to history if navigating to a different page
    if (target !== currentPage) {
      pageHistory.current.push(currentPage);
    }
    setCurrentPage(target);
  };

  const handleGoBack = useCallback(() => {
    const history = pageHistory.current;
    if (history.length > 0) {
      const previous = history.pop()!;
      setCurrentPage(previous);
    } else {
      setCurrentPage('home');
    }
  }, []);

  const handleLoginSuccess = (role: string) => {
    pageHistory.current.push(currentPage);
    if (role === 'admin') {
      setCurrentPage('dashboard');
    } else {
      setCurrentPage('home');
    }
  };

  // Show login page if not authenticated (except on home)
  if (!currentUser && currentPage !== 'home' && currentPage !== 'login') {
    return (
      <>
        <Header currentPage={currentPage} onPageChange={handlePageChange} />
        <LoginPage onLoginSuccess={handleLoginSuccess} onBack={handleGoBack} />
      </>
    );
  }

  // Show login page
  if (currentPage === 'login') {
    return (
      <LoginPage onLoginSuccess={handleLoginSuccess} onBack={handleGoBack} />
    );
  }

  const canGoBack = currentPage !== 'home';

  // Render current page
  const renderPage = () => {
    const back = canGoBack ? handleGoBack : undefined;
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handlePageChange} />;
      case 'catalog':
        return <CatalogPage onBack={back} onNavigate={handlePageChange} />;
      case 'product':
        return selectedProductId ? <ProductDetailPage productId={selectedProductId} onBack={back} /> : <CatalogPage onBack={back} onNavigate={handlePageChange} />;
      case 'services':
        return <ServicesPage onBack={back} />;
      case 'cart':
        return <CartPage onBack={back} />;
      case 'orders':
        return <OrdersPage isAdmin={currentUser?.role === 'admin'} onBack={back} onNavigateTracking={() => handlePageChange('tracking')} />;
      case 'profile':
        return <ProfilePage 
          onBack={back} 
          onNavigatePrivacy={() => handlePageChange('privacy')} 
          onNavigateTracking={() => handlePageChange('tracking')} 
          onNavigateReview={() => handlePageChange('review-submission')}
        />;
      case 'privacy':
        return <PrivacySettingsPage onBack={back} />;
      case 'tracking':
        return <TrackingPage onBack={back} />;
      case 'review-submission':
        return <ReviewSubmissionPage onBack={back} />;
      case 'help':
        return <HelpPage onBack={back} />;
      case 'dashboard':
      case 'analytics':
      case 'customers':
        return <AdminDashboard adminTab={currentPage} onBack={back} />;
      default:
        return <HomePage onNavigate={handlePageChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#121212] transition-colors duration-300">
      <Header currentPage={currentPage} onPageChange={handlePageChange} />
      <main>
        {renderPage()}
        {currentPage === 'home' && <Footer />}
      </main>
      <FloatingNav currentPage={currentPage} onPageChange={handlePageChange} />
      <HelpButton currentPage={currentPage} onPageChange={handlePageChange} />
      <Toast />
    </div>
  );
}
