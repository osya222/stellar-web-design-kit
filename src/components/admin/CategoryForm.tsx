
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Category } from "@/data/categories";
import { useToast } from "@/hooks/use-toast";
import { saveCategory } from "@/utils/categoryStorage";

const categorySchema = z.object({
  name: z.string().min(2, { message: "Название категории должно содержать минимум 2 символа" }),
  slug: z.string().min(2, { message: "Slug должен содержать минимум 2 символа" })
    .regex(/^[a-z0-9-]+$/, { message: "Slug может содержать только строчные буквы, цифры и дефисы" }),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

type CategoryFormProps = {
  existingCategory?: Category;
  onSuccess?: () => void;
};

const CategoryForm = ({ existingCategory, onSuccess }: CategoryFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: existingCategory?.name || "",
      slug: existingCategory?.slug || "",
    },
  });

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setIsSubmitting(true);
      
      const categoryData: Category = {
        id: existingCategory?.id || Date.now(),
        name: data.name,
        slug: data.slug,
      };

      saveCategory(categoryData);
      
      toast({
        title: "Успех",
        description: existingCategory 
          ? "Категория успешно обновлена" 
          : "Категория успешно добавлена",
      });

      if (onSuccess) {
        onSuccess();
      }

      if (!existingCategory) {
        form.reset({
          name: "",
          slug: "",
        });
      }
    } catch (error) {
      console.error("Error saving category:", error);
      toast({
        title: "Ошибка",
        description: error instanceof Error ? error.message : "Не удалось сохранить категорию",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate slug from name
  const generateSlug = (name: string) => {
    const slug = name.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    
    form.setValue('slug', slug);
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
                <FormLabel>Название категории*</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Например: Морепродукты" 
                    {...field} 
                    onChange={(e) => {
                      field.onChange(e);
                      if (!existingCategory && !form.getValues('slug')) {
                        generateSlug(e.target.value);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug*</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input placeholder="например: moreprodukty" {...field} />
                  </FormControl>
                  {!existingCategory && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => generateSlug(form.getValues('name'))}
                    >
                      Генерировать
                    </Button>
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isSubmitting}>
          {isSubmitting
            ? "Сохранение..."
            : existingCategory
            ? "Обновить категорию"
            : "Добавить категорию"}
        </Button>
      </form>
    </Form>
  );
};

export default CategoryForm;
