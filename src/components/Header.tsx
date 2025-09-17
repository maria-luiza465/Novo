import React from 'react';
import { ShoppingCart, User, Heart } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export default function Header() {
  const { state, dispatch } = useApp();

  const cartItemsCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSectionChange = (section: string) => {
    dispatch({ type: 'SET_SECTION', payload: section });
  };

  return (
    <header className="bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 shadow-xl sticky top-0 z-50 border-b-4 border-amber-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-4 cursor-pointer group"
            onClick={() => handleSectionChange('home')}
          >
            <div className="relative">
              <img 
                src={state.siteSettings.logoUrl} 
                alt={state.siteSettings.siteName}
                className="w-16 h-16 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300 border-4 border-white"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-200/20 to-orange-200/20 group-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-orange-600 to-red-600 group-hover:scale-105 transition-transform duration-300">
                {state.siteSettings.siteName}
              </h1>
              <p className="text-sm text-amber-700 font-medium">Confeitaria Artesanal</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-6">
            {[
              { id: 'home', label: 'Início' },
              { id: 'confeitados', label: 'Bolos Confeitados' },
              { id: 'casamento', label: 'Bolos de Casamento' },
              { id: 'festa', label: 'Festa & Eventos' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleSectionChange(item.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-md ${
                  state.currentSection === item.id
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg transform scale-105'
                    : 'text-amber-700 hover:bg-gradient-to-r hover:from-amber-100 hover:to-orange-100 bg-white/80'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleSectionChange('cart')}
              className="relative p-4 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group border-2 border-amber-200"
            >
              <ShoppingCart className="w-6 h-6 text-amber-700 group-hover:text-orange-600" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center animate-bounce shadow-lg">
                  {cartItemsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => handleSectionChange('admin-login')}
              className="p-4 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group border-2 border-amber-200"
            >
              <User className="w-6 h-6 text-amber-700 group-hover:text-orange-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}