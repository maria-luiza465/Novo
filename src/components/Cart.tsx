import React from 'react';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export default function Cart() {
  const { state, dispatch } = useApp();

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id, quantity } });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (state.cart.length > 0) {
      dispatch({ type: 'SET_SECTION', payload: 'checkout' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="flex items-center mb-12">
          <button
            onClick={() => dispatch({ type: 'SET_SECTION', payload: 'home' })}
            className="mr-6 p-4 rounded-full bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-amber-200 hover:scale-110"
          >
            <ArrowLeft className="w-7 h-7 text-amber-700" />
          </button>
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
            Seu Carrinho
          </h1>
        </div>

        {state.cart.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-40 h-40 mx-auto mb-8 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center border-4 border-amber-200">
              <ShoppingBag className="w-20 h-20 text-amber-400" />
            </div>
            <h3 className="text-3xl font-bold text-amber-600 mb-4">Carrinho vazio</h3>
            <p className="text-xl text-amber-700 mb-12">Adicione produtos deliciosos ao seu carrinho!</p>
            <button
              onClick={() => dispatch({ type: 'SET_SECTION', payload: 'home' })}
              className="px-12 py-5 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold text-xl rounded-full shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300"
            >
              Ver Produtos
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Cart Items */}
            {state.cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border-2 border-amber-100"
              >
                <div className="flex items-center space-x-8">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-28 object-cover rounded-2xl shadow-lg border-2 border-amber-200"
                  />
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-amber-800 mb-2">{item.name}</h3>
                    <p className="text-amber-700 text-lg line-clamp-2 mb-3">{item.description}</p>
                    <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                      R$ {item.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-4 bg-amber-50 rounded-full px-6 py-3 border-2 border-amber-200">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-amber-50 transition-colors border border-amber-200"
                      >
                        <Minus className="w-5 h-5 text-amber-700" />
                      </button>
                      <span className="font-bold text-amber-800 w-12 text-center text-xl">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-amber-50 transition-colors border border-amber-200"
                      >
                        <Plus className="w-5 h-5 text-amber-700" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-3 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors border-2 border-red-200 hover:scale-110 duration-300"
                    >
                      <Trash2 className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Summary */}
            <div className="bg-white rounded-3xl shadow-xl p-10 mt-12 border-4 border-amber-200">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-3xl font-bold text-amber-800">Total do Pedido</h3>
                <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                  R$ {total.toFixed(2)}
                </p>
              </div>
              
              <button
                onClick={handleCheckout}
                className="w-full py-6 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold text-xl rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20"
              >
                Finalizar Compra
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}