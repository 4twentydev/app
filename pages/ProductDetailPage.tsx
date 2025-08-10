
import React from 'react';
import { AppContext } from '../App';
import { Button } from '../components/Button';
import { ChevronDownIcon } from '../components/Icons';

export const ProductDetailPage: React.FC = () => {
  const { selectedProductId, addToCart, products } = React.useContext(AppContext);
  const product = products.find((p) => p.id === selectedProductId);

  const [selectedVariants, setSelectedVariants] = React.useState<{ [key: string]: string }>({});

  React.useEffect(() => {
    if (product) {
      const initialVariants: { [key: string]: string } = {};
      product.variants.forEach(variant => {
        if (variant.options.length > 0) {
            initialVariants[variant.type] = variant.options[0];
        }
      });
      setSelectedVariants(initialVariants);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container mx-auto text-center py-20">
        <h2 className="text-2xl text-gray-400">Product not found. Probably for the best.</h2>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, selectedVariants);
    // Optionally navigate to cart or show a confirmation
  };
  
  const handleVariantChange = (type: string, option: string) => {
    setSelectedVariants(prev => ({...prev, [type]: option}));
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="rounded-lg overflow-hidden border border-gray-700">
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover"/>
        </div>

        {/* Product Info */}
        <div>
          <p className="text-indigo-400 font-semibold">{product.category}</p>
          <h1 className="text-4xl lg:text-5xl font-anton text-white mt-2 mb-4">{product.name}</h1>
          <p className="text-3xl text-white font-bold mb-6">${product.price.toFixed(2)}</p>
          <div className="prose prose-invert prose-lg text-gray-300">
            <p>{product.description}</p>
          </div>

          <div className="mt-8 space-y-6">
            {product.variants.map(variant => (
              <div key={variant.type}>
                <label className="text-sm font-medium text-gray-300">{variant.type}</label>
                <div className="relative mt-2">
                  <select
                    value={selectedVariants[variant.type] || ''}
                    onChange={(e) => handleVariantChange(variant.type, e.target.value)}
                    className="w-full bg-gray-800 border border-gray-600 rounded-md py-3 px-4 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {variant.options.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <ChevronDownIcon className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Button onClick={handleAddToCart} className="w-full text-lg">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};