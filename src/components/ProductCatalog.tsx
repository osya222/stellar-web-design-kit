
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { formatPrice } from '@/lib/formatters';

// Define our product type
interface Product {
  id: number;
  name: string;
  size: string;
  expiryDate: string;
  manufacturer: string;
  packaging: string;
  price: number;
}

const ProductCatalog: React.FC = () => {
  // Sample product data from the image
  const products: Product[] = [
    { id: 1, name: "Котлеты кальмаровые", size: "", expiryDate: "Сентябрь, 24", manufacturer: "«Юниант»", packaging: "5 кг", price: 255 },
    { id: 2, name: "Котлеты куриные", size: "", expiryDate: "Сентябрь, 24", manufacturer: "«Юниант»", packaging: "10,5 кг", price: 400 },
    { id: 3, name: "Котлеты лососевые", size: "", expiryDate: "Июль, 24", manufacturer: "«Юниант»", packaging: "5 кг", price: 240 },
    { id: 4, name: "Котлеты тресковые", size: "", expiryDate: "Июль, 24", manufacturer: "«Юниант»", packaging: "5 кг", price: 200 },
    { id: 5, name: "Котлеты — Филе горбуши ТРЕУГОЛЬНИКИ", size: "", expiryDate: "Октябрь, 24", manufacturer: "«Юниант»", packaging: "5 кг", price: 445 },
    { id: 6, name: "Котлеты — из филе минтая (наггетсы/палочки/треуг/фишкейки)", size: "", expiryDate: "Октябрь, 24", manufacturer: "«Юниант»", packaging: "5 кг", price: 315 },
    { id: 7, name: "Котлеты — Филе минтая в кляре", size: "", expiryDate: "Февраль, 25", manufacturer: "«Юниант»", packaging: "5 кг", price: 410 },
    { id: 8, name: "Красноглазка н/р", size: "300 гр+", expiryDate: "Март, 24", manufacturer: "Н.Зеландия", packaging: "20 кг", price: 225 },
    { id: 9, name: "Креветка с/м очищенная Б/Хв (Фас по 1 кг)", size: "16-20 шт/ф", expiryDate: "Август, 24", manufacturer: "Эквадор", packaging: "10*1 кг", price: 1115 },
    { id: 10, name: "Креветка с/м очищенная Б/Хв (Фас по 1 кг)", size: "26-30 шт/ф", expiryDate: "Август, 24", manufacturer: "Эквадор", packaging: "10*1 кг", price: 1015 },
    { id: 11, name: "Креветка с/м очищенная С/Хв (Фас по 1 кг)", size: "26-30 шт/ф", expiryDate: "Август, 24", manufacturer: "Эквадор", packaging: "10*1 кг", price: 1005 },
    { id: 12, name: "Креветка Королевская Ваннамей (14%)", size: "50-70 шт", expiryDate: "Август, 24", manufacturer: "«Камарон»", packaging: "5 кг", price: 560 },
    { id: 13, name: "Креветка Королевская Ваннамей (Глазурь)", size: "50-70 шт", expiryDate: "Август, 24", manufacturer: "«Камарон»", packaging: "5 кг", price: 555 },
    { id: 14, name: "Креветки (лангустины) Б/Г С2", size: "56-100 шт/кг", expiryDate: "Март, 24", manufacturer: "Аргентина", packaging: "6*2 кг", price: 1000 },
    { id: 15, name: "Креветки (лангустины) Н/Р L1", size: "10-20 шт/кг", expiryDate: "Август, 24", manufacturer: "Аргентина", packaging: "6*2 кг", price: 860 },
    { id: 16, name: "Креветка северная", size: "150 шт+", expiryDate: "Июнь, 24", manufacturer: "«Беломорский Рыбак»", packaging: "5 кг", price: 560 },
    { id: 17, name: "Креветка северная", size: "90-120 шт/кг", expiryDate: "Декабрь, 23", manufacturer: "Китай", packaging: "5 кг", price: 780 },
    { id: 18, name: "Лемонема-тушка", size: "", expiryDate: "Август, 24", manufacturer: "Д. Восток", packaging: "22 кг", price: 168 },
    { id: 19, name: "Лосось С/Г premium", size: "6-7 кг", expiryDate: "Май, 24", manufacturer: "Чили", packaging: "вес", price: 1450 },
    { id: 20, name: "Лосось С/Г premium", size: "7-8 кг", expiryDate: "Май, 24", manufacturer: "Чили", packaging: "вес", price: 1470 },
    { id: 21, name: "Мидии на половинке раковины (Голубые)", size: "30-40 шт/кг", expiryDate: "Сентябрь, 24", manufacturer: "Китай", packaging: "12 кг", price: 470 },
    { id: 22, name: "Минтай Б/Г", size: "30 см+", expiryDate: "Декабрь, 24", manufacturer: "Д. Восток", packaging: "ожидается", price: 185 },
  ];
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedManufacturer, setSelectedManufacturer] = useState('all');
  const [selectedExpiryDate, setSelectedExpiryDate] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  // Get unique manufacturers and expiry dates for filter options
  const manufacturers = Array.from(new Set(products.map(product => product.manufacturer)));
  const expiryDates = Array.from(new Set(products.map(product => product.expiryDate)));
  
  // Filter products based on search term and selected filters
  const filteredProducts = products.filter(product => {
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedManufacturer === 'all' || product.manufacturer === selectedManufacturer) &&
      (selectedExpiryDate === 'all' || product.expiryDate === selectedExpiryDate)
    );
  });
  
  // Reset filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedManufacturer('all');
    setSelectedExpiryDate('all');
  };
  
  return (
    <Card>
      <CardHeader className="bg-blue-50">
        <CardTitle className="text-2xl font-bold text-center">Каталог Морепродуктов</CardTitle>
        
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search box */}
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
            
            {/* Filter toggle button */}
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="w-full md:w-auto flex items-center gap-2"
            >
              <Filter size={16} />
              {showFilters ? 'Скрыть фильтры' : 'Показать фильтры'}
            </Button>
            
            {/* Reset button */}
            <Button 
              variant="outline" 
              onClick={handleResetFilters}
              className="w-full md:w-auto"
            >
              Сбросить фильтры
            </Button>
          </div>
          
          {/* Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Manufacturer filter */}
              <div>
                <label className="block mb-1 text-sm font-medium">Производитель:</label>
                <Select value={selectedManufacturer} onValueChange={setSelectedManufacturer}>
                  <SelectTrigger>
                    <SelectValue placeholder="Производитель" />
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
              
              {/* Expiry date filter */}
              <div>
                <label className="block mb-1 text-sm font-medium">Срок годности:</label>
                <Select value={selectedExpiryDate} onValueChange={setSelectedExpiryDate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Срок годности" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все сроки</SelectItem>
                    {expiryDates.map((date) => (
                      <SelectItem key={date} value={date}>
                        {date}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="px-4 py-6">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            Товары не найдены. Пожалуйста, измените параметры поиска.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-40 bg-blue-100 flex items-center justify-center">
                    <div className="text-6xl text-blue-300">🐟</div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold line-clamp-2 h-12 mb-2" title={product.name}>
                      {product.name}
                    </h3>
                    <div className="space-y-1 text-sm mb-4">
                      {product.size && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Размер:</span>
                          <span className="font-medium">{product.size}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-500">Срок годности:</span>
                        <span className="font-medium">{product.expiryDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Производитель:</span>
                        <span className="font-medium">{product.manufacturer}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Упаковка:</span>
                        <span className="font-medium">{product.packaging}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="text-lg font-bold text-blue-800">
                        {formatPrice(product.price)}
                      </div>
                      <Button size="sm">Заказать</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-6 text-right text-sm text-gray-500">
              Всего товаров: {filteredProducts.length}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCatalog;
