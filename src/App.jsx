import { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { ProductList } from './components/ProductList';
import { Auth } from './components/Auth';
import { Cart } from './components/Cart';
import './index.css';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setActiveTab('products');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('auth');
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Add this helper function inside App component:
  const clearCart = () => {
    setCart([]);
  };

  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="app-container">
      <Header
        cartCount={totalCartCount}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="main-content">
        {activeTab === 'home' && (
          <Home
            setActiveTab={setActiveTab}
            addToCart={addToCart}
            isLoggedIn={isLoggedIn}
            searchQuery={searchQuery}
          />
        )}
        {activeTab === 'products' && (
          <ProductList
            addToCart={addToCart}
            isLoggedIn={isLoggedIn}
            setActiveTab={setActiveTab}
            searchQuery={searchQuery}
          />
        )}
        {activeTab === 'auth' && <Auth onLogin={handleLogin} />}
        {activeTab === 'cart' && (
          <Cart
            cart={cart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            setActiveTab={setActiveTab}
            clearCart={clearCart}
          />
       )}
      </main>

      <Footer />
    </div>
  );
}