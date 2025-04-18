
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProductFilters from './catalog/ProductFilters';
import ProductListing from './catalog/ProductListing';
import { products as defaultProducts } from '@/data/products/index';
import { getCustomProducts } from '@/data/products/custom';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

const ProductCatalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedManufacturer, setSelectedManufacturer] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Force refresh when component mounts or when navigation occurs
  useEffect(() => {
    // Use a timestamp to force refresh
    setRefreshTrigger(Date.now());
  }, []);
  
  // Load products including custom ones with refresh trigger
  useEffect(() => {
    // Start refreshing indicator
    setIsRefreshing(true);
    
    // Combine default and custom products
    const customProducts = getCustomProducts();
    const allProducts = [...defaultProducts, ...customProducts];
    console.log("ProductCatalog: Refreshing products list with", allProducts.length, "items");
    
    // Clear localStorage cache for image URLs that might be stale
    if (typeof window !== 'undefined') {
      try {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('image_url_cache_')) {
            localStorage.removeItem(key);
          }
        }
      } catch (error) {
        console.error("Error clearing localStorage:", error);
      }
    }
    
    setProducts(allProducts);
    
    // End refreshing indicator after a short delay
    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  }, [refreshTrigger]);
  
  // Get unique categories and manufacturers for filtering
  const categories = Array.from(new Set(products.map(product => product.category)));
  const manufacturers = Array.from(new Set(products.map(product => product.manufacturer).filter(Boolean)));
  
  // Filter products based on search term and selected filters
  const filteredProducts = products.filter(product => {
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedManufacturer === 'all' || product.manufacturer === selectedManufacturer) &&
      (selectedCategory === 'all' || product.category === selectedCategory)
    );
  });
  
  // Reset filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedManufacturer('all');
    setSelectedCategory('all');
  };
  
  // Function to manually trigger a refresh
  const handleRefresh = () => {
    console.log("Manually refreshing catalog...");
    setRefreshTrigger(Date.now());
  };
  
  return (
    <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 py-8">
        <div className="flex justify-between items-center mb-4">
          <CardTitle className="text-3xl font-bold text-blue-800">Каталог Морепродуктов</CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Обновление...' : 'Обновить'}
          </Button>
        </div>
        <p className="text-gray-600 mb-6">Выберите категорию или воспользуйтесь поиском для подбора продукции</p>
        
        <ProductFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedManufacturer={selectedManufacturer}
          setSelectedManufacturer={setSelectedManufacturer}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          handleResetFilters={handleResetFilters}
          categories={categories}
          manufacturers={manufacturers}
        />
      </CardHeader>
      
      <CardContent className="px-4 py-8">
        <ProductListing 
          selectedCategory={selectedCategory}
          filteredProducts={filteredProducts}
          categories={categories}
        />
      </CardContent>
    </Card>
  );
};

export default ProductCatalog;
