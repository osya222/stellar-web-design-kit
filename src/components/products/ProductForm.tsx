
import React, { useState } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { saveProduct } from "@/utils/productStorage";
import { Upload } from "lucide-react";

const productSchema = z.object({
  name: z.string().min(3, { message: "Название должно содержать минимум 3 символа" }),
  price: z.coerce.number().min(1, { message: "Цена должна быть больше 0" }),
  category: z.string().min(1, { message: "Категория обязательна" }),
  description: z.string().optional(),
  manufacturer: z.string().min(1, { message: "Производитель обязателен" }),
  image: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

type ProductFormProps = {
  existingProduct?: Product;
  onSuccess?: () => void;
};

const ProductForm = ({ existingProduct, onSuccess }: ProductFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [uploadingImage, setUploadingImage] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: existingProduct?.name || "",
      price: existingProduct?.price || 0,
      category: existingProduct?.category || "",
      description: existingProduct?.description || "",
      manufacturer: existingProduct?.manufacturer || "",
      image: existingProduct?.image || "",
    },
  });

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const filename = file.name.toLowerCase().replace(/[^a-z0-9.]/g, '-');
      const path = `/images/products/${filename}`;
      
      // Use Lovable's built-in file upload functionality
      await fetch('/_upload', {
        method: 'POST',
        body: formData,
        headers: {
          'X-Upload-Path': path,
        },
      });

      form.setValue('image', filename);
      toast({
        title: "Успех",
        description: "Изображение успешно загружено",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить изображение",
        variant: "destructive",
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setIsSubmitting(true);
      
      const productData: Product = {
        id: existingProduct?.id || Date.now(),
        name: data.name,
        price: data.price,
        category: data.category,
        manufacturer: data.manufacturer,
        description: data.description,
        image: data.image,
      };

      saveProduct(productData);
      
      toast({
        title: "Успех",
        description: existingProduct 
          ? "Товар успешно обновлен" 
          : "Товар успешно добавлен",
      });

      if (onSuccess) {
        onSuccess();
      }

      if (!existingProduct) {
        form.reset({
          name: "",
          price: 0,
          category: "",
          description: "",
          manufacturer: "",
          image: "",
        });
      }
    } catch (error) {
      console.error("Error saving product:", error);
      toast({
        title: "Ошибка",
        description: error instanceof Error ? error.message : "Не удалось сохранить товар",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Изображение</FormLabel>
                <div className="flex items-center gap-4">
                  {field.value && (
                    <img 
                      src={getImageUrl(field.value)} 
                      alt="Preview" 
                      className="w-20 h-20 object-cover rounded"
                    />
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
                        className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
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
