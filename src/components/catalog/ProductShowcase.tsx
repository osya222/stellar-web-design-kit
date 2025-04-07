
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Fish, ShellIcon, Egg, Utensils, ChefHat, Shell } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { productCategories, products } from "@/data/products";
import { getProductImage } from "@/data/productImages";

const ProductShowcase: React.FC = () => {
  // Получаем популярные продукты из основных категорий
  const popularProducts = products.slice(0, 6);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [categoryImageErrors, setCategoryImageErrors] = useState<Record<string, boolean>>({});

  // Иконки для категорий
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Лосось (Чили)':
      case 'Форель (Турция)':
      case 'Другие виды рыбы':
      case 'Филе рыбы':
        return <Fish className="w-12 h-12 text-black" />;
      case 'Креветки и морепродукты':
        return <ShellIcon className="w-12 h-12 text-black" />;
      case 'Мидии':
        return <Shell className="w-12 h-12 text-black" />;
      case 'Полуфабрикаты':
        return <ChefHat className="w-12 h-12 text-black" />;
      case 'Икра':
        return <Egg className="w-12 h-12 text-black" />;
      case 'Деликатесы':
        return <Utensils className="w-12 h-12 text-black" />;
      default:
        return <Fish className="w-12 h-12 text-black" />;
    }
  };

  // Получение изображения для категории
  const getCategoryImage = (categoryName: string) => {
    const mockProduct = { category: categoryName, name: 'default' };
    return getProductImage(mockProduct);
  };

  const handleCategoryClick = (categoryId: string, event: React.MouseEvent) => {
    event.preventDefault(); // Prevent default anchor behavior
    
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

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({
      ...prev,
      [index]: true
    }));
  };

  const handleCategoryImageError = (categoryName: string) => {
    setCategoryImageErrors(prev => ({
      ...prev,
      [categoryName]: true
    }));
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-black">Наша продукция</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productCategories.slice(0, 6).map((category, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow bg-white">
              <div className="relative h-60 bg-white flex items-center justify-center">
                {getCategoryImage(category.name) && !categoryImageErrors[category.name] ? (
                  <img 
                    src={getCategoryImage(category.name)} 
                    alt={category.name} 
                    className="object-cover w-full h-full"
                    onError={() => handleCategoryImageError(category.name)}
                  />
                ) : (
                  getCategoryIcon(category.name)
                )}
                <div className="absolute inset-x-0 bottom-0 bg-white/80 py-4 border-t">
                  <div className="p-4 text-black">
                    <h3 className="text-xl font-bold">{category.name}</h3>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-black mb-4">{category.description}</p>
                <a 
                  href={`#catalog-${category.id}`}
                  onClick={(e) => handleCategoryClick(category.id, e)}
                  className="text-black font-medium flex items-center cursor-pointer"
                >
                  Подробнее <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6 text-center text-black">Популярные товары</h3>
          <Carousel className="mx-auto max-w-5xl">
            <CarouselContent>
              {popularProducts.map((product, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="border shadow-md">
                    <CardContent className="p-0">
                      <div className="relative h-64 bg-white flex items-center justify-center">
                        {getProductImage(product) && !imageErrors[index] ? (
                          <img 
                            src={getProductImage(product)} 
                            alt={product.name} 
                            className="object-cover w-full h-full"
                            onError={() => handleImageError(index)}
                          />
                        ) : (
                          getCategoryIcon(product.category)
                        )}
                      </div>
                      <div className="bg-white p-4 border-t">
                        <h4 className="text-black font-semibold">{product.name}</h4>
                        <p className="text-black/70 text-sm">{product.category}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-1" />
            <CarouselNext className="right-1" />
          </Carousel>
        </div>
        
        <div className="mt-10 text-center">
          <Button size="lg" onClick={handleViewAllCatalog} className="bg-black text-white hover:bg-gray-800">
            Смотреть весь каталог
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
