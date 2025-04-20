
import React, { useState, useEffect } from 'react';
import { Category } from '@/data/categories';
import { getCategories, deleteCategory } from '@/utils/categoryStorage';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
import CategoryForm from './CategoryForm';
import { useToast } from '@/hooks/use-toast';

interface CategoryListProps {
  onCategoryUpdated: () => void;
}

const CategoryList = ({ onCategoryUpdated }: CategoryListProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deletingCategoryId, setDeletingCategoryId] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  
  const { toast } = useToast();

  const loadData = () => {
    setCategories(getCategories());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (categoryId: number) => {
    setDeletingCategoryId(categoryId);
    setDeleteError(null);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deletingCategoryId) {
      const success = deleteCategory(deletingCategoryId);
      
      if (success) {
        setIsDeleteDialogOpen(false);
        loadData();
        onCategoryUpdated();
        toast({
          title: "Успех",
          description: "Категория успешно удалена",
        });
      } else {
        setDeleteError("Эта категория используется в товарах и не может быть удалена");
        toast({
          title: "Ошибка",
          description: "Категория используется в товарах и не может быть удалена",
          variant: "destructive",
        });
      }
    }
  };

  const handleEditSuccess = () => {
    setIsEditDialogOpen(false);
    loadData();
    onCategoryUpdated();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Список категорий</h2>
      
      {categories.length === 0 ? (
        <div className="bg-muted/30 p-8 text-center rounded-lg">
          <p className="text-muted-foreground">Нет категорий</p>
        </div>
      ) : (
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>Название</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.id}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell><code className="bg-muted px-1 py-0.5 rounded text-sm">{category.slug}</code></TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(category)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(category.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Редактировать категорию</DialogTitle>
            <DialogDescription>
              Внесите изменения в данные категории и нажмите "Сохранить"
            </DialogDescription>
          </DialogHeader>
          {editingCategory && (
            <CategoryForm 
              existingCategory={editingCategory} 
              onSuccess={handleEditSuccess} 
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Категория будет навсегда удалена.
              {deleteError && (
                <p className="text-destructive mt-2">{deleteError}</p>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CategoryList;
