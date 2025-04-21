
import React, { useState } from "react";
import { products as initialProducts } from "@/data/products";
import { Product } from "@/types/product";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Save, Upload } from "lucide-react";

type EditableProduct = Product & { localImage?: string | ArrayBuffer | null };

const AdminPanel: React.FC = () => {
  const [products, setProducts] = useState<EditableProduct[]>(initialProducts);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<EditableProduct>>({});

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setEditForm((prev) => ({ ...prev, localImage: ev.target?.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    setProducts((prev) =>
      prev.map((prod) =>
        prod.id === editingId
          ? {
              ...prod,
              ...editForm,
              image: editForm.localImage
                ? String(editForm.localImage)
                : editForm.image,
            }
          : prod
      )
    );
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
                      <input
                        type="file"
                        accept="image/*"
                        className="block w-full mt-1"
                        onChange={handleFileChange}
                      />
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
                    <Button variant="default" size="sm" onClick={handleSave}>
                      <Save className="w-4 h-4 mr-1" />Сохранить
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleCancelEdit}>
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
        <b>Внимание:</b> все изменения работают только в памяти браузера, без сохранения на сервере!
      </p>
    </div>
  );
};

export default AdminPanel;
