import React, { useState, useEffect } from 'react';
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
  
  useEffect(() => {
    setRefreshTrigger(Date.now());
    
    if (typeof window !== 'undefined') {
      try {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && (key.startsWith('image_url_cache_') || key.startsWith('image_data_'))) {
            localStorage.removeItem(key);
          }
        }
        
        const images = document.querySelectorAll('img');
        images.forEach(img => {
          if (img.src && !img.src.includes('data:') && !img.src.includes('blob:')) {
            const src = img.src.split('?')[0];
            img.src = `${src}?t=${Date.now()}`;
          }
        });
      } catch (error) {
        console.error("Error clearing image cache:", error);
      }
    }
  }, []);
  
  useEffect(() => {
    setIsRefreshing(true);
    
    const customProducts = getCustomProducts();
    const allProducts = [...defaultProducts, ...customProducts];
    console.log("ProductCatalog: Refreshing products list with", allProducts.length, "items");
    
    setProducts(allProducts);
    
    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  }, [refreshTrigger]);
  
  const categories = Array.from(new Set(products.map(product => product.category)));
  const manufacturers = Array.from(new Set(products.map(product => product.manufacturer).filter(Boolean)));
  
  const filteredProducts = products.filter(product => {
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedManufacturer === 'all' || product.manufacturer === selectedManufacturer) &&
      (selectedCategory === 'all' || product.category === selectedCategory)
    );
  });
  
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedManufacturer('all');
    setSelectedCategory('all');
  };
  
  const handleRefresh = () => {
    console.log("Manually refreshing catalog...");
    setRefreshTrigger(Date.now());
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 py-8 px-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-blue-800">Каталог Морепродуктов</h1>
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
      </div>
      
      <div className="px-4 py-8">
        <ProductListing 
          selectedCategory={selectedCategory}
          filteredProducts={filteredProducts}
          categories={categories}
        />
      </div>
    </div>
  );
};

export default ProductCatalog;
