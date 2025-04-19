
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Heart, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar: React.FC = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    if (isOpen) setIsOpen(false);
  };

  const navItems = [
    { to: '/home', label: 'Home' },
    { to: '/voice', label: 'Voice' },
    { to: '/photos', label: 'Photos' },
    { to: '/letters', label: 'Letters' },
    { to: '/games', label: 'Games' },
    { to: '/hug', label: 'Hug' },
    { to: '/features', label: 'Special Features' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white bg-opacity-90 backdrop-blur-md shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <NavLink to="/home" className="flex items-center gap-2">
          <Heart className="text-quantum-deeprose" fill="#FFDEE2" strokeWidth={2} />
          <span className="text-xl font-pacifico text-quantum-deeprose">My Quantum</span>
        </NavLink>

        {isMobile ? (
          <>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu} 
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="relative z-50"
            >
              {isOpen ? <X /> : <Menu />}
            </Button>

            {isOpen && (
              <div className="fixed inset-0 z-40 flex items-center justify-center bg-white bg-opacity-95">
                <nav className="flex flex-col items-center gap-6 p-8">
                  {navItems.map(item => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={closeMenu}
                      className={({ isActive }) => `text-lg font-medium transition-colors ${
                        isActive ? 'text-quantum-deeprose' : 'text-muted-foreground hover:text-quantum-deeprose'
                      }`}
                    >
                      {item.label}
                    </NavLink>
                  ))}
                  <Button variant="outline" className="mt-4 flex items-center gap-2" onClick={closeMenu}>
                    <User size={18} />
                    <span>Profile</span>
                  </Button>
                </nav>
              </div>
            )}
          </>
        ) : (
          <nav className="flex items-center space-x-6">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `text-sm font-medium transition-colors ${
                  isActive ? 'text-quantum-deeprose' : 'text-muted-foreground hover:text-quantum-deeprose'
                }`}
              >
                {item.label}
              </NavLink>
            ))}
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <User size={16} />
              <span>Profile</span>
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
