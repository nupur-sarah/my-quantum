
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/home' },
  { name: 'Voice Notes', path: '/voice' },
  { name: 'Photos', path: '/photos' },
  { name: 'Love Letters', path: '/letters' },
  { name: 'Games', path: '/games' },
  { name: 'Virtual Hug', path: '/hug' },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  return (
    <header className="bg-white bg-opacity-80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/home" className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-quantum-deeprose" />
            <span className="font-pacifico text-xl text-quantum-deeprose">My Quantum</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-1 py-2 text-sm font-medium transition-all duration-200 
                  ${location.pathname === item.path 
                    ? 'text-quantum-deeprose border-b-2 border-quantum-deeprose' 
                    : 'text-primary-foreground hover:text-quantum-deeprose hover:border-b-2 hover:border-quantum-pink'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-quantum-deeprose" />
            ) : (
              <Menu className="h-6 w-6 text-quantum-deeprose" />
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div 
          className={`md:hidden absolute left-0 right-0 bg-white shadow-md transition-all duration-300 ${
            isMenuOpen ? 'max-h-screen py-4 opacity-100' : 'max-h-0 py-0 opacity-0 overflow-hidden'
          }`}
        >
          <nav className="flex flex-col space-y-3 px-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 rounded-md text-center ${
                  location.pathname === item.path
                    ? 'bg-quantum-pink text-quantum-deeprose font-medium'
                    : 'text-primary-foreground hover:bg-quantum-softpink'
                }`}
                onClick={closeMenu}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
