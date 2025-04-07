import React from 'react';
import { productImages } from '@/data/productImages';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const ProductShowcase: React.FC = () => {
  // Extract some featured images from our product images collection
  const featuredImages = [
    { 
      category: "Лосось (Чили)", 
      title: "Лосось премиум качества", 
      image: "https://ribnaya-baza.ru/upload/iblock/782/hgpc16db56z0bcgnsh6aytum7msk7dqj.jpeg",
      description: "Свежемороженый лосось прямыми поставками из Чили"
    },
    { 
      category: "Креветки и морепродукты", 
      title: "Королевские креветки", 
      image: productImages["Креветки и морепродукты"]["Креветка"],
      description: "Отборные морепродукты высшего качества"
    },
    { 
      category: "Икра", 
      title: "Икра красная", 
      image: productImages["Икра"]["Икра красная"],
      description: "Икра лососевых рыб, высший сорт"
    },
    { 
      category: "Деликатесы", 
      title: "Рыбные деликатесы", 
      image: productImages["Деликатесы"]["Копченый лосось"],
      description: "Изысканные деликатесы из морепродуктов"
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Наша продукция</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredImages.map((item, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "https://seafood-shop.ru/upload/iblock/1bd/1bd80fbcb91dcd25486672e2cc4db623.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <p className="text-sm font-medium opacity-75">{item.category}</p>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-4">{item.description}</p>
                <Link to="/#catalog" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                  Подробнее <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6 text-center">Популярные товары</h3>
          <Carousel className="mx-auto max-w-5xl">
            <CarouselContent>
              {Object.entries(productImages).flatMap(([category, images]) => 
                Object.entries(images)
                  .filter(([key]) => key !== 'default')
                  .slice(0, 2)
                  .map(([name, url]) => (
                    <CarouselItem key={`${category}-${name}`} className="md:basis-1/2 lg:basis-1/3">
                      <Card className="border-0 shadow-md">
                        <CardContent className="p-0">
                          <div className="relative h-64 overflow-hidden">
                            <img 
                              src={url as string} 
                              alt={name} 
                              className="w-full h-full object-cover transition-all hover:scale-110"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = "https://seafood-shop.ru/upload/iblock/1bd/1bd80fbcb91dcd25486672e2cc4db623.jpg";
                              }}
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                              <h4 className="text-white font-semibold">{name}</h4>
                              <p className="text-white/70 text-sm">{category}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))
              )}
            </CarouselContent>
            <CarouselPrevious className="left-1" />
            <CarouselNext className="right-1" />
          </Carousel>
        </div>
        
        <div className="mt-10 text-center">
          <Button size="lg" asChild>
            <Link to="/#catalog">Смотреть весь каталог</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
