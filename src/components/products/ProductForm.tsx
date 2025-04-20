
import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Product } from "@/types/product";
import { getProductImageUrl } from "@/routes";
import { useToast } from "@/hooks/use-toast";
import { saveProduct, saveProductImage } from "@/utils/productStorage";
import { Upload, Image } from "lucide-react";

// Validation schema for the product form
const productSchema = z.object({
  name: z.string().min(3, { message: "Название должно содержать минимум 3 символа" }),
  price: z.coerce.number().min(1, { message: "Цена должна быть больше 0" }),
  category: z.string().min(1, { message: "Категория обязательна" }),
  description: z.string().optional(),
  manufacturer: z.string().min(1, { message: "Производитель обязателен" }),
});

type ProductFormValues = z.infer<typeof productSchema>;

type ProductFormProps = {
  existingProduct?: Product;
  onSuccess?: () => void;
};

const ProductForm = ({ existingProduct, onSuccess }: ProductFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    existingProduct?.imagePath 
      ? getProductImageUrl(existingProduct.imagePath) 
      : null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: existingProduct?.name || "",
      price: existingProduct?.price || 0,
      category: existingProduct?.category || "",
      description: existingProduct?.description || "",
      manufacturer: existingProduct?.manufacturer || "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, загрузите изображение в формате JPEG, PNG, GIF или WEBP",
        variant: "destructive",
      });
      return;
    }

    // Create preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setImageFile(file);
    
    // Clean up old preview URL
    return () => URL.revokeObjectURL(objectUrl);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setIsSubmitting(true);
      
      // Process image if we have a new one
      let imagePath = existingProduct?.imagePath;
      
      if (imageFile) {
        try {
          // In a real app, this would upload the file to the server
          imagePath = await saveProductImage(imageFile);
        } catch (error) {
          console.error("Error uploading image:", error);
          toast({
            title: "Ошибка загрузки изображения",
            description: "Не удалось загрузить изображение",
            variant: "destructive",
          });
          return;
        }
      }

      // Prepare product data
      const productData: Product = {
        id: existingProduct?.id || Date.now(), // Use existing ID or generate new one
        ...data,
        imagePath,
      };

      // Save product to storage
      saveProduct(productData);
      
      toast({
        title: "Успех",
        description: existingProduct 
          ? "Товар успешно обновлен" 
          : "Товар успешно добавлен",
      });

      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }

      // Reset form if adding new product
      if (!existingProduct) {
        form.reset({
          name: "",
          price: 0,
          category: "",
          description: "",
          manufacturer: "",
        });
        setImageFile(null);
        setPreviewUrl(null);
      }
    } catch (error) {
      console.error("Error saving product:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить товар",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Image Upload Section */}
        <div className="space-y-2">
          <FormLabel>Изображение товара</FormLabel>
          <div className="flex items-center gap-4">
            <div 
              className={`
                relative border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center
                ${previewUrl ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-blue-500'}
                transition-colors cursor-pointer w-32 h-32
              `}
              onClick={triggerFileInput}
            >
              {previewUrl ? (
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <Image className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-xs text-center text-gray-500">
                    Нажмите для загрузки
                  </span>
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
            
            <div className="flex-1">
              <Button 
                type="button" 
                variant="outline" 
                className="w-full flex items-center gap-2"
                onClick={triggerFileInput}
              >
                <Upload className="h-4 w-4" />
                {previewUrl ? 'Изменить изображение' : 'Загрузить изображение'}
              </Button>
              {previewUrl && (
                <p className="text-xs text-gray-500 mt-1">
                  Изображение будет сохранено при отправке формы
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Название*</FormLabel>
                <FormControl>
                  <Input placeholder="Введите название товара" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Розничная цена*</FormLabel>
                <FormControl>
                  <Input type="number" min="0" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Категория*</FormLabel>
                <FormControl>
                  <Input placeholder="Например: Лосось" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="manufacturer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Производитель*</FormLabel>
                <FormControl>
                  <Input placeholder="Например: Чили" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Описание</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Описание товара"
                    className="min-h-[80px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting
            ? "Сохранение..."
            : existingProduct
            ? "Обновить товар"
            : "Добавить товар"}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
