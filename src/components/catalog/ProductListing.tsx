
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
  filteredProducts, 
  categories 
}) => {
  const isMobile = useIsMobile();
  
  // Filter out duplicate products
  const uniqueProducts = filteredProducts.reduce((acc: Product[], current) => {
    const isDuplicate = acc.some(item => 
      item.name === current.name && 
      item.price === current.price &&
      item.manufacturer === current.manufacturer
    );
    
    if (!isDuplicate) {
      acc.push(current);
    }
    
    return acc;
  }, []);
  
  if (uniqueProducts.length === 0) {
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
        categories.map(category => {
          const categoryProducts = uniqueProducts.filter(p => p.category === category);
          if (categoryProducts.length > 0) {
            return <ProductsByCategory key={category} category={category} products={categoryProducts} />;
          }
          return null;
        })
      ) : (
        // Если выбрана конкретная категория, показываем только товары этой категории
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {uniqueProducts.map((product, index) => (
            <ProductCard key={`${product.id}-${index}`} product={product} />
          ))}
        </div>
      )}
      
      <div className="mt-6 text-right text-sm text-gray-500">
        Всего товаров: {uniqueProducts.length}
      </div>
    </>
  );
};

export default ProductListing;
