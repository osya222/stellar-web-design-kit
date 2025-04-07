import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Fish, ShellIcon, Shell, ExternalLink } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { products } from "@/data/products";
import { getProductImage } from "@/data/productImages";
import { formatPrice } from "@/lib/formatters";

const ProductShowcase: React.FC = () => {
  // Получаем популярные продукты из основных категорий
  const popularProducts = products.slice(0, 6);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [categoryImageErrors, setCategoryImageErrors] = useState<Record<string, boolean>>({});

  // Extract unique categories from products array to replace productCategories
  // Filter out the "Деликатесы" category
  const productCategories = Array.from(
    new Set(products.map(product => product.category))
  ).map(name => ({ 
    id: name.toLowerCase().replace(/\s+/g, '-'), 
    name,
    description: `Высококачественная продукция категории "${name}"`
  })).filter(category => category.name !== "Полуфабрикаты" && category.name !== "Икра" && category.name !== "Деликатесы").slice(0, 6);

  // Иконки для категорий
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Лосось (Чили)':
      case 'Форель (Турция)':
      case 'Другие виды рыбы':
      case 'Филе рыбы':
        return <Fish className="w-16 h-16 text-blue-800 opacity-80" />;
      case 'Креветки и морепродукты':
        return <ShellIcon className="w-16 h-16 text-blue-800 opacity-80" />;
      case 'Мидии':
        return <Shell className="w-16 h-16 text-blue-800 opacity-80" />;
      default:
        return <Fish className="w-16 h-16 text-blue-800 opacity-80" />;
    }
  };

  // Получение изображения для категории
  const getCategoryImage = (categoryName: string) => {
    const mockProduct = { category: categoryName, name: 'default' };
    return getProductImage(mockProduct);
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

  // Modified function to get product image
  const getProductImageWithFallback = (product) => {
    return product.image || getProductImage(product);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <h2 className="text-3xl font-bold mb-2 text-center text-blue-800">Наша продукция</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Широкий выбор свежих морепродуктов от проверенных поставщиков для вашего бизнеса</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productCategories.map((category, index) => (
            <div key={index} className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 bg-white card-hover">
              <div className="relative h-60 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                {getCategoryImage(category.name) && !categoryImageErrors[category.name] ? (
                  <img 
                    src={getCategoryImage(category.name)} 
                    alt={category.name} 
                    className="object-cover w-full h-full"
                    onError={() => handleCategoryImageError(category.name)}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full w-full bg-gradient-to-br from-blue-50 to-blue-100">
                    {getCategoryIcon(category.name)}
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-2">{category.name}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
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
        
        <div className="mt-20">
          <h3 className="text-2xl font-bold mb-2 text-center text-blue-800">Популярные товары</h3>
          <p className="text-center text-gray-600 mb-8">Наиболее востребованные позиции у наших клиентов</p>
          <Carousel className="mx-auto max-w-6xl">
            <CarouselContent>
              {popularProducts.map((product, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 p-2">
                  <Card className="border-0 shadow-md rounded-xl overflow-hidden card-hover">
                    <CardContent className="p-0">
                      <div className="relative h-64 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                        {getProductImageWithFallback(product) && !imageErrors[index] ? (
                          <img 
                            src={getProductImageWithFallback(product)} 
                            alt={product.name} 
                            className="object-cover w-full h-full"
                            onError={() => handleImageError(index)}
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full w-full">
                            {getCategoryIcon(product.category)}
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <p className="text-blue-600 text-sm font-medium mb-1">{product.category}</p>
                        <h4 className="text-gray-800 font-semibold mb-2 line-clamp-2">{product.name}</h4>
                        <div className="flex justify-between items-center">
                          <p className="text-gray-600 text-sm">
                            {product.manufacturer && `${product.manufacturer}`}
                          </p>
                          {product.prices.smallWholesale && (
                            <p className="text-blue-800 font-semibold">
                              от {formatPrice(product.prices.smallWholesale)} ₽
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-1 bg-white/80 hover:bg-white" />
            <CarouselNext className="right-1 bg-white/80 hover:bg-white" />
          </Carousel>
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            size="lg" 
            onClick={handleViewAllCatalog} 
            className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-8 py-6 h-auto rounded-xl shadow-md"
          >
            <ExternalLink className="mr-2 h-5 w-5" />
            Смотреть весь каталог
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
