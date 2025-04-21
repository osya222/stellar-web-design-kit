
import React from 'react';
import ProductCard from './ProductCard';
import ProductsByCategory from './ProductsByCategory';
import { Product } from '@/types/product';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProductListingProps {
  selectedCategory: string;
  filteredProducts: Product[];
  categories: string[];
}

const ProductListing: React.FC<ProductListingProps> = ({ 
  selectedCategory, 
  filteredProducts = [], // Provide default empty array
  categories = [] // Provide default empty array
}) => {
  const isMobile = useIsMobile();
  
  if (!filteredProducts || filteredProducts.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        Товары не найдены. Пожалуйста, измените параметры поиска.
      </div>
    );
  }

  return (
    <>
      {selectedCategory === 'all' ? (
        // Если не выбрана конкретная категория, группируем товары по категориям
        (categories || []).map(category => {
          const categoryProducts = filteredProducts.filter(p => p.category === category);
          if (categoryProducts.length > 0) {
            return <ProductsByCategory key={category} category={category} products={categoryProducts} />;
          }
          return null;
        })
      ) : (
        // Если выбрана конкретная категория, показываем только товары этой категории
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      
      <div className="mt-6 text-right text-sm text-gray-500">
        Всего товаров: {filteredProducts.length}
      </div>
    </>
  );
};

export default ProductListing;
