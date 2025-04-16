
import React, { useState, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  FormDescription 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Product } from '@/types/product';
import { ImageUpload } from '../shared/ImageUpload';
import { useToast } from '@/hooks/use-toast';
import { getUploadedImageUrl } from '@/routes';
import { products } from '@/data/products';

// Define available categories based on existing products
const existingCategories = Array.from(new Set(products.map(product => product.category)))
  .filter(Boolean) as string[];

// Form schema for validation
const productSchema = z.object({
  name: z.string().min(3, { message: "Название должно содержать не менее 3 символов" }),
  category: z.string().min(1, { message: "Выберите категорию" }),
  size: z.string().optional(),
  packaging: z.string().optional(),
  catchDate: z.string().optional(),
  manufacturer: z.string().min(1, { message: "Укажите производителя" }),
  expiryDate: z.string().optional(),
  weight: z.string().optional(),
  price: z.coerce.number().positive({ message: "Цена должна быть положительным числом" }).optional(),
});

interface ProductFormProps {
  initialProduct?: Product;
  onSave: (product: Product) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialProduct, onSave, onCancel }) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [customCategory, setCustomCategory] = useState<string>('');
  const [isUsingCustomCategory, setIsUsingCustomCategory] = useState(false);
  const { toast } = useToast();

  // Initialize the form with default values or initial product
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: initialProduct ? {
      name: initialProduct.name,
      category: initialProduct.category,
      size: initialProduct.size || '',
      packaging: initialProduct.packaging || '',
      catchDate: initialProduct.catchDate || '',
      manufacturer: initialProduct.manufacturer,
      expiryDate: initialProduct.expiryDate || '',
      weight: initialProduct.weight || '',
      price: initialProduct.price || undefined,
    } : {
      name: '',
      category: existingCategories[0] || '',
      size: '',
      packaging: '',
      catchDate: '',
      manufacturer: '',
      expiryDate: '',
      weight: '',
      price: undefined,
    },
  });

  // Load image URL from initial product if available
  useEffect(() => {
    if (initialProduct?.image) {
      const savedImageUrl = initialProduct.image;
      const resolvedUrl = getUploadedImageUrl(savedImageUrl) || savedImageUrl;
      setImageUrl(resolvedUrl);
    }
  }, [initialProduct]);

  // Handle category selection or custom category input
  const handleCategoryChange = (value: string) => {
    if (value === 'custom') {
      setIsUsingCustomCategory(true);
      form.setValue('category', customCategory);
    } else {
      setIsUsingCustomCategory(false);
      form.setValue('category', value);
    }
  };

  // Handle custom category input changes
  const handleCustomCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomCategory(value);
    if (isUsingCustomCategory) {
      form.setValue('category', value);
    }
  };

  // Handle image upload completion
  const handleImageUploaded = (uploadedUrl: string) => {
    setImageUrl(uploadedUrl);
  };

  // Handle form submission
  const onSubmit = (data: z.infer<typeof productSchema>) => {
    if (!imageUrl) {
      toast({
        variant: "destructive",
        title: "Внимание",
        description: "Загрузите изображение товара",
      });
      return;
    }

    // Create product object
    const product: Product = {
      id: initialProduct?.id || 0,  // This will be updated when saved
      name: data.name,
      category: data.category,
      size: data.size || undefined,
      packaging: data.packaging || undefined,
      catchDate: data.catchDate || undefined,
      manufacturer: data.manufacturer,
      expiryDate: data.expiryDate || undefined,
      weight: data.weight || undefined,
      image: imageUrl,
      price: data.price
    };

    onSave(product);
    
    // Reset form if it's not an edit operation
    if (!initialProduct) {
      form.reset();
      setImageUrl('');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название товара*</FormLabel>
                  <FormControl>
                    <Input placeholder="Введите название товара" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Категория*</FormLabel>
                    <FormControl>
                      <Select 
                        onValueChange={handleCategoryChange} 
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                        <SelectContent>
                          {existingCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                          <SelectItem value="custom">Своя категория</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isUsingCustomCategory && (
                <FormItem>
                  <FormLabel>Новая категория*</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Введите название новой категории" 
                      value={customCategory}
                      onChange={handleCustomCategoryChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            </div>
            
            <FormField
              control={form.control}
              name="manufacturer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Производитель*</FormLabel>
                  <FormControl>
                    <Input placeholder="Введите производителя" {...field} />
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
                  <FormLabel>Цена</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.1"
                      placeholder="Укажите цену" 
                      {...field} 
                      onChange={(e) => {
                        const value = e.target.value === '' ? undefined : Number(e.target.value);
                        field.onChange(value);
                      }}
                      value={field.value === undefined ? '' : field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <div className="border rounded-md p-4">
              <FormLabel className="block mb-4">Изображение товара*</FormLabel>
              <ImageUpload 
                initialImage={imageUrl} 
                onImageUploaded={handleImageUploaded}
                productId={initialProduct?.id}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Размер</FormLabel>
                    <FormControl>
                      <Input placeholder="Размер" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="packaging"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Упаковка</FormLabel>
                    <FormControl>
                      <Input placeholder="Упаковка" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="catchDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Дата вылова</FormLabel>
                    <FormControl>
                      <Input placeholder="Дата вылова" {...field} />
                    </FormControl>
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
                      <Input placeholder="Вес" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          {initialProduct && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Отмена
            </Button>
          )}
          <Button type="submit">
            {initialProduct ? 'Сохранить изменения' : 'Добавить товар'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
