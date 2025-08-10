
import React from 'react';
import { Product, Page } from '../types';
import { AppContext } from '../App';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigateTo, selectProduct } = React.useContext(AppContext);

  const handleCardClick = () => {
    selectProduct(product.id);
    navigateTo(Page.DETAIL);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col bg-gray-800 border border-gray-700 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:border-indigo-500 hover:shadow-2xl hover:shadow-indigo-900/50"
    >
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-100 font-anton tracking-wide">{product.name}</h3>
        <p className="mt-1 text-sm text-gray-400">{product.category}</p>
        <div className="flex-grow" />
        <p className="mt-4 text-xl font-semibold text-white">${product.price.toFixed(2)}</p>
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
    </div>
  );
};
