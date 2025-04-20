
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ArrowLeft, Save } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { 
  createProduct, 
  updateProduct, 
  updateProductImage, 
  getProductImage,
  cacheProductImage 
} from '@/utils/dataService';
import type { Product } from '@/types/product';
import { ProductImageUpload } from './ProductImageUpload';

interface ProductEditorProps {
  product: Product | null;
  categories: string[];
  manufacturers: string[];
  onSaveComplete: () => void;
  onCancel: () => void;
  uploadActive?: boolean;
}

const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, 'Название должно содержать минимум 3 символа'),
  category: z.string().min(1, 'Выберите категорию'),
  manufacturer: z.string().min(1, 'Выберите производителя'),
  price: z.coerce.number().min(0, 'Цена не может быть отрицательной'),
  description: z.string().optional(),
  imageUrl: z.string().default('/placeholder.svg'),
  inStock: z.boolean().default(true),
  weight: z.coerce.number().optional(),
  unit: z.enum(['кг', 'г', 'шт']).optional(),
  isPopular: z.boolean().default(false),
});

type ProductFormValues = z.infer<typeof productSchema>;

export const ProductEditor: React.FC<ProductEditorProps> = ({
  product,
  categories,
  manufacturers,
  onSaveComplete,
  onCancel,
  uploadActive = true
}) => {
  const { toast } = useToast();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: product || {
      id: uuidv4(),
      name: '',
      category: '',
      manufacturer: '',
      price: 0,
      description: '',
      imageUrl: '/placeholder.svg',
      inStock: true,
      weight: undefined,
      unit: undefined,
      isPopular: false,
    },
  });

  const [imagePreview, setImagePreview] = useState<string>(
    product?.imageUrl || '/placeholder.svg'
  );

  React.useEffect(() => {
    if (product?.id) {
      const cachedImage = getProductImage(product.id);
      if (cachedImage) {
        setImagePreview(cachedImage);
      } else if (product.imageUrl) {
        setImagePreview(product.imageUrl);
      }
    }
  }, [product]);

  const handleImageChange = (imagePath: string, preview: string) => {
    form.setValue('imageUrl', imagePath);
    setImagePreview(preview);
    
    // Cache the preview image
    if (form.getValues('id')) {
      cacheProductImage(form.getValues('id'), preview);
    }
  };

  const onSubmit = async (data: ProductFormValues) => {
    try {
      let savedProduct: Product;

      if (product) {
        savedProduct = await updateProduct({
          ...data,
          id: product.id
        });
        toast({
          title: "Успешно",
          description: "Продукт обновлен",
        });
      } else {
        savedProduct = await createProduct(data);
        toast({
          title: "Успешно",
          description: "Продукт создан",
        });
      }

      // Обновить изображение, если data.imageUrl отличается от product?.imageUrl
      if (imagePreview !== '/placeholder.svg' && data.imageUrl !== product?.imageUrl) {
        await updateProductImage(savedProduct.id, data.imageUrl);
      }

      onSaveComplete();
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить продукт",
        variant: "destructive"
      });
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onCancel} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад
          </Button>
          <h1 className="text-2xl font-bold">
            {product ? 'Редактирование продукта' : 'Добавление нового продукта'}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1">
            <ProductImageUpload
              productId={form.getValues('id')}
              initialPreview={product?.imageUrl || '/placeholder.svg'}
              imageUrl={form.getValues('imageUrl')}
              uploadActive={uploadActive}
              onImageChange={handleImageChange}
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Название продукта</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Введите название продукта" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Категория</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите категорию" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
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
                    name="manufacturer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Производитель</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите производителя" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {manufacturers.map((manufacturer) => (
                              <SelectItem key={manufacturer} value={manufacturer}>
                                {manufacturer}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Цена</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            placeholder="0"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field: { value, onChange, ...field } }) => (
                      <FormItem>
                        <FormLabel>Вес</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            value={value ?? ''}
                            onChange={onChange}
                            {...field}
                            placeholder="Опционально"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="unit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Единица измерения</FormLabel>
                        <Select
                          value={field.value ?? ''}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите единицу" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="кг">кг</SelectItem>
                            <SelectItem value="г">г</SelectItem>
                            <SelectItem value="шт">шт</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Описание</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Введите описание продукта"
                          rows={4}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="inStock"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between p-4 rounded-lg border">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">В наличии</FormLabel>
                          <p className="text-sm text-muted-foreground">
                            Продукт доступен для заказа
                          </p>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isPopular"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between p-4 rounded-lg border">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Популярный товар</FormLabel>
                          <p className="text-sm text-muted-foreground">
                            Отметить как популярный товар
                          </p>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <Button type="button" variant="outline" onClick={onCancel}>
                    Отмена
                  </Button>
                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    Сохранить
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
