
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { getProducts, getAllCategories } from "@/utils/productStorage";
import ProductCard from "./ProductCard";
import CategoryManager from "./CategoryManager";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import ProductForm from "./ProductForm";

interface ProductGridProps {
  showAdmin?: boolean;
}

const ProductGrid = ({ showAdmin = false }: ProductGridProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);

  // Load products and categories on component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const loadedProducts = getProducts();
    setProducts(loadedProducts);
    
    const uniqueCategories = getAllCategories();
    setCategories(uniqueCategories);
  };

  const handleEditSuccess = () => {
    setIsEditDialogOpen(false);
    setEditingProduct(null);
    loadData();
  };

  const handleCategoryChanged = () => {
    loadData();
  };

  // Group products by category
  const productsByCategory = products.reduce((acc, product) => {
    const category = product.category || "Без категории";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <section className="py-12" id="catalog">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Наш каталог</h2>
        </div>

        {showAdmin && (
          <CategoryManager onCategoryChanged={handleCategoryChanged} />
        )}

        <div className="space-y-12">
          {categories.map((category) => {
            // Only show categories that have products
            const categoryProducts = productsByCategory[category] || [];
            if (categoryProducts.length === 0 && !showAdmin) return null;

            return (
              <div key={category} className="space-y-4">
                <h3 className="text-2xl font-semibold text-gray-800">{category}</h3>
                {categoryProducts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onEdit={showAdmin ? () => {
                          setEditingProduct(product);
                          setIsEditDialogOpen(true);
                        } : undefined}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">В данной категории пока нет товаров</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Редактировать товар</DialogTitle>
            <DialogDescription>
              Внесите изменения в информацию о товаре
            </DialogDescription>
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
