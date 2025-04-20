
import React, { useState } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getImageUrl } from "@/routes";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "./types";

interface ImageUploadFieldProps {
  form: UseFormReturn<ProductFormValues>;
  onFileSelect: (file: File) => void;
  imagePreview: string | null;
  uploadingImage: boolean;
}

export const ImageUploadField = ({
  form,
  onFileSelect,
  imagePreview,
  uploadingImage,
}: ImageUploadFieldProps) => {
  const { toast } = useToast();

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // Передаём файл родительскому компоненту для последующей загрузки
      onFileSelect(file);
      
      // Создаём локальный URL для предпросмотра изображения
      const localPreviewUrl = URL.createObjectURL(file);
      
      toast({
        title: "Предпросмотр",
        description: "Изображение готово к загрузке",
      });
      
      console.log("Подготовлено локальное изображение:", localPreviewUrl);
    } catch (error) {
      console.error("Ошибка обработки изображения:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось обработать изображение",
        variant: "destructive",
      });
    }
  };

  return (
    <FormField
      control={form.control}
      name="image"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Изображение</FormLabel>
          <div className="flex items-center gap-4">
            {imagePreview && (
              <div className="relative w-20 h-20 border rounded-md overflow-hidden">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error(`Ошибка загрузки изображения: ${imagePreview}`);
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
                />
              </div>
            )}
            <FormControl>
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-purple-600 text-white hover:bg-purple-700 h-10 px-4 py-2"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {uploadingImage ? "Загрузка..." : "Загрузить изображение"}
                </label>
                <Input type="hidden" {...field} />
              </div>
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
