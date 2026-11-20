import React, { useState } from 'react';

export const Cart = ({ cart, updateQuantity, removeFromCart, setActiveTab, clearCart }) => {
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  // Empty State
  if (cart.length === 0 && !showReceipt) {
    return (
      <section className="empty-cart-section">
        <div className="empty-cart-icon-wrapper">
          <img src="/logo.png" alt="Cart Icon" className="empty-cart-img" />
        </div>
        <h2>Your cart is empty!</h2>
        <button className="hero-cta-btn" onClick={() => setActiveTab('products')}>
          Start Shopping
        </button>
      </section>
    );
  }

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    const newReceipt = {
      orderId: `DM-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleString(),
      items: [...cart],
      total: subtotal,
    };
    setReceiptData(newReceipt);
    setShowReceipt(true);
  };

  const handleCloseReceipt = () => {
    setShowReceipt(false);
    clearCart();
    setActiveTab('home');
  };

  return (
    <section className="cart-section">
      <h2>Shopping Cart</h2>
      <div className="cart-layout">
        <div className="cart-items-list">
          {cart.map((item) => (
            <div className="cart-item-row" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="cart-item-info">
                <h4>{item.name}</h4>
                <p className="product-price">₦{item.price.toLocaleString()}</p>
              </div>
              <div className="quantity-controls">
                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>✕</button>
            </div>
          ))}
        </div>

        <div className="cart-summary-box">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₦{subtotal.toLocaleString()}</span>
          </div>
          <div className="summary-row">
            <span>Delivery Fee</span>
            <span>Free</span>
          </div>
          <hr />
          <div className="summary-row total">
            <span>Total</span>
            <span>₦{subtotal.toLocaleString()}</span>
          </div>
          <button className="hero-cta-btn full-width" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>

      {/* DIGITAL RECEIPT MODAL */}
      {showReceipt && receiptData && (
        <div className="modal-overlay">
          <div className="receipt-modal">
            <div className="receipt-header">
              <span className="success-badge">✓ Payment Successful</span>
              <h3>DavvyMart Official Receipt</h3>
              <p className="receipt-order-id">Order ID: {receiptData.orderId}</p>
              <p className="receipt-date">{receiptData.date}</p>
            </div>

            <div className="receipt-body">
              <h4>Items Purchased:</h4>
              <ul className="receipt-items-list">
                {receiptData.items.map((item) => (
                  <li key={item.id} className="receipt-item font-mono">
                    <span>{item.name} (x{item.quantity})</span>
                    <span>₦{(item.price * item.quantity).toLocaleString()}</span>
                  </li>
                ))}
              </ul>
              <hr />
              <div className="receipt-total-row">
                <span>Total Amount Paid:</span>
                <span className="receipt-total-price">₦{receiptData.total.toLocaleString()}</span>
              </div>
            </div>

            <button className="hero-cta-btn full-width" onClick={handleCloseReceipt}>
              Close & Return to Home
            </button>
          </div>
        </div>
      )}
    </section>
  );
};