
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

// Расширенная модель продукта
interface Product {
  id: number;
  name: string;
  category: string;
  size: string;
  packaging: string;
  catchDate?: string;
  manufacturer: string;
  expiryDate?: string;
  weight?: string;
  prices: {
    smallWholesale?: number;
    mediumWholesale?: number;
    largeWholesale?: number;
  };
}

const ProductCatalog: React.FC = () => {
  // Обновленные данные продуктов с категориями
  const products: Product[] = [
    // --- Лосось (Чили) ---
    { 
      id: 1, 
      name: "Лосось свежемороженый", 
      category: "Лосось (Чили)",
      size: "5-6 кг", 
      packaging: "27 кг", 
      catchDate: "Сентябрь",
      manufacturer: "Чили Premium", 
      prices: {
        smallWholesale: 1413.9,
        mediumWholesale: undefined, // штучный
        largeWholesale: undefined // штучный
      }
    },
    { 
      id: 2, 
      name: "Лосось свежемороженый", 
      category: "Лосось (Чили)",
      size: "6-7 кг", 
      packaging: "27 кг", 
      manufacturer: "Чили Premium", 
      prices: {
        smallWholesale: 1457.9,
        mediumWholesale: 1452.9,
        largeWholesale: 1447.9
      }
    },
    // --- Форель (Турция) ---
    { 
      id: 3, 
      name: "Форель свежемороженая морская", 
      category: "Форель (Турция)",
      size: "1,3-1,8 кг", 
      packaging: "25 кг", 
      catchDate: "Июнь",
      manufacturer: "Турция", 
      prices: {
        smallWholesale: 1014.9,
        mediumWholesale: 1009.9,
        largeWholesale: 1004.9
      }
    },
    { 
      id: 4, 
      name: "Форель свежемороженая морская", 
      category: "Форель (Турция)",
      size: "1,8-2,7 кг", 
      packaging: "25 кг", 
      catchDate: "Июль",
      manufacturer: "Турция", 
      prices: {
        smallWholesale: 1064.9,
        mediumWholesale: 1059.9,
        largeWholesale: 1054.9
      }
    },
    { 
      id: 5, 
      name: "Форель свежемороженая морская", 
      category: "Форель (Турция)",
      size: "2,7-3,6 кг", 
      packaging: "25 кг", 
      catchDate: "Июнь",
      manufacturer: "Турция", 
      prices: {
        smallWholesale: 1166.9,
        mediumWholesale: 1161.9,
        largeWholesale: 1156.9
      }
    },
    // --- Креветки и морепродукты ---
    { 
      id: 6, 
      name: "Креветка ваннамей свежемороженая в глазури", 
      category: "Креветки и морепродукты",
      size: "21-25 шт./кг", 
      packaging: "10×1 кг", 
      catchDate: "Акватория",
      manufacturer: "Индия", 
      prices: {
        smallWholesale: 1002.9,
        mediumWholesale: 997.9,
        largeWholesale: 992.9
      }
    },
    { 
      id: 7, 
      name: "Креветка ваннамей свежемороженая в глазури", 
      category: "Креветки и морепродукты",
      size: "26-30 шт./кг", 
      packaging: "10×1 кг", 
      catchDate: "Май",
      manufacturer: "Индия", 
      prices: {
        smallWholesale: 1004.9,
        mediumWholesale: 999.9,
        largeWholesale: 994.9
      }
    },
    { 
      id: 8, 
      name: "Креветка ваннамей свежемороженая в глазури", 
      category: "Креветки и морепродукты",
      size: "16-20 шт./кг", 
      packaging: "10×1 кг", 
      catchDate: "Июль",
      manufacturer: "Индия", 
      prices: {
        smallWholesale: 1071.9,
        mediumWholesale: 1066.9,
        largeWholesale: 1061.9
      }
    },
    { 
      id: 9, 
      name: "Креветка ваннамей свежемороженая в глазури", 
      category: "Креветки и морепродукты",
      size: "16-20 шт./кг", 
      packaging: "10×1 кг", 
      catchDate: "Акватория",
      manufacturer: "Индия", 
      prices: {
        smallWholesale: 1071.9,
        mediumWholesale: 1066.9,
        largeWholesale: 1061.9
      }
    },
    { 
      id: 10, 
      name: "Креветка ваннамей свежемороженая в глазури", 
      category: "Креветки и морепродукты",
      size: "16-20 шт./кг", 
      packaging: "10×1 кг", 
      catchDate: "Акватория",
      manufacturer: "Индия", 
      prices: {
        smallWholesale: 1071.9,
        mediumWholesale: 1066.9,
        largeWholesale: 1061.9
      }
    },
    { 
      id: 11, 
      name: "Лангустины свежемороженые L2", 
      category: "Креветки и морепродукты",
      size: "20-30 шт./кг", 
      packaging: "6×2 кг", 
      catchDate: "Июль",
      manufacturer: "Аргентина", 
      prices: {
        smallWholesale: 795.9,
        mediumWholesale: 790.9,
        largeWholesale: 785.9
      }
    },
    { 
      id: 12, 
      name: "Лангустины свежемороженые L1", 
      category: "Креветки и морепродукты",
      size: "16-20 шт./кг", 
      packaging: "6×2 кг", 
      catchDate: "Июнь",
      manufacturer: "Аргентина", 
      prices: {
        smallWholesale: 884.9,
        mediumWholesale: 878.9,
        largeWholesale: 873.9
      }
    },
    { 
      id: 13, 
      name: "Лангустины свежемороженые L2", 
      category: "Креветки и морепродукты",
      size: "56-101 шт./кг", 
      packaging: "6×2 кг", 
      catchDate: "Июнь",
      manufacturer: "Аргентина", 
      prices: {
        smallWholesale: 1022.9,
        mediumWholesale: 1017.9,
        largeWholesale: 1012.9
      }
    },
    { 
      id: 14, 
      name: "Медальоны из морепродуктов", 
      category: "Креветки и морепродукты",
      size: "9,6", 
      packaging: "40×0,24 кг", 
      catchDate: "Июль",
      manufacturer: "Индия", 
      prices: {
        smallWholesale: 1199.9,
        mediumWholesale: 1189.9,
        largeWholesale: 1184.9
      }
    },
    { 
      id: 15, 
      name: "Медальоны из морепродуктов сырокопченые", 
      category: "Креветки и морепродукты",
      size: "50-70", 
      packaging: "10×1 кг", 
      catchDate: "Июнь",
      manufacturer: "Индия", 
      prices: {
        smallWholesale: 1091.9,
        mediumWholesale: 387.9,
        largeWholesale: 380.9
      }
    },
    { 
      id: 16, 
      name: "Медальоны из морепродуктов сырокопченые", 
      category: "Креветки и морепродукты",
      size: "50-70", 
      packaging: "10×0,5 кг", 
      catchDate: "Акватория",
      manufacturer: "Чили", 
      prices: {
        smallWholesale: 483.9,
        mediumWholesale: 479.9,
        largeWholesale: 472.9
      }
    },
    { 
      id: 17, 
      name: "Мясо мидий варено-мороженое", 
      category: "Креветки и морепродукты",
      size: "20-300", 
      packaging: "9,2 кг", 
      catchDate: "Май",
      manufacturer: "Чили", 
      prices: {
        smallWholesale: 520.9,
        mediumWholesale: 512.9,
        largeWholesale: 504.9
      }
    },
    { 
      id: 18, 
      name: "Мясо мидий варено-мороженое", 
      category: "Креветки и морепродукты",
      size: "20-300", 
      packaging: "9,2 кг", 
      catchDate: "Май",
      manufacturer: "Чили", 
      prices: {
        smallWholesale: 509.9,
        mediumWholesale: 501.9,
        largeWholesale: 504.9
      }
    },
    { 
      id: 19, 
      name: "Мясо мидий варено-мороженое", 
      category: "Креветки и морепродукты",
      size: "20-300", 
      packaging: "9,2 кг", 
      catchDate: "Май",
      manufacturer: "Чили", 
      prices: {
        smallWholesale: 509.9,
        mediumWholesale: 501.9,
        largeWholesale: 504.9
      }
    },
    // --- Другие виды рыбы ---
    { 
      id: 20, 
      name: "Сорадо икряное мороженое", 
      category: "Другие виды рыбы",
      size: "30-400 г", 
      packaging: "5 кг", 
      manufacturer: "", 
      prices: {}
    },
    { 
      id: 21, 
      name: "Сорадо икряное мороженое", 
      category: "Другие виды рыбы",
      size: "30-400 г", 
      packaging: "5 кг", 
      manufacturer: "", 
      prices: {
        smallWholesale: 895.9,
        mediumWholesale: 895.9,
        largeWholesale: 891.9
      }
    },
    { 
      id: 22, 
      name: "Сибас икряной мороженый", 
      category: "Другие виды рыбы",
      size: "30-400 г", 
      packaging: "5 кг", 
      manufacturer: "", 
      prices: {
        smallWholesale: 828.9,
        mediumWholesale: 833.9,
        largeWholesale: 818.9
      }
    },
    { 
      id: 23, 
      name: "Сельдь икряная мороженая", 
      category: "Другие виды рыбы",
      size: "30-400 г", 
      packaging: "28 кг", 
      manufacturer: "", 
      prices: {
        smallWholesale: 269.9,
        mediumWholesale: 262.9,
        largeWholesale: 260.9
      }
    },
    { 
      id: 24, 
      name: "Скумбрия икряная мороженая", 
      category: "Другие виды рыбы",
      size: "50-600 г", 
      packaging: "25 кг", 
      manufacturer: "", 
      prices: {
        smallWholesale: 399.9,
        mediumWholesale: 393.9,
        largeWholesale: 389.9
      }
    },
    { 
      id: 25, 
      name: "Скумбрия икряная мороженая", 
      category: "Другие виды рыбы",
      size: "50-600 г", 
      packaging: "25 кг", 
      manufacturer: "", 
      prices: {
        smallWholesale: 419.9,
        mediumWholesale: 410.9,
        largeWholesale: 406.9
      }
    },
    { 
      id: 26, 
      name: "Скумбрия икряная мороженая", 
      category: "Другие виды рыбы",
      size: "50-600 г", 
      packaging: "25 кг", 
      manufacturer: "", 
      prices: {
        smallWholesale: 429.9,
        mediumWholesale: 423.9,
        largeWholesale: 419.9
      }
    },
    { 
      id: 27, 
      name: "Кек тунца вяленый", 
      category: "Другие виды рыбы",
      size: "10-250 г", 
      packaging: "", 
      manufacturer: "", 
      prices: {
        smallWholesale: 341.9,
        mediumWholesale: 333.9,
        largeWholesale: 327.9
      }
    },
    { 
      id: 28, 
      name: "Камбала без головы мороженая", 
      category: "Другие виды рыбы",
      size: "10-300 г", 
      packaging: "20 кг", 
      manufacturer: "", 
      prices: {}
    },
    { 
      id: 29, 
      name: "Окунь без головы мороженый 4×6,5", 
      category: "Другие виды рыбы",
      size: "10-300 г", 
      packaging: "26 кг", 
      manufacturer: "", 
      prices: {}
    },
    { 
      id: 30, 
      name: "Минтай без головы мороженый", 
      category: "Другие виды рыбы",
      size: "25+ см", 
      packaging: "25 кг", 
      manufacturer: "", 
      prices: {}
    },
    { 
      id: 31, 
      name: "Минтай без головы мороженый", 
      category: "Другие виды рыбы",
      size: "25+ см", 
      packaging: "25 кг", 
      manufacturer: "", 
      prices: {}
    },
    { 
      id: 32, 
      name: "Минтай без головы мороженый", 
      category: "Другие виды рыбы",
      size: "25+ см", 
      packaging: "25 кг", 
      manufacturer: "", 
      prices: {}
    },
    { 
      id: 33, 
      name: "Тунец обрезь икряная мороженая", 
      category: "Другие виды рыбы",
      size: "10-0,5 м/у", 
      packaging: "0,5 кг", 
      manufacturer: "", 
      prices: {}
    },
    { 
      id: 34, 
      name: "Филе пангасиуса", 
      category: "Другие виды рыбы",
      size: "20-20+ см", 
      packaging: "10 кг", 
      manufacturer: "", 
      prices: {}
    },
    { 
      id: 35, 
      name: "Филе тилапии", 
      category: "Другие виды рыбы",
      size: "20-20+ см", 
      packaging: "10 кг", 
      manufacturer: "", 
      prices: {}
    },
    { 
      id: 36, 
      name: "Филе трески без кожи фасованное", 
      category: "Другие виды рыбы",
      size: "10-150 г", 
      packaging: "5×1 кг", 
      manufacturer: "", 
      prices: {}
    },
    { 
      id: 37, 
      name: "Филе пикши вяленое", 
      category: "Другие виды рыбы",
      size: "10-150 г", 
      packaging: "12 кг", 
      manufacturer: "", 
      prices: {}
    },
    // --- Полуфабрикаты ---
    { 
      id: 38, 
      name: "Котлеты из горбуши", 
      category: "Полуфабрикаты",
      size: "3,15 кг", 
      packaging: "7×0,45 кг", 
      manufacturer: "", 
      prices: {}
    },
    { 
      id: 39, 
      name: "Котлеты из лосося", 
      category: "Полуфабрикаты",
      size: "3,15 кг", 
      packaging: "7×0,45 кг", 
      manufacturer: "", 
      prices: {}
    },
    { 
      id: 40, 
      name: "Котлеты из трески", 
      category: "Полуфабрикаты",
      size: "3,15 кг", 
      packaging: "7×0,45 кг", 
      manufacturer: "", 
      prices: {}
    },
    { 
      id: 41, 
      name: "Палочки с моцареллой", 
      category: "Полуфабрикаты",
      size: "10-100 г", 
      packaging: "10×1 кг", 
      manufacturer: "", 
      prices: {}
    },
    { 
      id: 42, 
      name: "Пельмени морепродукты/лосось", 
      category: "Полуфабрикаты",
      size: "3,15 кг", 
      packaging: "7×0,45 кг", 
      manufacturer: "", 
      prices: {}
    },
    { 
      id: 43, 
      name: "Пельмени с лососем", 
      category: "Полуфабрикаты",
      size: "3,15 кг", 
      packaging: "7×0,45 кг", 
      manufacturer: "", 
      prices: {}
    },
    { 
      id: 44, 
      name: "Пельмени с треской", 
      category: "Полуфабрикаты",
      size: "3,15 кг", 
      packaging: "7×0,45 кг", 
      manufacturer: "", 
      prices: {}
    },
    { 
      id: 45, 
      name: "Пельмени со скумбрией", 
      category: "Полуфабрикаты",
      size: "3,15 кг", 
      packaging: "7×0,45 кг", 
      manufacturer: "", 
      prices: {}
    }
  ];
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedManufacturer, setSelectedManufacturer] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  // Получаем уникальные категории и производителей для фильтрации
  const categories = Array.from(new Set(products.map(product => product.category)));
  const manufacturers = Array.from(new Set(products.map(product => product.manufacturer).filter(Boolean)));
  
  // Фильтруем продукты на основе поисковой строки и выбранных фильтров
  const filteredProducts = products.filter(product => {
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedManufacturer === 'all' || product.manufacturer === selectedManufacturer) &&
      (selectedCategory === 'all' || product.category === selectedCategory)
    );
  });
  
  // Сбросить фильтры
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedManufacturer('all');
    setSelectedCategory('all');
  };

  // Функция для отображения цен
  const renderPrices = (prices: Product["prices"]) => {
    const hasPrices = prices && Object.values(prices).some(price => price !== undefined);
    
    if (!hasPrices) {
      return <div className="text-gray-500 italic">Цены по запросу</div>;
    }

    return (
      <div className="space-y-1">
        {prices.smallWholesale !== undefined && (
          <div className="flex justify-between">
            <span className="text-xs text-gray-500">Мелк. опт:</span>
            <span className="font-medium">{formatPrice(prices.smallWholesale)}</span>
          </div>
        )}
        {prices.mediumWholesale !== undefined && (
          <div className="flex justify-between">
            <span className="text-xs text-gray-500">Сред. опт:</span>
            <span className="font-medium">{formatPrice(prices.mediumWholesale)}</span>
          </div>
        )}
        {prices.largeWholesale !== undefined && (
          <div className="flex justify-between">
            <span className="text-xs text-gray-500">Круп. опт:</span>
            <span className="font-medium">{formatPrice(prices.largeWholesale)}</span>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <Card>
      <CardHeader className="bg-blue-50">
        <CardTitle className="text-2xl font-bold text-center">Каталог Морепродуктов</CardTitle>
        
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
      </CardHeader>
      
      <CardContent className="px-4 py-6">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            Товары не найдены. Пожалуйста, измените параметры поиска.
          </div>
        ) : (
          <>
            {/* Группировка по категориям */}
            {selectedCategory === 'all' ? (
              // Если не выбрана конкретная категория, группируем товары по категориям
              categories.map(category => {
                const categoryProducts = filteredProducts.filter(p => p.category === category);
                if (categoryProducts.length === 0) return null;
                
                return (
                  <div key={category} className="mb-10">
                    <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-gray-200">{category}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {categoryProducts.map((product) => (
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
                              {product.packaging && (
                                <div className="flex justify-between">
                                  <span className="text-gray-500">Упаковка:</span>
                                  <span className="font-medium">{product.packaging}</span>
                                </div>
                              )}
                              {product.catchDate && (
                                <div className="flex justify-between">
                                  <span className="text-gray-500">Вылов:</span>
                                  <span className="font-medium">{product.catchDate}</span>
                                </div>
                              )}
                              {product.manufacturer && (
                                <div className="flex justify-between">
                                  <span className="text-gray-500">Производитель:</span>
                                  <span className="font-medium">{product.manufacturer}</span>
                                </div>
                              )}
                            </div>
                            <div className="mt-4">
                              {renderPrices(product.prices)}
                            </div>
                            <div className="flex justify-end items-center mt-4">
                              <Button size="sm">Заказать</Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })
            ) : (
              // Если выбрана конкретная категория, показываем только товары этой категории
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
                        {product.packaging && (
                          <div className="flex justify-between">
                            <span className="text-gray-500">Упаковка:</span>
                            <span className="font-medium">{product.packaging}</span>
                          </div>
                        )}
                        {product.catchDate && (
                          <div className="flex justify-between">
                            <span className="text-gray-500">Вылов:</span>
                            <span className="font-medium">{product.catchDate}</span>
                          </div>
                        )}
                        {product.manufacturer && (
                          <div className="flex justify-between">
                            <span className="text-gray-500">Производитель:</span>
                            <span className="font-medium">{product.manufacturer}</span>
                          </div>
                        )}
                      </div>
                      <div className="mt-4">
                        {renderPrices(product.prices)}
                      </div>
                      <div className="flex justify-end items-center mt-4">
                        <Button size="sm">Заказать</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            
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

