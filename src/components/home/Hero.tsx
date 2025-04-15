
import React, { useState } from 'react';
import Logo from "@/components/layout/Logo";
import { Shell, ArrowDown } from "lucide-react";
import HeroEdit from './HeroEdit';

const Hero = () => {
  const [content, setContent] = useState({
    title: "Премиум морепродукты с доставкой",
    description: "Широкий ассортимент качественной морской продукции с доставкой по Москве и МО. Работаем с ресторанами, магазинами и оптовыми покупателями."
  });

  const scrollToCatalog = () => {
    const catalogSection = document.getElementById('catalog');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-20 bg-white">        
      <div className="container-custom text-center">
        <div className="flex justify-center mb-12">
          <Logo size="lg" />
        </div>
        <h2 className="text-5xl font-bold mb-8 text-blue-800 flex items-center justify-center gap-4">
          {content.title}
          <Shell className="w-12 h-12 text-blue-600" />
        </h2>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-lg max-w-3xl mx-auto mb-8">
          <p className="text-xl text-gray-800 leading-relaxed">
            {content.description}
          </p>
        </div>
        <button 
          onClick={scrollToCatalog}
          className="flex items-center gap-2 mx-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
        >
          Перейти к каталогу
          <ArrowDown className="w-4 h-4" />
        </button>
        <HeroEdit content={content} onUpdate={setContent} />
      </div>
    </section>
  );
};

export default Hero;
