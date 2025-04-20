import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { Category } from "@/types/category";
import { getProducts, getCategories, saveCategory } from "@/utils/dataService";
import ProductCard from "./ProductCard";
import ProductSearch from "./ProductSearch";
import ImageUpload from "@/components/shared/ImageUpload";
import ProductForm from "@/components/admin/products/ProductForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProductGridProps {
  showAdmin?: boolean;
}

const ProductGrid = ({ showAdmin = false }: ProductGridProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

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

  const handleSearch = (query: string) => {
    const normalizedQuery = query.toLowerCase().trim();
    if (!normalizedQuery) {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.description?.toLowerCase().includes(normalizedQuery)
    );
    setFilteredProducts(filtered);
  };

  const handleCategoryImageUploaded = (categoryId: number) => async (imagePath: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (category) {
      const updatedCategory = { ...category, image: imagePath };
      saveCategory(updatedCategory);
      const updatedCategories = categories.map(c => 
        c.id === categoryId ? updatedCategory : c
      );
      setCategories(updatedCategories);
    }
  };

  const groupProductsByCategory = () => {
    return categories.map(category => ({
      ...category,
      products: filteredProducts.filter(product => product.categoryId === category.id)
    }));
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

  const groupedProducts = groupProductsByCategory();

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Наш каталог</h2>
          <div className="max-w-md w-full mb-6">
            <ProductSearch onSearch={handleSearch} />
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {products.length === 0 ? 'Пока нет товаров в каталоге' : 'Товары не найдены'}
          </div>
        ) : (
          <div className="space-y-8">
            {groupedProducts.map((category) => (
              category.products.length > 0 && (
                <div key={category.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-blue-100">
                  <div className="px-6 py-4 bg-blue-50">
                    <div className="flex items-center gap-5">
                      <div className="relative w-16 h-16">
                        <ImageUpload
                          onImageUploaded={handleCategoryImageUploaded(category.id)}
                          currentImage={category.image}
                          className="w-full h-full"
                          size="sm"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-blue-800">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6 bg-gradient-to-b from-blue-50/50 to-white">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {category.products.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          category={category}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )
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
              categories={categories}
              onSuccess={handleEditSuccess}
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProductGrid;
