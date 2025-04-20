
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";

interface NavHandlersReturn {
  handleHomeClick: () => void;
  handleCatalogClick: () => void;
  scrollToSection: (sectionId: string) => void;
}

export function useNavHandlers(): NavHandlersReturn {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = React.useCallback((sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.pathname, navigate]);

  const handleHomeClick = React.useCallback(() => {
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, navigate]);

  const handleCatalogClick = React.useCallback(() => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: 'products' } });
    } else {
      const element = document.getElementById("products");
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.pathname, navigate]);

  return { handleHomeClick, handleCatalogClick, scrollToSection };
}
