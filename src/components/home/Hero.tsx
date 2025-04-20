import React from 'react';
import Logo from "@/components/layout/Logo";
import { ArrowDown } from "lucide-react";
import { getProducts, saveProduct } from "@/utils/dataService";
import ImageUpload from "@/components/shared/ImageUpload";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Hero = () => {
  const scrollToCatalog = () => {
    const catalogSection = document.getElementById('catalog');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const popularProducts = getProducts()
    .sort((a, b) => b.price - a.price)
    .slice(0, 5);

  const handleImageUploaded = (productId: number) => async (imagePath: string) => {
    const product = popularProducts.find(p => p.id === productId);
    if (product) {
      const updatedProduct = { ...product, image: imagePath };
      saveProduct(updatedProduct);
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
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg max-w-3xl mx-auto mb-12">
          <p className="text-xl leading-relaxed text-gray-700 mb-8">
            Широкий ассортимент качественной морской продукции с доставкой по Москве и МО. 
            Работаем с ресторанами, магазинами и оптовыми покупателями. Для связи: riba@рыба.shop
          </p>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Популярные товары</h3>
            <Carousel className="max-w-2xl mx-auto">
              <CarouselContent>
                {popularProducts.map((product) => (
                  <CarouselItem key={product.id} className="basis-1/2 sm:basis-1/3">
                    <div className="p-2">
                      <div className="rounded-lg overflow-hidden shadow-md bg-white">
                        <div className="aspect-square relative bg-gray-100">
                          <ImageUpload
                            onImageUploaded={handleImageUploaded(product.id)}
                            currentImage={product.image}
                            className="w-full h-full"
                            size="sm"
                          />
                          {product.image && (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="p-3">
                          <h4 className="font-medium text-sm text-gray-900 truncate">{product.name}</h4>
                          <p className="text-sm text-gray-500 mt-1">{product.price} ₽</p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </div>

          <button 
            onClick={scrollToCatalog}
            className="flex items-center gap-2 mx-auto bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors border border-gray-200 shadow-sm"
          >
            Перейти к каталогу
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
