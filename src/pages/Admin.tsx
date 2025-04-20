
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/products/ProductGrid';
import ProductManager from '@/components/products/ProductManager';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Settings } from 'lucide-react';

const Admin = () => {
  const { toast } = useToast();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleProductAdded = () => {
    setRefreshTrigger(prev => prev + 1);
    toast({
      title: "Успех",
      description: "Товар успешно добавлен в каталог",
    });
  };

  const handleInfoClick = () => {
    toast({
      title: "Информация о сохранении",
      description: "Все изменения сохраняются автоматически в исходном коде проекта.",
      duration: 6000,
    });
  };

  return (
    <>
      <Helmet>
        <title>Панель администратора | Управление товарами</title>
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2 text-purple-900">Панель администратора</h1>
                <p className="text-gray-600">
                  Управление каталогом товаров
                </p>
              </div>
              
              <div className="flex gap-4">
                <ProductManager onProductAdded={handleProductAdded} />
                <Button variant="outline" onClick={handleInfoClick}>
                  <Settings className="h-4 w-4 mr-2" />
                  Информация
                </Button>
              </div>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4 mb-6 text-purple-800 text-sm">
              <p>
                <strong>Инструкция:</strong> Для добавления нового товара нажмите кнопку "Добавить товар". 
                Для редактирования существующего товара нажмите на иконку карандаша в его карточке.
              </p>
            </div>
            
            <ProductGrid showAdmin={true} key={refreshTrigger} />
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Admin;
