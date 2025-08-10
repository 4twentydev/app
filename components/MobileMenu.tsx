import React from 'react';
import { AppContext } from '../App';
import { Page } from '../types';
import { CloseIcon } from './Icons';

export const MobileMenu: React.FC = () => {
  const { isMobileMenuOpen, toggleMobileMenu, navigateTo } = React.useContext(AppContext);

  const handleNavigate = (page: Page) => {
    navigateTo(page);
    toggleMobileMenu();
  };

  const navItems = [
    { label: 'Home', page: Page.HOME },
    { label: 'All Products', page: Page.PRODUCTS },
    { label: 'Contact', page: Page.CONTACT },
    { label: 'My Account', page: Page.ACCOUNT },
  ];

  if (!isMobileMenuOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-menu-title"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={toggleMobileMenu}
        aria-hidden="true"
      ></div>

      {/* Drawer */}
      <div className="relative z-10 bg-gray-800 border-t border-gray-700 rounded-t-2xl shadow-2xl shadow-black/50 animate-slide-up">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
           <h2 id="mobile-menu-title" className="font-anton text-xl text-white">MENU</h2>
           <button onClick={toggleMobileMenu} className="p-2 text-gray-400 hover:text-white" aria-label="Close menu">
             <CloseIcon className="w-6 h-6" />
           </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate(item.page);
                  }}
                  className="block text-center text-lg font-semibold text-gray-200 hover:bg-gray-700 rounded-md py-4 transition-colors duration-200"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 mt-2">
            <p className="text-center text-xs text-gray-500">shopmarlows.com</p>
        </div>
      </div>
    </div>
  );
};