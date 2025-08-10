import React from 'react';
import { Button } from '../components/Button';
import { ProductCard } from '../components/ProductCard';
import { AppContext } from '../App';
import { Page } from '../types';

export const HomePage: React.FC = () => {
  const { navigateTo, products } = React.useContext(AppContext);
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative text-center py-20 md:py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://picsum.photos/seed/hero/1200/800')"}}
        ></div>
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-anton uppercase text-white tracking-tighter">
            Unapologetically <span className="text-indigo-400">Offensive</span> Merch
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-300">
            For those who speak fluent sarcasm and find humor in the darkness. Welcome home.
          </p>
          <div className="mt-8">
            <Button onClick={() => navigateTo(Page.PRODUCTS)} variant="primary" className="text-lg">
              Shop The Audacity
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-anton text-center text-white mb-12">Featured Degeneracy</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};