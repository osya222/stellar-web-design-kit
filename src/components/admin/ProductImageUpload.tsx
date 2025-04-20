
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Upload, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface ProductImageUploadProps {
  productId: string | undefined;
  initialPreview: string;
  imageUrl: string;
  uploadActive?: boolean;
  onImageChange: (imagePath: string, preview: string) => void;
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
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(
    imageUrl || initialPreview || '/placeholder.svg'
  );
  const abortControllerRef = useRef<AbortController | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Очистка при размонтировании компонента
  React.useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      if (uploadTimeoutRef.current) {
        clearTimeout(uploadTimeoutRef.current);
      }
    };
  }, []);

  // Функция отправки файла на сервер (/api/upload)
  const uploadFile = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      // Устанавливаем новый контроллер отмены для каждого запроса
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      abortControllerRef.current = new AbortController();
      
      // Устанавливаем таймаут на запрос загрузки
      const timeoutId = setTimeout(() => {
        if (abortControllerRef.current) {
          console.log('Прерывание запроса из-за таймаута');
          abortControllerRef.current.abort();
          setUploadError('Превышено время ожидания загрузки изображения');
          toast({
            title: "Ошибка",
            description: "Превышено время ожидания загрузки",
            variant: "destructive"
          });
        }
      }, 20000); // 20 секунд таймаут
      
      uploadTimeoutRef.current = timeoutId;
      
      console.log('Отправка запроса на /api/upload...');
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        signal: abortControllerRef.current.signal,
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      
      // Очищаем таймаут после получения ответа
      clearTimeout(timeoutId);
      uploadTimeoutRef.current = null;
      
      console.log('Статус ответа:', response.status);
      
      // Проверка HTTP статуса
      if (!response.ok) {
        let errorText = '';
        try {
          const errorData = await response.json();
          errorText = errorData.details || errorData.error || `HTTP ошибка: ${response.status}`;
        } catch (e) {
          errorText = await response.text() || `HTTP ошибка: ${response.status}`;
        }
        
        console.error('Ошибка загрузки, ответ сервера:', errorText);
        throw new Error(`Ошибка загрузки: ${errorText}`);
      }
      
      const result = await response.json();
      console.log('Успешный ответ сервера:', result);

      if (result?.success && result?.path) {
        console.log('Путь к загруженному изображению:', result.path);
        setUploadError(null);
        return result.path as string;
      } else {
        console.error('Неожиданный формат ответа:', result);
        throw new Error(result?.error || 'Неверный формат ответа от сервера');
      }
    } catch (error: any) {
      // Если это не ошибка отмены, то показываем ее
      if (error.name !== 'AbortError') {
        console.error('Ошибка при загрузке файла:', error);
        setUploadError(error.message || 'Неизвестная ошибка при загрузке');
        
        toast({
          title: "Ошибка",
          description: error.message || "Не удалось загрузить изображение",
          variant: "destructive"
        });
      }
      return null;
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadError(null);

    // Проверка типа файла
    if (!file.type.startsWith('image/')) {
      setUploadError('Выберите файл изображения (JPEG, PNG, GIF, и т.д.)');
      toast({
        title: "Ошибка",
        description: "Пожалуйста, выберите файл изображения",
        variant: "destructive"
      });
      return;
    }

    // Проверка размера файла
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Размер файла превышает 5MB');
      toast({
        title: "Ошибка",
        description: "Размер файла не должен превышать 5MB",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    
    try {
      // Создаем превью изображения для быстрого отображения
      const readerPromise = new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = (ev) => {
          try {
            const preview = ev.target?.result as string || '/placeholder.svg';
            resolve(preview);
          } catch (err) {
            reject(err);
          }
        };
        
        reader.onerror = (err) => {
          reject(err);
        };
        
        // Запускаем чтение файла для создания превью
        reader.readAsDataURL(file);
      });
      
      try {
        // Получаем превью
        const preview = await readerPromise;
        
        // Показываем превью сразу после выбора файла
        setImagePreview(preview);
        
        // Загружаем файл на сервер
        console.log('Начинаем загрузку файла на сервер...');
        const imagePath = await uploadFile(file);
        
        if (imagePath) {
          console.log('Файл успешно загружен, путь:', imagePath);
          // Обновляем данные продукта с новым путем к изображению
          onImageChange(imagePath, preview);
          toast({
            title: "Готово",
            description: "Изображение успешно загружено",
          });
        } else {
          // Если загрузка не удалась, восстанавливаем предыдущее превью
          console.error('Загрузка не удалась, восстанавливаем превью');
          setImagePreview(imageUrl || initialPreview || '/placeholder.svg');
        }
      } catch (error) {
        console.error('Ошибка в обработчике загрузки превью:', error);
        setImagePreview(imageUrl || initialPreview || '/placeholder.svg');
        setUploadError('Не удалось прочитать файл изображения');
        
        toast({
          title: "Ошибка",
          description: "Не удалось прочитать файл изображения",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Критическая ошибка при обработке изображения:", error);
      setUploadError('Произошла критическая ошибка при обработке изображения');
      setImagePreview(imageUrl || initialPreview || '/placeholder.svg');
      
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при загрузке изображения",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRetry = () => {
    setUploadError(null);
    // Позволяем выбрать тот же файл повторно
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="mb-4">
      <p className="text-sm font-medium mb-2">Изображение продукта</p>
      <AspectRatio ratio={4 / 3} className="bg-gray-100 rounded-md overflow-hidden mb-4">
        <img
          src={imagePreview || '/placeholder.svg'}
          alt="Product preview"
          className="w-full h-full object-cover"
          onError={(e) => {
            console.error("Ошибка загрузки изображения:", imagePreview);
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
      </AspectRatio>
      
      {uploadError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Ошибка загрузки</AlertTitle>
          <AlertDescription>
            {uploadError}
          </AlertDescription>
        </Alert>
      )}
      
      {uploadActive ? (
        <div className="flex flex-col gap-2">
          <Button 
            variant="outline" 
            className="w-full relative" 
            disabled={isUploading}
            onClick={() => uploadError ? handleRetry() : null}
          >
            <input
              ref={fileInputRef}
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
            ) : uploadError ? (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Повторить загрузку
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
  );
};
