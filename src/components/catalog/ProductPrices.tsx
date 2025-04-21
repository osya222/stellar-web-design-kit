
import React from 'react';
import { formatPrice } from '@/lib/formatters';
import { Product } from '@/types/product';

interface ProductPricesProps {
  price?: number;
}

const ProductPrices: React.FC<ProductPricesProps> = ({ price }) => {
  if (price === undefined) {
    return <div className="text-gray-500 italic">Цена по запросу</div>;
  }

  return (
    <div className="space-y-1">
      <div className="flex justify-between">
        <span className="text-xs text-gray-500">Розничная цена:</span>
        <span className="font-medium">{formatPrice(price)}</span>
      </div>
    </div>
  );
};

export default ProductPrices;
