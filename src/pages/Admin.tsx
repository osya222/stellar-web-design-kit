
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductList from '@/components/admin/product/ProductList';
import CategoryList from '@/components/admin/CategoryList';
import ProductManager from '@/components/admin/product/ProductManager';
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
      title: "Information about saving",
      description: "All changes are saved automatically to the project source code.",
      duration: 6000,
    });
  };

  return (
    <>
      <Helmet>
        <title>Admin Panel | Manage Products and Categories</title>
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2 text-purple-900">Admin Panel</h1>
                <p className="text-gray-600">
                  Manage products and categories
                </p>
              </div>
              
              <Button variant="outline" onClick={handleInfoClick}>
                <Settings className="h-4 w-4 mr-2" />
                Information
              </Button>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4 mb-6 text-purple-800 text-sm">
              <p>
                <strong>Instructions:</strong> Use the tabs below to manage products and categories. 
                All changes are saved automatically to the source code.
              </p>
            </div>
            
            <Tabs defaultValue="products" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="categories">Categories</TabsTrigger>
              </TabsList>
              
              <TabsContent value="products" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
                  <ProductManager onProductAdded={handleProductUpdated} />
                </div>
                
                <ProductList onProductUpdated={handleProductUpdated} />
              </TabsContent>
              
              <TabsContent value="categories" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Category Management</h2>
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
