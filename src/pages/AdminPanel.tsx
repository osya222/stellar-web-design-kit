
import React, { useState } from "react";
import { products as initialProducts } from "@/data/products";
import { Product } from "@/types/product";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Save, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { mockUploadImage } from "@/services/uploadService";

type EditableProduct = Product & { localImage?: string | ArrayBuffer | null };

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
      
      // Вызываем функцию загрузки файла (в данном случае используем мок)
      // В реальном проекте здесь можно использовать uploadImageWithPreview
      const { localUrl, serverUrl } = await mockUploadImage(file);
      
      // Сохраняем данные для предпросмотра и для сохранения
      setEditForm((prev) => ({
        ...prev,
        localImage: localUrl, // Локальное превью
        image: serverUrl,     // Путь для хранения
      }));
      
      toast({
        title: "Файл загружен",
        description: "Изображение успешно загружено на сервер",
      });
      
      console.log(`Фото загружено: ${serverUrl}`);
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
              // Важно: сохраняем image только если он был предоставлен в форме
              image: editForm.image || prod.image,
            }
          : prod
      )
    );
    
    // Уведомляем пользователя
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Фото</TableHead>
              <TableHead>Название</TableHead>
              <TableHead>Категория</TableHead>
              <TableHead>Цена</TableHead>
              <TableHead>Производитель</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((prod) =>
              editingId === prod.id ? (
                <TableRow key={prod.id}>
                  <TableCell>{prod.id}</TableCell>
                  <TableCell>
                    <img
                      src={
                        editForm.localImage
                          ? String(editForm.localImage)
                          : prod.image ||
                            "https://placehold.co/64x64/png"
                      }
                      alt="Фото"
                      className="w-16 h-16 object-cover rounded"
                    />
                    <label className="flex flex-col items-start mt-2">
                      <span className="text-xs text-gray-500">Загрузить фото</span>
                      <div className="relative w-full">
                        <input
                          type="file"
                          accept="image/*"
                          className={`block w-full mt-1 ${isUploading ? "opacity-50" : ""}`}
                          onChange={handleFileChange}
                          disabled={isUploading}
                        />
                        {isUploading && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="w-5 h-5 animate-spin text-primary" />
                          </div>
                        )}
                      </div>
                      {editForm.image && (
                        <span className="block mt-1 text-[10px] text-gray-400 break-all">
                          {editForm.image}
                        </span>
                      )}
                    </label>
                  </TableCell>
                  <TableCell>
                    <input
                      className="border px-2 py-1 rounded w-full"
                      name="name"
                      value={editForm.name || ""}
                      onChange={handleInputChange}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      className="border px-2 py-1 rounded w-full"
                      name="category"
                      value={editForm.category || ""}
                      onChange={handleInputChange}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      className="border px-2 py-1 rounded w-full"
                      name="price"
                      type="number"
                      value={editForm.price || ""}
                      onChange={handleInputChange}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      className="border px-2 py-1 rounded w-full"
                      name="manufacturer"
                      value={editForm.manufacturer || ""}
                      onChange={handleInputChange}
                    />
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Button variant="default" size="sm" onClick={handleSave} disabled={isUploading}>
                      <Save className="w-4 h-4 mr-1" />Сохранить
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleCancelEdit} disabled={isUploading}>
                      Отмена
                    </Button>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow key={prod.id}>
                  <TableCell>{prod.id}</TableCell>
                  <TableCell>
                    <img
                      src={prod.image || "https://placehold.co/64x64/png"}
                      alt="Фото"
                      className="w-16 h-16 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell>{prod.name}</TableCell>
                  <TableCell>{prod.category}</TableCell>
                  <TableCell>{prod.price || "-"}</TableCell>
                  <TableCell>{prod.manufacturer}</TableCell>
                  <TableCell>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleEditClick(prod)}
                    >
                      <Pencil className="w-4 h-4 mr-1" />
                      Редактировать
                    </Button>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
      <p className="mt-6 text-xs text-muted-foreground">
        <b>Демо-режим:</b> В этой версии изображения загружаются в память и имитируется отправка на сервер. <br/>
        Для полноценной работы необходимо подключить реальный API загрузки через <code>uploadService.ts</code>.
      </p>
    </div>
  );
};

export default AdminPanel;
