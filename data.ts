
import { Product } from './types';

export const products: Product[] = [
  {
    id: 1,
    name: 'Zero Fucks Given Sticker',
    description: 'High-quality, weatherproof vinyl sticker. Perfect for laptops, water bottles, and offending sensitive people.',
    price: 4.99,
    category: 'Stickers',
    imageUrl: 'https://picsum.photos/seed/sticker1/600/600',
    variants: [{ type: 'Size', options: ['3"', '4"', '5"'] }],
  },
  {
    id: 2,
    name: 'I Identify As A Threat T-Shirt',
    description: '100% premium cotton. Softer than a liberal\'s feelings. This shirt is a warning label.',
    price: 29.99,
    category: 'T-Shirts',
    imageUrl: 'https://picsum.photos/seed/tshirt1/600/600',
    variants: [
      { type: 'Size', options: ['S', 'M', 'L', 'XL', 'XXL'] },
      { type: 'Color', options: ['Black', 'Charcoal'] },
    ],
  },
  {
    id: 3,
    name: 'Sarcasm Specialist Hoodie',
    description: 'Cozy, warm, and dripping with contempt. This hoodie is your new uniform for dealing with idiots.',
    price: 54.99,
    category: 'Hoodies',
    imageUrl: 'https://picsum.photos/seed/hoodie1/600/600',
    variants: [
      { type: 'Size', options: ['M', 'L', 'XL', 'XXL'] },
      { type: 'Color', options: ['Navy', 'Heather Grey'] },
    ],
  },
  {
    id: 4,
    name: 'Go Away CNC Sign',
    description: 'Precision-carved from solid oak. Let your guests know exactly where they stand, preferably outside.',
    price: 89.99,
    category: 'Signs',
    imageUrl: 'https://picsum.photos/seed/sign1/600/600',
    variants: [
      { type: 'Material', options: ['Oak', 'Walnut'] },
      { type: 'Size', options: ['12x8"', '18x12"'] },
    ],
  },
  {
    id: 5,
    name: 'My Last Nerve T-Shirt',
    description: 'Oh look, it\'s on fire. A visual representation of your daily struggle. Premium fit and feel.',
    price: 29.99,
    category: 'T-Shirts',
    imageUrl: 'https://picsum.photos/seed/tshirt2/600/600',
    variants: [
      { type: 'Size', options: ['S', 'M', 'L', 'XL'] },
      { type: 'Color', options: ['Black', 'White'] },
    ],
  },
  {
    id: 6,
    name: 'Powered By Caffeine and Hate Sticker Pack',
    description: 'A collection of 5 stickers for the discerning asshole. Fuel your day the right way.',
    price: 14.99,
    category: 'Stickers',
    imageUrl: 'https://picsum.photos/seed/sticker2/600/600',
    variants: [],
  },
   {
    id: 7,
    name: 'I\'m Silently Correcting Your Grammar Hoodie',
    description: 'For the intellectual snob in all of us. Stay warm while you judge others.',
    price: 59.99,
    category: 'Hoodies',
    imageUrl: 'https://picsum.photos/seed/hoodie2/600/600',
    variants: [
      { type: 'Size', options: ['S', 'M', 'L', 'XL'] },
      { type: 'Color', options: ['Black', 'Maroon'] },
    ],
  },
  {
    id: 8,
    name: 'Welcome-ish CNC Sign',
    description: 'Depends on who you are and what you want. A beautifully crafted sign with an honest message.',
    price: 79.99,
    category: 'Signs',
    imageUrl: 'https://picsum.photos/seed/sign2/600/600',
    variants: [
        { type: 'Material', options: ['Pine', 'Cherry'] },
    ],
  },
];
