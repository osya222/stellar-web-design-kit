
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
import { productSchema, ProductFormValues } from "./types";
import ProductDetails from "./ProductDetails";
import ImageUpload from "./ImageUpload";

interface ProductFormProps {
  product?: Product;
  onSuccess?: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [imageUrl, setImageUrl] = useState<string | null>(
    product?.image ? getImageUrl(product.image) : null
  );
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
    const loadCategories = () => {
      const loadedCategories = getCategories();
      setCategories(loadedCategories);
    };
    
    loadCategories();
  }, []);

  const handleFileSelect = async (file: File) => {
    setIsUploading(true);
    
    try {
      // Create local preview URL
      const objectUrl = URL.createObjectURL(file);
      setImageUrl(objectUrl);
      
      // Upload file and get the path
      const uploadedPath = await uploadFile(file);
      form.setValue("image", uploadedPath);
      
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
      
      // Clean up local preview and update with actual path
      URL.revokeObjectURL(objectUrl);
      setImageUrl(getImageUrl(uploadedPath));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setIsSubmitting(true);
      
      // Prepare product data
      const productData: Product = {
        id: product?.id || 0,
        name: data.name,
        price: data.price,
        categoryId: data.categoryId,
        manufacturer: data.manufacturer,
        description: data.description,
        image: data.image,
      };

      // Save product
      const savedProduct = saveProduct(productData);
      
      toast({
        title: "Success",
        description: product ? "Product updated successfully" : "Product added successfully",
      });

      // Call success callback
      if (onSuccess) {
        onSuccess();
      }

      // Reset form if adding new product
      if (!product) {
        form.reset({
          name: "",
          price: 0,
          categoryId: 0,
          description: "",
          manufacturer: "",
          image: "",
        });
        setImageUrl(null);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save product",
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
          <ProductDetails form={form} categories={categories} />
          <ImageUpload
            form={form}
            onFileSelect={handleFileSelect}
            imageUrl={imageUrl}
            isUploading={isUploading}
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-purple-600 hover:bg-purple-700" 
          disabled={isSubmitting || isUploading}
        >
          {isSubmitting
            ? "Saving..."
            : product
            ? "Update product"
            : "Add product"}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
