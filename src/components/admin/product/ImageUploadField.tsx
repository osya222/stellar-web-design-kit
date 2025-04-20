
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "./productSchema";
import { Button } from "@/components/ui/button";

interface ImageUploadFieldProps {
  form: UseFormReturn<ProductFormValues>;
  onFileSelect: (file: File) => Promise<void>;
  imagePreview: string | null;
  isUploading: boolean;
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  form,
  onFileSelect,
  imagePreview,
  isUploading,
}) => {
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await onFileSelect(file);
    }
  };

  return (
    <FormField
      control={form.control}
      name="image"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Изображение</FormLabel>
          <div className="flex items-start gap-4">
            {imagePreview && (
              <div className="relative w-24 h-24 border rounded-md overflow-hidden bg-gray-50">
                <img 
                  src={imagePreview} 
                  alt="Предпросмотр" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error(`Error loading image: ${imagePreview}`);
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
                />
              </div>
            )}
            <div className="flex-1">
              <FormControl>
                <div className="flex flex-col gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="image-upload"
                    disabled={isUploading}
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-purple-600 text-white hover:bg-purple-700 h-10 px-4 py-2 w-fit"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    {isUploading ? "Загрузка..." : "Загрузить изображение"}
                  </label>
                  <Input type="hidden" {...field} />
                  {!imagePreview && (
                    <p className="text-sm text-gray-500 mt-1">
                      Загрузите изображение товара
                    </p>
                  )}
                </div>
              </FormControl>
            </div>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ImageUploadField;
