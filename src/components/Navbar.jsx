
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Info, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <MapPin className="h-6 w-6 text-primary" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Toilettes Paris
            </span>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <NavLink to="/" isActive={location.pathname === "/"}>
              <MapPin className="h-4 w-4 mr-1" />
              Carte
            </NavLink>
            <NavLink to="/about" isActive={location.pathname === "/about"}>
              <Info className="h-4 w-4 mr-1" />
              À propos
            </NavLink>
          </nav>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-3"
          >
            <div className="flex flex-col space-y-2 py-2">
              <MobileNavLink 
                to="/" 
                isActive={location.pathname === "/"} 
                onClick={() => setIsMenuOpen(false)}
              >
                <MapPin className="h-5 w-5 mr-2" />
                Carte
              </MobileNavLink>
              <MobileNavLink 
                to="/about" 
                isActive={location.pathname === "/about"} 
                onClick={() => setIsMenuOpen(false)}
              >
                <Info className="h-5 w-5 mr-2" />
                À propos
              </MobileNavLink>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

const NavLink = ({ children, to, isActive }) => {
  return (
    <Link
      to={to}
      className={`flex items-center px-3 py-2 rounded-md transition-colors ${
        isActive
          ? "bg-primary text-white"
          : "text-gray-700 hover:bg-blue-50 hover:text-primary"
      }`}
    >
      {children}
    </Link>
  );
};

const MobileNavLink = ({ children, to, isActive, onClick }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center px-4 py-3 rounded-md transition-colors ${
        isActive
          ? "bg-primary text-white"
          : "text-gray-700 hover:bg-blue-50 hover:text-primary"
      }`}
    >
      {children}
    </Link>
  );
};

export default Navbar;
