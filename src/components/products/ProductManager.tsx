
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductForm from "./ProductForm";
import { Plus } from "lucide-react";

interface ProductManagerProps {
  onProductAdded: () => void;
}

const ProductManager = ({ onProductAdded }: ProductManagerProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSuccess = () => {
    setDialogOpen(false);
    // Call the callback to refresh products
    onProductAdded();
  };

  return (
    <div className="py-4">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Добавить товар
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Добавить новый товар</DialogTitle>
            <DialogDescription>
              Заполните информацию о новом товаре
            </DialogDescription>
          </DialogHeader>
          <ProductForm onSuccess={handleSuccess} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductManager;
