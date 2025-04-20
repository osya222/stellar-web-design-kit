
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { useToast } from "@/hooks/use-toast";
import { saveProduct } from "@/utils/productStorage";
import { getCategories } from "@/utils/categoryStorage";
import { Category } from "@/data/categories";
import { uploadFile } from "@/utils/fileUpload";
import { productSchema } from "./productSchema";
import ProductDetailsFields from "./ProductDetailsFields";
import ImageUploadField from "./ImageUploadField";

export interface ProductFormValues {
  name: string;
  price: number;
  categoryId: number;
  description?: string;
  manufacturer: string;
  image?: string;
}

interface ProductFormProps {
  product?: Product;
  onSuccess?: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(product?.image || null);
  const { toast } = useToast();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || "",
      price: product?.price || 0,
      categoryId: product?.categoryId || 0,
      description: product?.description || "",
      manufacturer: product?.manufacturer || "",
      image: product?.image || "",
    },
  });

  useEffect(() => {
    // Load categories when component mounts
    const loadedCategories = getCategories();
    setCategories(loadedCategories);
  }, []);

  const handleFileSelect = async (file: File) => {
    if (!file) return;

    setIsUploading(true);
    
    try {
      // Upload file and get the path
      const uploadedPath = await uploadFile(file);
      
      // Set form value
      form.setValue("image", uploadedPath);
      
      // Update preview
      setImagePreview(uploadedPath);
      
      toast({
        title: "Успешно",
        description: "Изображение загружено",
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить изображение",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: ProductFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Prepare product data
      const productData: Product = {
        id: product?.id || 0,
        name: data.name,
        price: parseFloat(data.price.toString()),
        categoryId: parseInt(data.categoryId.toString()),
        manufacturer: data.manufacturer,
        description: data.description,
        image: data.image,
      };

      // Save product
      const savedProduct = saveProduct(productData);
      
      toast({
        title: "Успешно",
        description: product ? "Товар обновлен" : "Товар добавлен",
      });

      // Call success callback
      if (onSuccess) {
        onSuccess();
      }

      // Reset form if adding new product
      if (!product) {
        form.reset();
        setImagePreview(null);
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
        <div className="space-y-4">
          <ProductDetailsFields form={form} categories={categories} />
          <ImageUploadField 
            form={form}
            onFileSelect={handleFileSelect}
            imagePreview={imagePreview}
            isUploading={isUploading}
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-purple-600 hover:bg-purple-700" 
          disabled={isSubmitting || isUploading}
        >
          {isSubmitting
            ? "Сохранение..."
            : product
            ? "Обновить товар"
            : "Добавить товар"}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
