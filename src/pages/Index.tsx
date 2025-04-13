
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import ProductCatalog from "@/components/ProductCatalog";
import { useCart } from "@/context/CartContext";
import ProductShowcase from "@/components/catalog/ProductShowcase";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Contacts from "@/components/home/Contacts";

const Index = () => {
  const location = useLocation();
  const firstRender = useRef(true);

  useEffect(() => {
    // Check if there's a section to scroll to
    if (location.state && location.state.scrollTo) {
      const sectionId = location.state.scrollTo;
      const element = document.getElementById(sectionId);
      
      if (element) {
        // Small delay to ensure DOM is fully loaded
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
      
      // Clear the state to prevent scrolling on page refresh
      window.history.replaceState({}, document.title);
    }
    
    // For hash in URL (e.g. /#about)
    if (firstRender.current && location.hash) {
      const id = location.hash.substring(1); // Remove the # character
      const element = document.getElementById(id);
      
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
      
      firstRender.current = false;
    }
  }, [location]);

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
