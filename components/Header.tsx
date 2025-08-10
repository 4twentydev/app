import React from 'react';
import { AppContext } from '../App';
import { CartIcon, UserIcon, MenuIcon } from './Icons';
import { Page } from '../types';

export const Header: React.FC = () => {
  const { navigateTo, cart, toggleMobileMenu } = React.useContext(AppContext);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { label: 'Home', page: Page.HOME },
    { label: 'All Products', page: Page.PRODUCTS },
    { label: 'Contact', page: Page.CONTACT },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            className="text-3xl font-extrabold tracking-wider cursor-pointer font-anton text-gray-50"
            onClick={() => navigateTo(Page.HOME)}
          >
            MARLOW'S
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo(item.page);
                }}
                className="text-lg font-medium text-gray-300 hover:text-white transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
          </nav>
          
          {/* Right side icons */}
          <div className="flex items-center space-x-2 md:space-x-6">
            {/* Desktop Account Icon */}
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => navigateTo(Page.ACCOUNT)}
                className="text-gray-300 hover:text-white transition-colors duration-300"
                aria-label="Account"
              >
                <UserIcon className="w-7 h-7" />
              </button>
            </div>

            {/* Cart Icon (Shared) */}
            <button
              onClick={() => navigateTo(Page.CART)}
              className="relative text-gray-300 hover:text-white transition-colors duration-300 p-2 md:p-0"
              aria-label="Shopping Cart"
            >
              <CartIcon className="w-7 h-7" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-indigo-600 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
            
            {/* Mobile Menu Button */}
            <button
                onClick={toggleMobileMenu}
                className="p-2 text-gray-300 hover:text-white transition-colors duration-300 md:hidden"
                aria-label="Open menu"
            >
                <MenuIcon className="w-7 h-7" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};