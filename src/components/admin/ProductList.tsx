import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { formatPrice } from '@/lib/formatters';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from '@/components/ui/skeleton';
import { getProductImage } from '@/utils/dataService';
import type { Product } from '@/types/product';

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  isLoading,
  onEdit,
  onDelete,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Продукты не найдены</p>
      </div>
    );
  }

  const getProductImageSrc = (product: Product): string => {
    const cachedImage = getProductImage(product.id);
    if (cachedImage) {
      return cachedImage;
    }
    return product.imageUrl || '/placeholder.svg';
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>Название</TableHead>
            <TableHead>Категория</TableHead>
            <TableHead>Производитель</TableHead>
            <TableHead>Цена</TableHead>
            <TableHead>Наличие</TableHead>
            <TableHead className="text-right">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.manufacturer}</TableCell>
              <TableCell>
                {product.price === 0 ? "По запросу" : formatPrice(product.price)}
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded text-sm ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {product.inStock ? 'В наличии' : 'Нет в наличии'}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="icon" onClick={() => onEdit(product)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => onDelete(product.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
