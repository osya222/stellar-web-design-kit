
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const CartHeader = () => {
  const { getTotalItems } = useCart();

  return (
    <header className="bg-blue-900 text-white">
      <div className="container mx-auto py-6 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-bold">МореПродукт</h1>
          <nav>
            <ul className="flex gap-6">
              <li><Link to="/" className="hover:underline">Главная</Link></li>
              <li><Link to="/" className="hover:underline">Каталог</Link></li>
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
