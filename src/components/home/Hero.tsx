
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { getHeroImageUrl } from '@/utils/dataService';

const Hero = () => {
  return (
    <section className="relative bg-gray-50 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-900/40 z-10" />
        <img
          src={getHeroImageUrl()}
          alt="Свежайшие морепродукты"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-20">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Свежайшие морепродукты оптом
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Поставки по Москве и области с гарантией качества и соблюдением всех норм хранения
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <a href="#products">Наш ассортимент</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
              <Link to="/cart">Оформить заказ</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
