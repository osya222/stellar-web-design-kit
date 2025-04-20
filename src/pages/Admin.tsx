
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/products/ProductGrid';
import ProductManager from '@/components/products/ProductManager';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { hasDataBeenModified } from '@/utils/productStorage';

const Admin = () => {
  const { toast } = useToast();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleProductAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleNotifyToSave = () => {
    if (hasDataBeenModified()) {
      toast({
        title: "Изменения внесены",
        description: "Обратите внимание, что эти изменения хранятся только в памяти браузера. Чтобы сохранить их навсегда, внесите изменения в исходный код проекта.",
        duration: 6000,
      });
    } else {
      toast({
        title: "Нет изменений",
        description: "Вы пока не внесли никаких изменений",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Панель администратора | Управление товарами</title>
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Панель администратора</h1>
              <p className="text-gray-600">
                Управление товарами и категориями
              </p>
            </div>
            
            <div className="flex gap-4">
              <ProductManager onProductAdded={handleProductAdded} />
              <Button variant="outline" onClick={handleNotifyToSave}>
                О сохранении данных
              </Button>
            </div>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Управление товарами</h2>
            <p className="text-gray-600 mb-6">
              Здесь вы можете добавлять, редактировать и удалять товары. 
              Для редактирования товара нажмите на иконку карандаша в его карточке.
            </p>
            
            <ProductGrid showAdmin={true} key={refreshTrigger} />
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Admin;
