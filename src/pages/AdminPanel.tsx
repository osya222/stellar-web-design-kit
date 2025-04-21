
import React, { useState } from "react";
import { products as initialProducts } from "@/data/products";
import { useToast } from "@/hooks/use-toast";
import { uploadImageWithPreview } from "@/services/uploadService";
import AdminProductsTable from "@/components/admin/AdminProductsTable";
import { EditableProduct } from "@/components/admin/types";

const AdminPanel: React.FC = () => {
  const [products, setProducts] = useState<EditableProduct[]>(initialProducts);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<EditableProduct>>({});
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleEditClick = (product: EditableProduct) => {
    setEditingId(product.id);
    setEditForm({ ...product });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const { localUrl, serverUrl } = await uploadImageWithPreview(file);
      setEditForm((prev) => ({
        ...prev,
        localImage: localUrl,
        image: serverUrl,
      }));
      toast({
        title: "Файл загружен",
        description: "Изображение успешно загружено на сервер",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: error instanceof Error ? error.message : "Не удалось загрузить изображение",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = () => {
    if (!editForm.name || !editForm.category) {
      toast({
        title: "Ошибка",
        description: "Название и категория обязательны",
        variant: "destructive"
      });
      return;
    }
    setProducts((prev) =>
      prev.map((prod) =>
        prod.id === editingId
          ? {
              ...prod,
              ...editForm,
              image: editForm.image || prod.image,
            }
          : prod
      )
    );
    toast({
      title: "Сохранено",
      description: "Товар успешно обновлен",
    });
    setEditingId(null);
    setEditForm({});
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Админ-панель: Управление товарами</h1>
      <div className="overflow-x-auto">
        <AdminProductsTable
          products={products}
          editingId={editingId}
          editForm={editForm}
          isUploading={isUploading}
          onEditClick={handleEditClick}
          onCancelEdit={handleCancelEdit}
          onInputChange={handleInputChange}
          onFileChange={handleFileChange}
          onSave={handleSave}
        />
      </div>
      <p className="mt-6 text-xs text-muted-foreground">
        <b>Демо-режим:</b> В этой версии изображения загружаются на сервер через API.<br/>
        Теперь картинки обновляются автоматически после загрузки. <br/>
        Для полноценной интеграции проверьте переменную <code>VITE_API_URL</code> в настройках окружения.
      </p>
    </div>
  );
};

export default AdminPanel;
