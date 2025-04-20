
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
import CategoryForm from "./CategoryForm";
import { Plus } from "lucide-react";

interface CategoryManagerProps {
  onCategoryAdded: () => void;
}

const CategoryManager = ({ onCategoryAdded }: CategoryManagerProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSuccess = () => {
    setDialogOpen(false);
    // Call the callback to refresh categories
    onCategoryAdded();
  };

  return (
    <div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4" /> Добавить категорию
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Добавить новую категорию</DialogTitle>
            <DialogDescription>
              Заполните информацию о новой категории
            </DialogDescription>
          </DialogHeader>
          <CategoryForm onSuccess={handleSuccess} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoryManager;
