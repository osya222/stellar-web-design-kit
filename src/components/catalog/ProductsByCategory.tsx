
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
  
  const renderCategoryLogo = () => {
    // Use a standard category icon to prevent loading issues
    return (
      <div className="w-10 h-10 mr-2 flex items-center justify-center bg-blue-100 rounded-full">
        <span className="text-blue-700 font-bold text-xl">
          {category.charAt(0).toUpperCase()}
        </span>
      </div>
    );
  };
  
  return (
    <div className="mb-10" id={`catalog-${categoryId}`}>
      <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-gray-100 flex items-center text-gray-800 bg-gradient-to-r from-slate-50 to-white p-4 rounded-lg shadow-sm">
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
