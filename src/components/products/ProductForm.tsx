
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

// Validation schema for the product form
const productSchema = z.object({
  name: z.string().min(3, { message: "Название должно содержать минимум 3 символа" }),
  price: z.coerce.number().min(1, { message: "Цена должна быть больше 0" }),
  category: z.string().min(1, { message: "Категория обязательна" }),
  description: z.string().optional(),
  manufacturer: z.string().optional(),
});

type ProductFormProps = {
  existingProduct?: Product;
  onSuccess?: () => void;
};

const ProductForm = ({ existingProduct, onSuccess }: ProductFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: existingProduct?.name || "",
      price: existingProduct?.price || 0,
      category: existingProduct?.category || "",
      description: existingProduct?.description || "",
      manufacturer: existingProduct?.manufacturer || "",
    },
  });

  const onSubmit = async (data: z.infer<typeof productSchema>) => {
    try {
      setIsSubmitting(true);

      // Create new product object
      const newProduct: Product = {
        id: existingProduct?.id || Date.now(),
        name: data.name,
        price: data.price,
        category: data.category,
        description: data.description || "",
        manufacturer: data.manufacturer || "",
      };

      // Save product to storage
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
        }
      } catch (error) {
        console.error("Error in saveProductToProject:", error);
        throw error;
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
