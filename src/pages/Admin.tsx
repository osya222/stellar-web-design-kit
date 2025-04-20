
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductList from '@/components/admin/ProductList';
import CategoryList from '@/components/admin/CategoryList';
import ProductManager from '@/components/admin/ProductManager';
import CategoryManager from '@/components/admin/CategoryManager';
import { useToast } from '@/hooks/use-toast';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Admin = () => {
  const { toast } = useToast();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleProductUpdated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleCategoryUpdated = () => {
    setRefreshTrigger(prev => prev + 1);
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
        <title>Панель администратора | Управление товарами и категориями</title>
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2 text-purple-900">Панель администратора</h1>
                <p className="text-gray-600">
                  Управление каталогом товаров и категориями
                </p>
              </div>
              
              <Button variant="outline" onClick={handleInfoClick}>
                <Settings className="h-4 w-4 mr-2" />
                Информация
              </Button>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4 mb-6 text-purple-800 text-sm">
              <p>
                <strong>Инструкция:</strong> Используйте вкладки ниже для управления товарами и категориями. 
                Все изменения сохраняются автоматически.
              </p>
            </div>
            
            <Tabs defaultValue="products" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="products">Товары</TabsTrigger>
                <TabsTrigger value="categories">Категории</TabsTrigger>
              </TabsList>
              
              <TabsContent value="products" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Управление товарами</h2>
                  <ProductManager onProductAdded={handleProductUpdated} />
                </div>
                
                <ProductList onProductUpdated={handleProductUpdated} />
              </TabsContent>
              
              <TabsContent value="categories" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Управление категориями</h2>
                  <CategoryManager onCategoryAdded={handleCategoryUpdated} />
                </div>
                
                <CategoryList onCategoryUpdated={handleCategoryUpdated} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Admin;
