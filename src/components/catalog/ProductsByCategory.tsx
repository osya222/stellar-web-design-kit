
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types/product';
import { Fish, ShellIcon, Soup, ChefHat } from "lucide-react";

interface ProductsByCategoryProps {
  category: string;
  products: Product[];
}

const ProductsByCategory: React.FC<ProductsByCategoryProps> = ({ category, products }) => {
  if (products.length === 0) return null;
  
  // Функция для выбора иконки в зависимости от категории
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Лосось (Чили)':
      case 'Форель (Турция)':
      case 'Другие виды рыбы':
        return <Fish className="w-6 h-6 mr-2 inline-block" />;
      case 'Креветки и морепродукты':
        return <ShellIcon className="w-6 h-6 mr-2 inline-block" />;
      case 'Полуфабрикаты':
        return <ChefHat className="w-6 h-6 mr-2 inline-block" />;
      default:
        return <Soup className="w-6 h-6 mr-2 inline-block" />;
    }
  };
  
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-gray-200 flex items-center">
        {getCategoryIcon(category)}
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
