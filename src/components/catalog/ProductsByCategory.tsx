
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types/product';

interface ProductsByCategoryProps {
  category: string;
  products: Product[];
}

const ProductsByCategory: React.FC<ProductsByCategoryProps> = ({ category, products }) => {
  if (products.length === 0) return null;
  
  const categoryId = category.toLowerCase().replace(/\s+/g, '-');
  
  // Функция для отображения иконки рыбы
  const renderFishIcon = () => {
    return (
      <img 
        src="/lovable-uploads/02eda944-c8e4-4ddc-b061-5b197c2c118a.png" 
        alt="Fish icon" 
        className="w-6 h-6 mr-2 opacity-70"
      />
    );
  };
  
  return (
    <div className="mb-10" id={`catalog-${categoryId}`}>
      <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-gray-200 flex items-center text-black">
        {renderFishIcon()}
        <span>{category}</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsByCategory;
