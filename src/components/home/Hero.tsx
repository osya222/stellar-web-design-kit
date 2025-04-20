
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Свежая рыба и морепродукты оптом
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Поставляем свежую рыбу и морепродукты для ресторанов, магазинов и оптовых покупателей в Москве и области
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-lg"
            >
              <a href="#products">Смотреть каталог</a>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="border-blue-500 text-blue-500 hover:bg-blue-50 px-8 py-3 rounded-lg text-lg"
            >
              <Link to="/cart">Оформить заказ</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
