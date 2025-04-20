
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Product } from "@/types/product";
import { useToast } from "@/hooks/use-toast";
import { saveProduct } from "@/utils/productStorage";
import { getCategories } from "@/utils/categoryStorage";
import { Category } from "@/data/categories";
import { getImageUrl } from "@/routes";
import { uploadFile } from "@/utils/fileUpload";
import { ProductDetailsFields } from "./product-form/ProductDetailsFields";
import { ImageUploadField } from "./product-form/ImageUploadField";
import { productSchema, ProductFormValues } from "./product-form/types";

interface ProductFormProps {
  existingProduct?: Product;
  onSuccess?: () => void;
}

const ProductForm = ({ existingProduct, onSuccess }: ProductFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    existingProduct?.image ? getImageUrl(existingProduct.image) : null
  );
  const { toast } = useToast();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: existingProduct?.name || "",
      price: existingProduct?.price || 0,
      categoryId: existingProduct?.categoryId || 0,
      description: existingProduct?.description || "",
      manufacturer: existingProduct?.manufacturer || "",
      image: existingProduct?.image || "",
    },
  });

  useEffect(() => {
    const loadCategories = () => {
      const loadedCategories = getCategories();
      console.log("Загружены категории:", loadedCategories.length);
      setCategories(loadedCategories);
    };
    
    loadCategories();
  }, []);

  useEffect(() => {
    if (existingProduct?.image) {
      const imageUrl = getImageUrl(existingProduct.image);
      console.log("Установлен превью существующего изображения:", imageUrl);
      setImagePreview(imageUrl);
    }
  }, [existingProduct]);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    const localPreviewUrl = URL.createObjectURL(file);
    setImagePreview(localPreviewUrl);
    console.log("Выбран файл для загрузки:", file.name);
  };

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setIsSubmitting(true);
      console.log("Начало сохранения товара с данными:", data);
      
      // Загружаем изображение, если оно выбрано
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
      
      // Создаем или обновляем товар
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
          categoryId: 0,
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
          <ProductDetailsFields form={form} categories={categories} />
          <ImageUploadField
            form={form}
            onFileSelect={handleFileSelect}
            imagePreview={imagePreview}
            uploadingImage={uploadingImage}
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-purple-600 hover:bg-purple-700" 
          disabled={isSubmitting}
        >
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
