
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

interface ProductImageUploadProps {
  productId: string | undefined;
  initialPreview: string;
  imageUrl: string;
  uploadActive?: boolean;
  onImageChange: (imagePath: string) => void;
}

export const ProductImageUpload: React.FC<ProductImageUploadProps> = ({
  productId,
  initialPreview,
  imageUrl,
  uploadActive = true,
  onImageChange,
}) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorDetails, setErrorDetails] = useState("");

  // Показываем превью только реального пути
  const previewUrl =
    imageUrl && imageUrl !== '/placeholder.svg'
      ? imageUrl
      : initialPreview && initialPreview !== '/placeholder.svg'
        ? initialPreview
        : '/placeholder.svg';

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, выберите файл изображения",
        variant: "destructive"
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "Ошибка",
        description: "Размер файла не должен превышать 10MB",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsUploading(true);

      const formData = new FormData();
      // Заменим пробелы и спецсимволы в имени файла
      const safeFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filename = `product_${productId || 'new'}_${Date.now()}.${safeFileName.split('.').pop() || 'jpg'}`;
      
      // Добавляем файл в formData с безопасным именем
      formData.append('image', file, filename);

      // Проверяем, что formData содержит файл перед отправкой
      console.log("Отправка файла:", filename, "Размер:", file.size);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        // Важно: не добавляем Content-Type, браузер сам установит правильный с boundary для formData
      });

      // Выводим отладочную информацию о статусе ответа
      console.log("Статус ответа:", response.status, response.statusText);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Ошибка ответа:", errorText);
        throw new Error(`Ошибка при загрузке изображения на сервер: ${response.status} ${response.statusText}`);
      }

      // Пробуем разобрать ответ как JSON
      let result;
      try {
        result = await response.json();
      } catch (parseError) {
        console.error("Ошибка парсинга JSON:", parseError);
        const text = await response.text();
        console.log("Текст ответа:", text);
        throw new Error("Некорректный формат ответа сервера");
      }

      if (!result?.success || !result?.path) {
        console.error("Некорректный ответ:", result);
        throw new Error('Некорректный ответ сервера при загрузке изображения');
      }

      console.log("Успешная загрузка, путь:", result.path);

      // Передаём путь для хранения в продукте и для превью
      onImageChange(result.path);

      toast({
        title: "Изображение загружено",
        description: "Изображение сохранено и связано с продуктом",
      });

    } catch (error) {
      console.error("Ошибка загрузки:", error);
      
      // Сохраняем детали ошибки и открываем диалог
      setErrorDetails((error as Error).message || "Не удалось загрузить изображение");
      setErrorDialogOpen(true);
      
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить изображение. Нажмите для подробностей.",
        variant: "destructive",
        action: <Button variant="outline" size="sm" onClick={() => setErrorDialogOpen(true)}>Детали</Button>
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <div className="mb-4">
        <p className="text-sm font-medium mb-2">Изображение продукта</p>
        <AspectRatio ratio={4 / 3} className="bg-gray-100 rounded-md overflow-hidden mb-4">
          <img
            src={previewUrl}
            alt="Product preview"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder.svg';
            }}
          />
        </AspectRatio>
        {uploadActive ? (
          <div className="flex flex-col gap-2">
            <Button variant="outline" className="w-full relative" disabled={isUploading}>
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleImageUpload}
                accept="image/*"
                disabled={isUploading}
              />
              {isUploading ? (
                <>
                  <div className="animate-spin h-4 w-4 mr-2 border-2 border-primary border-t-transparent rounded-full" />
                  Загрузка...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Загрузить изображение
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <Button variant="outline" className="w-full relative" disabled>
              <Upload className="mr-2 h-4 w-4" />
              Загрузка изображений отключена
            </Button>
          </div>
        )}
      </div>

      <AlertDialog open={errorDialogOpen} onOpenChange={setErrorDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ошибка загрузки изображения</AlertDialogTitle>
            <AlertDialogDescription>
              {errorDetails}
              <div className="mt-4 p-3 bg-gray-100 rounded text-sm font-mono">
                Возможные причины:
                <ul className="list-disc pl-5 mt-2">
                  <li>Проблемы с подключением к серверу</li>
                  <li>Недостаточно прав для записи файла</li>
                  <li>Ошибка обработки на сервере</li>
                </ul>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Закрыть</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
