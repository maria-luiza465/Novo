import React, { useState } from 'react';
import { Package, Plus, Trash2, LogOut, ClipboardList, ShoppingCart, BarChart3, Settings, TrendingUp, TrendingDown, DollarSign, Eye } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export default function AdminDashboard() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('orders');
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: 'confeitados'
  });
  const [siteSettings, setSiteSettings] = useState(state.siteSettings);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    const product = {
      id: Date.now().toString(),
      name: newProduct.name,
      description: newProduct.description,
      price: parseFloat(newProduct.price),
      image: newProduct.image,
      category: newProduct.category
    };

    dispatch({ type: 'ADD_PRODUCT', payload: product });
    setNewProduct({ name: '', description: '', price: '', image: '', category: 'confeitados' });
  };

  const handleRemoveProduct = (id: string) => {
    if (confirm('Tem certeza que deseja remover este produto?')) {
      dispatch({ type: 'REMOVE_PRODUCT', payload: id });
    }
  };

  const handleUpdateOrderStatus = (orderId: string, status: any) => {
    dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { id: orderId, status } });
  };

  const handleUpdateSiteSettings = () => {
    dispatch({ type: 'UPDATE_SITE_SETTINGS', payload: siteSettings });
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT_ADMIN' });
    dispatch({ type: 'SET_SECTION', payload: 'home' });
  };

  // Analytics calculations
  const totalRevenue = state.orders
    .filter(order => order.status === 'delivered')
    .reduce((sum, order) => sum + order.total, 0);

  const pendingRevenue = state.orders
    .filter(order => order.status !== 'delivered')
    .reduce((sum, order) => sum + order.total, 0);

  const productSales = state.orders
    .filter(order => order.status === 'delivered')
    .flatMap(order => order.items)
    .reduce((acc, item) => {
      acc[item.name] = (acc[item.name] || 0) + item.quantity;
      return acc;
    }, {} as Record<string, number>);

  const mostSoldProduct = Object.entries(productSales).sort(([,a], [,b]) => b - a)[0];
  const leastSoldProduct = Object.entries(productSales).sort(([,a], [,b]) => a - b)[0];

  const statusColumns = [
    { id: 'pending', title: 'Novos Pedidos', color: 'bg-yellow-100 border-yellow-300', textColor: 'text-yellow-800' },
    { id: 'accepted', title: 'Aceitos', color: 'bg-blue-100 border-blue-300', textColor: 'text-blue-800' },
    { id: 'preparing', title: 'Em Preparação', color: 'bg-orange-100 border-orange-300', textColor: 'text-orange-800' },
    { id: 'delivering', title: 'Saiu para Entrega', color: 'bg-purple-100 border-purple-300', textColor: 'text-purple-800' },
    { id: 'delivered', title: 'Entregues', color: 'bg-green-100 border-green-300', textColor: 'text-green-800' }
  ];

  const tabs = [
    { id: 'orders', label: 'Pedidos', icon: <ClipboardList className="w-5 h-5" /> },
    { id: 'products', label: 'Produtos', icon: <Package className="w-5 h-5" /> },
    { id: 'analytics', label: 'Relatórios', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'settings', label: 'Configurações', icon: <Settings className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-amber-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src={state.siteSettings.logoUrl} 
                alt={state.siteSettings.siteName}
                className="w-12 h-12 rounded-full shadow-lg border-2 border-amber-200"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Painel Administrativo</h1>
                <p className="text-amber-700 font-medium">{state.siteSettings.siteName}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-6 py-3 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors font-medium"
            >
              <LogOut className="w-5 h-5" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4 mb-12">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-3 px-8 py-4 rounded-full font-bold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-xl scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-50 shadow-lg hover:scale-105'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-12">Gerenciar Pedidos</h2>
            
            {state.orders.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-3xl shadow-xl border-2 border-gray-100">
                <ShoppingCart className="w-20 h-20 text-gray-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-400 mb-4">Nenhum pedido encontrado</h3>
                <p className="text-xl text-gray-500">Os pedidos aparecerão aqui quando chegarem</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                {statusColumns.map(column => (
                  <div key={column.id} className={`rounded-3xl border-3 ${column.color} p-6 shadow-xl`}>
                    <h3 className={`font-bold text-xl mb-6 text-center ${column.textColor}`}>
                      {column.title}
                    </h3>
                    <div className="space-y-6">
                      {state.orders
                        .filter(order => order.status === column.id)
                        .map(order => (
                          <div key={order.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                            <div className="mb-4">
                              <p className="font-bold text-gray-800 text-lg">{order.customer.name}</p>
                              <p className="text-gray-600">{order.customer.phone}</p>
                              <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                                R$ {order.total.toFixed(2)}
                              </p>
                            </div>
                            
                            <div className="mb-4">
                              <p className="font-bold text-gray-700 mb-2">Itens:</p>
                              {order.items.map(item => (
                                <p key={item.id} className="text-sm text-gray-600">
                                  {item.quantity}x {item.name}
                                </p>
                              ))}
                            </div>

                            <div className="space-y-3">
                              {column.id !== 'delivered' && (
                                <>
                                  {column.id === 'pending' && (
                                    <button
                                      onClick={() => handleUpdateOrderStatus(order.id, 'accepted')}
                                      className="w-full py-3 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 transition-colors"
                                    >
                                      Aceitar Pedido
                                    </button>
                                  )}
                                  {column.id === 'accepted' && (
                                    <button
                                      onClick={() => handleUpdateOrderStatus(order.id, 'preparing')}
                                      className="w-full py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors"
                                    >
                                      Iniciar Preparo
                                    </button>
                                  )}
                                  {column.id === 'preparing' && (
                                    <button
                                      onClick={() => handleUpdateOrderStatus(order.id, 'delivering')}
                                      className="w-full py-3 bg-purple-500 text-white font-bold rounded-xl hover:bg-purple-600 transition-colors"
                                    >
                                      Sair p/ Entrega
                                    </button>
                                  )}
                                  {column.id === 'delivering' && (
                                    <button
                                      onClick={() => handleUpdateOrderStatus(order.id, 'delivered')}
                                      className="w-full py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors"
                                    >
                                      Marcar Entregue
                                    </button>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-12">Gerenciar Produtos</h2>

            {/* Add Product Form */}
            <div className="bg-white rounded-3xl shadow-xl p-10 mb-12 border-2 border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-8">Adicionar Novo Produto</h3>
              
              <form onSubmit={handleAddProduct} className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-lg font-bold text-gray-700 mb-3">Nome</label>
                  <input
                    type="text"
                    required
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-gray-300 focus:ring-4 focus:ring-amber-300 focus:border-amber-500 transition-all duration-300 text-lg"
                    placeholder="Nome do produto"
                  />
                </div>

                <div>
                  <label className="block text-lg font-bold text-gray-700 mb-3">Categoria</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-gray-300 focus:ring-4 focus:ring-amber-300 focus:border-amber-500 transition-all duration-300 text-lg"
                  >
                    <option value="confeitados">Bolos Confeitados</option>
                    <option value="casamento">Bolos de Casamento</option>
                    <option value="festa">Festa & Eventos</option>
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-bold text-gray-700 mb-3">Preço (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-gray-300 focus:ring-4 focus:ring-amber-300 focus:border-amber-500 transition-all duration-300 text-lg"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-lg font-bold text-gray-700 mb-3">URL da Imagem</label>
                  <input
                    type="url"
                    required
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-gray-300 focus:ring-4 focus:ring-amber-300 focus:border-amber-500 transition-all duration-300 text-lg"
                    placeholder="https://..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-lg font-bold text-gray-700 mb-3">Descrição</label>
                  <textarea
                    required
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-gray-300 focus:ring-4 focus:ring-amber-300 focus:border-amber-500 transition-all duration-300 h-32 resize-none text-lg"
                    placeholder="Descrição detalhada do produto"
                  />
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="flex items-center space-x-3 px-10 py-5 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold text-xl rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                  >
                    <Plus className="w-6 h-6" />
                    <span>Adicionar Produto</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Products List */}
            <div className="bg-white rounded-3xl shadow-xl p-10 border-2 border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-8">Produtos Cadastrados</h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {state.products.map((product) => (
                  <div key={product.id} className="border-2 border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-56 object-cover"
                    />
                    <div className="p-6">
                      <h4 className="font-bold text-gray-800 mb-2 text-lg">{product.name}</h4>
                      <p className="text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                      <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 mb-4">
                        R$ {product.price.toFixed(2)}
                      </p>
                      <button
                        onClick={() => handleRemoveProduct(product.id)}
                        className="flex items-center space-x-2 w-full px-4 py-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors font-bold"
                      >
                        <Trash2 className="w-5 h-5" />
                        <span>Remover</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-12">Relatórios e Analytics</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {/* Revenue Cards */}
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 text-white shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <DollarSign className="w-12 h-12" />
                  <span className="text-green-100 font-medium">Faturamento</span>
                </div>
                <p className="text-3xl font-bold">R$ {totalRevenue.toFixed(2)}</p>
                <p className="text-green-100">Pedidos entregues</p>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl p-8 text-white shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <Eye className="w-12 h-12" />
                  <span className="text-blue-100 font-medium">Pendente</span>
                </div>
                <p className="text-3xl font-bold">R$ {pendingRevenue.toFixed(2)}</p>
                <p className="text-blue-100">Em andamento</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl p-8 text-white shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <ClipboardList className="w-12 h-12" />
                  <span className="text-purple-100 font-medium">Pedidos</span>
                </div>
                <p className="text-3xl font-bold">{state.orders.length}</p>
                <p className="text-purple-100">Total de pedidos</p>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-8 text-white shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <Package className="w-12 h-12" />
                  <span className="text-orange-100 font-medium">Produtos</span>
                </div>
                <p className="text-3xl font-bold">{state.products.length}</p>
                <p className="text-orange-100">Cadastrados</p>
              </div>
            </div>

            {/* Product Performance */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-3xl shadow-xl p-10 border-2 border-gray-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
                  <TrendingUp className="w-8 h-8 text-green-500 mr-3" />
                  Produto Mais Vendido
                </h3>
                {mostSoldProduct ? (
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600 mb-2">{mostSoldProduct[0]}</p>
                    <p className="text-xl text-gray-600">{mostSoldProduct[1]} unidades vendidas</p>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center">Nenhuma venda registrada</p>
                )}
              </div>

              <div className="bg-white rounded-3xl shadow-xl p-10 border-2 border-gray-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
                  <TrendingDown className="w-8 h-8 text-red-500 mr-3" />
                  Produto Menos Vendido
                </h3>
                {leastSoldProduct ? (
                  <div className="text-center">
                    <p className="text-3xl font-bold text-red-600 mb-2">{leastSoldProduct[0]}</p>
                    <p className="text-xl text-gray-600">{leastSoldProduct[1]} unidades vendidas</p>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center">Nenhuma venda registrada</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-12">Configurações do Site</h2>

            <div className="bg-white rounded-3xl shadow-xl p-10 border-2 border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-8">Personalização da Marca</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-lg font-bold text-gray-700 mb-3">Nome do Site</label>
                  <input
                    type="text"
                    value={siteSettings.siteName}
                    onChange={(e) => setSiteSettings({ ...siteSettings, siteName: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-gray-300 focus:ring-4 focus:ring-amber-300 focus:border-amber-500 transition-all duration-300 text-lg"
                    placeholder="Nome da confeitaria"
                  />
                </div>

                <div>
                  <label className="block text-lg font-bold text-gray-700 mb-3">URL da Logo</label>
                  <input
                    type="url"
                    value={siteSettings.logoUrl}
                    onChange={(e) => setSiteSettings({ ...siteSettings, logoUrl: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-gray-300 focus:ring-4 focus:ring-amber-300 focus:border-amber-500 transition-all duration-300 text-lg"
                    placeholder="https://..."
                  />
                </div>

                <div className="md:col-span-2">
                  <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200">
                    <h4 className="text-xl font-bold text-gray-800 mb-6">Preview da Logo</h4>
                    <div className="flex items-center space-x-4">
                      <img 
                        src={siteSettings.logoUrl} 
                        alt="Preview"
                        className="w-20 h-20 rounded-full shadow-lg border-4 border-white"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/849297ce-29f4-4481-adcb-9154ffa3b5f3.webp';
                        }}
                      />
                      <div>
                        <h5 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                          {siteSettings.siteName}
                        </h5>
                        <p className="text-amber-700 font-medium">Confeitaria Artesanal</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <button
                    onClick={handleUpdateSiteSettings}
                    className="px-10 py-5 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold text-xl rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                  >
                    Salvar Configurações
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}