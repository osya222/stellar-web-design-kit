
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product } from '@/types/product';
import { Edit, Trash2, Search, Eye } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { getUploadedImageUrl } from '@/routes';
import { Card, CardContent } from '@/components/ui/card';

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get image URL for a product
  const getProductImageUrl = (product: Product) => {
    if (!product.image) return '';
    return getUploadedImageUrl(product.image) || product.image;
  };

  // Handle delete button click
  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
  };

  // Handle confirm delete
  const handleConfirmDelete = () => {
    if (productToDelete) {
      onDelete(productToDelete.id);
      setProductToDelete(null);
    }
  };

  // Handle view product details
  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <Search className="h-5 w-5 text-gray-400" />
          <Input 
            placeholder="Поиск товаров..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
        </div>
        {filteredProducts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Товары не найдены</p>
          </div>
        )}
      </div>

      {filteredProducts.length > 0 && (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">ID</TableHead>
                <TableHead>Название</TableHead>
                <TableHead>Категория</TableHead>
                <TableHead>Производитель</TableHead>
                <TableHead>Цена</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {product.image && (
                        <div className="h-8 w-8 rounded overflow-hidden flex-shrink-0">
                          <img 
                            src={getProductImageUrl(product)} 
                            alt={product.name} 
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/placeholder.svg';
                            }}
                          />
                        </div>
                      )}
                      <span className="truncate max-w-[200px]">
                        {product.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.manufacturer}</TableCell>
                  <TableCell>{product.price ? `${product.price.toFixed(2)} ₽` : '-'}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleViewProduct(product)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => onEdit(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteClick(product)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Delete confirmation dialog */}
      <AlertDialog 
        open={productToDelete !== null} 
        onOpenChange={(open) => !open && setProductToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удаление товара</AlertDialogTitle>
            <AlertDialogDescription>
              Вы уверены, что хотите удалить товар "{productToDelete?.name}"? Это действие нельзя отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-red-500 hover:bg-red-600">
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Product details dialog */}
      <AlertDialog 
        open={selectedProduct !== null} 
        onOpenChange={(open) => !open && setSelectedProduct(null)}
      >
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Детали товара</AlertDialogTitle>
          </AlertDialogHeader>
          
          {selectedProduct && (
            <Card>
              <CardContent className="p-0">
                {selectedProduct.image && (
                  <div className="w-full h-48 overflow-hidden">
                    <img 
                      src={getProductImageUrl(selectedProduct)} 
                      alt={selectedProduct.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                  </div>
                )}
                
                <div className="p-4 space-y-3">
                  <h3 className="font-bold text-lg">{selectedProduct.name}</h3>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-500">Категория:</div>
                    <div>{selectedProduct.category}</div>
                    
                    <div className="text-gray-500">Производитель:</div>
                    <div>{selectedProduct.manufacturer}</div>
                    
                    {selectedProduct.price !== undefined && (
                      <>
                        <div className="text-gray-500">Цена:</div>
                        <div className="font-semibold">{selectedProduct.price.toFixed(2)} ₽</div>
                      </>
                    )}
                    
                    {selectedProduct.size && (
                      <>
                        <div className="text-gray-500">Размер:</div>
                        <div>{selectedProduct.size}</div>
                      </>
                    )}
                    
                    {selectedProduct.packaging && (
                      <>
                        <div className="text-gray-500">Упаковка:</div>
                        <div>{selectedProduct.packaging}</div>
                      </>
                    )}
                    
                    {selectedProduct.catchDate && (
                      <>
                        <div className="text-gray-500">Дата вылова:</div>
                        <div>{selectedProduct.catchDate}</div>
                      </>
                    )}
                    
                    {selectedProduct.weight && (
                      <>
                        <div className="text-gray-500">Вес:</div>
                        <div>{selectedProduct.weight}</div>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          <AlertDialogFooter>
            <AlertDialogCancel>Закрыть</AlertDialogCancel>
            <Button onClick={() => {
              if (selectedProduct) {
                onEdit(selectedProduct);
                setSelectedProduct(null);
              }
            }}>
              Редактировать
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProductList;
