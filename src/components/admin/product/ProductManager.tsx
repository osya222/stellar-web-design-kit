
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

const ProductManager: React.FC<ProductManagerProps> = ({ onProductAdded }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSuccess = () => {
    setDialogOpen(false);
    onProductAdded();
  };

  return (
    <div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4" /> Add product
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Fill in the product details and click save
            </DialogDescription>
          </DialogHeader>
          <ProductForm onSuccess={handleSuccess} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductManager;
