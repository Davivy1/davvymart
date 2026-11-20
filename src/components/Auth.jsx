import React, { useState } from 'react';

export const Auth = ({ onLogin }) => {
  const [isLoginTab, setIsLoginTab] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <section className="auth-section">
      <div className="auth-card">
        {/* Login / Register Tab Header */}
        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab-btn ${isLoginTab ? 'active' : ''}`}
            onClick={() => setIsLoginTab(true)}
          >
            Login
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${!isLoginTab ? 'active' : ''}`}
            onClick={() => setIsLoginTab(false)}
          >
            Register
          </button>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {!isLoginTab && (
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="John Doe" required />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="humanbeing@gmail.com" required />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" required />
          </div>

          <button type="submit" className="auth-submit-btn">
            {isLoginTab ? 'Sign in' : 'Create Account'}
          </button>

          {/* Toggle Text Link */}
          <p className="auth-switch-text">
            {isLoginTab ? (
              <>
                Don't have an account?{' '}
                <span onClick={() => setIsLoginTab(false)} style={{ color: 'var(--brand-blue)', textDecoration: 'underline', cursor: 'pointer' }}>
                  Register
                </span>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <span onClick={() => setIsLoginTab(true)} style={{ color: 'var(--brand-blue)', textDecoration: 'underline', cursor: 'pointer' }}>
                  Login
                </span>
              </>
            )}
          </p>
        </form>
      </div>
    </section>
  );
};