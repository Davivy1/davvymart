import React, { useState } from 'react';

export const Header = ({ cartCount, activeTab, setActiveTab, isLoggedIn, onLogout, searchQuery, setSearchQuery }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  const handleAccountClick = () => {
    if (!isLoggedIn) {
      handleNavClick('auth');
    } else {
      handleNavClick('products');
    }
  };

  return (
    <header className="navbar">
      {/* 1. Left: Brand Logo (Navigates to Home) */}
      <div className="navbar-left">
        <div className="logo" onClick={() => handleNavClick('home')}>
          <img src="/logo.png" alt="Cart Icon" className="logo-cart-img" />
          <span className="logo-text">
            <span className="text-blue">Davvy</span>
            <span className="text-orange">Mart</span>
          </span>
        </div>

        {/* Mobile Hamburger toggle */}
        <button 
          type="button"
          className="hamburger-btn" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* 2. Center: Search Pill Bar */}
      <div className="search-pill-bar">
        <span className="search-icon">🔍</span>
        <input 
          type="text" 
          placeholder="Search products, brands and categories" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="button" className="search-btn">Search</button>
      </div>

      {/* 3. Right: Navigation Items */}
      <nav className={`nav-actions ${isMobileMenuOpen ? 'open' : ''}`}>
        <button 
          type="button" 
          className={`nav-action-btn ${activeTab === 'auth' ? 'active' : ''}`}
          onClick={handleAccountClick}
        >
          👤 <span>Account</span>
        </button>

        <button 
          type="button" 
          className={`nav-action-btn ${activeTab === 'cart' ? 'active' : ''}`}
          onClick={() => handleNavClick('cart')}
        >
          🛒 <span>Cart</span>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>

        <button type="button" className="nav-action-btn">
          ❓ <span>Help</span>
        </button>

        {isLoggedIn && (
          <button type="button" className="nav-action-btn logout-link" onClick={onLogout}>
            <span>Logout</span>
          </button>
        )}
      </nav>
    </header>
  );
};