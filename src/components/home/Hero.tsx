
import React from 'react';
import Logo from "@/components/layout/Logo";
import { Shell } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative py-20 bg-white">        
      <div className="container-custom text-center">
        <div className="flex justify-center mb-12">
          <Logo size="lg" />
        </div>
        <h2 className="text-5xl font-bold mb-8 text-blue-800 flex items-center justify-center gap-4">
          Премиум морепродукты с доставкой
          <Shell className="w-12 h-12 text-blue-600" />
        </h2>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-lg max-w-3xl mx-auto">
          <p className="text-xl text-gray-800 leading-relaxed">
            Широкий ассортимент качественной морской продукции с доставкой по Москве и МО. Работаем с ресторанами, магазинами и оптовыми покупателями.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
