import React, { useState } from 'react';
import productsData from '../data/products.json';

export const Home = ({ setActiveTab, addToCart, isLoggedIn, searchQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Tech & Gadgets', 'Fashion & Wear', 'Home Essentials', 'Music & Entertainment','Books & Stationery'];

  const filteredProducts = productsData.filter((product) => { 
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes((searchQuery || '').toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      setActiveTab('auth'); // Auth protection: redirect guest to login
    } else {
      addToCart(product);
    }
  };

  return (
    <div className="home-container">
      {/* Hero Banner Section */}
      <section className="hero-section">
        <h1>Welcome to <span className="text-blue">Davvy</span><span className="text-orange">Mart</span></h1>
        <p className="hero-subtitle">Everything You Need, Delivered to Your Doorstep.</p>
        <p className="hero-tagline">Shop top-quality tech, everyday essentials, and fashion at unbeatable prices.</p>
        <button className="hero-cta-btn" onClick={() => setActiveTab('products')}>
          Shop Now
        </button>
      </section>

      {/* Category Pills & Product Preview Section */}
      <section className="products-section">
        <div className="category-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p className="product-price">₦{product.price.toLocaleString()}</p>
                <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
                  Add To Cart
                </button>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', gridColumn: '1 / -1', color: '#64748b' }}>
              No products found matching "{searchQuery}".
            </p>
          )}
        </div>
      </section>
    </div>
  );
};