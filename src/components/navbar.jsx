import React, { useContext, useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { MyContext } from '../context/cartContext';
import UserFooter from './userFooter';
import WishList from '../pages/user/Modal/WishList';
import OrderModal from '../pages/user/Modal/OrderModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [isOrderModalOpen, setisOrderModalOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { cart, setIsLogged, isLogged, user } = useContext(MyContext);
  const navigate = useNavigate();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Close profile dropdown if open when toggling menu
    if (isProfileDropdownOpen) setIsProfileDropdownOpen(false);
  };
 const toggleOrder=()=>{
  setIsProfileDropdownOpen(false);
  setisOrderModalOpen(true);
 }
  const toggleWishlist = () => {
    setIsProfileDropdownOpen(false);
    setWishlistOpen(!wishlistOpen); // Toggle wishlist visibility
  };
  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
    // Close mobile menu if open
    if (isOpen) setIsOpen(false);
  };
  
  const handleItemClick = () => {
    setIsOpen(false); 
  };
  
  const handleLogout = () => {
    setIsLogged(false);
    localStorage.clear();
    navigate('/login');
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen || isProfileDropdownOpen) {
        // Check if clicked element is not part of the menu or dropdown
        if (!event.target.closest('.navbar-container')) {
          setIsOpen(false);
          setIsProfileDropdownOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, isProfileDropdownOpen]);

  return (
    <>
      <nav className={`fixed top-0 w-full z-10 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white shadow-lg py-2' 
          : 'bg-gradient-to-r from-orange-50 to-white py-4'
      }`}>
        <div className="container mx-auto px-4 flex justify-between items-center navbar-container">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="relative font-serif text-3xl font-extrabold transition-all duration-300 group">
              <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent group-hover:from-amber-600 group-hover:to-orange-600">W</span>
              <span className="text-gray-800 tracking-wide">OODEN</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-amber-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-10 items-center">
            <li className="relative group py-2">
              <Link to="/" className="text-gray-800 font-medium hover:text-orange-600 transition-colors duration-300 px-2 py-1">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-amber-500 group-hover:w-full transition-all duration-300 ease-in-out"></span>
              </Link>
            </li>
            <li className="relative group py-2">
              <Link to="shop" className="text-gray-800 font-medium hover:text-orange-600 transition-colors duration-300 px-2 py-1">
                Shop
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-amber-500 group-hover:w-full transition-all duration-300 ease-in-out"></span>
              </Link>
            </li>
            <li className="relative group py-2">
              <Link to="about" className="text-gray-800 font-medium hover:text-orange-600 transition-colors duration-300 px-2 py-1">
                About Us
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-amber-500 group-hover:w-full transition-all duration-300 ease-in-out"></span>
              </Link>
            </li>
            <li className="relative group py-2">
              <Link to="contact" className="text-gray-800 font-medium hover:text-orange-600 transition-colors duration-300 px-2 py-1">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-amber-500 group-hover:w-full transition-all duration-300 ease-in-out"></span>
              </Link>
            </li>
          </ul>
          
          {/* Cart and Profile Section */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <Link to="cart" className="relative group">
              <span
                className={`absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white h-5 w-5 flex items-center justify-center rounded-full text-xs font-bold transition-all z-20 duration-300 ${
                  cart.length > 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                }`}
              >
                {cart.length}
              </span>
              <div className="p-2 rounded-full bg-orange-50 group-hover:bg-orange-100 transition-all duration-300 transform group-hover:scale-110">
                <svg
                  className="w-5 h-5 text-gray-800 group-hover:text-orange-600 transition-all duration-300"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                >
                  <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
                </svg>
              </div>
            </Link>
            
            {/* Profile Section */}
            {isLogged ? (
              <div className="relative ">
                <div
                  className="h-10 w-10 rounded-full cursor-pointer overflow-hidden ring-2 ring-orange-400 hover:ring-orange-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                  onClick={toggleProfileDropdown}
                >
                  <img
                    src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1721260800&semt=ais_user"
                    alt="user avatar"
                    className="h-full w-full object-cover"
                  />
                </div>
                {wishlistOpen && <WishList modalClose={() => setWishlistOpen(false)} />}

      {isOrderModalOpen && <OrderModal onClose={() => setisOrderModalOpen(false)} />}
                {isProfileDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={toggleProfileDropdown}></div>
                    <div className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-2xl z-50 overflow-hidden transition-all duration-300 transform origin-top-right ring-1 ring-orange-100">
                      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-amber-50">
                        <p className="font-bold text-gray-900 text-lg">{user?.name || 'Welcome Back!'}</p>
                        <p className="text-sm text-gray-600 truncate mt-1">{user?.email || ''}</p>
                      </div>
                      <div className="py-2">
                        <Link to="/profile" className="flex items-center px-6 py-3 text-gray-700 hover:bg-orange-50 transition-colors">
                          <svg className="w-5 h-5 mr-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                          </svg>
                          <span>My Profile</span>
                        </Link>
                        <span onClick={toggleOrder} className="flex items-center px-6 py-3 text-gray-700 hover:bg-orange-50 transition-colors">
                          <svg className="w-5 h-5 mr-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                          </svg>
                          <span>My Orders</span>
                        </span>
                        <span onClick={toggleWishlist} className="flex items-center px-6 py-3 text-gray-700 hover:bg-orange-50 transition-colors">
                          <svg className="w-5 h-5 mr-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                          </svg>
                          <span>Wishlist</span>
                        </span>
                        <div className="border-t border-gray-100 my-2"></div>
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-6 py-3 text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                          </svg>
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link to="/login" className="hidden md:flex group items-center space-x-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-4 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                </svg>
                <span className="font-medium">Login</span>
              </Link>
            )}
          
            {/* Mobile Menu Button - Always visible on mobile */}
            <button 
              onClick={toggleMenu} 
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-orange-50 hover:bg-orange-100 transition-colors duration-300 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-800"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-800"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={toggleMenu}
          ></div>
        )}
        
        {/* Mobile Menu Panel */}
        <div 
          className={`absolute  top-full right-0 w-72 bg-white shadow-2xl md:hidden z-50 transform transition-transform duration-300 ease-in-out rounded-bl-xl overflow-hidden ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-amber-50">
            <h3 className="font-bold text-gray-900 text-lg">WOODEN</h3>
            <p className="text-sm text-gray-600 mt-1">Premium Furniture</p>
          </div>
          
          <ul className="py-2">
            <li>
              <Link 
                to="/" 
                className="flex items-center px-6 py-4 text-gray-700 hover:bg-orange-50 transition-colors border-l-4 border-transparent hover:border-orange-500" 
                onClick={handleItemClick}
              >
                <svg className="w-5 h-5 mr-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="shop" 
                className="flex items-center px-6 py-4 text-gray-700 hover:bg-orange-50 transition-colors border-l-4 border-transparent hover:border-orange-500" 
                onClick={handleItemClick}
              >
                <svg className="w-5 h-5 mr-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
                Shop
              </Link>
            </li>
            <li>
              <Link 
                to="about" 
                className="flex items-center px-6 py-4 text-gray-700 hover:bg-orange-50 transition-colors border-l-4 border-transparent hover:border-orange-500" 
                onClick={handleItemClick}
              >
                <svg className="w-5 h-5 mr-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                About Us
              </Link>
            </li>
            <li>
              <Link 
                to="contact" 
                className="flex items-center px-6 py-4 text-gray-700 hover:bg-orange-50 transition-colors border-l-4 border-transparent hover:border-orange-500" 
                onClick={handleItemClick}
              >
                <svg className="w-5 h-5 mr-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                Contact Us
              </Link>
            </li>
            
            {!isLogged && (
              <li>
                <Link 
                  to="login" 
                  className="flex items-center px-6 py-4 text-gray-700 hover:bg-orange-50 transition-colors border-l-4 border-transparent hover:border-orange-500"
                  onClick={handleItemClick}
                >
                  <svg className="w-5 h-5 mr-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                  </svg>
                  Login
                </Link>
              </li>
            )}
            
            {/* <li className="p-6 mt-2 bg-gradient-to-r from-orange-50 to-amber-50">
              <a 
                href="tel:+1234567890" 
                className="flex items-center justify-center w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium py-3 px-4 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-md"
                onClick={handleItemClick}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                Call Us Now
              </a>
            </li> */}
          </ul>
        </div>
      </nav>

      <main className="">
        <Outlet />
      </main>
      <UserFooter/>
    </>
  );
};

export default Navbar;