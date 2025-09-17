import React, { useEffect, useState } from 'react';
import { CheckCircle, Clock, Sparkles } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export default function OrderConfirmation() {
  const { dispatch } = useApp();
  const [countdown, setCountdown] = useState(7);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          dispatch({ type: 'SET_SECTION', payload: 'home' });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-green-200 rounded-full opacity-20 animate-bounce"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-emerald-200 rounded-full opacity-30 animate-bounce" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-teal-200 rounded-full opacity-25 animate-bounce" style={{animationDelay: '2s'}}></div>

      <div className="text-center max-w-2xl mx-auto px-4 relative z-10">
        <div className="relative mb-12">
          <div className="w-40 h-40 mx-auto bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-bounce shadow-2xl border-8 border-white">
            <CheckCircle className="w-20 h-20 text-white" />
          </div>
          <Sparkles className="absolute -top-4 -right-4 w-16 h-16 text-yellow-400 animate-spin" />
          <Sparkles className="absolute -bottom-4 -left-4 w-12 h-12 text-green-400 animate-ping" />
        </div>

        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500 mb-8 drop-shadow-lg">
          Pedido Confirmado!
        </h1>

        <p className="text-2xl text-green-700 mb-12 leading-relaxed font-medium">
          Obrigado pela preferência! Seu pedido foi recebido com sucesso e já está sendo preparado com todo carinho.
        </p>

        <div className="bg-white rounded-3xl shadow-2xl p-12 mb-12 border-4 border-green-200">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <Clock className="w-8 h-8 text-green-600" />
            <span className="text-green-700 font-bold text-xl">Redirecionamento automático em:</span>
          </div>
          
          <div className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500 animate-pulse mb-6">
            {countdown}
          </div>
          
          <p className="text-lg text-green-600 font-medium">
            Você será redirecionado para a página inicial automaticamente
          </p>
        </div>

        <button
          onClick={() => dispatch({ type: 'SET_SECTION', payload: 'home' })}
          className="px-12 py-5 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-xl rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 border-2 border-white/20"
        >
          Voltar ao Início
        </button>
      </div>
    </div>
  );
}