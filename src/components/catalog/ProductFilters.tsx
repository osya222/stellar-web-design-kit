
import React from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

interface ProductFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedManufacturer: string;
  setSelectedManufacturer: (value: string) => void;
  showFilters: boolean;
  setShowFilters: (value: boolean) => void;
  handleResetFilters: () => void;
  categories: string[];
  manufacturers: string[];
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedManufacturer,
  setSelectedManufacturer,
  showFilters,
  setShowFilters,
  handleResetFilters,
  categories,
  manufacturers,
}) => {
  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* Поисковая строка */}
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Поиск по названию..."
            className="pl-8 pr-4 py-2 w-full border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Кнопка переключения фильтров */}
        <Button 
          variant="outline" 
          onClick={() => setShowFilters(!showFilters)}
          className="w-full md:w-auto flex items-center gap-2"
        >
          <Filter size={16} />
          {showFilters ? 'Скрыть фильтры' : 'Показать фильтры'}
        </Button>
        
        {/* Кнопка сброса */}
        <Button 
          variant="outline" 
          onClick={handleResetFilters}
          className="w-full md:w-auto"
        >
          Сбросить фильтры
        </Button>
      </div>
      
      {/* Фильтры */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Фильтр по категории */}
          <div>
            <label className="block mb-1 text-sm font-medium">Категория:</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все категории</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Фильтр по производителю */}
          <div>
            <label className="block mb-1 text-sm font-medium">Производитель:</label>
            <Select value={selectedManufacturer} onValueChange={setSelectedManufacturer}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите производителя" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все производители</SelectItem>
                {manufacturers.map((manufacturer) => (
                  <SelectItem key={manufacturer} value={manufacturer}>
                    {manufacturer}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilters;
