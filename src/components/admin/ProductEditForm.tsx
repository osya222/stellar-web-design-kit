
import React from "react";
import { Button } from "@/components/ui/button";
import ImageUploader from "./ImageUploader";
import { Save, X } from "lucide-react";
import { EditableProduct } from "./types";

interface ProductEditFormProps {
  editForm: Partial<EditableProduct>;
  isUploading: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onCancel: () => void;
}

const ProductEditForm: React.FC<ProductEditFormProps> = ({
  editForm,
  isUploading,
  onInputChange,
  onFileChange,
  onSave,
  onCancel,
}) => (
  <>
    <td>{editForm.id}</td>
    <td>
      <ImageUploader
        imageUrl={
          editForm.localImage
            ? String(editForm.localImage)
            : (editForm.image as string) || undefined
        }
        imageAlt="Фото"
        serverPath={editForm.image as string}
        isUploading={isUploading}
        onFileChange={onFileChange}
      />
    </td>
    <td>
      <input
        className="border px-2 py-1 rounded w-full"
        name="name"
        value={editForm.name || ""}
        onChange={onInputChange}
      />
    </td>
    <td>
      <input
        className="border px-2 py-1 rounded w-full"
        name="category"
        value={editForm.category || ""}
        onChange={onInputChange}
      />
    </td>
    <td>
      <input
        className="border px-2 py-1 rounded w-full"
        name="price"
        type="number"
        value={editForm.price || ""}
        onChange={onInputChange}
      />
    </td>
    <td>
      <input
        className="border px-2 py-1 rounded w-full"
        name="manufacturer"
        value={editForm.manufacturer || ""}
        onChange={onInputChange}
      />
    </td>
    <td className="space-x-2">
      <Button variant="default" size="sm" onClick={onSave} disabled={isUploading}>
        <Save className="w-4 h-4 mr-1" /> Сохранить
      </Button>
      <Button variant="outline" size="sm" onClick={onCancel} disabled={isUploading}>
        <X className="w-4 h-4 mr-1" />
        Отмена
      </Button>
    </td>
  </>
);
export default ProductEditForm;
