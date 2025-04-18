
import React, { useState } from 'react';
import { products } from "@/data/products/index";
import { useIsMobile } from "@/hooks/use-mobile";
import CategoryCard from './CategoryCard';
import ViewAllButton from './ViewAllButton';
import { getProductImage } from '@/data/productImages';
import { ImageUpload } from '../shared/ImageUpload';
import { Button } from "../ui/button";
import { Edit2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProductShowcase: React.FC = () => {
  const isMobile = useIsMobile();
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const { toast } = useToast();

  // Extract unique categories from products array
  const productCategories = Array.from(
    new Set(products.map(product => product.category))
  ).map(name => ({ 
    id: name.toLowerCase().replace(/\s+/g, '-'), 
    name,
    description: `Высококачественная продукция категории "${name}"`
  })).filter(category => 
    category.name !== "Полуфабрикаты" && 
    category.name !== "Икра" && 
    category.name !== "Деликатесы" &&
    category.name !== "Другие виды рыбы" &&
    category.name !== "Мидии" &&
    category.name !== "Филе рыбы"
  ).slice(0, 6);

  const handleCategoryClick = (categoryId: string, event: React.MouseEvent) => {
    event.preventDefault();
    setTimeout(() => {
      const element = document.getElementById(`catalog-${categoryId}`);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  const handleViewAllCatalog = (event: React.MouseEvent) => {
    event.preventDefault();
    setTimeout(() => {
      const catalogElement = document.getElementById('catalog');
      if (catalogElement) {
        catalogElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  const handleImageUploaded = (uploadedUrl: string, categoryName: string) => {
    toast({
      title: "Изображение загружено",
      description: `Изображение для категории "${categoryName}" успешно обновлено`,
    });
    setEditingCategory(null);
  };

  return (
    <section className="py-10 md:py-20 bg-white">
      <div className="container-custom">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center text-blue-800">Наша продукция</h2>
        <p className="text-center text-gray-600 mb-8 md:mb-12 max-w-2xl mx-auto px-4">
          Широкий выбор свежих морепродуктов от проверенных поставщиков для вашего бизнеса
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {productCategories.map((category) => (
            <div key={category.id} className="relative">
              <CategoryCard
                category={category}
                image={editingCategory === category.name ? undefined : getProductImage({ category: category.name, name: "default" })}
                onCategoryClick={handleCategoryClick}
              />
              {editingCategory === category.name ? (
                <div className="absolute inset-0 bg-white p-4 rounded-xl shadow-md">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Загрузка изображения</h3>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setEditingCategory(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <ImageUpload
                    initialImage={getProductImage({ category: category.name, name: "default" })}
                    onImageUploaded={(url) => handleImageUploaded(url, category.name)}
                    productId={undefined}
                  />
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  onClick={() => setEditingCategory(category.name)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
        
        <ViewAllButton onClick={handleViewAllCatalog} />
      </div>
    </section>
  );
};

export default ProductShowcase;
