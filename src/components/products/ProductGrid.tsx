
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product";
import { getProductsFromStorage } from "@/utils/productStorage";
import ProductManager from "./ProductManager";

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Load products from storage
    const loadedProducts = getProductsFromStorage();
    setProducts(loadedProducts);
  }, []);

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
        <div className="space-y-12">
          {Object.entries(productsByCategory).map(([category, categoryProducts]) => (
            <div key={category} className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800">{category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
