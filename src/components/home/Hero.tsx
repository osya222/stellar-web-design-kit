
import React from 'react';
import Logo from "@/components/layout/Logo";
import { Shell, ArrowDown } from "lucide-react";

const Hero = () => {
  const scrollToCatalog = () => {
    const catalogSection = document.getElementById('catalog');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-20 bg-blue-800">        
      <div className="container-custom text-center">
        <div className="flex justify-center mb-12">
          <Logo size="lg" />
        </div>
        <h2 className="text-5xl font-bold mb-8 text-white flex items-center justify-center gap-4">
          Премиум морепродукты с доставкой
          <Shell className="w-12 h-12 text-blue-200" />
        </h2>
        <div className="bg-blue-700/30 backdrop-blur-sm p-6 rounded-xl shadow-lg max-w-3xl mx-auto mb-8">
          <p className="text-xl text-white leading-relaxed">
            Широкий ассортимент качественной морской продукции с доставкой по Москве и МО. Работаем с ресторанами, магазинами и оптовыми покупателями.
          </p>
        </div>
        <button 
          onClick={scrollToCatalog}
          className="flex items-center gap-2 mx-auto bg-white hover:bg-blue-50 text-blue-800 font-medium py-3 px-6 rounded-lg transition-colors"
        >
          Перейти к каталогу
          <ArrowDown className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
