
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
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
import { getImageUrl } from "@/routes";
import { getCategories } from "@/utils/categoryStorage";
import { Category } from "@/data/categories";
import { uploadFile } from "@/utils/fileUpload";
import { productSchema } from "@/components/admin/product-form/types";
import type { ProductFormValues } from "@/components/admin/product-form/types";

type ProductFormProps = {
  existingProduct?: Product;
  onSuccess?: () => void;
};

const ProductForm = ({ existingProduct, onSuccess }: ProductFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    existingProduct?.image ? getImageUrl(existingProduct.image) : null
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const loadCategories = () => {
      const loadedCategories = getCategories();
      console.log("Загружены категории:", loadedCategories.length);
      setCategories(loadedCategories);
    };
    
    loadCategories();
  }, []);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: existingProduct?.name || "",
      price: existingProduct?.price || 0,
      categoryId: existingProduct?.categoryId || categories[0]?.id || 1,
      description: existingProduct?.description || "",
      manufacturer: existingProduct?.manufacturer || "",
      image: existingProduct?.image || "",
    },
  });

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'image' && value.image) {
        setImagePreview(getImageUrl(value.image as string));
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    
    try {
      const localPreviewUrl = URL.createObjectURL(file);
      setImagePreview(localPreviewUrl);
      setSelectedFile(file);
      
      toast({
        title: "Предпросмотр",
        description: "Изображение готово к загрузке",
      });
      
      console.log("Установлен предпросмотр изображения:", localPreviewUrl);
    } catch (error) {
      console.error("Ошибка обработки изображения:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось обработать изображение",
        variant: "destructive",
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setIsSubmitting(true);
      console.log("Начинаем сохранение товара, данные:", data);
      
      if (selectedFile) {
        setUploadingImage(true);
        try {
          const uploadedPath = await uploadFile(selectedFile);
          console.log("Изображение успешно загружено:", uploadedPath);
          data.image = uploadedPath;
        } catch (error) {
          console.error("Не удалось загрузить изображение:", error);
          toast({
            title: "Ошибка загрузки",
            description: "Не удалось загрузить изображение",
            variant: "destructive",
          });
        } finally {
          setUploadingImage(false);
        }
      }
      
      const productData: Product = {
        id: existingProduct?.id || 0,
        name: data.name,
        price: data.price,
        categoryId: data.categoryId,
        manufacturer: data.manufacturer,
        description: data.description,
        image: data.image,
      };

      console.log("Сохраняем товар:", productData);
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
          categoryId: categories[0]?.id || 1,
          description: "",
          manufacturer: "",
          image: "",
        });
        setImagePreview(null);
        setSelectedFile(null);
      }
    } catch (error) {
      console.error("Ошибка сохранения товара:", error);
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
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Категория*</FormLabel>
                <FormControl>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                    value={field.value}
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
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
                  {imagePreview && (
                    <div className="w-20 h-20 border rounded-md overflow-hidden">
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

        <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isSubmitting}>
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
