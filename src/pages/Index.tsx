
import ProductCatalog from "@/components/ProductCatalog";
import { useCart } from "@/context/CartContext";
import ProductShowcase from "@/components/catalog/ProductShowcase";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Contacts from "@/components/home/Contacts";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Hero section */}
      <Hero />
      
      {/* Product Showcase */}
      <ProductShowcase />
      
      {/* Product catalog section */}
      <section className="section-padding bg-white" id="catalog">
        <div className="container-custom">
          <ProductCatalog />
        </div>
      </section>

      {/* About Us Section */}
      <About />

      {/* Contacts section */}
      <Contacts />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
