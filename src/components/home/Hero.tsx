
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-0">
      {/* background gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{
        background: 'linear-gradient(108deg, #82c7fc 17.7%, #b2f4dd 91.2%)'
      }} />
      {/* big fish/seafood image */}
      <div className="absolute inset-0 flex justify-center items-end z-10 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
          alt="Рыба Hero"
          className="max-h-[330px] max-w-full opacity-80 animate-fade-in rounded-b-lg shadow-2xl"
        />
      </div>

      <div className="container relative z-20 mx-auto px-4 py-20 md:py-28 flex flex-col items-center">
        <div className="backdrop-blur-[3px] shadow-xl rounded-xl px-4 md:px-12 py-12 text-center bg-white/80 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight drop-shadow-lg animate-fade-in">
            Свежая рыба и морепродукты оптом
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in">
            Поставляем свежайшую рыбу и лучшие морепродукты для ресторанов, магазинов и оптовых покупателей Москвы и области
          </p>
          <div className="flex justify-center">
            <Button
              asChild
              className="bg-blue-500 hover:scale-105 duration-200 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-600 w-full max-w-xs animate-fade-in shadow-lg"
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
