
import React, { useState } from "react";
import HeaderMain from "./HeaderMain";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-4 md:py-6 sticky top-0 z-50 shadow-md">
      <div className="container-custom">
        <HeaderMain isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </div>
    </header>
  );
};

export default Header;
