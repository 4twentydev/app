
import React, { useState } from 'react';
import { AppContext } from '../App';
import { Button } from '../components/Button';
import { Product } from '../types';

export const AddProductPage: React.FC = () => {
    const { addProduct } = React.useContext(AppContext);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState<'Stickers' | 'T-Shirts' | 'Hoodies' | 'Signs'>('T-Shirts');
    const [imageUrl, setImageUrl] = useState('');
    const [variant1Type, setVariant1Type] = useState('');
    const [variant1Options, setVariant1Options] = useState('');
    const [variant2Type, setVariant2Type] = useState('');
    const [variant2Options, setVariant2Options] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const variants: Product['variants'] = [];
        if (variant1Type.trim() && variant1Options.trim()) {
            variants.push({
                type: variant1Type.trim() as 'Size' | 'Color' | 'Material',
                options: variant1Options.split(',').map(s => s.trim()),
            });
        }
        if (variant2Type.trim() && variant2Options.trim()) {
            variants.push({
                type: variant2Type.trim() as 'Size' | 'Color' | 'Material',
                options: variant2Options.split(',').map(s => s.trim()),
            });
        }
        
        const newProduct: Product = {
            id: Date.now(), // Simple unique ID for client-side
            name,
            description,
            price: parseFloat(price),
            category,
            imageUrl,
            variants,
        };

        addProduct(newProduct);
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-anton text-center text-white mb-8">Add New Product</h1>
                <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg border border-gray-700 shadow-lg space-y-6">
                    
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300">Product Name</label>
                            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-indigo-500" />
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-300">Price</label>
                            <input type="number" id="price" value={price} onChange={e => setPrice(e.target.value)} required step="0.01" className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-indigo-500" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
                        <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} required rows={3} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-indigo-500" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-300">Category</label>
                            <select id="category" value={category} onChange={e => setCategory(e.target.value as any)} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-indigo-500">
                                <option>Stickers</option>
                                <option>T-Shirts</option>
                                <option>Hoodies</option>
                                <option>Signs</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300">Image URL</label>
                            <input type="text" id="imageUrl" value={imageUrl} onChange={e => setImageUrl(e.target.value)} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-indigo-500" />
                        </div>
                    </div>

                    {/* Variants */}
                    <div className="border-t border-gray-700 pt-6 space-y-6">
                        <h3 className="text-lg font-medium text-white">Product Variants (Optional)</h3>
                        {/* Variant 1 */}
                        <div className="p-4 bg-gray-900/50 rounded-md border border-gray-700">
                             <p className="text-sm font-semibold text-gray-300 mb-2">Variant 1</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="v1_type" className="block text-xs font-medium text-gray-400">Type (e.g., Size, Color)</label>
                                    <input type="text" id="v1_type" value={variant1Type} onChange={e => setVariant1Type(e.target.value)} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white text-sm" />
                                </div>
                                <div>
                                    <label htmlFor="v1_options" className="block text-xs font-medium text-gray-400">Options (comma-separated)</label>
                                    <input type="text" id="v1_options" value={variant1Options} onChange={e => setVariant1Options(e.target.value)} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white text-sm" placeholder="e.g. S, M, L, XL"/>
                                </div>
                            </div>
                        </div>
                        {/* Variant 2 */}
                        <div className="p-4 bg-gray-900/50 rounded-md border border-gray-700">
                             <p className="text-sm font-semibold text-gray-300 mb-2">Variant 2</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="v2_type" className="block text-xs font-medium text-gray-400">Type</label>
                                    <input type="text" id="v2_type" value={variant2Type} onChange={e => setVariant2Type(e.target.value)} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white text-sm" />
                                </div>
                                <div>
                                    <label htmlFor="v2_options" className="block text-xs font-medium text-gray-400">Options (comma-separated)</label>
                                    <input type="text" id="v2_options" value={variant2Options} onChange={e => setVariant2Options(e.target.value)} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white text-sm" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-700 pt-6">
                        <Button type="submit" className="w-full text-lg">Add Product to Store</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
