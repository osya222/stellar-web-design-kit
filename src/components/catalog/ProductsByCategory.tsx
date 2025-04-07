
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types/product';
import { Fish, ShellIcon, Soup, ChefHat, Egg, Package, Utensils, Shell } from "lucide-react";
import { getCategoryByName } from '@/data/products';

interface ProductsByCategoryProps {
  category: string;
  products: Product[];
}

const ProductsByCategory: React.FC<ProductsByCategoryProps> = ({ category, products }) => {
  if (products.length === 0) return null;
  
  const categoryData = getCategoryByName(category);
  const categoryId = categoryData?.id || category.toLowerCase().replace(/\s+/g, '-');
  
  // Функция для выбора иконки в зависимости от категории
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Лосось (Чили)':
      case 'Форель (Турция)':
      case 'Другие виды рыбы':
      case 'Филе рыбы':
        return <Fish className="w-6 h-6 mr-2 inline-block text-black" />;
      case 'Креветки и морепродукты':
        return <ShellIcon className="w-6 h-6 mr-2 inline-block text-black" />;
      case 'Мидии':
        return <Shell className="w-6 h-6 mr-2 inline-block text-black" />;
      case 'Полуфабрикаты':
        return <ChefHat className="w-6 h-6 mr-2 inline-block text-black" />;
      case 'Икра':
        return <Egg className="w-6 h-6 mr-2 inline-block text-black" />;
      case 'Консервы':
        return <Package className="w-6 h-6 mr-2 inline-block text-black" />;
      case 'Деликатесы':
        return <Utensils className="w-6 h-6 mr-2 inline-block text-black" />;
      default:
        return <Soup className="w-6 h-6 mr-2 inline-block text-black" />;
    }
  };
  
  return (
    <div className="mb-10" id={`catalog-${categoryId}`}>
      <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-gray-200 flex items-center text-black">
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
