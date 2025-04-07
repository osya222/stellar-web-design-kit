import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Fish, ShellIcon, Egg, Utensils } from "lucide-react";
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

  // Иконки для категорий
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Лосось (Чили)':
      case 'Форель (Турция)':
      case 'Другие виды рыбы':
        return <Fish className="w-12 h-12 text-blue-600" />;
      case 'Креветки и морепродукты':
        return <ShellIcon className="w-12 h-12 text-pink-500" />;
      case 'Икра':
        return <Egg className="w-12 h-12 text-red-500" />;
      case 'Деликатесы':
        return <Utensils className="w-12 h-12 text-purple-500" />;
      default:
        return <Fish className="w-12 h-12 text-blue-300" />;
    }
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
    const catalogElement = document.getElementById('catalog');
    if (catalogElement) {
      catalogElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Наша продукция</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {productCategories.map((category, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative h-60 bg-blue-50 flex items-center justify-center">
                {category.image ? (
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="object-cover w-full h-full"
                  />
                ) : (
                  getCategoryIcon(category.name)
                )}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent py-4">
                  <div className="p-4 text-white">
                    <h3 className="text-xl font-bold">{category.name}</h3>
                    <p className="text-sm font-medium opacity-75">{category.description}</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-4">{category.description}</p>
                <a 
                  href={`#catalog-${category.id}`}
                  onClick={(e) => handleCategoryClick(category.id, e)}
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center cursor-pointer"
                >
                  Подробнее <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6 text-center">Популярные товары</h3>
          <Carousel className="mx-auto max-w-5xl">
            <CarouselContent>
              {popularProducts.map((product, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="border-0 shadow-md">
                    <CardContent className="p-0">
                      <div className="relative h-64 bg-blue-50 flex items-center justify-center">
                        {getProductImage(product) ? (
                          <img 
                            src={getProductImage(product)} 
                            alt={product.name} 
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          getCategoryIcon(product.category)
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                          <h4 className="text-white font-semibold">{product.name}</h4>
                          <p className="text-white/70 text-sm">{product.category}</p>
                        </div>
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
          <Button size="lg">
            <a href="#catalog" onClick={handleViewAllCatalog}>Смотреть весь каталог</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
