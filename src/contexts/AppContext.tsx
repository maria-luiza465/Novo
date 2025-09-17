import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    paymentMethod: string;
  };
  status: 'pending' | 'accepted' | 'preparing' | 'delivering' | 'delivered';
  createdAt: Date;
}

export interface SiteSettings {
  siteName: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
}

interface AppState {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  currentSection: string;
  isAdminLoggedIn: boolean;
  siteSettings: SiteSettings;
}

type AppAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_SECTION'; payload: string }
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'UPDATE_ORDER_STATUS'; payload: { id: string; status: Order['status'] } }
  | { type: 'LOGIN_ADMIN' }
  | { type: 'LOGOUT_ADMIN' }
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'REMOVE_PRODUCT'; payload: string }
  | { type: 'UPDATE_SITE_SETTINGS'; payload: Partial<SiteSettings> };

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Bolo Red Velvet Premium',
    description: 'Delicioso bolo red velvet com cream cheese artesanal e decoração especial com flores comestíveis',
    price: 89.90,
    image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg',
    category: 'confeitados'
  },
  {
    id: '2',
    name: 'Bolo de Chocolate Belga',
    description: 'Bolo de chocolate premium com ganache de chocolate belga e frutas vermelhas frescas',
    price: 95.50,
    image: 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg',
    category: 'confeitados'
  },
  {
    id: '3',
    name: 'Bolo Naked Cake Morango',
    description: 'Bolo estilo naked cake com morangos frescos, chantilly e biscoitos artesanais',
    price: 78.90,
    image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg',
    category: 'confeitados'
  },
  {
    id: '4',
    name: 'Bolo de Casamento 3 Andares',
    description: 'Elegante bolo de casamento com decoração em fondant, flores de açúcar e detalhes dourados',
    price: 450.00,
    image: 'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg',
    category: 'casamento'
  },
  {
    id: '5',
    name: 'Bolo de Casamento Rústico',
    description: 'Bolo de casamento estilo rústico com flores naturais e decoração minimalista',
    price: 380.00,
    image: 'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg',
    category: 'casamento'
  },
  {
    id: '6',
    name: 'Bolo de Casamento Vintage',
    description: 'Bolo romântico com decoração vintage, rendas comestíveis e pérolas de açúcar',
    price: 520.00,
    image: 'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg',
    category: 'casamento'
  },
  {
    id: '7',
    name: 'Kit Cupcakes Personalizados',
    description: 'Kit com 12 cupcakes decorados com tema personalizado para festas infantis',
    price: 48.90,
    image: 'https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg',
    category: 'festa'
  },
  {
    id: '8',
    name: 'Bolo de Aniversário Temático',
    description: 'Bolo personalizado com tema de sua escolha, ideal para aniversários especiais',
    price: 120.00,
    image: 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg',
    category: 'festa'
  },
  {
    id: '9',
    name: 'Torre de Docinhos',
    description: 'Torre com 50 docinhos variados: brigadeiros, beijinhos, cajuzinhos e bicho de pé',
    price: 85.00,
    image: 'https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg',
    category: 'festa'
  }
];

const initialState: AppState = {
  products: initialProducts,
  cart: [],
  orders: [],
  currentSection: 'home',
  isAdminLoggedIn: false,
  siteSettings: {
    siteName: 'Ge Bolos Gourmet',
    logoUrl: '/849297ce-29f4-4481-adcb-9154ffa3b5f3.webp',
    primaryColor: '#8B4513',
    secondaryColor: '#D2691E'
  }
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0),
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'SET_SECTION':
      return { ...state, currentSection: action.payload };
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };
    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.id
            ? { ...order, status: action.payload.status }
            : order
        ),
      };
    case 'LOGIN_ADMIN':
      return { ...state, isAdminLoggedIn: true };
    case 'LOGOUT_ADMIN':
      return { ...state, isAdminLoggedIn: false };
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case 'REMOVE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload),
      };
    case 'UPDATE_SITE_SETTINGS':
      return {
        ...state,
        siteSettings: { ...state.siteSettings, ...action.payload }
      };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}