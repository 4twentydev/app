
import React from 'react';
import { AppContext } from '../App';
import { ProductCard } from '../components/ProductCard';

const categories = ['All', 'Stickers', 'T-Shirts', 'Hoodies', 'Signs'];

export const ProductsPage: React.FC = () => {
  const { products } = React.useContext(AppContext);
  const [activeCategory, setActiveCategory] = React.useState('All');

  const filteredProducts =
    activeCategory === 'All'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-5xl font-anton text-center text-white mb-4">All Products</h1>
      <p className="text-center text-gray-400 max-w-xl mx-auto mb-12">
        Find the perfect piece of merchandise to announce your questionable personality to the world.
      </p>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
              activeCategory === category
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};