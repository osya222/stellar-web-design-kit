
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import { Product } from '@/types/product';
import { useToast } from "@/hooks/use-toast";
import { saveProductToProject, getProductsFromStorage } from '@/utils/productStorage';

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const storedProducts = getProductsFromStorage();
    if (storedProducts.length > 0) {
      setProducts(storedProducts);
    }
  }, []);

  const handleSaveProduct = async (product: Product) => {
    try {
      // Generate a new id if this is a new product
      if (!product.id) {
        product.id = Math.max(0, ...products.map(p => p.id)) + 1;
      }
      
      // If we're editing, remove the old version
      const updatedProducts = editingProduct 
        ? products.filter(p => p.id !== editingProduct.id)
        : [...products];
      
      // Add the new/updated product
      updatedProducts.push(product);
      
      // Save the product to the project
      await saveProductToProject(product, updatedProducts);
      
      // Update state
      setProducts(updatedProducts);
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
      const updatedProducts = products.filter(p => p.id !== productId);
      
      // Update the storage
      for (const product of updatedProducts) {
        await saveProductToProject(product, updatedProducts);
      }
      
      setProducts(updatedProducts);
      
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
