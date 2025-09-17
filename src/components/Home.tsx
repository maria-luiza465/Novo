import React from 'react';
import { Star, Award, Clock, Heart, ChefHat, Sparkles } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export default function Home() {
  const { state, dispatch } = useApp();

  const features = [
    {
      icon: <Award className="w-10 h-10" />,
      title: 'Qualidade Premium',
      description: 'Ingredientes selecionados e receitas exclusivas da família',
    },
    {
      icon: <Clock className="w-10 h-10" />,
      title: 'Entrega Rápida',
      description: 'Bolos frescos entregues no prazo combinado',
    },
    {
      icon: <Heart className="w-10 h-10" />,
      title: 'Feito com Amor',
      description: 'Cada bolo é preparado com carinho e dedicação',
    },
    {
      icon: <ChefHat className="w-10 h-10" />,
      title: 'Receitas Artesanais',
      description: 'Técnicas tradicionais com toque moderno',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-100/30 to-orange-100/30"></div>
        
        {/* Background Elements */}
        <div className="absolute top-20 left-10 w-40 h-40 bg-amber-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-orange-200 rounded-full opacity-30 animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-200 rounded-full opacity-25 animate-bounce" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-red-200 rounded-full opacity-20 animate-bounce" style={{animationDelay: '3s'}}></div>

        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
          <div className="mb-12">
            <div className="relative mb-8">
              <img 
                src={state.siteSettings.logoUrl} 
                alt={state.siteSettings.siteName}
                className="w-40 h-40 mx-auto rounded-full shadow-2xl animate-pulse border-8 border-white"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-200/30 to-orange-200/30 animate-ping"></div>
              <Sparkles className="absolute -top-4 -right-4 w-12 h-12 text-yellow-400 animate-spin" />
            </div>
            
            <h1 className="text-7xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 mb-6 animate-fade-in drop-shadow-lg">
              {state.siteSettings.siteName}
            </h1>
            <p className="text-2xl md:text-3xl text-amber-800 mb-4 animate-fade-in font-medium" style={{animationDelay: '0.3s'}}>
              Confeitaria Artesanal
            </p>
            <p className="text-xl md:text-2xl text-amber-700 mb-12 animate-fade-in max-w-4xl mx-auto" style={{animationDelay: '0.5s'}}>
              Transformamos seus sonhos em deliciosos bolos artesanais, feitos com ingredientes premium e muito amor
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-16">
            {[
              { label: 'Ver Bolos Confeitados', section: 'confeitados', color: 'from-amber-600 to-orange-600' },
              { label: 'Bolos de Casamento', section: 'casamento', color: 'from-orange-600 to-red-600' },
              { label: 'Festa & Eventos', section: 'festa', color: 'from-red-600 to-pink-600' },
            ].map((button, index) => (
              <button
                key={button.section}
                onClick={() => dispatch({ type: 'SET_SECTION', payload: button.section })}
                className={`px-10 py-5 text-white font-bold rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 bg-gradient-to-r ${button.color} animate-fade-in border-2 border-white/20`}
                style={{animationDelay: `${0.7 + index * 0.2}s`}}
              >
                {button.label}
              </button>
            ))}
          </div>

          <div className="flex justify-center items-center space-x-3 animate-fade-in bg-white/80 rounded-full px-8 py-4 shadow-xl" style={{animationDelay: '1.3s'}}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-8 h-8 text-yellow-400 fill-current drop-shadow-md" />
            ))}
            <span className="ml-4 text-amber-800 font-bold text-lg">4.9/5 - Mais de 1000 clientes satisfeitos</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-white via-amber-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-orange-700 mb-6">
              Por que escolher a {state.siteSettings.siteName}?
            </h2>
            <p className="text-2xl text-amber-700 max-w-3xl mx-auto font-medium">
              Combinamos tradição familiar, qualidade premium e inovação para criar experiências únicas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-10 rounded-3xl bg-gradient-to-br from-white via-amber-50 to-orange-50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 group border-2 border-amber-100"
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white group-hover:scale-125 transition-transform duration-500 shadow-xl">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-amber-800 mb-4">{feature.title}</h3>
                <p className="text-amber-700 text-lg leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl font-bold text-white mb-8 drop-shadow-lg">
            Pronto para encantar seu paladar?
          </h2>
          <p className="text-2xl text-amber-100 mb-12 max-w-3xl mx-auto font-medium">
            Explore nosso cardápio completo e descubra sabores únicos que vão tornar seus momentos ainda mais especiais
          </p>
          <button
            onClick={() => dispatch({ type: 'SET_SECTION', payload: 'confeitados' })}
            className="px-16 py-6 bg-white text-amber-700 font-bold text-xl rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 border-4 border-amber-200"
          >
            Ver Cardápio Completo
          </button>
        </div>
      </section>
    </div>
  );
}