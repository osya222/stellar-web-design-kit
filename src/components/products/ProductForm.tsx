
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
import { Image } from "lucide-react";

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
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

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

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setIsSubmitting(true);

      let imageName = existingProduct?.image || "";

      if (selectedImage) {
        const formData = new FormData();
        formData.append('image', selectedImage);
        
        const response = await fetch('/lov-upload', {
          method: 'POST',
          body: formData
        });
        
        if (response.ok) {
          const result = await response.json();
          imageName = result.filename;
        } else {
          throw new Error('Failed to upload image');
        }
      }
      
      // Make sure all required fields have values (not undefined or optional)
      const productData: Product = {
        id: existingProduct?.id || Date.now(),
        name: data.name, // Ensure name is always provided
        price: data.price,
        category: data.category,
        manufacturer: data.manufacturer,
        description: data.description,
        image: imageName || undefined,
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
        setSelectedImage(null);
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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <FormLabel>Изображение товара</FormLabel>
            <div className="flex items-center gap-4">
              {(existingProduct?.image || selectedImage) && (
                <div className="relative w-24 h-24 border rounded-lg overflow-hidden bg-gray-50">
                  <img
                    src={selectedImage ? URL.createObjectURL(selectedImage) : existingProduct?.image ? `/images/products/${existingProduct.image}` : '/placeholder.svg'}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <Button
                type="button"
                variant="outline"
                className="gap-2"
                onClick={() => document.getElementById('image-upload')?.click()}
              >
                <Image className="w-4 h-4" />
                {existingProduct?.image || selectedImage ? 'Изменить фото' : 'Добавить фото'}
              </Button>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>

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
