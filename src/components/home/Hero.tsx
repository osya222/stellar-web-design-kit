
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Свежая рыба и морепродукты оптом
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Поставляем свежую рыбу и морепродукты для ресторанов, магазинов и оптовых покупателей в Москве и области
          </p>
          <div className="flex justify-center">
            <Button 
              asChild 
              className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-600 w-full max-w-xs"
            >
              <a href="#products">Смотреть каталог</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
