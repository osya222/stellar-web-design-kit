
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { getProducts } from "@/utils/productStorage";
import ProductCard from "./ProductCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import ProductForm from "./ProductForm";
import { useToast } from "@/hooks/use-toast";

interface ProductGridProps {
  showAdmin?: boolean;
}

const ProductGrid = ({ showAdmin = false }: ProductGridProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();

  // Load products on component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    try {
      const loadedProducts = getProducts();
      setProducts(loadedProducts);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить товары",
        variant: "destructive",
      });
    }
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
