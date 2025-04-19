
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { getProductsFromStorage, deleteProductsByCategory } from "@/utils/productStorage";
import ProductManager from "./ProductManager";
import ProductCard from "./ProductCard";
import CategoryManager from "./CategoryManager";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ProductForm from "./ProductForm";

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    const loadedProducts = getProductsFromStorage();
    setProducts(loadedProducts);
    // Extract unique categories
    const uniqueCategories = Array.from(new Set(loadedProducts.map(p => p.category)));
    setCategories(uniqueCategories);
  };

  const handleEditSuccess = () => {
    setIsEditDialogOpen(false);
    setEditingProduct(null);
    loadProducts();
  };

  const handleCategoryAdd = (newCategory: string) => {
    setCategories(prev => [...prev, newCategory]);
  };

  const handleCategoryDelete = (categoryToDelete: string) => {
    deleteProductsByCategory(categoryToDelete);
    setCategories(prev => prev.filter(c => c !== categoryToDelete));
    loadProducts();
  };

  // Group products by category
  const productsByCategory = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <section className="py-12" id="catalog">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Наш каталог</h2>
          <ProductManager />
        </div>

        <CategoryManager
          categories={categories}
          onCategoryAdd={handleCategoryAdd}
          onCategoryDelete={handleCategoryDelete}
        />

        <div className="space-y-12">
          {Object.entries(productsByCategory).map(([category, categoryProducts]) => (
            <div key={category} className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800">{category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onEdit={() => {
                      setEditingProduct(product);
                      setIsEditDialogOpen(true);
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Редактировать товар</DialogTitle>
          </DialogHeader>
          <ProductForm
            existingProduct={editingProduct || undefined}
            onSuccess={handleEditSuccess}
          />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProductGrid;
