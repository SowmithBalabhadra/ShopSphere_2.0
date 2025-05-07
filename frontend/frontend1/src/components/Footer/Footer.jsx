import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets'; // If not used, consider removing it.

const Footer = () => {
  return (
    <footer className="footer" style={{ margin: '40px' }}>
      <div className="box-container">
        <div className="box">
          <a href="#" className="logo"><i className="fas fa-shopping-basket"></i> SHOP SPHERE</a>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam eveniet earum reprehenderit quae, fuga illum quod nostrum labore. Quidem, ipsam!</p>
          <div className="share">
            <a href="#" className="btn fab fa-facebook-f" aria-label="Facebook"></a>
            <a href="#" className="btn fab fa-twitter" aria-label="Twitter"></a>
            <a href="#" className="btn fab fa-instagram" aria-label="Instagram"></a>
            <a href="#" className="btn fab fa-linkedin" aria-label="LinkedIn"></a>
          </div>
        </div>
        <div className="box">
          <h3>Our Location</h3>
          <div className="links">
            <a href="#">India</a>
            <a href="#">USA</a>
            <a href="#">France</a>
            <a href="#">Japan</a>
            <a href="#">Russia</a>
          </div>
        </div>
        <div className="box">
          <h3>Quick Links</h3>
          <div className="links">
            <a href="#">Home</a>
            <a href="#">Category</a>
            <a href="#">Shop</a>
            <a href="#">Deal</a>
            <a href="#">Contact</a>
          </div>
        </div>
        <div className="box">
          <h3>Explore</h3>
          <div className="links">
            <a href="#">New</a>
            <a href="#">Future Goals</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
