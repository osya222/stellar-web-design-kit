
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProductGrid = () => {
  return (
    <section className="py-16 bg-white" id="products">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Наши морепродукты</h2>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="flex justify-center mb-8 flex-wrap gap-2">
            <TabsTrigger value="all" className="rounded-full px-6">Все товары</TabsTrigger>
            <TabsTrigger value="seafood" className="rounded-full px-6">Морепродукты</TabsTrigger>
            <TabsTrigger value="fish" className="rounded-full px-6">Рыба</TabsTrigger>
            <TabsTrigger value="delicacy" className="rounded-full px-6">Деликатесы</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-4 text-center">
                <h3 className="font-medium mt-2">В разработке</h3>
                <p className="text-gray-500 mt-1">Раздел товаров находится в разработке</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="seafood" className="mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-4 text-center">
                <h3 className="font-medium mt-2">В разработке</h3>
                <p className="text-gray-500 mt-1">Раздел морепродуктов находится в разработке</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="fish" className="mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-4 text-center">
                <h3 className="font-medium mt-2">В разработке</h3>
                <p className="text-gray-500 mt-1">Раздел рыбы находится в разработке</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="delicacy" className="mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-4 text-center">
                <h3 className="font-medium mt-2">В разработке</h3>
                <p className="text-gray-500 mt-1">Раздел деликатесов находится в разработке</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ProductGrid;
