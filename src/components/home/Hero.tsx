
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
    <section className="relative py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container-custom text-center relative z-10">
        <div className="flex justify-center mb-12">
          <Logo size="lg" />
        </div>
        <h2 className="text-5xl font-bold mb-8 text-gray-800">
          Премиум морепродукты с доставкой
        </h2>
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg max-w-3xl mx-auto mb-8">
          <p className="text-xl leading-relaxed text-gray-700">
            Широкий ассортимент качественной морской продукции с доставкой по Москве и МО. 
            Работаем с ресторанами, магазинами и оптовыми покупателями. Для связи: riba@рыба.shop
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
