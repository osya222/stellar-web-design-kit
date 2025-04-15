
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
  
  // Функция для отображения логотипа
  const renderCategoryLogo = () => {
    return (
      <img 
        src="/lovable-uploads/01895ee1-a04a-4a5b-8df1-68c11d42986f.png" 
        alt="Category logo" 
        className="w-10 h-10 mr-2 opacity-90"
      />
    );
  };
  
  return (
    <div className="mb-10" id={`catalog-${categoryId}`}>
      <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-gray-200 flex items-center text-black">
        {renderCategoryLogo()}
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
