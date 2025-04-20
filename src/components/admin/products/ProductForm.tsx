
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/types/product";
import { Category } from "@/types/category";
import { productSchema, ProductFormValues } from "@/schemas/productSchema";
import { saveProduct } from "@/utils/dataService";
import { uploadFile } from "@/utils/fileUpload";
import { Upload, Loader2 } from "lucide-react";

interface ProductFormProps {
  product?: Product;
  categories: Category[];
  onSuccess?: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, categories, onSuccess }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(product?.image || null);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      id: product?.id,
      name: product?.name || "",
      price: product?.price || 0,
      categoryId: product?.categoryId || 0,
      description: product?.description || "",
      image: product?.image || "",
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      const imagePath = await uploadFile(file);
      form.setValue("image", imagePath, { shouldValidate: true });
      setImagePreview(imagePath);
      
      toast({
        title: "Изображение загружено",
        description: "Файл успешно загружен",
      });
    } catch (error) {
      console.error("Ошибка загрузки:", error);
      toast({
        title: "Ошибка загрузки",
        description: error instanceof Error ? error.message : "Не удалось загрузить изображение",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Обработчик ошибок загрузки изображения предпросмотра
  const handlePreviewError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/placeholder.svg";
  };

  const onSubmit = async (values: ProductFormValues) => {
    setIsSubmitting(true);
    
    try {
      const savedProduct = saveProduct({
        id: product?.id || 0,
        name: values.name,
        price: values.price,
        categoryId: values.categoryId,
        description: values.description,
        image: values.image,
      });
      
      toast({
        title: "Успешно",
        description: product ? "Товар обновлен" : "Товар добавлен",
      });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Ошибка сохранения:", error);
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
              <FormLabel>Цена*</FormLabel>
              <FormControl>
                <Input type="number" min="0" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Категория*</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(parseInt(value))}
                defaultValue={field.value ? field.value.toString() : undefined}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                <Textarea placeholder="Описание товара" className="min-h-[80px]" {...field} />
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
              <div className="flex items-start gap-4">
                {imagePreview && (
                  <div className="relative w-24 h-24 border rounded-md overflow-hidden bg-gray-50">
                    <img 
                      src={imagePreview} 
                      alt="Предпросмотр" 
                      className="w-full h-full object-cover"
                      onError={handlePreviewError}
                    />
                  </div>
                )}
                <div className="flex-1">
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/gif,image/webp"
                        id="product-image"
                        className="hidden"
                        onChange={handleImageUpload}
                        disabled={isUploading}
                      />
                      <Input type="hidden" {...field} />
                      <label
                        htmlFor="product-image"
                        className={`cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium 
                        ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 
                        focus-visible:ring-ring focus-visible:ring-offset-2 
                        ${isUploading ? 'opacity-70 pointer-events-none' : 'hover:bg-primary/90'} 
                        bg-primary text-primary-foreground h-10 px-4 py-2 w-fit`}
                      >
                        {isUploading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Загрузка...
                          </>
                        ) : (
                          <>
                            <Upload className="mr-2 h-4 w-4" />
                            Загрузить изображение
                          </>
                        )}
                      </label>
                      {!imagePreview && (
                        <p className="text-sm text-gray-500 mt-1">
                          Загрузите изображение товара (JPEG, PNG, GIF, WEBP)
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

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isSubmitting || isUploading}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Сохранение...
            </>
          ) : product ? "Обновить товар" : "Добавить товар"}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
