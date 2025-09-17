import React, { useState } from 'react';
import { ArrowLeft, Lock, User, Shield } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export default function AdminLogin() {
  const { dispatch } = useApp();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple authentication (in production, use proper authentication)
    if (credentials.email === 'admin@gebolos.com' && credentials.password === 'admin123') {
      dispatch({ type: 'LOGIN_ADMIN' });
      dispatch({ type: 'SET_SECTION', payload: 'admin-dashboard' });
    } else {
      setError('Credenciais inválidas');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 py-24">
      <div className="container mx-auto px-4 max-w-lg">
        {/* Header */}
        <div className="flex items-center mb-12">
          <button
            onClick={() => dispatch({ type: 'SET_SECTION', payload: 'home' })}
            className="mr-6 p-4 rounded-full bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:scale-110"
          >
            <ArrowLeft className="w-7 h-7 text-gray-600" />
          </button>
          <h1 className="text-4xl font-bold text-gray-800">
            Área Administrativa
          </h1>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-12 border-2 border-gray-100">
          <div className="text-center mb-12">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-600 to-slate-700 rounded-full flex items-center justify-center shadow-xl">
              <Shield className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Login de Administrador</h2>
            <p className="text-xl text-gray-600">Acesse o painel de controle</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-6 text-red-600 text-center font-medium text-lg">
                {error}
              </div>
            )}

            <div>
              <label className="block text-lg font-bold text-gray-700 mb-3">
                E-mail
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                <input
                  type="email"
                  required
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  className="w-full pl-14 pr-6 py-4 rounded-2xl border-2 border-gray-300 focus:ring-4 focus:ring-gray-300 focus:border-gray-500 transition-all duration-300 text-lg"
                  placeholder="admin@gebolos.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-lg font-bold text-gray-700 mb-3">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                <input
                  type="password"
                  required
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full pl-14 pr-6 py-4 rounded-2xl border-2 border-gray-300 focus:ring-4 focus:ring-gray-300 focus:border-gray-500 transition-all duration-300 text-lg"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-5 bg-gradient-to-r from-gray-600 to-slate-700 text-white font-bold text-xl rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            >
              Entrar no Painel
            </button>
          </form>

          <div className="mt-8 text-center">
            <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
              <p className="text-lg font-bold text-gray-700 mb-2">Credenciais de Demonstração:</p>
              <p className="text-gray-600">
                <strong>E-mail:</strong> admin@gebolos.com
              </p>
              <p className="text-gray-600">
                <strong>Senha:</strong> admin123
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}