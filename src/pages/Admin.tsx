
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductManagement from '@/components/admin/ProductManagement';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Admin: React.FC = () => {
  const navigate = useNavigate();
  
  const handleReturnToHome = () => {
    // Clear any image URL caches before returning to home
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('image_url_cache_')) {
        localStorage.removeItem(key);
      }
    }
    
    // Force reload if returning to home to ensure all product changes are visible
    window.location.href = '/';
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow px-4 py-8 max-w-7xl mx-auto w-full">
        <div className="mb-6 flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mr-2"
            onClick={handleReturnToHome}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Вернуться на главную
          </Button>
        </div>
        
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Панель администратора</h1>
        
        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-800">Управление товарами</AlertTitle>
          <AlertDescription className="text-blue-700">
            Добавляйте новые товары и редактируйте существующие. Изображения будут сохранены в проекте 
            и доступны после публикации. Ограничение размера изображений: 5MB. 
            Для связи используйте email: riba@рыба.shop
          </AlertDescription>
        </Alert>
        
        <ProductManagement />
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
