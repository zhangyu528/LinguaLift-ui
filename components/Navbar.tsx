
import React, { useState } from 'react';
import { Bot, LogOut, User, Menu, X } from 'lucide-react';

interface NavbarProps {
  isLoggedIn?: boolean;
  onSignOut?: () => void;
  onSignIn?: () => void;
  onProfileClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onSignOut, onSignIn, onProfileClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="relative z-50 bg-white border-b border-gray-100/50">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={isLoggedIn ? undefined : onSignOut}>
          <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center text-white shadow-brand-200 shadow-lg">
              <Bot size={22} />
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">LinguaLift</span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          {!isLoggedIn ? (
            <>
              <button onClick={onSignIn} className="bg-gray-900 text-white px-5 py-2.5 rounded-full hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200">Get Started</button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <button 
                onClick={onProfileClick}
                className="flex items-center gap-2 text-gray-600 hover:text-brand-600 transition-colors px-4 py-2 rounded-full hover:bg-gray-50"
              >
                <User size={18} />
                <span>Profile</span>
              </button>
              <div className="w-px h-6 bg-gray-200 mx-2"></div>
              <button onClick={onSignOut} className="flex items-center gap-2 text-red-500 hover:text-red-700 transition-colors px-4 py-2 rounded-full hover:bg-red-50">
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 hover:text-gray-900 p-2">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl py-4 px-6 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200 z-50">
          {!isLoggedIn ? (
            <>
              <a href="#features" className="text-gray-600 font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
              <div className="h-px bg-gray-100 my-1"></div>
              <button onClick={() => { setIsMobileMenuOpen(false); onSignIn?.(); }} className="text-brand-600 font-bold py-2 text-left">Get Started</button>
            </>
          ) : (
            <>
              <button 
                onClick={() => { setIsMobileMenuOpen(false); onProfileClick?.(); }}
                className="flex items-center gap-3 text-gray-700 font-medium py-2"
              >
                <User size={18} /> Profile
              </button>
              <div className="h-px bg-gray-100 my-1"></div>
              <button onClick={() => { setIsMobileMenuOpen(false); onSignOut?.(); }} className="flex items-center gap-3 text-red-500 font-medium py-2">
                <LogOut size={18} /> Sign Out
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
