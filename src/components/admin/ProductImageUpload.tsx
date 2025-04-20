
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

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Ошибка",
        description: "Размер файла не должен превышать 5MB",
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

      // Отладочная информация перед отправкой
      console.log("Подготовка к отправке файла:", filename, "Размер:", file.size, "Тип:", file.type);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 сек таймаут (уменьшен)
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      console.log("Статус ответа:", response.status, response.statusText);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Текст ошибки от сервера:", errorText);
        throw new Error(`Ошибка при загрузке изображения: ${response.status} ${response.statusText}`);
      }

      let responseText = await response.text();
      console.log("Текст ответа:", responseText);
      
      // Пробуем разобрать текст как JSON
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Ошибка парсинга JSON:", parseError);
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
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : error instanceof DOMException && error.name === "AbortError"
          ? "Превышено время ожидания ответа от сервера"
          : "Не удалось загрузить изображение";
      
      // Сохраняем детали ошибки и открываем диалог
      setErrorDetails(errorMessage);
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
              <div className="mb-4">{errorDetails}</div>
              <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
                <p className="font-medium mb-2">Возможные причины:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
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
