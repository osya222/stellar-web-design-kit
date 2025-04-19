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
import { toast } from "@/hooks/use-toast";
import { saveProductToProject } from "@/utils/productStorage";
import { Upload } from "lucide-react";

// Validation schema for the product form
const productSchema = z.object({
  name: z.string().min(3, { message: "Название должно содержать минимум 3 символа" }),
  price: z.coerce.number().min(1, { message: "Цена должна быть больше 0" }),
  category: z.string().min(1, { message: "Категория обязательна" }),
  description: z.string().optional(),
  size: z.string().optional(),
  weight: z.string().optional(),
  packaging: z.string().optional(),
  catchDate: z.string().optional(),
  manufacturer: z.string().optional(),
});

type ProductFormProps = {
  existingProduct?: Product;
  onSuccess?: () => void;
};

const ProductForm = ({ existingProduct, onSuccess }: ProductFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    existingProduct?.image
  );

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: existingProduct?.name || "",
      price: existingProduct?.price || 0,
      category: existingProduct?.category || "",
      description: existingProduct?.description || "",
      size: existingProduct?.size || "",
      weight: existingProduct?.weight || "",
      packaging: existingProduct?.packaging || "",
      catchDate: existingProduct?.catchDate || "",
      manufacturer: existingProduct?.manufacturer || "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "Ошибка",
        description: "Размер изображения не должен превышать 2MB",
        variant: "destructive",
      });
      return;
    }

    setImageFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: z.infer<typeof productSchema>) => {
    try {
      setIsSubmitting(true);

      // Create new product object, ensuring all required properties are provided
      const newProduct: Product = {
        id: existingProduct?.id || Date.now(),
        name: data.name,
        price: data.price,
        category: data.category,
        description: data.description || "",
        manufacturer: data.manufacturer || "",
        weight: data.weight || "",
        packaging: data.packaging || "",
        size: data.size || "",
        catchDate: data.catchDate || "",
      };

      // Add image if available
      if (imagePreview) {
        newProduct.image = imagePreview;
      }

      // Save product to storage - wrapped in try/catch to handle errors better
      try {
        await saveProductToProject(newProduct);
        
        toast({
          title: "Успех",
          description: `Товар ${existingProduct ? "обновлен" : "добавлен"} успешно`,
        });

        if (onSuccess) {
          onSuccess();
        }

        // Reset form if adding new product
        if (!existingProduct) {
          form.reset();
          setImageFile(null);
          setImagePreview(undefined);
        }
      } catch (error) {
        console.error("Error in saveProductToProject:", error);
        throw error; // Re-throw to be caught by outer catch
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <Input placeholder="Например: Лосось (Чили)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Размер</FormLabel>
                  <FormControl>
                    <Input placeholder="Например: 200-300" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Вес</FormLabel>
                  <FormControl>
                    <Input placeholder="Например: 1 кг" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="packaging"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Упаковка</FormLabel>
                  <FormControl>
                    <Input placeholder="Например: Вакуумная упаковка" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="catchDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Вылов</FormLabel>
                  <FormControl>
                    <Input placeholder="Например: Январь 2024" {...field} />
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
                  <FormLabel>Производитель</FormLabel>
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
        </div>

        <div className="space-y-2">
          <FormLabel>Изображение</FormLabel>
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <div className="w-full sm:w-1/3 aspect-square bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Product preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-sm">Нет изображения</span>
              )}
            </div>
            <div className="flex-1">
              <label className="cursor-pointer">
                <div className="flex items-center gap-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground p-2 rounded-md">
                  <Upload className="h-4 w-4" />
                  <span>Загрузить изображение</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
              <p className="text-xs text-gray-500 mt-1">
                Максимальный размер: 2MB. Рекомендуемое соотношение сторон: 1:1
              </p>
            </div>
          </div>
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
