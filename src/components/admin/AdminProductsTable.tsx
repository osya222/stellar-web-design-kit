
import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import ProductEditForm from "./ProductEditForm";
import { Pencil } from "lucide-react";
import { EditableProduct } from "./types";

interface ProductsTableProps {
  products: EditableProduct[];
  editingId: number | null;
  editForm: Partial<EditableProduct>;
  isUploading: boolean;
  onEditClick: (prod: EditableProduct) => void;
  onCancelEdit: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
}

const AdminProductsTable: React.FC<ProductsTableProps> = ({
  products,
  editingId,
  editForm,
  isUploading,
  onEditClick,
  onCancelEdit,
  onInputChange,
  onFileChange,
  onSave,
}) => (
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
            <ProductEditForm
              editForm={editForm}
              isUploading={isUploading}
              onInputChange={onInputChange}
              onFileChange={onFileChange}
              onSave={onSave}
              onCancel={onCancelEdit}
            />
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
                onClick={() => onEditClick(prod)}
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
);

export default AdminProductsTable;
