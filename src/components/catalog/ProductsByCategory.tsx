
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types/product';

interface ProductsByCategoryProps {
  category: string;
  products: Product[];
}

const ProductsByCategory: React.FC<ProductsByCategoryProps> = ({ category, products }) => {
  if (products.length === 0) return null;
  
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-gray-200">{category}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsByCategory;
