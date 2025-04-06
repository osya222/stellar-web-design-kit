
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProductFilters from './catalog/ProductFilters';
import ProductListing from './catalog/ProductListing';
import { products } from '@/data/products';
import { Product } from '@/types/product';

const ProductCatalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedManufacturer, setSelectedManufacturer] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  // Получаем уникальные категории и производителей для фильтрации
  const categories = Array.from(new Set(products.map(product => product.category)));
  const manufacturers = Array.from(new Set(products.map(product => product.manufacturer).filter(Boolean)));
  
  // Фильтруем продукты на основе поисковой строки и выбранных фильтров
  const filteredProducts = products.filter(product => {
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedManufacturer === 'all' || product.manufacturer === selectedManufacturer) &&
      (selectedCategory === 'all' || product.category === selectedCategory)
    );
  });
  
  // Сбросить фильтры
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedManufacturer('all');
    setSelectedCategory('all');
  };
  
  return (
    <Card>
      <CardHeader className="bg-blue-50">
        <CardTitle className="text-2xl font-bold text-center">Каталог Морепродуктов</CardTitle>
        
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
      
      <CardContent className="px-4 py-6">
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
