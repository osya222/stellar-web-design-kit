import React from 'react';
import { products } from "@/data/products/index";
import { useIsMobile } from "@/hooks/use-mobile";
import CategoryCard from './CategoryCard';
import ViewAllButton from './ViewAllButton';
import { getProductImage } from '@/data/productImages';

const ProductShowcase: React.FC = () => {
  const isMobile = useIsMobile();

  // Extract unique categories from products array
  const productCategories = Array.from(
    new Set(products.map(product => product.category))
  ).map(name => ({ 
    id: name.toLowerCase().replace(/\s+/g, '-'), 
    name,
    description: `Высококачественная продукция категории "${name}"`
  })).filter(category => 
    category.name !== "Полуфабрикаты" && 
    category.name !== "Икра" && 
    category.name !== "Деликатесы" &&
    category.name !== "Другие виды рыбы" &&
    category.name !== "Мидии" &&
    category.name !== "Филе рыбы"
  ).slice(0, 6);

  const handleCategoryClick = (categoryId: string, event: React.MouseEvent) => {
    event.preventDefault();
    setTimeout(() => {
      const element = document.getElementById(`catalog-${categoryId}`);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  const handleViewAllCatalog = (event: React.MouseEvent) => {
    event.preventDefault();
    setTimeout(() => {
      const catalogElement = document.getElementById('catalog');
      if (catalogElement) {
        catalogElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  // Get category image helper function
  const getCategoryImage = (categoryName: string) => {
    return getProductImage({ category: categoryName, name: "default" });
  };

  return (
    <section className="py-10 md:py-20 bg-white">
      <div className="container-custom">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center text-blue-800">Наша продукция</h2>
        <p className="text-center text-gray-600 mb-8 md:mb-12 max-w-2xl mx-auto px-4">
          Широкий выбор свежих морепродуктов от проверенных поставщиков для вашего бизнеса
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {productCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              image={getCategoryImage(category.name)}
              onCategoryClick={handleCategoryClick}
            />
          ))}
        </div>
        
        <ViewAllButton onClick={handleViewAllCatalog} />
      </div>
    </section>
  );
};

export default ProductShowcase;
