
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { Category } from "@/types/category";
import { getProducts, getCategories } from "@/utils/dataService";
import ProductCard from "./ProductCard";
import ProductSearch from "./ProductSearch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ChevronDown } from "lucide-react";
import ProductForm from "../admin/products/ProductForm";
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
    <section className="py-8" id="catalog">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Наш каталог</h2>
          <ProductSearch onSearch={handleSearch} />
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {products.length === 0 ? 'Пока нет товаров в каталоге' : 'Товары не найдены'}
          </div>
        ) : (
          <Accordion type="multiple" className="w-full space-y-4">
            {groupedProducts.map((category) => (
              category.products.length > 0 && (
                <AccordionItem
                  key={category.id}
                  value={category.id.toString()}
                  className="border rounded-lg bg-white shadow-sm"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center justify-between w-full">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {category.name}
                      </h3>
                      <ChevronDown className="h-5 w-5 text-gray-500 transform transition-transform duration-200" />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pt-2 pb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.products.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          category={category}
                        />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            ))}
          </Accordion>
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
