
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const CartHeader = () => {
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  
  const handleCatalogClick = () => {
    navigate('/', { state: { scrollTo: 'products' } });
  };

  return (
    <header className="bg-blue-900 text-white">
      <div className="container mx-auto py-6 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-bold">МореПродукт</h1>
          <nav>
            <ul className="flex gap-6">
              <li><Link to="/" className="hover:underline">Главная</Link></li>
              <li><button onClick={handleCatalogClick} className="hover:underline bg-transparent text-white border-0 p-0 cursor-pointer">Каталог</button></li>
              <li><Link to="/" className="hover:underline">О нас</Link></li>
              <li><Link to="/" className="hover:underline">Контакты</Link></li>
              <li><Link to="/cart" className="hover:underline font-bold">Корзина ({getTotalItems()})</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default CartHeader;
