
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import { products } from "@/data/products/index";
import { formatPrice } from "@/lib/formatters";
import { useIsMobile } from "@/hooks/use-mobile";
import ImageUploader from "@/components/common/ImageUploader";

const ProductShowcase: React.FC = () => {
  const [categoryImageErrors, setCategoryImageErrors] = useState<Record<string, boolean>>({});
  const isMobile = useIsMobile();

  // Extract unique categories from products array to replace productCategories
  // Filter out unwanted categories
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
    category.name !== "Мидии"
  ).slice(0, 6);

  // Рендер иконки рыбы для всех категорий
  const renderFishIcon = () => {
    return (
      <img 
        src="/lovable-uploads/02eda944-c8e4-4ddc-b061-5b197c2c118a.png" 
        alt="Fish icon" 
        className="w-16 h-16 opacity-70"
      />
    );
  };

  // Получение изображения для категории
  const getCategoryImage = (categoryName: string) => {
    // Find a product in this category to use its image
    const categoryProduct = products.find(p => p.category === categoryName && p.image);
    return categoryProduct?.image;
  };

  const handleCategoryClick = (categoryId: string, event: React.MouseEvent) => {
    event.preventDefault();
    
    // Wait for next tick to ensure proper navigation
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
    
    // Wait for next tick to ensure proper navigation
    setTimeout(() => {
      const catalogElement = document.getElementById('catalog');
      if (catalogElement) {
        catalogElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      } else {
        console.error('Catalog element not found');
      }
    }, 100);
  };

  const handleCategoryImageError = (categoryName: string) => {
    setCategoryImageErrors(prev => ({
      ...prev,
      [categoryName]: true
    }));
  };

  return (
    <section className="py-10 md:py-20 bg-white">
      <div className="container-custom">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center text-blue-800">Наша продукция</h2>
        <p className="text-center text-gray-600 mb-8 md:mb-12 max-w-2xl mx-auto px-4">Широкий выбор свежих морепродуктов от проверенных поставщиков для вашего бизнеса</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {productCategories.map((category, index) => (
            <div key={index} className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 bg-white card-hover">
              <div className="relative h-40 md:h-60 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                {getCategoryImage(category.name) && !categoryImageErrors[category.name] ? (
                  <img 
                    src={getCategoryImage(category.name)} 
                    alt={category.name} 
                    className="object-cover w-full h-full"
                    onError={() => handleCategoryImageError(category.name)}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full w-full bg-gradient-to-br from-blue-50 to-blue-100">
                    {renderFishIcon()}
                  </div>
                )}
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-blue-800 mb-1 md:mb-2">{category.name}</h3>
                <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">{category.description}</p>
                <a 
                  href={`#catalog-${category.id}`}
                  onClick={(e) => handleCategoryClick(category.id, e)}
                  className="text-blue-600 font-medium flex items-center hover:text-blue-800 transition-colors"
                >
                  Подробнее <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 md:mt-12 text-center">
          <Button 
            size="lg" 
            onClick={handleViewAllCatalog} 
            className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-6 py-5 md:px-8 md:py-6 h-auto rounded-xl shadow-md text-sm md:text-base"
          >
            <ExternalLink className="mr-2 h-4 w-4 md:h-5 md:w-5" />
            Смотреть весь каталог
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
