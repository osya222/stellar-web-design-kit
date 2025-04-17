
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import { Product } from '@/types/product';
import { useToast } from "@/hooks/use-toast";
import { saveProductToProject, deleteProductFromStorage, getProductsFromStorage } from '@/utils/productStorage';

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    const storedProducts = getProductsFromStorage();
    setProducts(storedProducts);
  };

  const handleSaveProduct = async (product: Product) => {
    try {
      // Save the product to the project
      await saveProductToProject(product);
      
      // Reload all products to ensure we have the latest data
      loadProducts();
      
      // Clear editing state
      setEditingProduct(null);
      
      toast({
        title: editingProduct ? "Товар обновлен" : "Товар добавлен",
        description: `${product.name} успешно ${editingProduct ? 'обновлен' : 'добавлен'} в каталог`,
      });
    } catch (error) {
      console.error("Error saving product:", error);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: `Не удалось ${editingProduct ? 'обновить' : 'добавить'} товар: ${error instanceof Error ? error.message : String(error)}`,
      });
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };

  const handleDeleteProduct = async (productId: number) => {
    try {
      // Delete the product from storage
      await deleteProductFromStorage(productId);
      
      // Reload products to get the updated list
      loadProducts();
      
      toast({
        title: "Товар удален",
        description: "Товар успешно удален из каталога",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: `Не удалось удалить товар: ${error instanceof Error ? error.message : String(error)}`,
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <Tabs defaultValue="add">
        <TabsList className="mb-6">
          <TabsTrigger value="add">{editingProduct ? 'Редактирование товара' : 'Добавить товар'}</TabsTrigger>
          <TabsTrigger value="list">Список товаров ({products.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="add" className="space-y-6">
          <ProductForm 
            initialProduct={editingProduct || undefined} 
            onSave={handleSaveProduct}
            onCancel={handleCancelEdit}
          />
        </TabsContent>
        
        <TabsContent value="list">
          <ProductList 
            products={products} 
            onEdit={handleEditProduct} 
            onDelete={handleDeleteProduct}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductManagement;
