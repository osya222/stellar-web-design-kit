
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { Category } from "@/data/categories";
import { getProducts } from "@/utils/productStorage";
import { getCategories } from "@/utils/categoryStorage";
import ProductCard from "./ProductCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import ProductForm from "../admin/product/ProductForm";
import { useToast } from "@/hooks/use-toast";

interface ProductGridProps {
  showAdmin?: boolean;
}

const ProductGrid = ({ showAdmin = false }: ProductGridProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();

  // Load products on component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    try {
      setProducts(getProducts());
      setCategories(getCategories());
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить товары",
        variant: "destructive",
      });
    }
  };

  const findCategory = (categoryId: number) => {
    return categories.find(cat => cat.id === categoryId);
  };

  const handleEditSuccess = () => {
    setIsEditDialogOpen(false);
    setEditingProduct(null);
    loadData();
    toast({
      title: "Успех",
      description: "Товар успешно обновлен",
    });
  };

  return (
    <section className="py-8" id="catalog">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Наш каталог</h2>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            Пока нет товаров в каталоге
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                category={findCategory(product.categoryId)}
                onEdit={showAdmin ? () => {
                  setEditingProduct(product);
                  setIsEditDialogOpen(true);
                } : undefined}
              />
            ))}
          </div>
        )}
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Редактировать товар</DialogTitle>
            <DialogDescription>
              Внесите изменения в информацию о товаре
            </DialogDescription>
          </DialogHeader>
          {editingProduct && (
            <ProductForm
              product={editingProduct}
              onSuccess={handleEditSuccess}
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProductGrid;
