
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
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
  const [selectedManufacturer, setSelectedManufacturer] = useState('');
  const [selectedExpiryDate, setSelectedExpiryDate] = useState('');
  
  // Get unique manufacturers and expiry dates for filter options
  const manufacturers = Array.from(new Set(products.map(product => product.manufacturer)));
  const expiryDates = Array.from(new Set(products.map(product => product.expiryDate)));
  
  // Filter products based on search term and selected filters
  const filteredProducts = products.filter(product => {
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedManufacturer === '' || product.manufacturer === selectedManufacturer) &&
      (selectedExpiryDate === '' || product.expiryDate === selectedExpiryDate)
    );
  });
  
  // Reset filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedManufacturer('');
    setSelectedExpiryDate('');
  };
  
  return (
    <Card>
      <CardHeader className="bg-blue-50">
        <CardTitle className="text-2xl font-bold text-center">Каталог Морепродуктов</CardTitle>
        
        <div className="flex flex-col md:flex-row gap-4 items-center mt-4">
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
          
          {/* Manufacturer filter */}
          <div className="w-full md:w-60">
            <Select value={selectedManufacturer} onValueChange={setSelectedManufacturer}>
              <SelectTrigger>
                <SelectValue placeholder="Производитель" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Все производители</SelectItem>
                {manufacturers.map((manufacturer) => (
                  <SelectItem key={manufacturer} value={manufacturer}>
                    {manufacturer}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Expiry date filter */}
          <div className="w-full md:w-60">
            <Select value={selectedExpiryDate} onValueChange={setSelectedExpiryDate}>
              <SelectTrigger>
                <SelectValue placeholder="Срок годности" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Все сроки</SelectItem>
                {expiryDates.map((date) => (
                  <SelectItem key={date} value={date}>
                    {date}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Reset button */}
          <Button 
            variant="outline" 
            onClick={handleResetFilters}
            className="w-full md:w-auto"
          >
            Сбросить фильтры
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="px-0 py-2">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-3 text-left font-semibold">Наименование</th>
                <th className="px-4 py-3 text-left font-semibold">Размер</th>
                <th className="px-4 py-3 text-left font-semibold">Срок годности</th>
                <th className="px-4 py-3 text-left font-semibold">Производитель</th>
                <th className="px-4 py-3 text-left font-semibold">Упаковка</th>
                <th className="px-4 py-3 text-right font-semibold">Цена</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{product.name}</td>
                  <td className="px-4 py-3">{product.size}</td>
                  <td className="px-4 py-3">{product.expiryDate}</td>
                  <td className="px-4 py-3">{product.manufacturer}</td>
                  <td className="px-4 py-3">{product.packaging}</td>
                  <td className="px-4 py-3 text-right font-bold">{formatPrice(product.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            Товары не найдены. Пожалуйста, измените параметры поиска.
          </div>
        )}
        
        <div className="text-right p-4 text-sm text-gray-500">
          Всего товаров: {filteredProducts.length}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCatalog;
