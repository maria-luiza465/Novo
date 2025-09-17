import React from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import Header from './components/Header';
import Home from './components/Home';
import ProductSection from './components/ProductSection';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

function AppContent() {
  const { state } = useApp();

  const renderCurrentSection = () => {
    if (state.isAdminLoggedIn && state.currentSection === 'admin-dashboard') {
      return <AdminDashboard />;
    }

    switch (state.currentSection) {
      case 'home':
        return <Home />;
      case 'confeitados':
        return (
          <ProductSection
            category="confeitados"
            title="Bolos Confeitados"
            description="Bolos artesanais elaborados com ingredientes premium e decorações especiais que encantam os olhos e o paladar. Cada bolo é uma obra de arte comestível."
          />
        );
      case 'casamento':
        return (
          <ProductSection
            category="casamento"
            title="Bolos de Casamento"
            description="Bolos exclusivos para tornar seu dia especial ainda mais memorável, com designs elegantes e sabores únicos que simbolizam o amor e a união."
          />
        );
      case 'festa':
        return (
          <ProductSection
            category="festa"
            title="Festa & Eventos"
            description="Doces e bolos temáticos perfeitos para aniversários, festas infantis e celebrações especiais. Criamos momentos doces e inesquecíveis."
          />
        );
      case 'cart':
        return <Cart />;
      case 'checkout':
        return <Checkout />;
      case 'order-confirmation':
        return <OrderConfirmation />;
      case 'admin-login':
        return <AdminLogin />;
      case 'admin-dashboard':
        return state.isAdminLoggedIn ? <AdminDashboard /> : <AdminLogin />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!state.isAdminLoggedIn && <Header />}
      <main>
        {renderCurrentSection()}
      </main>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;