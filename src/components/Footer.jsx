import React from 'react';
import { FaFacebook, FaYoutube, FaInstagram, FaTwitter } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="text-blue">Davvy</span>
            <span className="text-orange">Mart</span>
          </div>
          <p className="footer-tagline">Your No. 1 Student Store</p>
        </div>

        <div className="footer-contact">
          <h4>Contact us</h4>
          <p><strong>Address:</strong> 16 Afolabi Aina Street, Ikeja, Lagos State.</p>
          <p><strong>Phone Number:</strong> 0803 123 4567</p>
          <p><strong>Whatsapp:</strong> +234 803 123 4567</p>
          <p id="email-link"><strong>Email:</strong> <a href="mailto:info@davvymart.com">info@davvymart.com</a></p>
        </div>
 
        <div className="footer-social">
          <h4>Follow us on Social Media</h4>
          <div className="social-icons">
            <a href="https://davivy-s-website.vercel.app" target="_blank" rel="noreferrer" className="social-icon" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="YouTube">
              <FaYoutube />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="Twitter">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <hr />
        <p>&copy; {new Date().getFullYear()} DavvyMart . All Rights Reserved</p>
      </div>
    </footer>
  );
};