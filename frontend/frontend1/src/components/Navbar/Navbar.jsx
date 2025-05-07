import React, { useContext, useState, useRef } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

const Navbar = ({ setShowLogin, setSearchQuery }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken, food_list } = useContext(StoreContext);
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const searchBoxRef = useRef(null); // Create a ref for the search box

  // Handle search input change
  const handleSearchInputChange = (e) => {
    const input = e.target.value;
    setSearchInput(input);
    setSearchQuery(input);

    // Filter suggestions based on input
    if (input) {
      const filteredSuggestions = food_list.filter(item =>
        item.name.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchInput(suggestion.name);
    setSearchQuery(suggestion.name);
    setSuggestions([]); // Clear suggestions after selection
  };

  // Handle Enter key press to scroll to first food item
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default form submission behavior
      setSuggestions([]); // Clear suggestions

      // Scroll to the first food item
      const firstFoodItem = document.querySelector('.food-item');
      if (firstFoodItem) {
        firstFoodItem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate('/');
  }

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <div className='header-1'>
        <a href="#" className="logo"><i className="fas fa-shopping-basket"></i>SHOP SPHERE</a>
        <div className="search-box-container">
          <input
            type="search"
            id="search-box"
            placeholder="search here...."
            value={searchInput}
            onChange={handleSearchInputChange}
            onKeyPress={handleKeyPress} // Add key press event listener
            ref={searchBoxRef}
          />
          <label htmlFor="search-box" className="fas fa-search"></label>
          {/* Suggestions dropdown */}
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="suggestion-item"
                >
                  {suggestion.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className='navbar'>
        <ul className="navbar-menu" style={{ fontFamily: '"Nunito", sans-serif' }}>
          <Link to="/" onClick={() => setMenu("home")} className={`bck ${menu === "home" ? "active" : ""}`}>home</Link>
          <a href='#explore-menu' onClick={() => setMenu("menu")} className={`bck ${menu === "menu" ? "active" : ""}`}>Shop</a>
          <a href='#deal' onClick={() => setMenu("mob-app")} className={`bck ${menu === "mob-app" ? "active" : ""}`}>deals</a>
          <a onClick={() => { setMenu("contact"); scrollToBottom(); }} className={`bck ${menu === "contact" ? "active" : ""}`}>contact us</a>
        </ul>
        <div className="navbar-right">
          <Link to='/cart' className='navbar-search-icon'>
            <a href="#" className="fas fa-shopping-cart"></a>
            <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
          </Link>
          {!token ? 
            <button onClick={() => setShowLogin(true)} style={{ boxShadow: 'none', marginBottom: '18px'}}>sign in</button> :
            <div className='navbar-profile'>
              <a href="#" className="fas fa-user-circle"></a>
              <ul className='navbar-profile-dropdown' style={{ backgroundColor: 'white' }}>
                <li onClick={() => navigate('/myorders')}>
                  <img src={assets.bag_icon} alt="" /><p>Orders</p>
                </li>
                <hr />
                <li onClick={logout}>
                  <img src={assets.logout_icon} alt="" /><p>Logout</p>
                </li>
              </ul>
            </div>
          }
        </div>
      </div>
    </>
  );
}

export default Navbar;
