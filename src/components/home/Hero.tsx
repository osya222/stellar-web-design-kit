
import React from 'react';
import Logo from "@/components/layout/Logo";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  const scrollToCatalog = () => {
    const catalogSection = document.getElementById('catalog');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-20 overflow-hidden">        
      {/* Decorative waves */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="none">
          <path 
            d="M0,100 C300,300 900,-100 1200,100 L1200,400 L0,400 Z" 
            fill="#EBF7FC" 
            className="opacity-60"
          />
          <path 
            d="M0,200 C300,400 900,0 1200,200 L1200,400 L0,400 Z" 
            fill="#E0F2F7" 
            className="opacity-40"
          />
          <path 
            d="M0,300 C300,500 900,100 1200,300 L1200,400 L0,400 Z" 
            fill="#D3E7F0" 
            className="opacity-20"
          />
        </svg>
      </div>

      <div className="container-custom text-center relative z-10">
        <div className="flex justify-center mb-12">
          <Logo size="lg" />
        </div>
        <h2 className="text-5xl font-bold mb-8 text-gray-800">
          Премиум морепродукты с доставкой
        </h2>
        <div className="bg-gray-100/70 backdrop-blur-sm p-6 rounded-xl shadow-lg max-w-3xl mx-auto mb-8">
          <p className="text-xl text-gray-700 leading-relaxed">
            Широкий ассортимент качественной морской продукции с доставкой по Москве и МО. Работаем с ресторанами, магазинами и оптовыми покупателями.
          </p>
        </div>
        <button 
          onClick={scrollToCatalog}
          className="flex items-center gap-2 mx-auto bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors border border-gray-200 shadow-sm"
        >
          Перейти к каталогу
          <ArrowDown className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
