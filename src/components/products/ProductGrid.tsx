
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchCategories } from '@/utils/dataService';
import { formatPrice } from '@/lib/formatters';
import ProductCard from './ProductCard';

const ProductGrid = () => {
  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });

  return (
    <section className="py-16 bg-white" id="products">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Наши морепродукты</h2>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="flex justify-center mb-8 flex-wrap gap-2">
            <TabsTrigger value="all" className="rounded-full px-6">
              Все товары
            </TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger 
                key={category} 
                value={category} 
                className="rounded-full px-6"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all" className="mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
          
          {categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products
                  .filter((product) => product.category === category)
                  .map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default ProductGrid;
