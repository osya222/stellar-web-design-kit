
import React from 'react';
import { formatPrice } from '@/lib/formatters';
import { Product } from '@/types/product';

interface ProductPricesProps {
  prices: Product['prices'];
}

const ProductPrices: React.FC<ProductPricesProps> = ({ prices }) => {
  const hasPrices = prices && Object.values(prices).some(price => price !== undefined);
  
  if (!hasPrices) {
    return <div className="text-gray-500 italic">Цены по запросу</div>;
  }

  return (
    <div className="space-y-1">
      {prices.smallWholesale !== undefined && (
        <div className="flex justify-between">
          <span className="text-xs text-gray-500">Мелк. опт:</span>
          <span className="font-medium">{formatPrice(prices.smallWholesale)}</span>
        </div>
      )}
      {prices.mediumWholesale !== undefined && (
        <div className="flex justify-between">
          <span className="text-xs text-gray-500">Сред. опт:</span>
          <span className="font-medium">{formatPrice(prices.mediumWholesale)}</span>
        </div>
      )}
      {prices.largeWholesale !== undefined && (
        <div className="flex justify-between">
          <span className="text-xs text-gray-500">Круп. опт:</span>
          <span className="font-medium">{formatPrice(prices.largeWholesale)}</span>
        </div>
      )}
    </div>
  );
};

export default ProductPrices;
