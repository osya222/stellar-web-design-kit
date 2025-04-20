
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Category } from "@/types/category";
import { categorySchema, CategoryFormValues } from "@/schemas/categorySchema";
import { saveCategory } from "@/utils/dataService";

interface CategoryFormProps {
  category?: Category;
  onSuccess?: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ category, onSuccess }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      id: category?.id,
      name: category?.name || "",
      slug: category?.slug || "",
    },
  });

  const onSubmit = async (values: CategoryFormValues) => {
    setIsSubmitting(true);
    
    try {
      const savedCategory = saveCategory({
        id: category?.id || 0,
        name: values.name,
        slug: values.slug,
      });
      
      toast({
        title: "Успешно",
        description: category ? "Категория обновлена" : "Категория добавлена",
      });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Ошибка сохранения:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить категорию",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateSlug = () => {
    const name = form.getValues("name");
    if (name) {
      const slug = name
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
      
      form.setValue("slug", slug);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название*</FormLabel>
              <FormControl>
                <Input placeholder="Например: Морепродукты" {...field} />
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
                  <Input placeholder="Например: moreprodukty" {...field} />
                </FormControl>
                <Button type="button" variant="outline" onClick={generateSlug}>
                  Генерировать
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Сохранение..."
            : category
            ? "Обновить категорию"
            : "Добавить категорию"}
        </Button>
      </form>
    </Form>
  );
};

export default CategoryForm;
