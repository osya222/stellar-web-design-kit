
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductForm from "./ProductForm";
import { Plus } from "lucide-react";

const ProductManager = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSuccess = () => {
    setDialogOpen(false);
    // Reload the page to show new products
    window.location.reload();
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
          </DialogHeader>
          <ProductForm onSuccess={handleSuccess} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductManager;
