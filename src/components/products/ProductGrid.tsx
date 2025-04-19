
import { products } from "@/data/products";
import ProductCard from "./ProductCard";

const ProductGrid = () => {
  // Group products by category
  const productsByCategory = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, typeof products>);

  return (
    <section className="py-12" id="catalog">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Наш каталог</h2>
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
