
import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../App';
import { Button } from '../components/Button';
import { Page } from '../types';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { stripePromise } from '../stripe';

const CheckoutForm: React.FC = () => {
  const { cart, navigateTo } = useContext(AppContext);
  const stripe = useStripe();
  const elements = useElements();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxes = subtotal * 0.0915; // Denver
  const total = subtotal + taxes;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}`,
      },
    });

    if (error) {
      console.error(error);
      alert('Payment failed. Please try again.');
    } else {
      console.log('Form data:', formData);
      console.log('Cart:', cart);
      alert('Order placed! (Check the console for details)');
      navigateTo(Page.HOME);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-400">Full Name</label>
        <input type="text" name="name" id="name" onChange={handleChange} className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm text-white focus:ring-indigo-500 focus:border-indigo-500" required />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-400">Email Address</label>
        <input type="email" name="email" id="email" onChange={handleChange} className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm text-white focus:ring-indigo-500 focus:border-indigo-500" required />
      </div>
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-400">Address</label>
        <input type="text" name="address" id="address" onChange={handleChange} className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm text-white focus:ring-indigo-500 focus:border-indigo-500" required />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-400">City</label>
          <input type="text" name="city" id="city" onChange={handleChange} className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm text-white focus:ring-indigo-500 focus:border-indigo-500" required />
        </div>
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-400">State</label>
          <input type="text" name="state" id="state" onChange={handleChange} className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm text-white focus:ring-indigo-500 focus:border-indigo-500" required />
        </div>
        <div>
          <label htmlFor="zip" className="block text-sm font-medium text-gray-400">ZIP Code</label>
          <input type="text" name="zip" id="zip" onChange={handleChange} className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm text-white focus:ring-indigo-500 focus:border-indigo-500" required />
        </div>
      </div>
      <PaymentElement />
      <Button type="submit" disabled={!stripe} className="w-full mt-6 text-lg">
        Place Order
      </Button>
    </form>
  );
};

export const CheckoutPage: React.FC = () => {
  const { cart, navigateTo } = useContext(AppContext);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // In a real application, you would fetch this from your server.
    // This is a mock client secret for demonstration purposes.
    // You should replace this with a call to your backend to create a PaymentIntent.
    // For example:
    // fetch('/create-payment-intent', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ items: cart }),
    // })
    // .then(res => res.json())
    // .then(data => setClientSecret(data.clientSecret));
    setTimeout(() => {
      setClientSecret('pi_3JZvYqJZvYqJZvYqJZvYqJZv_secret_JZvYqJZvYqJZvYqJZvYqJZvYq');
    }, 1000);
  }, [cart]);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-anton text-white">Your Cart is Empty</h1>
        <p className="mt-4 text-lg text-gray-400">You can't checkout with an empty cart. Go find something to buy.</p>
        <Button onClick={() => navigateTo(Page.PRODUCTS)} className="mt-8">
          Continue Shopping
        </Button>
      </div>
    );
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxes = subtotal * 0.0915; // Denver
  const total = subtotal + taxes;

  const options = {
    clientSecret,
    appearance: {
      theme: 'night',
      variables: {
        colorPrimary: '#6366f1',
        colorBackground: '#1f2937',
        colorText: '#ffffff',
        colorDanger: '#ef4444',
        fontFamily: 'Ideal Sans, system-ui, sans-serif',
        spacingUnit: '2px',
        borderRadius: '4px',
      }
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-anton text-white mb-8">Checkout</h1>
      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Shipping Information</h2>
          {clientSecret ? (
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm />
            </Elements>
          ) : (
            <div className="text-white">Loading payment form...</div>
          )}
        </div>
        <div>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h2 className="text-2xl font-bold text-white border-b border-gray-700 pb-4 mb-4">Order Summary</h2>
            <div className="space-y-3">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-white">{item.name} (x{item.quantity})</p>
                    <p className="text-sm text-gray-400">{Object.entries(item.selectedVariant).map(([key, value]) => `${key}: ${value}`).join(', ')}</p>
                  </div>
                  <p className="text-white">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="space-y-3 text-gray-300 mt-4 pt-4 border-t border-gray-700">
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
          </div>
        </div>
      </div>
    </div>
  );
};
