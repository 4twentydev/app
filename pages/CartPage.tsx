
import React from 'react';
import { AppContext } from '../App';
import { Button } from '../components/Button';
import { PlusIcon, MinusIcon, TrashIcon } from '../components/Icons';
import { Page } from '../types';

export const CartPage: React.FC = () => {
  const { cart, updateCartQuantity, removeFromCart, navigateTo } = React.useContext(AppContext);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxes = subtotal * 0.0915; // Denver
  const total = subtotal + taxes;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-anton text-white">Your Cart is Empty</h1>
        <p className="mt-4 text-lg text-gray-400">Looks like you haven't found anything offensive enough yet. Keep looking.</p>
        <Button onClick={() => navigateTo(Page.PRODUCTS)} className="mt-8">
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-anton text-white mb-8">Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div key={`${item.id}-${Object.values(item.selectedVariant).join('-')}`} className="flex items-start bg-gray-800 p-4 rounded-lg border border-gray-700">
              <img src={item.imageUrl} alt={item.name} className="w-24 h-24 rounded-md object-cover mr-6"/>
              <div className="flex-grow">
                <h2 className="text-lg font-bold text-white">{item.name}</h2>
                <p className="text-sm text-gray-400">
                  {Object.entries(item.selectedVariant).map(([key, value]) => `${key}: ${value}`).join(', ')}
                </p>
                <p className="text-lg font-semibold text-white mt-2">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex flex-col items-end justify-between h-full">
                <div className="flex items-center border border-gray-600 rounded-md">
                   <button onClick={() => updateCartQuantity(item.id, item.selectedVariant, item.quantity - 1)} className="p-2 text-gray-400 hover:text-white disabled:opacity-50" disabled={item.quantity <= 1}><MinusIcon className="w-4 h-4"/></button>
                   <span className="px-3 text-white">{item.quantity}</span>
                   <button onClick={() => updateCartQuantity(item.id, item.selectedVariant, item.quantity + 1)} className="p-2 text-gray-400 hover:text-white"><PlusIcon className="w-4 h-4"/></button>
                </div>
                <button onClick={() => removeFromCart(item.id, item.selectedVariant)} className="text-gray-500 hover:text-red-500 transition-colors mt-4">
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 sticky top-28">
            <h2 className="text-2xl font-bold text-white border-b border-gray-700 pb-4 mb-4">Order Summary</h2>
            <div className="space-y-3 text-gray-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Taxes</span>
                <span className="font-medium text-white">${taxes.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-white border-t border-gray-700 pt-4 mt-4">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <Button onClick={() => navigateTo(Page.CHECKOUT)} className="w-full mt-6 text-lg">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
