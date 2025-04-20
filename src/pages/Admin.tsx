
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductList from '@/components/admin/products/ProductList';
import CategoryList from '@/components/admin/categories/CategoryList';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const { toast } = useToast();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleDataUpdate = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <>
      <Helmet>
        <title>Панель администратора | Управление товарами и категориями</title>
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-4">Панель администратора</h1>
              <p className="text-gray-600">
                Управление товарами и категориями. Все изменения сохраняются в исходном коде проекта.
              </p>
            </div>
            
            <Tabs defaultValue="products" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="products">Товары</TabsTrigger>
                <TabsTrigger value="categories">Категории</TabsTrigger>
              </TabsList>
              
              <TabsContent value="products" className="space-y-6">
                <ProductList onUpdate={handleDataUpdate} />
              </TabsContent>
              
              <TabsContent value="categories" className="space-y-6">
                <CategoryList onUpdate={handleDataUpdate} />
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
