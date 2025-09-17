import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Banknote, Smartphone, QrCode } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export default function Checkout() {
  const { state, dispatch } = useApp();
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: ''
  });

  const total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const order = {
      id: Date.now().toString(),
      items: state.cart,
      total,
      customer: customerData,
      status: 'pending' as const,
      createdAt: new Date()
    };

    dispatch({ type: 'ADD_ORDER', payload: order });
    dispatch({ type: 'CLEAR_CART' });
    dispatch({ type: 'SET_SECTION', payload: 'order-confirmation' });
  };

  const paymentMethods = [
    { id: 'card', label: 'Cartão', icon: <CreditCard className="w-6 h-6" /> },
    { id: 'cash', label: 'Dinheiro', icon: <Banknote className="w-6 h-6" /> },
    { id: 'pix', label: 'PIX', icon: <Smartphone className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex items-center mb-12">
          <button
            onClick={() => dispatch({ type: 'SET_SECTION', payload: 'cart' })}
            className="mr-6 p-4 rounded-full bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-amber-200 hover:scale-110"
          >
            <ArrowLeft className="w-7 h-7 text-amber-700" />
          </button>
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
            Finalizar Pedido
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div className="bg-white rounded-3xl shadow-xl p-10 border-2 border-amber-100">
            <h2 className="text-3xl font-bold text-amber-800 mb-8">Resumo do Pedido</h2>
            
            <div className="space-y-6 mb-8">
              {state.cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-4 border-b border-amber-100">
                  <div>
                    <p className="font-bold text-amber-800 text-lg">{item.name}</p>
                    <p className="text-amber-600">Quantidade: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="border-t-2 border-amber-200 pt-6">
              <div className="flex justify-between items-center">
                <p className="text-2xl font-bold text-amber-800">Total:</p>
                <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                  R$ {total.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Customer Form */}
          <div className="bg-white rounded-3xl shadow-xl p-10 border-2 border-amber-100">
            <h2 className="text-3xl font-bold text-amber-800 mb-8">Dados do Cliente</h2>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-lg font-bold text-amber-700 mb-3">
                  Nome completo
                </label>
                <input
                  type="text"
                  required
                  value={customerData.name}
                  onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl border-2 border-amber-200 focus:ring-4 focus:ring-amber-300 focus:border-amber-500 transition-all duration-300 text-lg"
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <label className="block text-lg font-bold text-amber-700 mb-3">
                  E-mail
                </label>
                <input
                  type="email"
                  required
                  value={customerData.email}
                  onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl border-2 border-amber-200 focus:ring-4 focus:ring-amber-300 focus:border-amber-500 transition-all duration-300 text-lg"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label className="block text-lg font-bold text-amber-700 mb-3">
                  Telefone
                </label>
                <input
                  type="tel"
                  required
                  value={customerData.phone}
                  onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl border-2 border-amber-200 focus:ring-4 focus:ring-amber-300 focus:border-amber-500 transition-all duration-300 text-lg"
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div>
                <label className="block text-lg font-bold text-amber-700 mb-3">
                  Endereço de entrega
                </label>
                <textarea
                  required
                  value={customerData.address}
                  onChange={(e) => setCustomerData({ ...customerData, address: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl border-2 border-amber-200 focus:ring-4 focus:ring-amber-300 focus:border-amber-500 transition-all duration-300 h-32 resize-none text-lg"
                  placeholder="Rua, número, bairro, cidade, CEP"
                />
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-lg font-bold text-amber-700 mb-6">
                  Forma de pagamento
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setCustomerData({ ...customerData, paymentMethod: method.id })}
                      className={`p-6 rounded-2xl border-3 transition-all duration-300 flex flex-col items-center space-y-3 hover:scale-105 ${
                        customerData.paymentMethod === method.id
                          ? 'border-amber-500 bg-amber-50 text-amber-700 shadow-lg'
                          : 'border-amber-200 hover:border-amber-400 text-amber-600 bg-white'
                      }`}
                    >
                      {method.icon}
                      <span className="font-bold">{method.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* PIX Details */}
              {customerData.paymentMethod === 'pix' && (
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border-2 border-amber-200">
                  <h3 className="text-2xl font-bold text-amber-800 mb-6 text-center">Dados PIX</h3>
                  <div className="text-center">
                    <div className="w-48 h-48 mx-auto mb-6 bg-white rounded-2xl flex items-center justify-center shadow-xl border-4 border-amber-200">
                      <div className="text-center">
                        <QrCode className="w-24 h-24 text-amber-700 mx-auto mb-2" />
                        <span className="text-sm font-bold text-amber-600">QR CODE PIX</span>
                      </div>
                    </div>
                    <div className="space-y-3 text-lg">
                      <p className="text-amber-700">
                        <strong>Chave PIX:</strong> ge.bolos@email.com
                      </p>
                      <p className="text-amber-700">
                        <strong>Beneficiário:</strong> Ge Bolos Gourmet LTDA
                      </p>
                      <p className="text-amber-700">
                        <strong>Valor:</strong> R$ {total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={!customerData.paymentMethod}
                className="w-full py-6 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold text-xl rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border-2 border-white/20"
              >
                Confirmar Pedido
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}