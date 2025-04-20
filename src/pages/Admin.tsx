
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';
import {
  Plus,
  Search,
  Package,
  Edit,
  Trash2
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  fetchProducts,
  fetchCategories,
  fetchManufacturers,
  deleteProduct
} from '@/utils/dataService';
import { useToast } from '@/hooks/use-toast';
import { ProductEditor } from '@/components/admin/ProductEditor';
import { ProductList } from '@/components/admin/ProductList';
import type { Product } from '@/types/product';
import { Switch } from '@/components/ui/switch';

const Admin = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('products');
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [uploadActive, setUploadActive] = useState(true);

  // Load uploadActive state from localStorage on component mount
  useEffect(() => {
    try {
      const savedUploadState = localStorage.getItem('uploadActiveState');
      if (savedUploadState !== null) {
        setUploadActive(JSON.parse(savedUploadState));
      }
    } catch (error) {
      console.error('Error loading upload state:', error);
    }
  }, []);

  // Save uploadActive state to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem('uploadActiveState', JSON.stringify(uploadActive));
    } catch (error) {
      console.error('Error saving upload state:', error);
    }
  }, [uploadActive]);

  // Fetch products
  const {
    data: products = [],
    isLoading: productsLoading,
    refetch: refetchProducts
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });

  // Fetch categories
  const {
    data: categories = [],
    isLoading: categoriesLoading
  } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });

  // Fetch manufacturers
  const {
    data: manufacturers = [],
    isLoading: manufacturersLoading
  } = useQuery({
    queryKey: ['manufacturers'],
    queryFn: fetchManufacturers
  });

  // Filtered products based on search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setIsEditing(true);
  };

  const handleDelete = async (productId: string) => {
    if (confirm('Вы уверены, что хотите удалить этот продукт?')) {
      try {
        await deleteProduct(productId);
        toast({
          title: "Успешно",
          description: "Продукт был удален",
        });
        refetchProducts();
      } catch (error) {
        toast({
          title: "Ошибка",
          description: "Не удалось удалить продукт",
          variant: "destructive"
        });
      }
    }
  };

  const handleSaveComplete = () => {
    setIsEditing(false);
    refetchProducts();
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentProduct(null);
  };

  const handleToggleUpload = (checked: boolean) => {
    setUploadActive(checked);
    toast({
      title: checked ? "Загрузка изображений включена" : "Загрузка изображений отключена",
      description: checked 
        ? "Теперь вы можете загружать изображения продуктов (макс. 200KB)" 
        : "Загрузка изображений продуктов отключена",
    });
  };

  if (isEditing) {
    return (
      <>
        <Helmet>
          <title>{currentProduct ? 'Редактирование' : 'Добавление'} продукта | МореПродукт</title>
        </Helmet>

        <Header />
        <main className="min-h-screen bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <ProductEditor
              product={currentProduct}
              categories={categories}
              manufacturers={manufacturers}
              onSaveComplete={handleSaveComplete}
              onCancel={handleCancel}
              uploadActive={uploadActive}
            />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Администрирование | МореПродукт</title>
      </Helmet>

      <Header />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">
                <h1 className="text-2xl font-bold">Панель администратора</h1>
                <div className="flex items-center gap-4 mt-2 md:mt-0">
                  <Switch
                    checked={uploadActive}
                    onCheckedChange={handleToggleUpload}
                    id="toggle-image-upload"
                  />
                  <label 
                    htmlFor="toggle-image-upload" 
                    className="select-none cursor-pointer"
                  >
                    Включить загрузку изображений
                  </label>
                </div>
              </div>

              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    className="pl-10"
                    placeholder="Поиск продуктов..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <Tabs defaultValue="products" onValueChange={setSelectedTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="products">
                    <Package className="h-4 w-4 mr-2" />
                    Продукты
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="products">
                  <div className="flex justify-end mb-4">
                    <Button onClick={() => setIsEditing(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Добавить продукт
                    </Button>
                  </div>
                  <ProductList
                    products={filteredProducts}
                    isLoading={productsLoading}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Admin;
