import React, { useState, useCallback } from 'react';
import { Page, Product, CartItem } from './types';
import { products as initialProducts } from './data';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { AccountPage } from './pages/AccountPage';
import { ContactPage } from './pages/ContactPage';
import { MobileMenu } from './components/MobileMenu';
import { AddProductPage } from './pages/AddProductPage';
import { CheckoutPage } from './pages/CheckoutPage';

interface AppContextType {
  currentPage: Page;
  navigateTo: (page: Page) => void;
  cart: CartItem[];
  addToCart: (product: Product, selectedVariant: { [key: string]: string }) => void;
  removeFromCart: (productId: number, selectedVariant: { [key: string]: string }) => void;
  updateCartQuantity: (productId: number, selectedVariant: { [key: string]: string }, quantity: number) => void;
  selectedProductId: number | null;
  selectProduct: (id: number) => void;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  products: Product[];
  addProduct: (product: Product) => void;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

export const AppContext = React.createContext<AppContextType>({
  currentPage: Page.HOME,
  navigateTo: () => {},
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartQuantity: () => {},
  selectedProductId: null,
  selectProduct: () => {},
  isMobileMenuOpen: false,
  toggleMobileMenu: () => {},
  products: [],
  addProduct: () => {},
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const navigateTo = useCallback((page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
    if(isMobileMenuOpen) setIsMobileMenuOpen(false);
  }, [isMobileMenuOpen]);

  const selectProduct = useCallback((id: number) => {
    setSelectedProductId(id);
  }, []);
  
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const addToCart = useCallback((product: Product, selectedVariant: { [key: string]: string }) => {
    setCart((prevCart) => {
      const variantKey = JSON.stringify(selectedVariant);
      const existingItem = prevCart.find(
        (item) => item.id === product.id && JSON.stringify(item.selectedVariant) === variantKey
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id && JSON.stringify(item.selectedVariant) === variantKey
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1, selectedVariant }];
      }
    });
    alert(`${product.name} added to cart!`);
  }, []);

  const updateCartQuantity = useCallback((productId: number, selectedVariant: { [key: string]: string }, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedVariant);
      return;
    }
    setCart((prevCart) => {
      const variantKey = JSON.stringify(selectedVariant);
      return prevCart.map((item) =>
        item.id === productId && JSON.stringify(item.selectedVariant) === variantKey
          ? { ...item, quantity }
          : item
      );
    });
  }, []);

  const removeFromCart = useCallback((productId: number, selectedVariant: { [key:string]: string}) => {
     setCart((prevCart) => {
        const variantKey = JSON.stringify(selectedVariant);
        return prevCart.filter(item => !(item.id === productId && JSON.stringify(item.selectedVariant) === variantKey));
     });
  }, []);
  
  const addProduct = useCallback((product: Product) => {
    setProducts(prevProducts => [product, ...prevProducts]);
    alert(`${product.name} has been added to the store!`);
    navigateTo(Page.PRODUCTS);
  }, [navigateTo]);
  
  const login = useCallback(() => setIsLoggedIn(true), []);
  const logout = useCallback(() => setIsLoggedIn(false), []);


  const renderPage = () => {
    switch (currentPage) {
      case Page.HOME:
        return <HomePage />;
      case Page.PRODUCTS:
        return <ProductsPage />;
      case Page.DETAIL:
        return <ProductDetailPage />;
      case Page.CART:
        return <CartPage />;
      case Page.ACCOUNT:
        return <AccountPage />;
      case Page.CONTACT:
        return <ContactPage />;
      case Page.ADD_PRODUCT:
        return isLoggedIn ? <AddProductPage /> : <AccountPage />;
      case Page.CHECKOUT:
        return <CheckoutPage />;
      default:
        return <HomePage />;
    }
  };

  const contextValue = {
    currentPage,
    navigateTo,
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    selectedProductId,
    selectProduct,
    isMobileMenuOpen,
    toggleMobileMenu,
    products,
    addProduct,
    isLoggedIn,
    login,
    logout,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100 font-inter">
        <Header />
        <main className="flex-grow">
          {renderPage()}
        </main>
        <Footer />
        <MobileMenu />
      </div>
    </AppContext.Provider>
  );
};

export default App;