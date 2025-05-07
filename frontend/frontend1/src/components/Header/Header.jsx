import React from 'react';
import './Header.css';
import bagIcon from '../../assets/home-img.png';

const Header = () => {
  return (
    <div className="home">
      <div className="image">
        <img src={bagIcon} alt="Bag Icon" />
      </div>

      <div className="content">
        <span>Fresh and Organic</span>
        <h3>Your daily need products</h3>
        <a href="#" className="btn">Get started</a>
      </div>
    </div>
  );
};

export default Header;
