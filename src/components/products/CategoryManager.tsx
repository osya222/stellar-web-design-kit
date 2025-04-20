
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { getAllCategories, deleteProductsByCategory } from "@/utils/productStorage";

interface CategoryManagerProps {
  onCategoryChanged: () => void;
}

const CategoryManager = ({ onCategoryChanged }: CategoryManagerProps) => {
  const [newCategory, setNewCategory] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>(getAllCategories());
  const { toast } = useToast();

  // Function to refresh categories from storage
  const refreshCategories = () => {
    setCategories(getAllCategories());
    onCategoryChanged();
  };

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      toast({
        title: "Ошибка",
        description: "Название категории не может быть пустым",
        variant: "destructive",
      });
      return;
    }

    if (categories.includes(newCategory.trim())) {
      toast({
        title: "Ошибка",
        description: "Такая категория уже существует",
        variant: "destructive",
      });
      return;
    }

    // Add this category to a product to make it persist
    // We'll create a placeholder product in this category
    const placeholderProduct = {
      id: Date.now(),
      name: `Товар из категории ${newCategory}`,
      price: 0,
      category: newCategory.trim(),
      manufacturer: "Не указан",
      description: "Это временный товар для создания новой категории"
    };
    
    import("@/utils/productStorage").then(({ saveProduct }) => {
      saveProduct(placeholderProduct);
      refreshCategories();
      
      toast({
        title: "Успешно",
        description: "Категория добавлена",
      });
      
      setNewCategory('');
      setIsAddDialogOpen(false);
    });
  };

  const handleDeleteCategory = () => {
    if (!categoryToDelete) return;
    
    deleteProductsByCategory(categoryToDelete);
    refreshCategories();
    
    toast({
      title: "Успешно",
      description: "Категория удалена",
    });
    
    setCategoryToDelete(null);
  };

  return (
    <div className="flex flex-wrap gap-2 items-center mb-4">
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Plus className="h-4 w-4" />
            Добавить категорию
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Новая категория</DialogTitle>
            <DialogDescription>
              Введите название для новой категории продуктов
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              placeholder="Название категории"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <Button onClick={handleAddCategory}>Добавить</Button>
          </div>
        </DialogContent>
      </Dialog>

      {categories.map((category) => (
        <div key={category} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-md">
          <span>{category}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-500 hover:text-red-700"
            onClick={() => setCategoryToDelete(category)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}

      <AlertDialog open={!!categoryToDelete} onOpenChange={() => setCategoryToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить категорию?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие также удалит все товары в данной категории. Это действие необратимо.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteCategory}
              className="bg-red-500 hover:bg-red-600"
            >
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CategoryManager;
