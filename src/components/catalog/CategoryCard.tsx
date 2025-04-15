
import React, { useState, useEffect } from 'react';
import { ArrowRight, RefreshCcw } from "lucide-react";

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    description: string;
  };
  image?: string;
  onCategoryClick: (id: string, event: React.MouseEvent) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, image, onCategoryClick }) => {
  const [imageError, setImageError] = useState(false);
  const [currentImage, setCurrentImage] = useState(image);
  
  useEffect(() => {
    setCurrentImage(image);
    setImageError(false);
  }, [image]);
  
  const renderFishIcon = () => {
    return (
      <img 
        src="/lovable-uploads/02eda944-c8e4-4ddc-b061-5b197c2c118a.png" 
        alt="Fish icon" 
        className="w-16 h-16 opacity-70"
      />
    );
  };

  return (
    <div className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 bg-white card-hover">
      <div className="relative h-40 md:h-60 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        {currentImage && !imageError ? (
          <img 
            src={currentImage} 
            alt={category.name} 
            className="object-cover w-full h-full"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full bg-gradient-to-br from-blue-50 to-blue-100">
            {renderFishIcon()}
          </div>
        )}
      </div>
      <div className="p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-bold text-blue-800 mb-1 md:mb-2">{category.name}</h3>
        <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">{category.description}</p>
        <a 
          href={`#catalog-${category.id}`}
          onClick={(e) => onCategoryClick(category.id, e)}
          className="text-blue-600 font-medium flex items-center hover:text-blue-800 transition-colors"
        >
          Подробнее <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

export default CategoryCard;
