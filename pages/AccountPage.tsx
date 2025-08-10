
import React from 'react';
import { Button } from '../components/Button';
import { AppContext } from '../App';
import { Page } from '../types';

export const AccountPage: React.FC = () => {
  const { isLoggedIn, login, logout, navigateTo } = React.useContext(AppContext);

  const handleLogout = () => {
    logout();
    navigateTo(Page.HOME);
  };

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 flex justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-anton text-center text-white mb-8">Admin Access</h1>
          <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 shadow-lg text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Sign In</h2>
            <p className="text-gray-400 mb-6">
              Access the admin dashboard to manage products. This is a restricted area, you filthy animal.
            </p>
            <Button onClick={login} variant="primary" className="w-full">
              Sign In with a Fake Magic Link
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-anton text-center text-white mb-8">Admin Dashboard</h1>
        <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 shadow-lg space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Welcome, Overlord</h2>
            <p className="text-gray-400 mt-1">Here you can manage the store's offerings of offensive wares.</p>
          </div>
          <div className="border-t border-gray-700 pt-6">
            <h3 className="text-xl font-bold text-white mb-4">Store Management</h3>
            <div className="flex flex-col sm:flex-row gap-4">
               <Button onClick={() => navigateTo(Page.ADD_PRODUCT)} className="flex-1">
                Add New Product
              </Button>
              <Button onClick={() => navigateTo(Page.PRODUCTS)} variant='secondary' className="flex-1">
                View All Products
              </Button>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 mt-6">
             <Button onClick={handleLogout} variant="outline" className="w-full">
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};