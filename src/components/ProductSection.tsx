import React from 'react';
import { Plus, ShoppingCart, Star } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface ProductSectionProps {
  category: string;
  title: string;
  description: string;
}

export default function ProductSection({ category, title, description }: ProductSectionProps) {
  const { state, dispatch } = useApp();
  
  const products = state.products.filter(product => product.category === category);

  const handleAddToCart = (product: any) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 mb-6 drop-shadow-lg">
            {title}
          </h1>
          <p className="text-2xl text-amber-700 max-w-4xl mx-auto font-medium leading-relaxed">
            {description}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 overflow-hidden group border-4 border-amber-100"
            >
              <div className="relative overflow-hidden h-72">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-4 right-4 bg-white/90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-amber-800 mb-3 group-hover:text-orange-700 transition-colors">
                  {product.name}
                </h3>
                <p className="text-amber-700 mb-6 line-clamp-3 text-lg leading-relaxed">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                    R$ {product.price.toFixed(2)}
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex items-center space-x-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 border-2 border-white/20"
                  >
                    <ShoppingCart className="w-6 h-6" />
                    <span>Adicionar</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-24">
            <div className="w-40 h-40 mx-auto mb-8 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center border-4 border-amber-200">
              <Plus className="w-20 h-20 text-amber-400" />
            </div>
            <h3 className="text-3xl font-bold text-amber-600 mb-4">Em breve novos produtos</h3>
            <p className="text-xl text-amber-700">Estamos preparando delícias especiais para você!</p>
          </div>
        )}
      </div>
    </div>
  );
}